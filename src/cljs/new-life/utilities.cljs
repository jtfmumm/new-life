(ns new-life.utilities)


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

(defn rand-ints [low high]
  (cons (pick-rand-int low high) (lazy-seq (get-random-ints low high))))

(defn rand-pair [low high]
  [(pick-rand-int low high) (pick-rand-int low high)])

(defn rand-pairs [low high]
  (cons (rand-pair low high) (lazy-seq (rand-pairs low high))))


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
