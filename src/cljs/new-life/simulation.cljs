(ns new-life.simulation
	(:require-macros [cljs.core.async.macros :refer [go] :as a])
	(:require [new-life.world :as world]
        [new-life.matrix :as mtx]
			  [new-life.data :as d]
        [new-life.canvas :as cvs]
			  [new-life.utilities :as u]
			  [new-life.console :as console]
			  [cljs.core.async :refer [put! timeout chan alt! map<]]))


(defn initialize-world []
  (-> d/world-skeleton
      (assoc-in [:world-map] (world/gen-world-map 100))
      ((partial world/gen-fauna 5))
      (world/initialize-food)
      (world/gen-food))) ;;Initial organisms


(defn tick-time [world]
  (update-in world [:config :time] inc))

(defn organism-upkeep [uid world]
  (if (> uid 100) ;;Is this an organism?
    (let [new-world (world/check-energy world uid)]
      (if (world/check-life new-world uid)
        (-> new-world            
            (world/use-energy uid)
            ;(world/find-food uid)      
            (world/try-move uid))
        new-world))
    world))  ;;If not an organism, return unchanged 

(defn update-organisms [world]
    (reduce #(if-not (= %2 nil) (organism-upkeep %2 %1) %1) world (d/list-uids world)))

(defn info-sprite [world uid]
  (let [TILE-SIZE (world/get-config world :tile-size)]
    (console/clear-info)
    (if (> uid 100)
      (let [color (world/get-trait world uid :color) 
            sprite (world/get-trait world uid :sprite)
            energy (world/get-trait world uid :energy)
            energy-max (world/get-trait world uid :energy-max)
            title (world/get-trait world uid :name)
            move-matrix (world/get-trait world uid :move-matrix)
            ]
        (console/update-info (str "<p><br>Name: the " title 
                                  "<br>Energy: " energy 
                                  "<br>Max Energy: " energy-max
                                  ;"<br>Movement Matrix:"
                                  ;"<br>" (console/display-move-matrix move-matrix)
                                  "</p>")
                              color
                              sprite 
                              TILE-SIZE)))))
  
(defn make-world-processor-test! [world]
  (let [ms (get-in world [:config :tick])]
    ;(world/draw-world-background world)  
    (console/update-timer world)
    (let [c-events (chan 123)]
      (go
        (loop [world world]
          (let [config (get-in world [:config])
                next-world (-> world
                              (update-in [:time] inc)
                              (world/grow-food)
                              (update-organisms))]
          (world/clear-screen config)
          (console/update-timer world)
          (world/draw-world world)  
          (console/update-console)
          (info-sprite world @console/current-info)
          (<! (timeout ms))
            (recur next-world))))
      c-events)))

(make-world-processor-test! (initialize-world))








(comment



(defn update-timer []
	(console/update-timer world/get-current-time))


;;LOOP


;(defn run-simulation []
;      (world/clear-screen)
;      (update-organisms)
;      (if (> (u/pick-rand-int 0 100) 80) (world/place-food (world/get-config :food-amount)))
;      (info-sprite @console/current-info)
;      (world/draw-world world));

;(defn simulation []
;  (let [TICK (world/get-config :tick)]
;  (world/seed-food)
;  (go
;    (while true
;      (<! (timeout TICK))
;      (world/set-current-time (inc (world/get-current-time)))
;      (update-timer)
;      (console/update-console)
;      (run-simulation)))))
 
;(update-in world [:pieces [0 0] :health] dec)

(defn tick-time [world]
  (update-in world [:config :time] inc))

(defn make-world-processor! [world ms]  
  (let [c-events (async/chan 123)]
    (go
      (loop [world world]
        (world/draw-world world)
        ;(do-other-things world)
        (let [sync (async/timeout ms)
              next (-> world
                       ;(update-in [:pieces] tick-pieces)
                       (update-in [:time] tick-time))]
              ;next (loop [world next]
              ;       (async/alt!
              ;         sync ([_ _] world)
              ;         c-events ([val _] (recur (process-event world val)))))]
          (recur next))))
    c-events))

)