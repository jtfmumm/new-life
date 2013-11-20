(ns new-life.world
	(:require [new-life.data :as d]
			  [new-life.matrix :as mtx]
        [new-life.math :as mth]
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
  ([world x y] (get-in world [:world-map y x])))

(defn get-config [world param]
  (get-in world [:config param]))

(defn get-trait [world uid trait]
  (get-in world [:fauna uid trait]))

(defn get-sense [world uid trait]
  (get-in world [:fauna uid :senses trait]))

(defn get-pref [world uid trait]
  (get-in world [:fauna uid :prefs trait]))

(defn get-name [world uid]
  (let [rawname (get-in world [:fauna uid :name])
        genus (first rawname)
        species (second rawname)
        fullname (apply str (flatten [genus " " species]))]
  fullname))

(defn format-name [title]
  (let [rawname title
        genus (first rawname)
        species (second rawname)
        fullname (apply str (flatten [genus " " species]))]
  fullname))

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

(defn blank? [target]
  (= target 0))

(defn organism? [target]
  (> target 100))

(defn plains? [target]
  (= target :plains))

(defn forest? [target]
  (= target :forest))

(defn hills? [target]
  (= target :hills))

(defn river? [target]
  (= target :river))

(defn lake? [target]
  (= target :lake))


;;WORLD
(defn gen-world-map [world-size]
  (let [tiles (into [] (repeat world-size 0))]
    (into [] (repeat world-size tiles))))

(defn gen-world-tile-types [world-size]
  (let [tiles (into [] (repeat world-size :plains))]
    (into [] (repeat world-size tiles))))

(defn clear-tile [world x y]
  (assoc-in world [:world-map y x] 0))

(defn set-tile [world x y object]
  (assoc-in world [:world-map y x] object))


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
     :uid uid :alive true :name title
     :senses {:vision 3 :hearing 2 :smell 2}
     :prefs {:food 5 :organism 0}
     :birthdate 0 :parent [["eve"] []]}))

(defn deploy-organism [world]
  (let [uid (make-uid)
        [x y] (find-empty-coords world)
        organism (-> (initialize-organism uid (get-in world [:config :tile-size]))
                     (assoc-in [:x] x) 
                     (assoc-in [:y] y))]
      (-> world
          (assoc-in [:world-map y x] uid)
          (assoc-in [:fauna uid] organism))))

(defn birth-organism [world organism x y]
  (let [uid (:uid organism)]
    (-> world
        (assoc-in [:world-map y x] uid)
        (assoc-in [:fauna uid] organism)
        (assoc-in [:fauna uid :x] x)
        (assoc-in [:fauna uid :y] y))))

(defn gen-fauna [num-organisms world]
  (u/self-pipe world deploy-organism num-organisms))

(defn check-life [world uid]
    (get-trait world uid :alive))

(defn check-energy [world uid]
  (let [energy (get-trait world uid :energy)
        x (get-trait world uid :x)
        y (get-trait world uid :y)
        org-name (get-name world uid)
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
  (let [neighbors (into [] (mtx/flat-neighborhood world-map x y 1))
        poss-moves 9]
    (loop [counter 0]
      (if (< counter poss-moves)
        (if (pred? (neighbors counter))
            (vector (neighbors counter) (mtx/flat->coords x y counter))
            (recur (inc counter)))
        false))))

(defn eat-up [world uid target]
    (let [target-val (d/food-value target)
          FOOD-BOOST (* target-val (get-config world :food-boost))          
          energy (get-trait world uid :energy) 
          energy-max (get-trait world uid :energy-max)
          new-energy (if (<= (+ FOOD-BOOST energy) energy-max)
                         (mth/ceil (+ energy FOOD-BOOST))
                         energy-max)]
      (assoc-in world [:fauna uid :energy] new-energy)))

(defn find-food [world uid]
  (let [WORLD-SIZE (get-config world :world-size)
        x (get-trait world uid :x) 
        y (get-trait world uid :y)
        world-map (:world-map world) 
        food (find-nearby world-map x y food?)]
    (if food
      (let [target (first food)
            [x y] (second food)]
        (-> world
            (clear-tile x y)
            (eat-up uid target)
            ))
      world)))  


;;STRATEGY
(defn hit-wall [world x]
  (let [WORLD-SIZE (get-config world :world-size)]
    (cond
      (< x 0) 0
      (> x WORLD-SIZE) WORLD-SIZE
      :else x)))

(defn cardinal-hit-wall [world coords]
  (let [x (first coords) y (second coords)]
    [(hit-wall world x) (hit-wall world y)]))

(defn walk-cardinal [world coords]
  (let [direction (u/pick-rand-int 0 4)
        transform (d/cardinal-directions direction)]
    (cardinal-hit-wall world (mth/add-pairs coords transform))))


(defn grab-targets-from-region [region target]
  (filter #(= (:object %) target) region))

(defn calculate-target-value [region target]
  (reduce + (map :nearness (grab-targets-from-region region target))))

(defn calculate-region-value [region]
  (let [distinct-targets (set (map :object region))]
    (reduce + (map #(calculate-target-value region %) distinct-targets))))

#_(defn all-calculate-region [region]
  (let [targets [food? organism?]]
    (reduce + (map #(calculate-region-value region %) targets))))

(defn count-region [region target?]
  "Takes a vector and counts the number of targets
  in that vector."
  (count (filter target? region)))

(defn all-count-region [region]
  (let [targets [food? organism?]]
    (reduce + (map #(count-region region %) targets))))

(defn get-region [neighbors]
  "Returns a vector containing all the objects in the
  top triangular region of the input matrix.  Each
  object is represented as a map containing: 
    1) the object id 
    2) the nearness value (the inverse of the object's 
        proximity to the base location).

  Take the following matrix.  The values mark out the 
  top triangular region and represent the proximity
  of the corresponding location.  The x represents the base
  location: 
  
  3 3 3 3 3 3 3
  0 2 2 2 2 2 0
  0 0 1 1 1 0 0
  0 0 0 x 0 0 0
  0 0 0 0 0 0 0
  0 0 0 0 0 0 0
  0 0 0 0 0 0 0"

  (let [rds (mth/floor (/ (count neighbors) 2))]
    (loop [counter 0 
           proximity rds
           region []]
      (if (< counter rds)
        (let [start counter
              end (- (count neighbors) counter)]
          (recur (inc counter) 
                 (dec proximity) 
                 (u/flat-vec (conj region 
                    (map #(assoc {} :object % :nearness (/ 1 proximity))
                       (subvec (neighbors counter) start end))))))
        region))))

(defn neighbor-regions [neighbors]
  "Returns a map of vectors containing objects in the 
  four triangular quadrants, respectively."
    {:north (get-region neighbors)
     :west (get-region (mtx/rotate-matrix neighbors))
     :south (get-region (mtx/rotate-matrix (mtx/rotate-matrix neighbors)))
     :east (get-region (mtx/rotate-matrix (mtx/rotate-matrix (mtx/rotate-matrix neighbors))))})

(defn top-choice [values]
  (cond
    (u/equal-map? values) (u/pick-rand-item [:north :south :east :west])
    (u/map-max-key values) (u/map-max-key values) 
    :else (u/pick-rand-item (into [] (u/max-keys values)))))

(defn weight-neighbors [neighbors prefs]
  (let [regions (neighbor-regions neighbors)
        north (:north regions)
        south (:south regions)
        east (:east regions)
        west (:west regions)]
    (do
      (.log js/console (str north south east west))
      (top-choice
       {:north (calculate-region-value north)
        :south (calculate-region-value south)
        :east (calculate-region-value east)
        :west (calculate-region-value west)}))))

(defn make-choice [world uid]
  (let [vision (get-sense world uid :vision)
        prefs (get-trait world uid :prefs)
        x (get-trait world uid :x) y (get-trait world uid :y)
        neighbors (mtx/neighborhood (:world-map world) x y vision)
        weighting (weight-neighbors neighbors prefs)
        roll (u/pick-rand-int 0 100)]
    (case weighting
      :north [x (dec y)]
      :south [x (inc y)]
      :east [(inc x) y]
      :west [(dec x) y])))


;;MOVEMENT
(defn walk-drunk [world x]
  (hit-wall world (+ x (u/pick-rand-int -1 1))))

(defn walk-random [world uid]
  (let [last-move (get-trait world uid :last-move)
        row ((get-trait world uid :move-matrix) last-move)
        row-total (row 0)
        roll (u/pick-rand 0 row-total)]
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
        ;new-direction (walk-random world uid)
        ;new-x (directed-move-x world x new-direction) 
        ;new-y (directed-move-y world y new-direction)
        new-coords (hit-wall world (make-choice world uid));(walk-cardinal world [x y])
        new-x (first new-coords)
        new-y (second new-coords)
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
  (let [neighbors (mtx/neighborhood world-map x y rang)]
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
            (assoc-in world [:world-map y x] place-value)
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
              (assoc-in world [:world-map (first %) (second %)] 1)) 
          possible-coords)))

(defn gen-food [world]
  (let [times (get-in world [:config :initial-food])]
    (u/self-pipe world seed-food times)))


;;REPRODUCTION
(defn mutate-trait [trait]
  false)

(defn mutate-sprite [sprite]
  sprite)

(defn mutate-color [color]
  (let [[r g b a] color
        r (mth/bounds 0 255 (+ r (mth/round (u/pick-norm-dist 0 10))))
        g (mth/bounds 0 255 (+ g (mth/round (u/pick-norm-dist 0 10))))
        b (mth/bounds 0 255 (+ b (mth/round (u/pick-norm-dist 0 10))))]
    [r g b a]))

(defn mutate-energy-max [energy-max]
  (+ energy-max (mth/abs (mth/round (u/pick-norm-dist 0 1)))))

(defn mutate-name [title]
  (let [genus (first title)
        species (second title)
        syls (count species)
        pick (u/pick-rand-int 0 (dec syls))]
    (if (= syls 1)
      [genus (conj species (d/get-syllable))]
      (if (> syls 5)
        [genus (subvec species 0 (dec syls))]
        (let [mutation (u/pick-rand-int -1 1)]
          (cond 
            (= mutation 0) [genus (assoc species pick (d/get-syllable))]
            (= mutation 1) [genus (conj species (d/get-syllable))]
            (= mutation -1) [genus (subvec species 0 (dec syls))]))))))

(defn mutate-move-matrix [move-matrix]
  move-matrix)

(defn mutate-organism [world uid]
  (let [parent (get-in world [:fauna uid])
        new-uid (make-uid)
        sprite (:sprite parent) 
        color (:color parent)
        energy-max (:energy-max parent) energy energy-max
        title (:name parent) 
        move-matrix (:move-matrix parent)
        birthdate (:time world)]
    {:sprite (mutate-sprite sprite) 
     :color (mutate-color color)
     :move-matrix (mutate-move-matrix move-matrix) 
     :last-move 5
     :energy-max (mutate-energy-max energy-max) :energy energy
     :uid new-uid :alive true 
     :name (mutate-name title)
     :birthdate birthdate :parent title}))

(defn try-reproduce [world uid]
  (if (u/roll-against (get-in world [:config :reproduction-rate]))
      (let [organism (mutate-organism world uid)
            par-x (get-trait world uid :x)
            par-y (get-trait world uid :y)
            energy (get-trait world uid :energy)
            reproduction-cost (get-config world :reproduction-cost)]
        (if-let [found (find-nearby (:world-map world) par-x par-y blank?)]
          (let [[x y] (second found)]
            (-> world
                (birth-organism organism x y)
                (assoc-in [:fauna uid :energy] (- energy reproduction-cost))))
          world))
      world))  


;;DRAWING
(defn draw-tile [x y tile & f-args]
  (let [[tile-size world] f-args
        x (* tile-size x) y (* tile-size y)
        uid tile object (get-in world [:fauna uid]) 
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
        color (d/tile-colors tile)]
    (cvs/draw-color-matrix sprite
      :x x :y y :size tile-size :color color :ctx cvs/world-background)))

(defn draw-world-background [world]
  (let [tile-types (:tile-types world)
        tile-size (get-in world [:config :tile-size])
        sprite (d/background-sprite tile-size)]
    (mtx/walk-matrix-by-coordinates draw-tile-background tile-types tile-size sprite)))

(defn clear-screen [config]
  (let [WORLD-SIZE (:world-size config)
        TILE-SIZE (:tile-size config)]
    (cvs/clear-rectangle cvs/world-foreground 0 0 (* WORLD-SIZE TILE-SIZE) (* WORLD-SIZE TILE-SIZE))))
