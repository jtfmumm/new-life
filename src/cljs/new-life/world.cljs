(ns new-life.world
	(:require [new-life.data :as d]
			  [new-life.matrix :as mtx]
			  [new-life.utilities :as u]
			  [new-life.canvas :as cvs]))


;;WORLD
;;  0-Empty
;;  1-10 Food
;;  100+ UIDs for organisms
(def tile-types 
	[:plains :forest :hills :river :lake])

(def tile-colors
  {:plains [255 255 227] :forest [210 255 196] :hills [255 255 132]
   :river [192 247 254] :lake [96 148 219]})

(def blank-tile
	{:object 0 
   :color [0 0 0]
	 :type (tile-types 0)
	 :scent 0 
	 :sound 0 
   :sprite (d/empty-sprite 8)
	 })

(defn gen-coordinates [world-size]
    (for [x (range world-size) y (range world-size)] [x y]))

(defn gen-world-map [world-size]
  (let [coordinates (gen-coordinates world-size)
        size (count coordinates)
        tiles (repeat size blank-tile)]
    (zipmap coordinates tiles)))

(defn draw-tile [tile tile-size]
  ;Input tile comes in the form of a vector containing 
  ;a coordinate vector and a map of values
  (let [[coord contents] tile
        [world-x world-y] coord
        x (* tile-size world-x) y (* tile-size world-y)
        object-id (:object contents) color (:color contents)
        back-color (tile-colors (:type contents))
        sprite (:sprite contents)]
    (cvs/draw-color-matrix sprite 
      :x x :y y :size tile-size :color color :back-color back-color)))

(defn draw-world [world]
  (let [world-map (:world-map world)
        tile-size (get-in world [:config :tile-size])]
    (doseq [tile world-map] (draw-tile tile tile-size))))


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
(comment  
  
  
  
  (defn in-bounds? [x]
	(let [WORLD-SIZE (get-config :world-size)]
    (cond
        (< x 0) false
        (> x WORLD-SIZE) false
        :else true)))

(defn check-tile [x y]
    (d/check-tile x y))

(defn set-tile! [value x y]
    (d/set-tile! x y :object value))

(defn world-coord [x]
	(let [TILE-SIZE (get-config :tile-size)]
    (* x TILE-SIZE)))

(defn get-neighborhood [x y size]
    (mtx/submatrix @d/world x y size size))


;;ORGANISMS
(defn list-uids []
    (d/list-uids))

(def make-uid (u/make-counter 100))

(defn gen-org-row [size]
    (loop [row [] counter 0]
        (if (< counter size)
            (recur (conj row (u/pick-rand-int 0 2)) (inc counter))
            row)))

(defn gen-org-box [size]
    (loop [matrix [] counter 0]
        (if (< counter size) 
            (recur (conj matrix (gen-org-row size)) (inc counter))
            matrix)))

(defn get-trait [uid trait]
    (d/get-trait uid trait))

(defn set-trait! [uid trait value]
    (d/set-trait! uid trait value))

(defn gen-organism! [uid properties]
    (d/gen-organism! uid properties))

(defn food-template [value]
	(d/food-template value))

(defn get-food [x y]
    ;;If there's food in this spot, return its value
    (if (and (in-bounds? x)
             (in-bounds? y))
        (let [value (check-tile x y)]
          (cond
              (< value 10) value
              :else 0))
        0))

(defn get-food-value [x]
    (cond
        (< x 10) (/ 1 x)
        :else 0))

(defn get-food-total [matrix]
    (reduce + (map #(get-food-value %) (flatten matrix))))

(defn food-plenty [x y size]
    (get-food-total (get-neighborhood x y size)))

(defn food-place-value [plenty]
    (cond
        (< plenty 1) 3
        (< plenty 2) 2
        :else 1))

(defn place-food [times]
	(let [WORLD-SIZE (get-config :world-size)
		  FOOD-RANGE (get-config :food-range)]
    (loop [x (u/pick-rand-int 0 WORLD-SIZE) y (u/pick-rand-int 0 WORLD-SIZE)
          counter times]
      (let [place-value (food-place-value (food-plenty x y FOOD-RANGE))]
        (do
          (if (= (check-tile x y) 0)
              (set-tile! place-value x y))
          (if (> counter 0)
              (recur (u/pick-rand-int 0 WORLD-SIZE) (u/pick-rand-int 0 WORLD-SIZE) (dec counter))))))))

(defn seed-food []
	(let [WORLD-SIZE (get-config :world-size)
		  INITIAL-FOOD (get-config :initial-food)]
    (loop [x (u/pick-rand-int 0 WORLD-SIZE) y (u/pick-rand-int 0 WORLD-SIZE)
          counter INITIAL-FOOD]
      (do
        (if (= (check-tile x y) 0)
            (set-tile! 1 x y))
        (if (> counter 0)
            (recur (u/pick-rand-int 0 WORLD-SIZE) (u/pick-rand-int 0 WORLD-SIZE) (dec counter)))))))


;;SCREEN DRAWING
(defn draw-organism [uid]
    (let [TILE-SIZE (get-config :tile-size)
    	  x (get-trait uid :x) y (get-trait uid :y)
          sprite (get-trait uid :sprite) color (get-trait uid :color)]
        (cvs/draw-matrix cvs/world-canvas color (world-coord x) (world-coord y) sprite TILE-SIZE 1)))

(defn clear-sprite [x y]
    (let [TILE-SIZE (get-config :tile-size)
    	  x (world-coord x) y (world-coord y)]
    (cvs/clear-rectangle cvs/world-canvas x y (+ x TILE-SIZE) (+ y TILE-SIZE))))

(defn clear-screen []
	(let [WORLD-SIZE (get-config :world-size)]
    (cvs/clear-rectangle cvs/world-canvas 0 0 (* WORLD-SIZE 8) (* WORLD-SIZE 8))))




;;MECHANICS
(defn hit-wall [x]
	(let [WORLD-SIZE (get-config :world-size)]
    (cond
        (< x 0) 0
        (> x WORLD-SIZE) WORLD-SIZE
        :else x)))

(defn walk-drunk [x]
    (hit-wall (+ x (u/pick-rand-int -1 1))))

(defn walk-random [uid]
    (let [last-move (get-trait uid :last-move)
          row ((get-trait uid :move-matrix) last-move)
          row-total (row 0)
          roll (u/pick-rand-int 0 row-total)]
          (loop [counter 1 total 0]
              (let [cell-value (row counter)]
              (if (<= roll (+ total cell-value))
                  counter
                  (recur (inc counter) (+ total cell-value)))))))

)
(comment

(defn directed-move-x [x direction]
    (cond
        (and (>= direction 1) (<= direction 3)) (hit-wall (dec x))
        (and (>= direction 4) (<= direction 6)) (hit-wall x)
        (and (>= direction 7) (<= direction 9)) (hit-wall (inc x))))

(defn directed-move-y [y direction]
    (cond
        (or (= direction 1) (= direction 4) (= direction 7)) (hit-wall (dec y))
        (or (= direction 2) (= direction 5) (= direction 8)) (hit-wall y)
        (or (= direction 3) (= direction 6) (= direction 9)) (hit-wall (inc y))))

(defn try-move [uid] 
    (let [x (get-trait uid :x) y (get-trait uid :y)
          new-direction (walk-random uid)
          new-x (directed-move-x x new-direction) new-y (directed-move-y y new-direction)]
          (if (= (check-tile new-x new-y) 0)
              (if-not (and (= new-x x) (= new-y y))
                      (do
                        (set-tile! uid new-x new-y) ;Claim new tile
                        (set-trait! uid :x new-x)
                        (set-trait! uid :y new-y)
                        (set-tile! 0 x y) ;Tell world you've left 
                      )))))

(defn check-life [uid]
    (get-trait uid :alive))

(defn check-energy [uid]
    (if (< (get-trait uid :energy) 1)
      (do
        (set-trait! uid :alive false) 
        (set-tile! 0 (get-trait uid :x) (get-trait uid :y))
        false)
      true))

(defn use-energy [uid]
    (let [energy (get-trait uid :energy)]
        (set-trait! uid :energy (dec energy))))

(defn eat-up [uid food]
    (let [FOOD-BOOST (get-config :food-boost)
    	  energy (get-trait uid :energy) 
          energy-max (get-trait uid :energy-max)]
        (if (<= (+ FOOD-BOOST energy) energy-max)
            (set-trait! uid :energy (+ energy FOOD-BOOST))
            (set-trait! uid :energy energy-max))))

(defn find-food [uid]
    (let [WORLD-SIZE (get-config :world-size)
    	  x (get-trait uid :x) y (get-trait uid :y)
          ;Get neighboring coordinates
          coords [[(dec x) (dec y)]
                  [(dec x) y]
                  [(dec x) (inc y)]
                  [x (dec y)]
                  [x (inc y)]
                  [(inc x) (dec y)]
                  [(inc x) y]
                  [(inc x) (inc y)]]]
      (loop [counter 0]
          (if (< counter 8)
            (let [this-x (first (coords counter)) this-y (second (coords counter))]
              (if (and (and (>= this-x 0) (<= this-x WORLD-SIZE))
                       (and (>= this-y 0) (<= this-y WORLD-SIZE)))
                  (if (= (check-tile this-x this-y) 1)
                    (do
                        (set-tile! 0 this-x this-y)
                        (eat-up uid 1))
                    (recur (inc counter)))
              (recur (inc counter))))))))

)
(comment

;;NAMES
(defn generate-name []
    (let [syls (u/pick-rand-int 1 4)]
        (loop [counter syls output []]
            (if (> counter 0)
                (recur (dec counter) (conj output (d/syllables (u/pick-rand-int 0 (count d/syllables)))))
                (apply str output)))))



(defn generate-move-row []
    ;Higher values represent increasing odds of choosing
    ;Position 0 represents total of row's values
    (loop [counter 1 row []]
        (if (< counter 10)
            (recur (inc counter) (conj row (u/pick-rand-int 7 10)))
            (u/consv (reduce + row) row))))

(defn generate-move-matrix []
    ;Rows and columns represent possible movements
    ;Movements are from 1-9 (5 represents current tile)
    ;  1 2 3
    ;  4 5 6
    ;  7 8 9
    (loop [counter 1 matrix [[]]]
        (if (< counter 10)
            (recur (inc counter) (conj matrix (generate-move-row)))
            matrix)))


;;GENERATING
(defn initialize-organism [uid x y]
    (let [;x (u/pick-rand-int 10 50) y (u/pick-rand-int 10 50)  
    	  TILE-SIZE (get-config :tile-size)
          sprite (gen-org-box TILE-SIZE) 
          color [(u/pick-rand-int 0 256) (u/pick-rand-int 0 256) (u/pick-rand-int 0 256)]
          energy-max (u/pick-rand-int 80 120) energy energy-max
          title (generate-name) move-matrix (generate-move-matrix)]
    {:x x :y y :last-x x :last-y y
     :sprite sprite :color color
     :move-matrix move-matrix 
     :last-move 5
     :energy-max energy-max :energy energy
     :uid uid :alive true :name title}))

(defn deploy-organism [x y]
  (let [uid (make-uid)]
    (do
      (gen-organism! uid (initialize-organism uid x y)))))

)
(comment

;;SET DATA
(defn initialize [parameters]
	(d/initialize-world! (gen-world))
	(d/set-configuration! parameters))

(defn update-setting [k v]
	(d/update-setting! k v))

(defn set-current-time [new-time]
	(d/set-current-time! new-time))
)
