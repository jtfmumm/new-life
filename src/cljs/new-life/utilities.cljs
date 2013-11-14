(ns new-life.utilities)


(defn make-counter [init-val] 
    (let [c (atom init-val)] #(swap! c inc)))

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

(defn consv [item vect]
    (into [] (cons item vect)))

(defn self-pipe [item f times]
  (loop [counter 0 item item]
    (if (< counter times)
        (recur (inc counter) (f item))
        item)))


(defn report [msg]
	(.log js/console msg))

(defn indexed-enum [f vect config]
  ;For each member, enum-effect calls a function that takes an index,
  ;a value, and a config map and produces a side effect
  (reduce-kv (fn [_ idx val] 
    (f idx val config)) 
    nil vect))
