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

(defn consv [item vect]
    (into [] (cons item vect)))

(defn report [msg]
	(.log js/console msg))

(defn indexed-enum [f vect config]
  ;For each member, enum-effect calls a function that takes an index,
  ;a value, and a config map and produces a side effect
  (reduce-kv (fn [_ idx val] 
    (f idx val config)) 
    nil vect))
