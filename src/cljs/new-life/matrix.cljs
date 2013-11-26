(ns new-life.matrix
  (:require [new-life.math :as mth]))



(defn consv [item vect]
    (into [] (cons item vect)))

(defn dist-below [number thresh]
  (cond 
    (>= number thresh) 0)
    :else (- thresh number))

(defn dist-above [number thresh]
  (cond 
    (<= number thresh) 0)
    :else (- number thresh))

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
    (into [] (map #(subvec % x (+ x x-size)) (subvec matrix y (+ y y-size))))))

(defn print-matrix [print-f matrix]
  (loop [counter 0] (if (< counter (count matrix))  
    (do 
      (print-f (matrix counter)) 
      (recur (inc counter)))
    "done")))

(defn row-neighborhood [row idx rang]
  (let [start-idx (- idx rang)
        end-idx (+ idx rang)]
        (loop [counter start-idx new-row []]
          (if (<= counter end-idx)
            (recur (inc counter) (conj new-row (get-in row [counter])))
            new-row))))

(defn neighborhood [matrix x y rang]
  (let [start-y (- y rang)
        end-y (+ y rang)]
        (loop [counter start-y new-matrix []]
          (if (<= counter end-y)
            (recur (inc counter) 
              (conj new-matrix (row-neighborhood (get-in matrix [counter]) x rang)))
            new-matrix))))

(defn flat-neighborhood [matrix x y rang]
  (flatten (neighborhood matrix x y rang)))

(defn flat->coords [x y idx]
  "Gets the coordinates of an entry in the flat-neighborhood
   of [x y]."
  (let [coords (case idx
                  0 [(dec x) (dec y)]
                  1 [x (dec y)]
                  2 [(inc x) (dec y)]
                  3 [(dec x) y]
                  4 [x y]
                  5 [(inc x) y]
                  6 [(dec x) (inc y)]
                  7 [x (inc y)]
                  8 [(inc x) (inc y)])]
    coords))

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

(defn filled-submatrix [top-left bottom-right matrix]
  (let [[x- y-] top-left 
        [x+ y+] bottom-right
        max-x (dec (count (matrix 0))) 
        max-y (dec (count matrix))
        x-minus (dist-below x- 0)
        y-minus (dist-below y- 0)
        x-plus (dist-above x+ max-x)
        y-plus (dist-above y+ max-y)
        new-x- (- x- (- x-minus))
        new-y- (- y- (- y-minus))
        new-x+ (+ x+ x-minus)
        new-y+ (+ y+ y-minus)]
    (submatrix
      (expand-matrix matrix 
        :x-minus x-minus :x-plus x-plus 
        :y-minus y-minus :y-plus y-plus)
      new-x- new-y- ;Get our new top-left
      (inc (- new-x+ new-x-)) (inc (- new-y+ new-y-)) ;Get our x-size and y-size
      )))


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


;;Transformations
(defn rotate-matrix [m] 
  "Rotate a matrix clockwise."
  (vec (apply map vector (reverse m))))

(defn indices-by-region* [radius axis]
  "Radius is distance from center of neighborhood.
  Positive radius: top or right.
  Negative radius: bottom or left.
  Axis is 'x' for left/right, 'y' for top/bottom."

  (let [range-radius (if (neg? radius) 
                     (range -1 (dec radius) -1)
                     (range 1 (inc radius)))]
    (if (= axis "x")
      (mapv (fn [x]
                (mapv (fn [y] [x y]) 
                  (range (- (mth/abs x)) (inc (mth/abs x)))))
        range-radius)
      (mapv (fn [y]
                (mapv (fn [x] [x y]) 
                  (range (- (mth/abs y)) (inc (mth/abs y)))))
        range-radius))))

(def indices-by-region (memoize indices-by-region*))
