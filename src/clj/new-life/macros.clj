(ns new-life.macros)

(defmacro new-organism [uid & properties]
	`(def ~(symbol (str "org" uid)) ~@properties))