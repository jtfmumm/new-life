(ns new-life.math)

(defn sqrt [x]
	(.sqrt js/Math x))

(defn log [x]
	(.log js/Math x))

(defn floor [x]
	(.floor js/Math x))

(defn ceil [x]
	(.ceil js/Math x))

(defn round [x]
	(.round js/Math x))

(defn abs [x]
	(.abs js/Math x))

(defn bounds [low high x]
	(cond
		(< x low) low
		(> x high) high
		:else x))

(defn add-pairs [A B]
	(let [a1 (first A)
		  a2 (second A)
		  b1 (first B)
		  b2 (second B)]
	  [(+ a1 b1) (+ a2 b2)]))