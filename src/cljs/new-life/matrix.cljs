(ns new-life.matrix)



(defn consv [item vect]
    (into [] (cons item vect)))

(defn submatrix [matrix x y x-size y-size]
    (let [max-x (count (matrix 0))
          max-y (count matrix)
          x (cond 
              (< x 0) 0 
              (>= x max-x) (dec max-x) 
              :else x)
          y (cond 
              (< y 0) 0 
              (>= y max-y) (dec max-y) 
              :else y)
          x-size (cond 
                    (>= (+ x x-size) max-x) (- max-x x) 
                    :else x-size)
          y-size (cond 
                    (>= (+ y y-size) max-y) (- max-y y) 
                    :else y-size)]
    (map #(subvec % x (+ x x-size)) (subvec matrix y (+ y y-size)))))

(defn sum-matrix-cells [matrix]
	(reduce + (flatten matrix)))

(defn transform-matrix-cells [f matrix]
	(let [rows (count matrix)]
		(loop [counter 0 new-matrix []]
			(if (< counter rows)
				(recur (inc counter) (conj new-matrix (into [] (map f (matrix counter)))))
				new-matrix))))

(defn sum-map-cells [f matrix]
	(sum-matrix-cells (transform-matrix-cells f matrix)))

(defn repeat-preappend [vect times item]
	(into [] (flatten (consv (repeat times item) vect))))

(defn repeat-append [vect times item]
	(into [] (flatten (conj vect (repeat times item)))))

(defn expand-vector-x [vect minus plus]
	(into [] (flatten (conj (repeat-preappend vect minus 0) (repeat plus 0)))))	

(defn expand-matrix-x [matrix minus plus]
	(map #(expand-vector-x % minus plus)
	     matrix))

(defn repeat-preappend-row [matrix minus]
	(let [length (count (matrix 0))
		  new-row (into [] (repeat length 0))]
	(loop [counter 0 new-matrix matrix]
		(if (< counter minus)
			(recur (inc counter) (consv new-row new-matrix))
			new-matrix))))

(defn repeat-append-row [matrix plus]
	(let [length (count (matrix 0))
		  new-row (into [] (repeat length 0))]
	(loop [counter 0 new-matrix matrix]
		(if (< counter plus)
			(recur (inc counter) (conj new-matrix new-row))
			new-matrix))))

(defn expand-matrix-y [matrix minus plus]
	(let [length (count (matrix 0))
	      new-row (into [] (repeat length 0))]
	    (loop [counter 0])
		(conj 
		  (repeat-preappend matrix minus new-row)
		  (repeat plus new-row))))

(defn expand-matrix-y [matrix minus plus]
	(repeat-append-row (repeat-preappend-row matrix minus) plus))

(defn expand-matrix 
	[matrix & {:keys [x-minus x-plus y-minus y-plus]}]
			   ;:or {x-minus 0 x-plus 0 y-minus 0 y-plus}}]
	    (expand-matrix-y 
	    	(expand-matrix-x matrix x-minus x-plus)
	    	y-minus
	    	y-plus))
