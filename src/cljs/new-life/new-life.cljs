(ns async.core
    (:require-macros [cljs.core.async.macros :refer [go] :as a])
    (:require 
     		[cljs.core.async :refer [put! timeout chan map<]]
     		[goog.events :as events]
	       	[jayq.core :as jq]
	       	[monet.canvas :as mo])
   	(:use [jayq.core :only [$]]))

(def TILE-SIZE 8)
(def WORLD-SIZE 100)
(def TICK 100)

(defn make-counter [init-val] 
    (let [c (atom init-val)] #(swap! c inc)))

(def get-uid (make-counter 100))

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

;;CODES FOR WORLD
;;  0-Empty
;;  10-20 Food
;;  100+ UIDs for organisms
(defn gen-world-row []
    (loop [counter 0 world-row []]
        (if (< counter WORLD-SIZE)
            (recur (inc counter) (conj world-row 0))
            world-row)))

(defn gen-world []
    (loop [counter 0 world []]
        (if (< counter WORLD-SIZE)
            (recur (inc counter) (conj world (gen-world-row)))
            world)))
  
(def world (atom #{}))

(reset! world (gen-world))

(defn check-tile [x y]
    (((deref world) y) x))

(defn set-tile [value x y]
    (let [row ((deref world) y)]
    (reset! world 
        (assoc (deref world) y (assoc row x value)))))

;;CANVAS
(def $drawing ($ :#drawing))

(def ctx (mo/get-context (.get $drawing 0) "2d"))

;(mo/stroke-style ctx "#eee")

(defn draw-line [startx starty finishx finishy]
	(do
		(mo/move-to ctx startx starty)
		(mo/line-to ctx finishx finishy)
		(mo/stroke ctx)))

(defn color-conversion [color]
    )

;(defn fill-rectangle [[surface] [x y width height] [r g b]]
;  (set! (. surface -fillStyle) (str "rgb(" r "," g "," b ")"))
;  (.fillRect surface x y width height))

;(fill-rectangle [ctx] [200 200 50 50] [256 0 0])

(defn draw-rect [ctx [r g b] x y w h]
  (set! (. ctx -fillStyle) (str "rgb(" r "," g "," b ")"))
  (. ctx (fillRect x y w h))
;  (mo/close-path ctx)
;  (mo/fill ctx)
  ctx)

(defn draw-point [color x y]
	(draw-rect ctx color x y 1 1))


;(draw-line 100 100 300 300)
;(draw-line 0 0 30 30)
;(draw-point 10 10)
;(draw-point 200 250)


(defn random-draw []
	(loop [counter 10000]
		(if (> counter 0)
			(do
				(draw-point "#FF0000" (rand-int 500) (rand-int 500)); (rand-int 500) (rand-int 500))
				(recur (dec counter))))))

(defn draw-burst [color x y span density]
	(loop [counter density]
		(if (> counter 0)
			(do
				(draw-point color (pick-rand (- x span) (+ x span)) 
							(pick-rand (- y span) (+ y span)))
				(recur (dec counter))))))

(defn gen-org-row [size]
    (loop [row [] counter 0]
        (if (< counter size)
            (recur (conj row (pick-rand-int 0 2)) (inc counter))
            row)))

(defn gen-org-box [size]
    (loop [matrix [] counter 0]
        (if (< counter size) 
            (recur (conj matrix (gen-org-row size)) (inc counter))
            matrix)))

(defn draw-row [color x y row size]
    (loop [counter 0]
        (if (< counter size)
            (do
              (if (= (row counter) 1)
                (draw-point color (+ x counter) y))
              (recur (inc counter))))))

(defn draw-matrix [color x y matrix size]
    (loop [counter 0]
        (if (< counter size)
            (do
              (draw-row color x (+ y counter) (matrix counter) size)
              (recur (inc counter))))))
;(draw-burst 50 50 10 50)

(defn events [el type]
  (let [out (chan)]
    (events/listen el type
      (fn [e] (put! out e)))
    out))

(defn pos [e]
  [(.-clientX e) (.-clientY e)])

(defn world-coord [x]
    (* x TILE-SIZE))

;(draw-matrix (world-coord 10) (world-coord 20) (gen-org-box 8) 8)

(defn draw-world-row [y]
    (loop [counter 0]
      (if (< counter WORLD-SIZE)
            (do
              (if (= (((deref world) y) counter) 1)
                (draw-matrix [0 256 0] (world-coord counter) (world-coord y) (gen-org-box TILE-SIZE) TILE-SIZE))
              (recur (inc counter))))))

(defn draw-world-box []
    (loop [counter 0]
        (if (< counter WORLD-SIZE)
           (do
              (draw-world-row counter)
              (recur (inc counter))))));

(draw-world-box)

(def explorer (gen-org-box TILE-SIZE))

(defn update-explorer [explorer color x y]
    (draw-matrix color x y explorer TILE-SIZE))

(defn clear-rectangle [start-x start-y finish-x finish-y]
    (. ctx (clearRect start-x start-y finish-x finish-y))
    ctx)

(defn clear-sprite [x y]
    (clear-rectangle x y (+ x TILE-SIZE) (+ y TILE-SIZE)))

(defn clear-screen []
    (clear-rectangle 0 0 (* WORLD-SIZE 8) (* WORLD-SIZE 8)))

;(while true    
;   (do 
;      (timeout 5)
;      (clear-screen)
;      (update-explorer explorer 50 20)))

(defn hit-wall [x]
    (cond
        (< x 0) 0
        (> x WORLD-SIZE) WORLD-SIZE
        :else x))

(defn walk-drunk [x]
    (hit-wall (+ x (pick-rand-int -1 1)))) 

;(go
;  (loop [x 0 y 0]
;    (do 
;     (<! (timeout 100))
;     ;(clear-screen)
;     (update-explorer explorer (world-coord x) (world-coord y))
;     (recur (walk-drunk x) (walk-drunk y)))))

(defn property-map [color]
    {:color color :start-x (pick-rand-int 0 30) :start-y (pick-rand-int 0 30)})

(defn produce-organism [properties]
  (let [uid get-uid]
  (go
      (loop [uid uid sprite (gen-org-box TILE-SIZE) properties properties 
             x (properties :start-x) y (properties :start-y) 
             last-x x last-y y]
         (<! (timeout TICK))
         (if (= (check-tile x y) 0)
              (if-not (and (= x last-x) (= y last-y))
                  (do
                    (clear-sprite (world-coord last-x) (world-coord last-y))
                    (set-tile 0 last-x last-y) ;Tell world you've left 
                    (update-explorer sprite (properties :color) (world-coord x) (world-coord y))
                    (set-tile uid x y))
                  (recur uid sprite properties (walk-drunk last-x) (walk-drunk last-y) last-x last-y)))
         (recur uid sprite properties (walk-drunk x) (walk-drunk y) x y)))))

(produce-organism (property-map [256 0 0]))

(produce-organism (property-map [0 256 0]))
(produce-organism (property-map [0 0 256]))
(produce-organism (property-map [0 0 0]))

;(draw-matrix "888888" 10 10 explorer TILE-SIZE)

;(draw-row 100 100 (gen-org-row 24) 24)
;(draw-matrix 100 100 (gen-org-box 24) 24)
;(go (loop [cur 0]
;       (do
;        (<! (timeout 5))
;        (draw-point 
;               cur 
;               (+ 200 (* 125 (.sin js/Math (/ cur (pick-rand 40 80))))))
;			  (recur (mod (inc cur) 500)))))