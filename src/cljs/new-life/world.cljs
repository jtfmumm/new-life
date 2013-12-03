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

(defn get-genus [world uid]
  (first (get-in world [:fauna uid :name])))

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

(defn hungry? [world uid]
  (let [org (get-in world [:fauna uid])
        energy-max (:energy-max org)
        energy (:energy org)]
    (if (< energy (- energy-max 30))
        true
        false)))

(defn non-kin? [world target uid]
  (let [target (u/unnil target)]
    (if (> target 100)
      (let [genus (get-genus world uid)
            other-genus (get-genus world target)] 
        (if (= other-genus genus) false true))
      false)))  


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
          energy-max (mth/floor (u/pick-norm-dist 100 5)) energy energy-max
          title (d/generate-name) move-matrix (d/generate-move-matrix)
          leap-odds (u/pick-norm-dist 1 0.25)
          hunger-count (mth/abs (mth/round (u/pick-norm-dist 35 10)))
          hunger-wander (mth/abs (mth/round (u/pick-norm-dist 5 2)))
          hunger-wander-odds (mth/abs (u/pick-norm-dist 50 15))]
    {:sprite sprite :color color
     :move-matrix move-matrix 
     :last-move 5
     :energy-max energy-max :energy energy
     :uid uid :alive true :name title
     :senses {:vision 4 :hearing 2 :smell 2}
     :strength (mth/round (u/pick-norm-dist 50 5))
     :prefs {:food 4 
             :kin 0 
             :non-kin (u/pick-rand-item [-3 3])
             :shadow-prey (u/pick-norm-dist 0 2)}
     :birthdate 0 :parent [["eve"] []]
     :sequence [] 
     :hunger-count-max hunger-count 
     :hunger-count hunger-count 
     :hunger-wander hunger-wander
     :hunger-wander-odds hunger-wander-odds
     :leap-odds leap-odds :leap-length 12
     :rest-max 7 :rest-counter (u/pick-rand-int 6 10)
     :evasion (u/pick-norm-dist 2 1)
     :marker [(u/pick-rand-int 0 10000) (u/pick-rand-int 0 10000) (u/pick-rand-int 0 10000)]}))

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
                        ;(console/print-to-console (str "The " org-name " went extinct in round " cur-time "!"))
                        (-> world                          
                          (assoc-in [:fauna uid :alive] false) 
                          (assoc-in [:world-map y x] 0)))
                      world)]
    new-world))

(defn use-energy [world uid]
  (let [rest-counter (get-in world [:fauna uid :rest-counter])]
    (if-not (= rest-counter 0)
      (update-in world [:fauna uid :energy] dec)
      world)))


(defn find-nearby [world-map x y pred?]
  "Looks at immediate neighbors of a coordinate
   to see if one satisfies pred.  
   Returns the first target found along with its
   coordinates (in a vector of the form [x y] if found.
   Otherwise, returns false."
  (let [neighbors (into [] (mtx/flat-neighborhood world-map x y 1))
        poss-moves 9]
    (loop [counter 0]
      (if (< counter poss-moves)
        (if (pred? (neighbors counter))
            (vector (neighbors counter) (mtx/flat->coords x y counter))
            (recur (inc counter)))
        false))))

(defn find-nearby-prey [world x y uid]
  "Looks at immediate neighbors of a coordinate
   to see if one satisfies pred.  
   Returns the first target found along with its
   coordinates (in a vector of the form [x y] if found.
   Otherwise, returns false."
  (let [world-map (:world-map world)
        neighbors (into [] (mtx/flat-neighborhood world-map x y 1))
        poss-moves 9]
    (loop [counter 0]
      (if (< counter poss-moves)
        (if (non-kin? world (neighbors counter) uid)
            (vector (neighbors counter) (mtx/flat->coords x y counter))
            (recur (inc counter)))
        false))))

(defn eat-up [world uid target]
    (let [target-val (d/food-value target)
          carnivorous (get-trait world uid :non-kin)
          FOOD-BOOST (if (> carnivorous 0)
                        (* target-val (mth/round (/ (get-config world :food-boost) 2)))
                        (* target-val (get-config world :food-boost)))          
          energy (get-trait world uid :energy) 
          energy-max (get-trait world uid :energy-max)
          new-energy (if (<= (+ FOOD-BOOST energy) energy-max)
                         (mth/ceil (+ energy FOOD-BOOST))
                         energy-max)
          sequence (get-trait world uid :sequence)]
      (-> world
          (assoc-in [:fauna uid :energy] new-energy)
          (assoc-in [:fauna uid :hunger-count] (get-trait world uid :hunger-count-max))
          (assoc-in [:fauna uid :sequence] (flatten (u/consv [0 0 0 0] sequence))))))

(defn find-food [world uid]
  (let [x (get-trait world uid :x) 
        y (get-trait world uid :y)
        world-map (:world-map world) 
        food (find-nearby world-map x y food?)]
    (if food
      (let [target (first food)
            [x y] (second food)]
        (if (hungry? world uid)
          (-> world
              (clear-tile x y)
              (eat-up uid target))
          world))
      world)))  

(defn check-hunger [world uid]
  (let [hunger-amount (get-trait world uid :hunger-wander)
        odds (get-trait world uid :hunger-wander-odds)
        sequence (get-trait world uid :sequence)]
  (if (<= (get-trait world uid :hunger-count) 0)
    (if (u/roll-against odds)
      (-> world 
          (assoc-in [:fauna uid :sequence] (flatten (conj sequence (vec (repeat hunger-amount (u/pick-rand-int 1 4))))))
          (assoc-in [:fauna uid :hunger-count] (+ hunger-amount (get-trait world uid :hunger-count-max))))
      (assoc-in world [:fauna uid :hunger-count] (get-trait world uid :hunger-count-max)))
    (update-in world [:fauna uid :hunger-count] dec))))

(defn attack [world uid target]
  (if (> target 100)
    (loop [world world]
      (if (<= (u/pick-variation (mth/round (/ (get-trait world target :evasion) 2)))
              0)
        (if-not (> (get-in world [:fauna uid :energy]) 0)
          world ;;The aggressor is killed      
          (let [aggressor (get-name world uid)
                energy (get-trait world uid :energy)
                energy-max15 (mth/round (* 1.5 (get-trait world uid :energy-max)))
                energy-max (get-trait world uid :energy-max)
                prey (get-name world target)
                strength (get-in world [:fauna uid :strength])
                prey-strength (get-in world [:fauna target :strength])
                damage strength ;(u/pick-rand-int 0 strength)
                reply (mth/round (/ prey-strength 2))
                new-world (-> world
                              (update-in [:fauna target :energy] - damage))
                potential (mth/round (get-in world [:fauna target :energy-max]))]
            (if-not (> (get-in new-world [:fauna target :energy]) 0)
                    (do
                      (console/print-to-console (str "The " prey " was killed by the " aggressor " in round " (:time world) "!"))
                      (let [energy (get-trait world uid :energy)
                            new-world (assoc-in new-world [:fauna target :energy] 0)]
                        (if (> (+ potential energy) energy-max)
                          (-> new-world
                              (assoc-in [:fauna uid :hunger-count] (get-trait world uid :hunger-count-max))
                              (assoc-in [:fauna uid :energy] energy-max))
                          (-> new-world
                              (assoc-in [:fauna uid :hunger-count] (get-trait world uid :hunger-count-max))
                              (update-in [:fauna uid :energy] + potential)))))
                    (recur 
                      (-> new-world
                          (update-in [:fauna uid :energy] - reply))))))
        (assoc-in world [:fauna target :sequence] 
          (u/consv 
            (repeat 10 4 #_(u/pick-rand-int 1 4)) 
            (get-trait world target :sequence)))))
    world))

(defn find-prey [world uid]
  (if (> (get-in world [:fauna uid :prefs :non-kin]) 0) ;;ALMOSTSURE THING ;(> (u/pick-variation (get-in world [:fauna uid :non-kin])) 0)
    (let [x (get-trait world uid :x) 
          y (get-trait world uid :y)
          world-map (:world-map world) 
          prey (find-nearby-prey world x y uid)
          ]
      (if prey
        (let [target (first prey)]
          (if (hungry? world uid)
            (-> world
                (attack uid target))
            world))
        world))
    world)) 


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


(defn evaluate-food [world uid food-type total]
  (let [attitude (get-in world [:fauna uid :prefs :food])]
    (if (hungry? world uid)
      (* total (/ (u/pick-variation attitude) food-type))
      0)))

(defn grab-targets-from-region [region target]
  (filter #(= (:object %) target) region))

(defn value-by-preference [world object type uid]
  (let [value (:nearness object)
        prefs (get-trait world uid :prefs)
        genus (get-genus world uid)]
    (cond 
      (= type 0) 0
      (u/btwn? type 0 4) (evaluate-food world uid type value)
      (> type 100) 
        (let [other-genus (get-genus world type)] 
          (if (= other-genus genus)
            (if (> (mth/round (u/pick-variation (/ (:kin prefs) 10))) 0)
                (* value (u/pick-variation (:kin prefs)))
                0)
            (if (> (:non-kin prefs) 0)
              (if (hungry? world uid)
                (* value (u/pick-variation (+ 2 (:non-kin prefs)))) 
                (* value (u/pick-variation (:shadow-prey prefs))))
              (* value (* 2 (:non-kin prefs))))))
      )))

(defn calculate-target-value [world region target uid]
  (reduce + (map #(value-by-preference world % target uid) (grab-targets-from-region region target))))

(defn calculate-region-value [world region uid]
  (let [distinct-targets (set (map :object region))]
    (reduce + (map #(calculate-target-value world region % uid) distinct-targets))))

(defn count-region [region target?]
  "Takes a vector and counts the number of targets
  in that vector."
  (count (filter target? region)))

(defn get-region [neighbors direction]
  (let [radius (int (mth/floor (/ (count neighbors) 2)))
        dir-radius (case direction
                      :north (- radius)
                      :east radius
                      :south radius
                      :west (- radius))
        axis (case direction
                :north "y"
                :east "x"
                :south "y"
                :west "x")
        indices (mtx/indices-by-region dir-radius axis)
        center [(mth/abs radius) (mth/abs radius)]]
    (vec (mapcat (fn [idx-vec counter] 
                    (map (fn [rel-coords]
                            (let [[x y] (mth/add-pairs center rel-coords)]
                              {:object ((neighbors y) x) :nearness (/ 1 (inc counter))}))
                         idx-vec))
                 indices (range)))))
           
  ;Use range from 0 to radius for indices

(defn get-region-old [neighbors]
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
    {:north (get-region neighbors :north)
     :west (get-region neighbors :west)
     :south (get-region neighbors :south)
     :east (get-region neighbors :east)})

(defn top-choice [values]
  (cond
    (u/equal-map? values) (u/pick-rand-item [:north :south :east :west])
    (u/map-max-key values) (u/map-max-key values) 
    :else (u/pick-rand-item (into [] (u/max-keys values)))))

(defn weight-neighbors [world neighbors uid]
  (let [regions (neighbor-regions neighbors)
        north (:north regions)
        south (:south regions)
        east (:east regions)
        west (:west regions)]
    (top-choice
     {:north (calculate-region-value world north uid)
      :south (calculate-region-value world south uid)
      :east (calculate-region-value world east uid)
      :west (calculate-region-value world west uid)})))

(defn make-choice [world uid]
  (let [vision (get-sense world uid :vision)
        x (get-trait world uid :x) y (get-trait world uid :y)
        neighbors (mtx/neighborhood (:world-map world) x y vision)
        weighting (weight-neighbors world neighbors uid)
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
        sequence (get-trait world uid :sequence)
        leap-odds (get-trait world uid :leap-odds)
        rest-counter (get-trait world uid :rest-counter)
        rest-amount (get-trait world uid :rest-amount)
        new-coords 
          (if (seq sequence)
              (mth/add-pairs [x y] (d/cardinal-directions (first sequence)))
              (hit-wall world (make-choice world uid)));(walk-cardinal world [x y])
        new-x (first new-coords)
        new-y (second new-coords)
        object (get-object world new-x new-y)]
    (if (= rest-counter 0)
      (assoc-in world [:fauna uid :sequence] (u/consv 0 sequence))
      (if (= 1 2) ;;IMPOSSIBLE
        (let [leap (u/pick-rand-int 1 4)]
          (assoc-in world [:fauna uid :sequence] 
            (flatten (conj sequence 
                           (vec (repeat (get-trait world uid :leap-length) leap))))))
        (if (and (= object 0)
                 (or (not (= new-x x)) 
                 (not (= new-y y))))
          (-> world
              (set-tile new-x new-y uid) ;Claim new tile
              (set-trait uid :x new-x)
              (set-trait uid :y new-y)
              (clear-tile x y));Tell world you've left 
          world))
      world)))

(defn update-sequence [world uid]
  (let [sequence (get-trait world uid :sequence)]
    (if (seq sequence)
        (assoc-in world [:fauna uid :sequence] (into [] (rest sequence)))
        world)))

(defn update-rest-counter [world uid]
  (let [rest-counter (get-trait world uid :rest-counter)
        rest-max (get-trait world uid :rest-max)]
    (if (> rest-counter -1)
      (update-in world [:fauna uid :rest-counter] dec)
      (assoc-in world [:fauna uid :rest-counter] rest-max))))


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
(defn comp-markers [old-marker new-marker]
  (let [x (- (first old-marker) (first new-marker))
        y (- (second old-marker) (second new-marker))
        z (- (first (rest (rest old-marker))) (first (rest (rest new-marker))))]
  (mth/sqrt (+ (* x x) (* y y) (* z z))))) ;;3-dimensional Euclidean distance

(defn mutate-trait [trait]
  false)

(defn mutate-sprite [sprite]
  (let [tile-size (count sprite)
        edge (- tile-size 2)
        pick-x (u/pick-rand-int 1 edge) 
        pick-y (u/pick-rand-int 1 edge)
        found (find-nearby sprite pick-x pick-y #(= % 1))]
  (if found
    (let [neighbor (u/pick-rand-int 0 8)
          transform (d/neighbors neighbor)
          new-spot (d/sprite-edge sprite (mth/add-pairs (second found) transform))
          [x y] new-spot
          new-pixel (if (= ((sprite y) x) 0) 1 0)] 
      (assoc-in sprite [y x] new-pixel))
    sprite)))

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

(defn mutate-prefs [prefs]
  (let [food (mth/abs (mth/round (u/pick-norm-dist 0 1)))
        kin (mth/round (u/pick-norm-dist 0 1))
        non-kin (mth/round (u/pick-norm-dist 0 1))
        ]
    {:food (+ (:food prefs) food)
     :kin (+ (:kin prefs) kin)
     :non-kin (+ (:non-kin prefs) non-kin)
     :shadow-prey (mth/round (+ (:shadow-prey prefs) (u/pick-norm-dist 0 1)))
     }))

(defn mutate-leap-odds [leap-odds]
  (+ leap-odds (u/pick-norm-dist 0 0.25)))

(defn mutate-leap-length [leap-length]
  (mth/abs (+ leap-length (mth/round (u/pick-norm-dist 0 0.5)))))

(defn mutate-rest-max [rest-max]
  (mth/abs (+ rest-max (mth/round (u/pick-norm-dist 0 1)))))

(defn mutate-strength [strength]
  (mth/abs (+ strength (mth/round (u/pick-norm-dist 0 1)))))

(defn mutate-move-matrix [move-matrix]
  move-matrix)

(defn mutate-marker [marker]
  (map #(+ % (u/pick-norm-dist 0 10)) marker))

(defn mutate-hunger-count-max [hunger-count]
  (mth/abs (mth/round (+ hunger-count (u/pick-norm-dist 0 2)))))

(defn mutate-hunger-wander [hunger-wander]
  (mth/abs (mth/round (+ hunger-wander (u/pick-norm-dist 0 2)))))

(defn mutate-hunger-wander-odds [hunger-wander-odds]
  (mth/abs (mth/round (+ hunger-wander-odds (u/pick-norm-dist 0 2)))))

(defn test-drift [marker mutations]
  (let [new-marker (vec (u/self-pipe marker mutate-marker 100))]
    (comp-markers new-marker marker)))

(defn test-two-drifts [marker1 marker2 mutations]
  (let [new-marker1 (vec (u/self-pipe marker1 mutate-marker mutations))
        new-marker2 (vec (u/self-pipe marker2 mutate-marker mutations))]
    (println (str "Self for 1: " (mth/floor (comp-markers marker1 new-marker1))))
    (println (str "Self for 2: " (mth/floor (comp-markers marker2 new-marker2))))
    (println (str "Start for 1 vs 2: " (mth/floor (comp-markers new-marker1 marker2))))
    (println (str "End for 1 vs 2: " (mth/floor (comp-markers marker1 new-marker2))))))

(defn mutate-organism [world uid]
  (let [parent (get-in world [:fauna uid])
        new-uid (make-uid)
        sprite (:sprite parent) 
        color (:color parent)
        energy-max (:energy-max parent)
        title (:name parent) 
        move-matrix (:move-matrix parent)
        birthdate (:time world)
        senses (:senses parent)
        prefs (:prefs parent)
        leap-odds (:leap-odds parent)
        leap-length (:leap-length parent)
        rest-max (:rest-max parent)
        strength (:strength parent)
        evasion (:evasion parent)
        marker (:marker parent)
        hunger-count-max (:hunger-count-max parent)
        hunger-wander (:hunger-wander parent)
        hunger-wander-odds (:hunger-wander-odds parent)]
    {:sprite (mutate-sprite sprite) 
     :color (mutate-color color)
     :move-matrix (mutate-move-matrix move-matrix) 
     :last-move 5
     :energy-max (mutate-energy-max energy-max) 
     :energy (mth/round (/ energy-max 3))
     :uid new-uid :alive true 
     :name (mutate-name title)
     :prefs (mutate-prefs prefs) 
     :senses senses
     :birthdate birthdate :parent title
     :sequence [] :leap-odds (mutate-leap-odds leap-odds)
     :leap-length (mutate-leap-length leap-length)
     :rest-max (mutate-rest-max rest-max)
     :rest-counter rest-max
     :strength (mutate-strength strength)
     :evasion (mth/round (+ evasion (u/pick-norm-dist 0 1)))
     :marker (mutate-marker marker)
     :hunger-count-max (mutate-hunger-count-max hunger-count-max) 
     :hunger-count hunger-count-max 
     :hunger-wander (mutate-hunger-wander hunger-wander)
     :hunger-wander-odds (mutate-hunger-wander-odds hunger-wander-odds)}))

(defn try-reproduce [world uid]
  (if (and (u/roll-against (get-in world [:config :reproduction-rate]))
           (> (get-trait world uid :energy) 40))
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

(defn highlight-selected [world]
  (let [target @console/current-info
        x (get-in world [:fauna target :x])
        y (get-in world [:fauna target :y])
        tile-size (get-config world :tile-size)]
    (if (get-trait world target :alive)
      (cvs/draw-color-matrix (d/highlight-sprite tile-size)
        :x (* tile-size x) :y (* tile-size y) :size tile-size :color d/highlight-color :ctx cvs/world-foreground))))

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
