(ns new-life.macros)

(defmacro unique-name [prefix uid]
	~(str prefix uid))