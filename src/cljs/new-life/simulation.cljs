(ns new-life.simulation
	(:require-macros [cljs.core.async.macros :refer [go] :as a])
	(:require [new-life.world :as world]
			  [new-life.canvas :as cvs]
			  [new-life.utilities :as u]
			  [new-life.console :as console]
			  [cljs.core.async :refer [put! timeout chan map<]]))


;;TEMP
(def initial-config
	{:tile-size 8
	 :world-size 100
	 :tick 200
	 :reproduction-rate 0.01
	 :food-rate 0.01
	 :food-amount 1
	 :food-boost 40
	 :initial-food 30
	 :food-range 500})

(defn info-sprite [uid]
	(let [TILE-SIZE (world/get-config :tile-size)]
	    (console/clear-info)
	    (if-not (= ((world/get-fauna) uid) nil)
	    	(let [color (world/get-trait uid :color) 
	            sprite (world/get-trait uid :sprite)
	            energy (world/get-trait uid :energy)
	            energy-max (world/get-trait uid :energy-max)
	            title (world/get-trait uid :name)
	            move-matrix (world/get-trait uid :move-matrix)
	            ]
	          (console/update-info (str "<p><br>Name: the " title 
	                                    "<br>Energy: " energy 
	                                     "<br>Max Energy: " energy-max
	                                     "<br>Movement Matrix:"
	                                     "<br>" (console/display-move-matrix move-matrix)
	                                     "</p>")
	                                color
	                                sprite 
	           						TILE-SIZE)))))

(defn update-timer []
	(console/update-timer world/get-current-time))


;;LOOP
(defn organism-upkeep [uid]
  (if (> uid 100) ;Is this an organism?
    (if (world/check-life uid)
      (if (world/check-energy uid) 
         (do
            (world/use-energy uid)
            (world/find-food uid)      
            (world/try-move uid)) 
         (console/print-to-console (str "the " (world/get-trait uid :name) " went extinct in round " (world/get-current-time) "!"))))))

(defn update-organisms []
    (doseq [uids (world/list-uids)] (organism-upkeep uids)))

(defn run-simulation []
      (world/clear-screen)
      (update-organisms)
      (if (> (u/pick-rand-int 0 100) 80) (world/place-food (world/get-config :food-amount)))
      (info-sprite @console/current-info)
      (world/draw-world))

(defn simulation []
  (let [TICK (world/get-config :tick)]
  (world/seed-food)
  (go
    (while true
      (<! (timeout TICK))
      (world/set-current-time (inc (world/get-current-time)))
      (update-timer)
      (console/update-console)
      (run-simulation)))))

(world/initialize initial-config)

;;OBJECTS
(world/gen-organism! 1 (world/food-template 1))
(world/gen-organism! 2 (world/food-template 2))
(world/gen-organism! 3 (world/food-template 3))

(world/deploy-organism 10 20)
(world/deploy-organism 20 20)
(world/deploy-organism 30 20)
(world/deploy-organism 40 20)
(world/deploy-organism 50 20)

(simulation)