(ns new-life.data
  (:require [new-life.matrix :as mtx]
            [new-life.utilities :as u]))


;;CONFIG
(def initial-config
    {:tile-size 8
     :world-size 99
     :tick 200
     :reproduction-rate 0.01
     :food-rate 20    ;Rate food grows
     :food-amount 15     ;Amount of food per cycle
     :food-boost 40     ;How much energy does full food give?
     :initial-food 40   ;How much food at start?
     :food-range 7    ;How distant can plants be to have an effect?
    })

;;TILES
(def tile-types 
    [:plains :forest :hills :river :lake])

(def tile-colors
  {:plains [255 255 227 1] :forest [210 255 196 1] :hills [255 255 132 1]
   :river [192 247 254 1] :lake [96 148 219 1]})

(def blank-tile
    {:object 0 
     :type (tile-types 0)
     :scent 0 
     :sound 0 
     })


;;OBJECTS
(def food-sprite 
    [[0 0 0 0 0 0 0 0]
     [0 0 0 0 1 0 1 0]
     [0 1 0 1 0 1 0 0]
     [0 0 1 1 1 0 0 0]
     [0 1 0 1 1 0 1 0]
     [0 0 0 1 1 1 0 0]
     [0 0 0 1 1 0 0 0]
     [0 0 0 0 0 0 0 0]
    ])

(defn empty-sprite [tile-size]
  (mtx/create-matrix tile-size 0))

(defn background-sprite [tile-size]
  (mtx/create-matrix tile-size 1))

(defn food-template [value]
    (cond
        (= value 1) {:color [51 255 0 1] :sprite food-sprite :alive true}
        (= value 2) {:color [51 255 0 (/ 1 2)] :sprite food-sprite :alive true}
        (= value 3) {:color [51 255 0 (/ 1 3)] :sprite food-sprite :alive true}))

(defn food-value [x]
    (cond
        (= x nil) 0
        (= x 1) 1
        (= x 2) (/ 1 2)
        (= x 3) (/ 1 3)
        :else 0))

(defn plant-vitality [plenty]
    (cond
        (< plenty 1) 3
        (< plenty 2) 2
        :else 1))


;;WORLD
(def world-skeleton
  {:time 0
   :world-map [];(world/gen-world (initial-config :world-size))
   :fauna {};(world/gen-fauna)
   :sprites {1 food-sprite 2 food-sprite 3 food-sprite}
   :config initial-config
   :display {:selected 101
             :console-msg "> "}})


;;ORGANISMS
(defn gen-org-sprite [size]
    (mtx/create-random-matrix size (partial u/pick-weighted-int 0 1 [2 1])))


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
    (let [syls (u/pick-rand-int 1 4)]
        (loop [counter syls output []]
            (if (> counter 0)
                (recur (dec counter) (conj output (syllables (u/pick-rand-int 0 (count syllables)))))
                (apply str output)))))

(defn add []
    (+ 1 1))

;;MOVEMENT
(defn generate-move-matrix []
    (mtx/create-weighted-matrix 9 (partial u/pick-rand-int 7 10)))










(comment
;;GET DATA
(defn get-current-time []
	@current-time)

(defn get-config [world k] 
	((world :config) k))

(defn get-world []
	@world)

(defn get-tile [x y]
	((@world y) x))

(defn check-tile [x y]
	(((@world y) x) :object))

(defn get-fauna
	([] @fauna)
	([uid] (@fauna uid)))

(defn get-trait [uid trait]
	((@fauna uid) trait))

(defn list-uids []
	(keys @fauna))


;;SET DATA
(defn set-current-time! [new-time]
	(reset! current-time new-time))

(defn set-configuration! [parameters]
	(reset! config parameters))

(defn update-setting! [k v]
	(reset! config (assoc @config k v)))

(defn set-tile! [x y k v]
	(let [row (@world y)]
	(reset! world (assoc @world y (assoc row x (assoc (row x) k v))))))

(defn set-trait! [uid trait value]
    (reset! fauna (assoc-in @fauna [uid trait] value)))

(defn gen-organism! [uid properties]
    (reset! fauna (assoc @fauna uid properties)))
)