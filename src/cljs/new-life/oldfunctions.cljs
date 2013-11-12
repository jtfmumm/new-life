(ns new-life.oldfunctions)


(defn get-neighborhood-row [x y size]
    (let [reach (floor (/ size 2))]
      (loop [counter 0 row []]
          (let [this-x (+ x counter)]
          (if (< counter size)
              (if (in-bounds? this-x) 
                  (recur (inc counter) (conj row (check-tile this-x y)))
                  (recur (inc counter) (conj row 0)))
              row)))))

(defn get-neighborhood [x y size]
  (let [reach (floor (/ size 2))
        start-x (- x reach)
        start-y (- y reach)]
      (loop [counter 0 matrix []]
          (let [this-y (+ start-y counter)]
          (if (< counter size)
              (if (in-bounds? this-y)
                  (recur (inc counter) (conj matrix (get-neighborhood-row start-x this-y size)))
                  (recur (inc counter) (conj matrix (into [] (repeat size 0))))
              matrix))))))