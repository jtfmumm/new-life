(ns new-life.data
  (:require [new-life.matrix :as mtx]
            [new-life.utilities :as u]))


;;CONFIG
(def initial-config
    {:tile-size 8
     :world-size 100
     :tick 50
     :reproduction-rate 0.75
     :food-rate 20    ;Rate food grows
     :food-amount 10     ;Amount of food per cycle
     :food-boost 40     ;How much energy does full food give?
     :initial-food 40   ;How much food at start?
     :food-range 7    ;How distant can plants be to have an effect?
     :reproduction-cost 30
    })

(defn list-uids [world]
    (keys (:fauna world)))

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
   :pause false
   :world-map [];(world/gen-world (initial-config :world-size))
   :tile-types []
   :smells []
   :sounds []
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

(defn get-syllable []
  (syllables (u/pick-rand-int 0 (dec (count syllables)))))

(defn get-syllable-list [max-syls]    
  (let [syls (u/pick-rand-int 1 max-syls)]
    (loop [counter syls output []]
      (if (> counter 0)
       (recur (dec counter) (conj output (get-syllable)))
        output))))

(defn get-species-name []    
  (get-syllable-list 4))

(defn get-genus-name []
  (get-syllable-list 3))

(defn generate-name []
  [(get-genus-name) (get-species-name)])


;;MOVEMENT
(defn generate-move-matrix []
    (mtx/create-weighted-matrix 9 (partial u/pick-norm-dist 10 1)))

(def cardinal-directions
    {0 [0 0]
     1 [0 -1]
     2 [1 0]
     3 [0 1]
     4 [-1 0]})
