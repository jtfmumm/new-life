(ns new-life.data
  (:require [new-life.matrix :as mtx]))


;;CONFIG
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

(defn food-template [value]
    (cond
        (= value 1) {:color [51 256 0] :sprite food-sprite :alive true}
        (= value 2) {:color [51 153 0] :sprite food-sprite :alive true}
        (= value 3) {:color [51 51 0] :sprite food-sprite :alive true}))


;;WORLD
(def world-skeleton
  {:time 0
   :world-map {};(world/gen-world (initial-config :world-size))
   :fauna {};(world/gen-fauna)
   :sprites {0 (empty-sprite (:tile-size initial-config)) 1 food-sprite 2 food-sprite 3 food-sprite}
   :config initial-config
   :display {:selected 101
             :console-msg "> "}})




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