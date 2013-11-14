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


;;OPERATE ON MATRICES
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


;;EXPAND MATRICES
(defn repeat-preappend [vect times item]
	(into [] (flatten (consv (repeat times item) vect))))

(defn repeat-append [vect times item]
	(into [] (flatten (conj vect (repeat times item)))))

(defn expand-vector-x [vect minus plus]
	(into [] (flatten (conj (repeat-preappend vect minus 0) (repeat plus 0)))))	

(defn expand-matrix-x [matrix minus plus]
	(into [] (map #(expand-vector-x % minus plus)
	     matrix)))

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
  (repeat-append-row (repeat-preappend-row matrix minus) plus))

(defn expand-matrix 
  [matrix & {:keys [x-minus x-plus y-minus y-plus]
         :or {x-minus 0 x-plus 0 y-minus 0 y-plus 0}}]
      (expand-matrix-y 
        (expand-matrix-x matrix x-minus x-plus)
        y-minus
        y-plus))


;;CREATE MATRICES
(defn create-vector [width item]
  (into [] (repeat width item)))

(defn create-random-vector [width f]
  (into [] (repeatedly width f)))

(defn create-weighted-vector [width f]
  ;Creates a vector of numbers each determined by a 
  ;function of no arguments.  Index 0 holds the total of the values.
  (let [row (create-random-vector width f)
        row-total (reduce + row)]
    (consv row-total row)))
    
(defn create-matrix
  ([side item] (into [] (repeat side (create-vector side item)))) 
  ([width height item] (into [] (repeat height (create-vector width item)))))

(defn create-random-matrix
  ([side f] (into [] (repeatedly side (partial create-random-vector side f))))
  ([width height f] (into [] (repeatedly height (partial create-random-vector width f)))))

(defn create-weighted-matrix [side f]
  (into [] (repeatedly side (partial create-weighted-vector side f))))



(defn get-cell [matrix x y]
  ;Returns cell with x and y coordinates associated
  (assoc ((matrix y) x) :x x :y y))

(defn walk-matrix-by-coordinates [f matrix & f-args]
  ;Takes a function and a matrix
  ;For each cell, calls the function on that cell
  ;with the cell's x and y coordinates as its
  ;first arguments and the cell contents as its third.
  ;Any further arguments are passed as a vector called f-args.  
  ;  --> (f x y cell-contents f-args) 
  (let [y-size (count matrix)
        x-size (count (matrix 0))
        f-args-vect (vec f-args)]
  (letfn [(walk-row [row y]
            (loop [x-counter 0]
              (if (< x-counter x-size)
                (do
                  (apply f x-counter y (row x-counter) (vec f-args-vect))
                  (recur (inc x-counter))))))]
    (loop [y-counter 0]
      (if (< y-counter y-size)
        (do
          (walk-row (matrix y-counter) y-counter)
          (recur (inc y-counter))))))))


