(ns new-life.world
	(:require [new-life.data :as d]
			  [new-life.matrix :as mtx]
			  [new-life.utilities :as u]
			  [new-life.canvas :as cvs]
        [new-life.console :as console]))


;;WORLD
;;  0-Empty
;;  1-10 Food
;;  100+ UIDs for organisms


;;GET INFO
(defn get-object 
  ([world coords] 
    (let [[x y] coords]
      (get-object world x y)))
  ([world x y] (get-in world [:world-map y x :object])))

(defn get-config [world param]
  (get-in world [:config param]))

(defn get-trait [world uid trait]
  (get-in world [:fauna uid trait]))

(defn find-empty-coords [world]
  (let [world-size (get-config world :world-size)]
    (loop [x (u/pick-rand-int 0 world-size)
           y (u/pick-rand-int 0 world-size)]
      (if (= (get-object world x y) 0)
          [x y]
          (recur (u/pick-rand-int 0 world-size) (u/pick-rand-int 0 world-size))))))

(defn food? [target]
  (let [target (u/unnil target)]
    (and (< target 4)
         (> target 0))))


;;WORLD
(defn gen-world-map [world-size]
  (let [tiles (into [] (repeat world-size d/blank-tile))]
    (into [] (repeat world-size tiles))))

(defn clear-tile [world x y]
  (assoc-in world [:world-map y x :object] 0))

(defn set-tile [world x y object]
  (assoc-in world [:world-map y x :object] object))


;;ORGANISMS
(defn set-trait [world uid trait value]
  (assoc-in world [:fauna uid trait] value))

(def make-uid (u/make-counter 100))

(defn initialize-organism [uid tile-size]
    (let [sprite (d/gen-org-sprite tile-size) 
          color [(u/pick-rand-int 0 255) (u/pick-rand-int 0 125) (u/pick-rand-int 0 255) 1]
          energy-max (u/pick-rand-int 80 120) energy energy-max
          title (d/generate-name) move-matrix (d/generate-move-matrix)]
    {:sprite sprite :color color
     :move-matrix move-matrix 
     :last-move 5
     :energy-max energy-max :energy energy
     :uid uid :alive true :name title}))

(defn deploy-organism [world]
  (let [uid (make-uid)
        [x y] (find-empty-coords world)
        organism (-> (initialize-organism uid (get-in world [:config :tile-size]))
                     (assoc-in [:x] x) 
                     (assoc-in [:y] y))]
      (-> world
          (assoc-in [:world-map y x :object] uid)
          (assoc-in [:fauna uid] organism))))

(defn gen-fauna [num-organisms world]
  (u/self-pipe world deploy-organism num-organisms))

(defn check-life [world uid]
    (get-trait world uid :alive))

(defn check-energy [world uid]
  (let [energy (get-trait world uid :energy)
        x (get-trait world uid :x)
        y (get-trait world uid :y)
        org-name (get-trait world uid :name)
        cur-time (:time world)
        new-world (if (and (get-trait world uid :alive) (< energy 1))
                      (do                        
                        (console/print-to-console (str "The " org-name " went extinct in round " cur-time "!"))
                        (-> world
                          (assoc-in [:fauna uid :alive] false) 
                          (assoc-in [:world-map y x] false)))
                      world)]
    new-world))

(defn use-energy [world uid]
  (update-in world [:fauna uid :energy] dec))


(defn find-nearby [world-map x y pred?]
  "Looks at immediate neighbors of a coordinate
   to see if one satisfies pred.  
   Returns the first target found along with its
   coordinates (in a vector of the form [x y]."
  (let [neighbors (into [] (mtx/flat-neighborhood world-map x y 1))]
    (loop [counter 0]
      (if (< counter 9)
        (if (pred? (neighbors counter))
            (vector (neighbors counter) (mtx/flat->coord x y counter))
            (recur (inc counter)))
        false))))

(defn eat-up [world uid]
    (let [FOOD-BOOST (get-config world :food-boost)
          energy (get-trait world uid :energy) 
          energy-max (get-trait world uid :energy-max)
          new-energy (if (<= (+ FOOD-BOOST energy) energy-max)
                         (+ energy FOOD-BOOST)
                         energy-max)]
      (assoc-in world [:fauna uid :energy] new-energy)))

(defn find-food [world uid]
  (let [WORLD-SIZE (get-config world :world-size)
        x (get-trait world uid :x) 
        y (get-trait world uid :y)
        world-map (:world-map world)
        object-matrix (into [] (map #(into [] (map :object %)) world-map)) 
        ;neighbors (mtx/flat-neighborhood object-matrix x y 1)
        food (find-nearby object-matrix x y food?)]
    (if food
      (let [target (first food)
            [x y] (second food)]
        (-> world
            (clear-tile x y)
            ;(eat-up uid)
            ))
      world)))  


;;MOVEMENT
(defn hit-wall [world x]
  (let [WORLD-SIZE (get-config world :world-size)]
    (cond
      (< x 0) 0
      (> x WORLD-SIZE) WORLD-SIZE
      :else x)))

(defn walk-drunk [world x]
  (hit-wall world (+ x (u/pick-rand-int -1 1))))

(defn walk-random [world uid]
  (let [last-move (get-trait world uid :last-move)
        row ((get-trait world uid :move-matrix) last-move)
        row-total (row 0)
        roll (u/pick-rand-int 0 row-total)]
    (loop [counter 1 total 0]
      (let [cell-value (row counter)]
        (if (<= roll (+ total cell-value))
            counter
            (recur (inc counter) (+ total cell-value)))))))

(defn directed-move-x [world x direction]
  (cond
    (or (= direction 1) (= direction 4) (= direction 7)) (hit-wall world (dec x))
    (or (= direction 2) (= direction 5) (= direction 8)) (hit-wall world x)
    (or (= direction 3) (= direction 6) (= direction 9)) (hit-wall world (inc x))))

(defn directed-move-y [world y direction]
  (cond
    (and (>= direction 1) (<= direction 3)) (hit-wall world (dec y))
    (and (>= direction 4) (<= direction 6)) (hit-wall world y)
    (and (>= direction 7) (<= direction 9)) (hit-wall world (inc y))))

(defn try-move [world uid] 
  (let [x (get-trait world uid :x) 
        y (get-trait world uid :y)
        new-direction (walk-random world uid)
        new-x (directed-move-x world x new-direction) 
        new-y (directed-move-y world y new-direction)
        object (get-object world new-x new-y)]
    (if (and (= object 0)
             (or (not (= new-x x)) 
             (not (= new-y y))))
        (-> world
          (set-tile new-x new-y uid) ;Claim new tile
          (set-trait uid :x new-x)
          (set-trait uid :y new-y)
          (clear-tile x y));Tell world you've left 
        world)))


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
        WORLD-SIZE (:world-size config)
        [x y] (u/rand-pair 0 WORLD-SIZE)]
    (if (= (get-object world x y) 0)
      (let [FOOD-RANGE (:food-range config)
            world-map (:world-map world)
            place-value (d/plant-vitality (food-plenty world-map x y FOOD-RANGE))]
        (if (>= (u/pick-rand-int 1 place-value) place-value)   ;;Healthier plants more likely to grow
            (assoc-in world [:world-map y x :object] place-value)
            world))
      world)))

(defn grow-food [world]
  (let [food-rate (get-in world [:config :food-rate])
        times (get-in world [:config :food-amount])]
    (if (< (u/pick-rand-int 0 100) food-rate)
      (u/self-pipe world sprout-food times)
      world)))
        
(defn seed-food [world]
  (let [config (:config world)
        WORLD-SIZE (:world-size config)
        INITIAL-FOOD (:initial-food config)
        possible-coords (u/rand-pairs 0 WORLD-SIZE)]
    (some #(if (= (get-object world %) 0)
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
