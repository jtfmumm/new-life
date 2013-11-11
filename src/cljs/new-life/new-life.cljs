(ns new-life.core
    (:require-macros [cljs.core.async.macros :refer [go] :as a])
    (:require 
     		[cljs.core.async :refer [put! timeout chan map<]]
     		[goog.events :as events]
	       	[jayq.core :as jq]
	       	[monet.canvas :as mo])
   	(:use [jayq.core :only [$]]))

(def TILE-SIZE 8)
(def WORLD-SIZE 100)
(def TICK 200)
(def REPRODUCTION-RATE 0.01)
(def FOOD-RATE 0.01)
(def FOOD-AMOUNT 5)
(def FOOD-BOOST 40)


;;UTILITIES
(defn make-counter [init-val] 
    (let [c (atom init-val)] #(swap! c inc)))

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

(defn consv [item vect]
    (into [] (cons item vect)))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;WORLD
;;  0-Empty
;;  1-10 Food
;;  100+ UIDs for organisms
(defn gen-world-row []
    (loop [counter 0 world-row []]
        (if (<= counter WORLD-SIZE)
            (recur (inc counter) (conj world-row 0))
            world-row)))

(defn gen-world []
    (loop [counter 0 world []]
        (if (<= counter WORLD-SIZE)
            (recur (inc counter) (conj world (gen-world-row)))
            world)))
  
(def world (atom #{}))

(reset! world (gen-world))

(def current-info (atom #{}))

(def current-time (atom #{}))

(reset! current-time 0)

(defn check-tile [x y]
    (((deref world) y) x))

(defn set-tile! [value x y]
    (let [row ((deref world) y)]
    (reset! world 
        (assoc (deref world) y (assoc row x value)))))

(defn world-coord [x]
    (* x TILE-SIZE))


;;ORGANISMS
(def fauna (atom #{}))

(reset! fauna {}) ;Initialize

(defn list-ids []
      (keys (deref fauna)))

(def get-uid (make-counter 100))

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

(defn get-trait [uid trait]
    (((deref fauna) uid) trait))

(defn set-trait! [uid trait value]
    (reset! fauna (assoc-in (deref fauna) [uid trait] value)))

(defn gen-organism! [uid properties]
    (reset! fauna (assoc (deref fauna) uid properties)))


;;OBJECTS
(def food-sprite 
    [[0 0 0 1 0 0 0 0]
     [0 0 0 0 1 0 1 0]
     [0 1 0 1 0 1 0 0]
     [0 0 1 1 1 0 0 1]
     [0 1 0 1 1 0 1 0]
     [1 0 0 1 1 1 0 1]
     [0 0 0 1 1 0 0 0]
     [0 0 0 1 1 0 0 0]
    ])

(def food-template
    {:color [0 256 0] :sprite food-sprite :alive true})

(reset! fauna {assoc (deref fauna) 1 food-template})

(defn place-food [times]
    (loop [x (pick-rand-int 0 WORLD-SIZE) y (pick-rand-int 0 WORLD-SIZE)
          counter times]
      (do
        (if (= (check-tile x y) 0)
            (set-tile! 1 x y))
        (if (> counter 0)
            (recur (pick-rand-int 0 WORLD-SIZE) (pick-rand-int 0 WORLD-SIZE) (dec counter))))))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;  JavaScript Implementation  ;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

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


;;SCREEN DRAWING
(defn draw-organism-at [uid x y]
    (let [sprite (get-trait uid :sprite) color (get-trait uid :color)]
        (draw-matrix world-canvas color (world-coord x) (world-coord y) sprite TILE-SIZE 1)))

(defn draw-organism [uid]
    (let [x (get-trait uid :x) y (get-trait uid :y)
          sprite (get-trait uid :sprite) color (get-trait uid :color)]
        (draw-matrix world-canvas color (world-coord x) (world-coord y) sprite TILE-SIZE 1)))

(defn clear-sprite [x y]
    (let [x (world-coord x) y (world-coord y)]
    (clear-rectangle world-canvas x y (+ x TILE-SIZE) (+ y TILE-SIZE))))

(defn clear-screen []
    (clear-rectangle world-canvas 0 0 (* WORLD-SIZE 8) (* WORLD-SIZE 8)))

(defn clear-info []
    (clear-rectangle info-canvas 0 0 64 64))

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

(defn info-sprite [uid]
    (clear-info)
    (jq/html ($ :#info) "")
    (if-not (= ((deref fauna) uid) nil)
      (let [color (get-trait uid :color) 
            sprite (get-trait uid :sprite)
            energy (get-trait uid :energy)
            energy-max (get-trait uid :energy-max)
            title (get-trait uid :name)
            move-matrix (get-trait uid :move-matrix)
            ]
        (do
           (draw-matrix info-canvas color 0 0 sprite TILE-SIZE 8)
           (jq/html ($ :#info) (str "<p><br>Name: the " title 
                                    "<br>Energy: " energy 
                                     "<br>Max Energy: " energy-max
                                     "<br>Movement Matrix:"
                                     "<br>" (display-move-matrix move-matrix)
                                     "</p>"))))))

(defn update-timer []
    (jq/html ($ :#timer) (str "<p>Time: " (deref current-time))))
    
(defn draw-world-row [y]
    (loop [counter 0]
        (if (< counter WORLD-SIZE)
          (let [curval (check-tile counter y)]
                (if (and (not (= curval 0))
                      (get-trait curval :alive))
                            (draw-matrix world-canvas 
                                (get-trait curval :color) 
                                (world-coord counter) (world-coord y)
                                (get-trait curval :sprite) TILE-SIZE 1))
                (recur (inc counter))))))

(defn draw-world []
    (loop [counter 0]
        (if (< counter WORLD-SIZE)
            (do
              (draw-world-row counter)
              (recur (inc counter))))))


;;CONSOLE
(def console-msgs (atom #{}))

(reset! console-msgs ["Complicating, circulating" "New life, new life" 
                      "Operating, generating" "New life, new life" "..."])

(defn print-to-console [msg]
    (reset! console-msgs (conj (into [] (rest (deref console-msgs))) msg)))

(defn update-console []
    (let [msgs (deref console-msgs)]
      (jq/html ($ :#display) 
          (str 
              "> " (first msgs) "<br><br>"
              "> " (first (rest msgs)) "<br><br>"
              "> " (first (rest (rest msgs))) "<br><br>"
              "> " (first (rest (rest (rest msgs)))) "<br><br>"
              "> " (first (rest (rest (rest (rest msgs)))))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;MECHANICS
(defn hit-wall [x]
    (cond
        (< x 0) 0
        (> x WORLD-SIZE) WORLD-SIZE
        :else x))

(defn walk-drunk [x]
    (hit-wall (+ x (pick-rand-int -1 1))))

(defn walk-random [uid]
    (let [last-move (get-trait uid :last-move)
          row ((get-trait uid :move-matrix) last-move)
          row-total (row 0)
          roll (pick-rand-int 0 row-total)]
          (loop [counter 1 total 0]
              (let [cell-value (row counter)]
              (if (<= roll (+ total cell-value))
                  counter
                  (recur (inc counter) (+ total cell-value)))))))

(defn directed-move-x [x direction]
    (cond
        (and (>= direction 1) (<= direction 3)) (hit-wall (dec x))
        (and (>= direction 4) (<= direction 6)) (hit-wall x)
        (and (>= direction 7) (<= direction 9)) (hit-wall (inc x))))

(defn directed-move-y [y direction]
    (cond
        (or (= direction 1) (= direction 4) (= direction 7)) (hit-wall (dec y))
        (or (= direction 2) (= direction 5) (= direction 8)) (hit-wall y)
        (or (= direction 3) (= direction 6) (= direction 9)) (hit-wall (inc y))))

(defn try-move [uid]
    (let [x (get-trait uid :x) y (get-trait uid :y)
          new-direction (walk-random uid)
          new-x (directed-move-x x new-direction) new-y (directed-move-y y new-direction)]
          (if (= (check-tile new-x new-y) 0)
              (if-not (and (= new-x x) (= new-y y))
                      (do
                        (set-tile! uid new-x new-y) ;Claim new tile
                        (set-trait! uid :x new-x)
                        (set-trait! uid :y new-y)
                        (set-tile! 0 x y) ;Tell world you've left 
                      )))))

(defn check-life [uid]
    (get-trait uid :alive))

(defn check-energy [uid]
    (if (< (get-trait uid :energy) 1)
      (do
        (set-trait! uid :alive false) 
        ;(reset! fauna (dissoc (deref fauna) uid))
        (set-tile! 0 (get-trait uid :x) (get-trait uid :y))
        false)
      true))

(defn use-energy [uid]
    (let [energy (get-trait uid :energy)]
        (set-trait! uid :energy (dec energy))))

(defn eat-up [uid food]
    (let [energy (get-trait uid :energy) 
          energy-max (get-trait uid :energy-max)]
        (if (<= (+ FOOD-BOOST energy) energy-max)
            (set-trait! uid :energy (+ energy FOOD-BOOST))
            (set-trait! uid :energy energy-max))))

(defn find-food [uid]
    (let [x (get-trait uid :x) y (get-trait uid :y)
          ;Get neighboring coordinates
          coords [[(dec x) (dec y)]
                  [(dec x) y]
                  [(dec x) (inc y)]
                  [x (dec y)]
                  [x (inc y)]
                  [(inc x) (dec y)]
                  [(inc x) y]
                  [(inc x) (inc y)]]]
      (loop [counter 0]
          (if (< counter 8)
            (let [this-x (first (coords counter)) this-y (second (coords counter))]
              (if (and (and (>= this-x 0) (<= this-x WORLD-SIZE))
                       (and (>= this-y 0) (<= this-y WORLD-SIZE)))
                  (if (= (check-tile this-x this-y) 1)
                    (do
                        (set-tile! 0 this-x this-y)
                        (eat-up uid 1))
                    (recur (inc counter)))
              (recur (inc counter))))))))


;;NAMES
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
    (let [syls (pick-rand-int 1 4)]
        (loop [counter syls output []]
            (if (> counter 0)
                (recur (dec counter) (conj output (syllables (pick-rand-int 0 (count syllables)))))
                (apply str output)))))

(defn generate-move-row []
    ;Higher values represent increasing odds of choosing
    ;Position 0 represents total of row's values
    (loop [counter 1 row []]
        (if (< counter 10)
            (recur (inc counter) (conj row (pick-rand-int 0 10)))
            (consv (reduce + row) row))))

(defn generate-move-matrix []
    ;Rows and columns represent possible movements
    ;Movements are from 1-9 (5 represents current tile)
    ;  1 2 3
    ;  4 5 6
    ;  7 8 9
    (loop [counter 1 matrix [[]]]
        (if (< counter 10)
            (recur (inc counter) (conj matrix (generate-move-row)))
            matrix)))


;;GENERATING
(defn initialize-organism [uid x y]
    (let [;x (pick-rand-int 10 50) y (pick-rand-int 10 50)  
          sprite (gen-org-box TILE-SIZE) 
          color [(pick-rand-int 0 256) (pick-rand-int 0 256) (pick-rand-int 0 256)]
          energy-max (pick-rand-int 80 120) energy energy-max
          title (generate-name) move-matrix (generate-move-matrix)]
    {:x x :y y :last-x x :last-y y
     :sprite sprite :color color
     :move-matrix move-matrix 
     :last-move 5
     :energy-max energy-max :energy energy
     :uid uid :alive true :name title}))

(defn deploy-organism [x y]
  (let [uid (get-uid)]
    (do
      (gen-organism! uid (initialize-organism uid x y))
      (draw-organism uid))))


;;INPUT
(defn events [el type]
  (let [out (chan)]
    (events/listen el type
      (fn [e] (put! out e)))
    out))

(defn pos [e]
  [(.-clientX e) (.-clientY e)])

(defn by-id [id]
  (. js/document (getElementById id)))

(defn listen [el evt func]
  (. el addEventListener evt func))

(defn offset []
    (let [space (jq/offset $world-canvas)]
    (vector (:left space) (:top space))))

(defn report-coords [e]
    (let [offset (offset)]
    ;Calculate x y coordinates of clicked spot in terms of Tiles
    {:x (.floor js/Math (/ (.ceil js/Math (- (.-clientX e) (first offset)))
                          TILE-SIZE))
     :y (.floor js/Math (/ (.ceil js/Math (- (.-clientY e) (second offset)))
                          TILE-SIZE))}))

(defn update-info [coords]
    (let [uid (check-tile (:x coords) (:y coords))]
       (if (> uid 100)
        (reset! current-info uid))))

(jq/bind $world-canvas :click (fn [e] (update-info (report-coords e))))

(reset! current-info 101) ;Grab random info on first organism


;;LOOP
(defn organism-upkeep [uid]
  (if (> uid 100) ;Is this an organism?
    (if (check-life uid)
      (if (check-energy uid) 
         (do
            (use-energy uid)
            (find-food uid)      
            (try-move uid)) 
         (print-to-console (str "the " (get-trait uid :name) " went extinct in round " @current-time "!"))))))

(defn update-organisms []
    (doseq [uids (list-ids)] (organism-upkeep uids)))

(defn run-simulation []
      (clear-screen)
      (update-organisms)
      (if (> (pick-rand-int 0 100) 80) (place-food FOOD-AMOUNT))
      (info-sprite (deref current-info))
      (draw-world))

(defn simulation []
  (go
    (while true
      (<! (timeout TICK))
      (reset! current-time (inc (deref current-time)))
      (update-timer)
      (update-console)
      (run-simulation))))

(deploy-organism 10 20)
(deploy-organism 20 20)
(deploy-organism 30 20)
(deploy-organism 40 20)
(deploy-organism 50 20)
;(deploy-organism 15 20)
;(deploy-organism 16 20)
;(deploy-organism 17 20)
;(deploy-organism 18 20)
;(deploy-organism 19 20)
;(deploy-organism 20 20)


(simulation)
