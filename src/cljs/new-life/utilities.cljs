(ns new-life.utilities
  (:require [new-life.math :as mth]))


;;General
(defn toggle [bool]
  (not bool))


;;Vectors
(defn del-element [vect idx]
  (vec
    (concat
      (subvec vect 0 idx)
      (subvec vect (inc idx) (count vect)))))

(defn flat-vec [vect]
  (into [] (flatten vect)))


;;Maps
(defn map-max [mp]
  (reduce max (map val mp)))

(defn max-keys [mp]
  "Takes a hash-map and returns a list of keys whose values are 
  equal to the max value for the map."
  (let [high (map-max mp)]
    (keep #(-> % val (= high) (if-not nil (key %))) mp)))

(defn map-max-key [mp]
  "If there is one key with the max value in the map, return it.
  Otherwise, return false."
  (let [maxes (max-keys mp)]
    (if (= (count maxes) 1) 
      (first (max-keys mp))
      false)))

(defn equal-map? [mp]
  (apply = (map val mp)))


;;Counters
(defn make-counter [init-val] 
    (let [c (atom init-val)] #(swap! c inc)))


;;Randomizers
(defn pick-rand [low high]
  (+
    (* 
      (- high low) 
      (rand 1))
    low))

(defn pick-rand-int [low high]
  (+
    (rand-int (inc (- high low)))
    low))

(defn pick-weighted-int [low high frequencies]
  (let [weighted-nums (vec (flatten (map #(repeat % %2) frequencies (range low (inc high)))))
        entries (count weighted-nums)]
    (weighted-nums (pick-rand-int 0 (dec entries)))))

(defn pick-rand-item [items]
  (let [high (dec (count items))
        pick (pick-rand-int 0 high)]
    (items pick)))

(defn pick-variation [value]
  (cond
    (= value 0) 0
    (> value 0) (pick-rand-int 0 value)
    (< value 0) (pick-rand-int value 0)))

;(defn rand-ints [low high]
;  (cons (pick-rand-int low high) (lazy-seq (get-random-ints low high))))

(defn rand-pair [low high]
  [(pick-rand-int low high) (pick-rand-int low high)])

(defn rand-pairs [low high]
  (cons (rand-pair low high) (lazy-seq (rand-pairs low high))))

(defn roll-against [target]
  (let [roll (pick-rand-int 0 99.99)]
    (< roll target)))

(defn bell-curve []
  (let [seed (+ (pick-rand -1 1) 
                (pick-rand -1 1) 
                (pick-rand -1 1)
                (pick-rand -1 1) 
                (pick-rand -1 1) 
                (pick-rand -1 1))]))

(defn box-muller []
  (loop [x (pick-rand -1 1) y (pick-rand -1 1)]
    (let [rds (+ (* x x) (* y y))]
      (if (or (= rds 0) (> rds 1))
        (recur (pick-rand-int -1 1) (pick-rand-int -1 1))
        (* x
           (mth/sqrt (/ (* (- 2) (mth/log rds))
                         rds)))))))

(defn pick-norm-dist [mean std]
  (+ mean (* (box-muller) std)))

(defn btwn? [x low high]
  (and (> x low)
       (< x high)))

(defn dist [mean std]
  "Tests distribution of box-muller transform function"
  (let [numbers (repeatedly 1000 #(+ mean (* (box-muller) std)))
        total (count numbers)
        one (/ (count (filter #(btwn? % (- std) std) numbers)) total)
        two (/ (count (filter #(btwn? % (- (* 2 std)) (* 2 std)) numbers)) total)
        three (/ (count (filter #(btwn? % (- (* 3 std)) (* 3 std)) numbers)) total)
        ]
    (println "1: " (int (* one 100)))
    (println "2: " (int (* two 100)))
    (println "3: " (int (* three 100)))))

(defn bell-dist [mean std]
  "Tests distribution of central limit theorem function"
  (let [numbers (repeatedly 1000 #(+ mean (* (bell-curve) std)))
        total (count numbers)
        one (/ (count (filter #(btwn? % (- std) std) numbers)) total)
        two (/ (count (filter #(btwn? % (- (* 2 std)) (* 2 std)) numbers)) total)
        three (/ (count (filter #(btwn? % (- (* 3 std)) (* 3 std)) numbers)) total)
        ]
    (println "1: " (int (* one 100)))
    (println "2: " (int (* two 100)))
    (println "3: " (int (* three 100)))))

(defn test-dist [f mean std]
  "Tests distribution of some randomizing function"
  (let [numbers (repeatedly 1000 #(+ mean (* (f) std)))
        total (count numbers)
        one (/ (count (filter #(btwn? % (- std) std) numbers)) total)
        two (/ (count (filter #(btwn? % (- (* 2 std)) (* 2 std)) numbers)) total)
        three (/ (count (filter #(btwn? % (- (* 3 std)) (* 3 std)) numbers)) total)
        ]
    (println "1: " (int (* one 100)))
    (println "2: " (int (* two 100)))
    (println "3: " (int (* three 100)))))


;;Lists
(defn consv [item vect]
    (into [] (cons item vect)))


;;Piping
(defn self-pipe [item f times]
  (loop [counter 0 item item]
    (if (< counter times)
        (recur (inc counter) (f item))
        item)))


;;Logging
(defn generic-report [f]
  (fn [msgs]
    (let [msgs (str msgs)]
      (f msgs))))

(defn report [& msgs]
  ((generic-report (.-log js/console)) msgs))

(defn alert-me [& msgs]
  ((generic-report js/alert) msgs))


;;Math
(defn unnil [x]
  (if (= x nil) 0 x))

(defn operate-nil [f args]
  (let [start (unnil (first args))
        args (into [] (rest args))]
  (reduce #(f %1 (unnil %2)) start args))) 

(defn add-nil [& args]
  (operate-nil + args))

(defn subt-nil [& args]
  (operate-nil - args))

(defn mult-nil [& args]
  (operate-nil * args))

(defn div-nil [& args]
  (operate-nil / args))


;;Misc
(defn indexed-enum [f vect config]
  ;For each member, enum-effect calls a function that takes an index,
  ;a value, and a config map and produces a side effect
  (reduce-kv (fn [_ idx val] 
    (f idx val config)) 
    nil vect))


;;Benchmarking
(defn bench [times f & args]
  (let [x (.getTime (new js/Date))]  
      (doall (repeat times (apply f args)))
      (.log js/console (str times " times: " (- (.getTime (new js/Date)) x)))))

(defn batch-bench [& funs]
  (loop [remaining funs]
    (let [f-args (first remaining)]
    (if (seq funs)
      (do 
        (.log js/console (str name) ": ")
        (apply bench 100 f-args)
        (apply bench 1000 f-args)
        (apply bench 10000 f-args)
        (apply bench 100000 f-args)
        (recur (rest remaining)))))))

