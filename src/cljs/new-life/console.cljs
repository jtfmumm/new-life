(ns new-life.console
	(:require [new-life.canvas :as cvs]
		      [jayq.core :as jq])
   	(:use [jayq.core :only [$]]))


;;DATA
(def console-msgs (atom #{}))

(reset! console-msgs ["Complicating, circulating" "New life, new life" 
                      "Operating, generating" "New life, new life" "..."])

(def current-info (atom #{}))

(reset! current-info 101) ;Grab random info on first organism


;;FUNCTIONS
(defn clear-info []
    (cvs/clear-rectangle cvs/info-canvas 0 0 64 64)
    (jq/html ($ :#info) ""))

(defn print-to-console [msg]
    (reset! console-msgs (conj (into [] (rest @console-msgs)) msg)))

(defn update-console []
    (let [msgs @console-msgs]
      (jq/html ($ :#display) 
          (str 
              "> " (first msgs) "<br><br>"
              "> " (first (rest msgs)) "<br><br>"
              "> " (first (rest (rest msgs))) "<br><br>"
              "> " (first (rest (rest (rest msgs)))) "<br><br>"
              "> " (first (rest (rest (rest (rest msgs)))))))))

(defn number->spaced-txt [number]
    (cond
        (< number 10) (str number "...")
        (< number 100) (str number ".")
        :else (str number "")))

(defn transform-row-to-html [row row-number]
    (loop [counter 1 row-display (str row-number " ")]
      (if (< counter 10)
          (recur (inc counter) (str row-display (number->spaced-txt (row counter))))
          (str row-display "<br>"))))

(defn display-move-matrix [matrix]
    (loop [counter 1 html "...1...2...3...4...5...6...7...8...9...<br>"]
        (if (< counter 10)
            (recur (inc counter) (str html (transform-row-to-html (matrix counter) counter)))
            html)))

(defn update-info [msg color sprite TILE-SIZE]
	(cvs/draw-matrix cvs/info-canvas color 0 0 sprite TILE-SIZE 8)
	    (jq/html ($ :#info) msg))

(defn update-timer [current-time]
	(jq/html ($ :#timer) (str "Time: " (current-time))))



