(ns new-life.simulation
	(:require-macros [cljs.core.async.macros :refer [go] :as a])
	(:require [new-life.world :as world]
        [new-life.matrix :as mtx]
			  [new-life.data :as d]
        [new-life.canvas :as cvs]
			  [new-life.utilities :as u]
			  [new-life.console :as console]
			  [cljs.core.async :refer [put! timeout chan alt! map<]]))


;;TEMP
;(def test-world (assoc d/world-skeleton :world-map (world/gen-world-map 101)))
(def syllables ["a" "e" "i" "o" "u"
                "ba" "be" "bi" "bo" "bu"
                "da" "de" "di" "do" "du"
                "fa" "fe" "fi" "fo" "fu"
                "ga" "ge" "gi" "go" "gu"
                "ha" "he" "hi" "ho" "hu"
                "ja" "je" "ji" "jo" "ju"
                "ka" "ke" "ki" "ko" "ku"
                "la" "le" "li" "lo" "lu"
                "ma" "me" "mi" "mo" "mu"
                "na" "ne" "ni" "no" "nu"
                "pa" "pe" "pi" "po" "pu"
                "qua" "que" "qui" "quo" "quu"
                "ra" "re" "ri" "ro" "ru"
                "sa" "se" "si" "so" "su"
                "ta" "te" "ti" "to" "tu"
                "va" "ve" "vi" "vo" "vu"
                "wa" "we" "wi" "wo" "wu"
                "ya" "ye" "yi" "yo" "yu"
                "za" "ze" "zi" "zo" "zu"
                "s" "n" "l" "y" "ch" "sh"])

(defn generate-name []
    (let [syls (u/pick-rand-int 1 4)]
        (loop [counter syls output []]
            (if (> counter 0)
                (recur (dec counter) (conj output (syllables (u/pick-rand-int 0 (count syllables)))))
                (apply str output)))))


(defn initialize-world []
  (-> d/world-skeleton
      (assoc-in [:world-map] (world/gen-world-map 100))
      ((partial world/gen-fauna 5))
      (world/initialize-food)
      (world/gen-food))) ;;Initial organisms

(defn tick-time [world]
  (update-in world [:config :time] inc))
  
(defn make-world-processor-test! [world ms]
  ;(world/draw-world-background world)  
  (console/update-timer world)
  (let [c-events (chan 123)]
    (go
      (loop [world world]
        (let [config (get-in world [:config])
              next (-> world
                       (update-in [:time] inc)
                       (world/grow-food))]
        (world/clear-screen config)
        (console/update-timer world)
        ;(world/update-organisms)
       
        (world/draw-world world)  ;;;<<<<-------------<<<<<<<<<<<<<<<<<--------TIMER's not starting, no draw
        ;(console/update-console)
        (<! (timeout ms))
          (recur next))))
    c-events))

(make-world-processor-test! (initialize-world) 500)

;      (update-organisms)
;      (if (> (u/pick-rand-int 0 100) 80) (world/place-food (world/get-config :food-amount)))
;      (info-sprite @console/current-info)







(comment

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
  
(defn make-world-processor-test! [world ms]  
  (let [c-events (async/chan 123)]
    (go
      (loop [world world]
        (world/draw-world world)
          (recur world)))
    c-events))

;(make-world-processor-test! d/world-skeleton (get-in d/world-skeleton [:config :tick]))

)