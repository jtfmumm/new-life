(ns monet.canvas
  (:require [monet.core :as core]))

;;*********************************************
;; Canvas drawing functions
;;*********************************************

(defn get-context [canvas type]
  (. canvas (getContext (name type))))

(defn begin-path [ctx]
  (. ctx (beginPath))
  ctx)

(defn close-path [ctx]
  (. ctx (closePath))
  ctx)

(defn fill [ctx]
  (. ctx (fill))
  ctx)

(defn stroke [ctx]
  (. ctx (stroke))
  ctx)

(defn clear-rect [ctx {:keys [x y w h]}]
  (. ctx (clearRect x y w h))
  ctx)

(defn rect [ctx {:keys [x y w h]}]
  (begin-path ctx)
  (. ctx (rect x y w h))
  (close-path ctx)
  (fill ctx)
  ctx)

(defn circle [ctx {:keys [x y r]}]
  (begin-path ctx)
  (. ctx (arc x y r 0 (* (.-PI js/Math) 2) true))
  (close-path ctx)
  (fill ctx)
  ctx)

(defn text [ctx {:keys [text x y]}]
  (. ctx (fillText text x y))
  ctx)

(defn font-style [ctx font]
  (set! ctx.font font)
  ctx)

(defn fill-style [ctx color]
  (set! ctx.fillStyle color)
  ctx)

(defn stroke-style [ctx color]
  (set! ctx.strokeStyle color)
  ctx)

(defn stroke-width [ctx w]
  (set! ctx.lineWidth w)
  ctx)

(defn move-to [ctx x y]
  (. ctx (moveTo x y))
  ctx)

(defn line-to [ctx x y]
  (. ctx (lineTo x y))
  ctx)

(defn alpha [ctx a]
  (set! ctx.globalAlpha a)
  ctx)

(defn save [ctx]
  (. ctx (save))
  ctx)

(defn restore [ctx]
  (. ctx (restore))
  ctx)

;;*********************************************
;; Canvas Entities
;;*********************************************

(defn add-entity [mc k ent]
  (aset (:entities mc) k ent))

(defn remove-entity [mc k]
  (js-delete (:entities mc) k))

(defn get-entity [mc k]
  (:value (aget (:entities mc) k)))

(defn update-entity [mc k func & extra]
  (let [cur (aget (:entities mc) k)
        res (apply func cur extra)]
    (aset (:entities mc) k res)))

(defn clear! [mc]
  (let [ks (js-keys (:entities mc))]
    (doseq [k ks]
      (remove-entity mc k))))

(defn entity [v update draw]
  {:value v
   :draw draw
   :update update})

(defn- attr [e a]
  (.getAttribute e a))

(defn draw-loop [{:keys [canvas updating? ctx active entities] :as mc}]
  (clear-rect ctx {:x 0 :y 0 :w (attr canvas "width") :h (attr canvas "height")})
  (when @active
    (let [ks (js-keys entities)
          cnt (alength ks)]
      (loop [i 0]
        (when (< i cnt)
          (let [k (aget ks i)
                {:keys [draw update value] :as ent} (aget entities k)]
            (when (and update @updating?)
              (let [updated (or (try (update value)
                                  (catch js/Error e
                                    (.log js/console e)
                                    value))
                                value)]
                (when (aget entities k)
                  (aset entities k (assoc ent :value updated)))))
            (when draw 
              (try
                (draw ctx (:value (aget entities k)))
                (catch js/Error e
                  (.log js/console e))))
            (recur (inc i))))))
    (core/animation-frame #(draw-loop mc))))

(defn monet-canvas [elem context-type]
  (let [ct (or context-type "2d")
        ctx (get-context elem ct)]
    {:canvas elem
     :ctx ctx
     :entities (js-obj)
     :updating? (atom true)
     :active (atom true)}))

(defn init [canvas & [context-type]]
  (let [mc (monet-canvas canvas context-type)]
    ;;(update-loop mc)
    (draw-loop mc)
    mc))

(defn stop [mc] (reset! (:active mc) false))
(defn stop-updating [mc] (reset! (:updating? mc) false))
(defn start-updating [mc] (reset! (:updating? mc) true))
(defn restart [mc] 
  (reset! (:active mc) true)
  (update-loop mc)
  (draw-loop mc))
