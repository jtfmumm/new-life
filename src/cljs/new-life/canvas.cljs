(ns new-life.canvas
	(:require [monet.canvas :as mo]		      
		      [jayq.core :as jq])
	(:use [jayq.core :only [$]]))


;;CANVAS
(def $world-canvas ($ :#world-canvas))

(def world-canvas (mo/get-context (.get $world-canvas 0) "2d"))

(def $info-canvas ($ :#info-canvas))

(def info-canvas (mo/get-context (.get $info-canvas 0) "2d"))

(defn draw-line [ctx startx starty finishx finishy]
  (do
    (mo/move-to ctx startx starty)
    (mo/line-to ctx finishx finishy)
    (mo/stroke ctx)))

(defn draw-rect [ctx [r g b] x y w h]
  (set! (. ctx -fillStyle) (str "rgb(" r "," g "," b ")"))
  (. ctx (fillRect x y w h))
  ctx)

(defn clear-rectangle [ctx start-x start-y finish-x finish-y]
    (. ctx (clearRect start-x start-y finish-x finish-y))
    ctx)

(defn draw-point [ctx color x y scale]
  (draw-rect ctx color x y scale scale))

(defn draw-row [ctx color x y row size scale]
    (loop [counter 0]
        (if (< counter size)
            (do
              (if (= (row counter) 1)
                (draw-point ctx color (+ x (* counter scale)) y scale))
              (recur (inc counter))))))

(defn draw-matrix [ctx color x y matrix size scale]
    (loop [counter 0]
        (if (< counter size)
            (do
              (draw-row ctx color x (+ y (* counter scale)) (matrix counter) size scale)
              (recur (inc counter))))))