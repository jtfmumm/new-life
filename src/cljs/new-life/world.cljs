(ns new-life.world
	(:require [new-life.data :as d]
			  [new-life.matrix :as mtx]
			  [new-life.utilities :as u]
			  [new-life.canvas :as cvs]))


;;WORLD
;;  0-Empty
;;  1-10 Food
;;  100+ UIDs for organisms


;;GET INFO
(defn get-object 
  ([coords world-map] 
    (let [[x y] coords]
      (get-object x y world-map)))
  ([x y world-map] (:object ((world-map y) x))))

(defn find-empty-coords [world]
  (let [world-size (get-in world [:config :world-size])
        world-map (:world-map world)]
    (loop [x (u/pick-rand-int 0 world-size)
           y (u/pick-rand-int 0 world-size)]
      (if (= (get-object x y world-map) 0)
          [x y]
          (recur (u/pick-rand-int 0 world-size) (u/pick-rand-int 0 world-size))))))


;;WORLD
(defn gen-world-map [world-size]
  (let [tiles (into [] (repeat world-size d/blank-tile))]
    (into [] (repeat world-size tiles))))


;;ORGANISMS
(def make-uid (u/make-counter 100))

(defn initialize-organism [uid tile-size]
    (let [sprite (d/gen-org-sprite tile-size) 
          color [(u/pick-rand-int 0 255) (u/pick-rand-int 0 125) (u/pick-rand-int 0 255) 1]
          energy-max (u/pick-rand-int 80 120) energy energy-max
          title (d/generate-name) move-matrix (d/generate-move-matrix)]
    {:coords {:x -1 :y -1}
     :sprite sprite :color color
     :move-matrix move-matrix 
     :last-move 5
     :energy-max energy-max :energy energy
     :uid uid :alive true :name title}))

(defn deploy-organism [world]
  (let [uid (make-uid)
        [x y] (find-empty-coords world)
        organism (-> (initialize-organism uid (get-in world [:config :tile-size]))
                     (assoc-in [:coords :x] x) 
                     (assoc-in [:coords :y] y))]
      (-> world
          (assoc-in [:world-map y x :object] uid)
          (assoc-in [:fauna uid] organism))))

(defn gen-fauna [num-organisms world]
  (u/self-pipe world deploy-organism num-organisms))


;;FOOD
(defn initialize-food [world]
  (update-in world [:fauna] assoc 
    1 (d/food-template 1)
    2 (d/food-template 2)
    3 (d/food-template 3)))

(defn food-plenty [world-map x y rang]
  (let [object-matrix (into [] (map #(into [] (map :object %)) world-map))
        neighbors (mtx/neighborhood object-matrix x y rang)]
    (reduce + (map #(d/food-value %) (flatten neighbors)))))

(defn sprout-food [world]
  (let [config (:config world)
        world-map (:world-map world)
        WORLD-SIZE (:world-size config)
        FOOD-RANGE (:food-range config)
        [x y] (u/rand-pair 0 WORLD-SIZE)
        place-value (d/plant-vitality (food-plenty world-map x y FOOD-RANGE))]
    (if (= (get-object x y world-map) 0)
      (if (>= (u/pick-rand-int 1 place-value) place-value)   ;;Healthier plants more likely to grow
          (assoc-in world [:world-map x y :object] place-value)
          world)
      world)))

(defn grow-food [world]
  (let [food-rate (get-in world [:config :food-rate])
        times (get-in world [:config :food-amount])]
    (if (< (u/pick-rand-int 0 100) food-rate)
      (u/self-pipe world sprout-food times)
      world)))
        
(defn seed-food [world]
  (let [config (:config world)
        world-map (:world-map world)
        WORLD-SIZE (:world-size config)
        INITIAL-FOOD (:initial-food config)
        possible-coords (u/rand-pairs 0 WORLD-SIZE)]
    (some #(if (= (get-object % world-map) 0)
              (assoc-in world [:world-map (first %) (second %) :object] 1)) 
          possible-coords)))

(defn gen-food [world]
  (let [times (get-in world [:config :initial-food])]
    (u/self-pipe world seed-food times)))


;;DRAWING
(defn draw-tile [x y tile & f-args]
  (let [[tile-size world] f-args
        x (* tile-size x) y (* tile-size y)
        uid (:object tile) object (get-in world [:fauna uid]) 
        color (:color object)
        sprite (:sprite object)]
    (if-not (= sprite nil)
      (cvs/draw-color-matrix sprite
        :x x :y y :size tile-size :color color :ctx cvs/world-foreground))))

(defn draw-world [world]
  (let [world-map (:world-map world)
        tile-size (get-in world [:config :tile-size])]
  (mtx/walk-matrix-by-coordinates draw-tile world-map tile-size world)))

(defn draw-tile-background [x y tile & f-args]
  (let [[tile-size sprite] f-args
        x (* tile-size x) y (* tile-size y)
        color (d/tile-colors (:type tile))]
    (cvs/draw-color-matrix sprite
      :x x :y y :size tile-size :color color :ctx cvs/world-background)))

(defn draw-world-background [world]
  (let [world-map (:world-map world)
        tile-size (get-in world [:config :tile-size])
        sprite (d/background-sprite tile-size)]
    (mtx/walk-matrix-by-coordinates draw-tile-background world-map tile-size sprite)))

(defn clear-screen [config]
  (let [WORLD-SIZE (:world-size config)
        TILE-SIZE (:tile-size config)]
    (cvs/clear-rectangle cvs/world-foreground 0 0 (* WORLD-SIZE TILE-SIZE) (* WORLD-SIZE TILE-SIZE))))
  


  
  
  
  
  
  
  
  
  
  
  
  
  
  
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



;;ORGANISMS
(defn list-uids []
    (d/list-uids))

(def make-uid (u/make-counter 100))


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


;;SCREEN DRAWING
(defn draw-organism [uid]
    (let [TILE-SIZE (get-config :tile-size)
    	  x (get-trait uid :x) y (get-trait uid :y)
          sprite (get-trait uid :sprite) color (get-trait uid :color)]
        (cvs/draw-matrix cvs/world-foreground color (world-coord x) (world-coord y) sprite TILE-SIZE 1)))

(defn clear-sprite [x y]
    (let [TILE-SIZE (get-config :tile-size)
    	  x (world-coord x) y (world-coord y)]
    (cvs/clear-rectangle cvs/world-foreground x y (+ x TILE-SIZE) (+ y TILE-SIZE))))






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







;;GENERATING



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
