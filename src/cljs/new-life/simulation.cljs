(ns new-life.simulation
	(:require-macros [cljs.core.async.macros :refer [go] :as a])
	(:require [new-life.world :as world]
        [new-life.matrix :as mtx]
        [new-life.math :as mth]
			  [new-life.data :as d]
        [new-life.canvas :as cvs]
			  [new-life.utilities :as u]
			  [new-life.console :as console]
        [jayq.core :as jq :refer [$]]
			  [cljs.core.async :refer [put! timeout chan alt! alts! map<]]))


(defn initialize-world []
  (-> d/world-skeleton
      (assoc-in [:world-map] (world/gen-world-map 100))
      (assoc-in [:tile-types] (world/gen-world-tile-types 100))
      ((partial world/gen-fauna 40))
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
              (world/find-food uid)
              (world/check-hunger uid)
              (world/try-move uid)
              (world/find-prey uid)   
              (world/try-reproduce uid)
              (world/update-sequence uid)
              (world/update-rest-counter uid)
              )
        new-world))
    world))  ;;If not an organism, return unchanged 

(defn update-organisms [world]
    (reduce #(if-not (= %2 nil) (organism-upkeep %2 %1) %1) world (d/list-live-uids world)))

(defn info-sprite [world uid]
  (let [TILE-SIZE (world/get-config world :tile-size)]
    (console/clear-info)
    (if (> uid 100)
      (let [color (world/get-trait world uid :color) 
            sprite (world/get-trait world uid :sprite)
            energy (world/get-trait world uid :energy)
            energy-max (world/get-trait world uid :energy-max)
            title (world/get-name world uid)
            move-matrix (world/get-trait world uid :move-matrix)
            birthdate (world/get-trait world uid :birthdate)
            parent (world/format-name (world/get-trait world uid :parent))
            prefs (world/get-trait world uid :prefs)
            sequence (world/get-trait world uid :sequence)
            leap-odds (world/get-trait world uid :leap-odds)
            rest-counter (world/get-trait world uid :rest-counter)
            rest-amount (world/get-trait world uid :rest-amount)
            strength (world/get-trait world uid :strength)
            evasion (world/get-trait world uid :evasion)
            aggression (world/get-trait world uid :aggression)
            ]
        (console/update-info (str "<p><br>Name: the " title 
                                  "<br>Energy: " energy 
                                  "<br>Max Energy: " energy-max
                                  "<br>Movement Preferences: "
                                  "<br>...food->" (:food prefs) 
                                  "<br>...kin->" (:kin prefs) 
                                  "<br>...non-kin (aggression)->" (:non-kin prefs)
                                  "<br>...shadow prey->" (mth/round (:shadow-prey prefs))
                                  "<br>Strength: " strength
                                  "<br>Evasion:" (mth/round evasion) 
                                  "<br>Birthdate: " birthdate
                                  "<br>Parent: " parent
                                  "<br>Sequence: " sequence
                                  "<br>Hunger Count: " (world/get-trait world uid :hunger-count)
                                  "<br>Hunger Count Max: " (world/get-trait world uid :hunger-count-max)
                                  "<br>Hunger Wander: " (world/get-trait world uid :hunger-wander)
                                  "<br>Hunger Wander Odds: " (mth/round (world/get-trait world uid :hunger-wander-odds)) "%"
                                  "<br>Rest Countdown: " rest-counter
                                  "</p>")
                              color
                              sprite 
                              TILE-SIZE)))))
  
(defn nonparking [chan]
  (go
    (first (alts! [chan (timeout 0)] :priority true))))

(defn offset []
  (let [space (jq/offset ($ :#world-foreground))]
    (vector (:left space) (:top space))))

(defn transform-coords [coords]
  (let [[x y] coords
        TILE-SIZE 8
        offset (offset)]
    (vector (mth/floor (/ (mth/ceil (- x (first offset)))
                          TILE-SIZE))
            (mth/floor (/ (mth/ceil (- y (second offset)))
                          TILE-SIZE))
                )))

(defn update-info [world coords]
    (let [coords (transform-coords coords)
          [x y] coords
          nearby (world/find-nearby (:world-map world) x y world/organism?)
          uid (if nearby
                (first nearby)
                0)]
       (if (> uid 100)
        (do 
          (reset! console/current-info uid)
          (info-sprite world @console/current-info)))))

;;Pausing should not pause listening for events
;;Could use pause condition
;;Is the problem non-parking?

(defn process-events [world event]
  (let [pause-state (:pause world)
        coords (transform-coords (:coords event))]
    (case (:type event)
      :toggle
        (assoc world :pause (not pause-state))
      :click
        (do
          (update-info world (:coords event))
          world))))

(defn make-world-processor-test! [world]
  (let [ms (get-in world [:config :tick])]
    ;(world/draw-world-background world)  
    (console/update-timer world)
    (let [c-events (chan 123)
          start-bencher (.getTime (new js/Date))]
      (go
        (loop [world world last-bencher start-bencher cur-bencher start-bencher]
          (world/clear-screen (get-in world [:config]))
          (world/draw-world world)
          (world/highlight-selected world)  
          ;;Process events
          (if (:pause world)
            (if-let [event (<! (nonparking c-events))]
              (recur (process-events world event) last-bencher (.getTime (new js/Date)))
              (recur world last-bencher (.getTime (new js/Date))))
            (if-let [event (<! (nonparking c-events))] 
              (recur (process-events world event) last-bencher (.getTime (new js/Date)))
          ;;Update simulation                 
              (let [synchronize (timeout ms)
                    config (get-in world [:config])
                    next-world (-> world
                                  (update-in [:time] inc)
                                  (world/grow-food)
                                  (update-organisms)
                                  )]
                (console/update-timer world)
                (console/update-console)
                (info-sprite world @console/current-info)
                (<! synchronize)
                (.log js/console (str "Round time: " (- cur-bencher last-bencher) " ms."))
                (recur next-world cur-bencher (.getTime (new js/Date))))))))
        c-events)))


(let [c-events (make-world-processor-test! (initialize-world))
      $button ($ :#toggle)]
  (jq/on $button "click" (fn [e] 
                            (.preventDefault e)
                            (put! c-events {:type :toggle})))
  (jq/on cvs/$world-foreground "click" (fn [e]
                                          (put! c-events {:type :click
                                                          :coords [(.-pageX e) (.-pageY e)]}))))
#_(go 
  (loop [world (initialize-world) last-time (.getTime (new js/Date)) cur-time last-time]
    (let [new-world (reduce #(if-not (= %2 nil) (world/try-move %1 %2) %1) world (d/list-live-uids world))]  
      (.log js/console (str "Round time: " (- cur-time last-time) " ms."))
      (<! (timeout 50))
      (recur new-world cur-time (.getTime (new js/Date))))))

