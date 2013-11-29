# new-life

Evolution simulator using canvas and core.async

"Complicating, circulating  
New life, new life  
Operating, generating  
New life, new life"  

## Overview

The simulator begins by seeding the environment with randomly generated pixel creatures.
These creatures lose energy with every tick of the clock and will die if their energy reaches 0.
There are two ways to regain energy.  They can either eat plants or, if they are aggressive, 
other creatures.  They are able to produce mutated offspring.  An analogue of natural selection 
causes the creatures to evolve.

You can click a creature to see its characteristics, and you can pause the simulation by
clicking the "Toggle pause/play" button.

### Movement

Creatures take in information about their immediate surroundings, and depending on their
preferences, decide whether to move in a particular direction or follow some randomized
algorithm for moving.

### Reproduction and Mutation

There are fixed odds for reproduction every tick.  If a creature reproduces, it does so
asexually.  Reproducing costs energy.  The offspring's characteristics are mutations of its parent's.  
Offspring are born with only half their max energy, so they must find food relatively quickly.
The offspring's sprite, color, and name are among the characteristics that mutate.  However,
the first name represents the creature's genus and does not mutate.  If two creatures share
a genus name, they are kin.   

### Energy Sources

The main source of energy is plants.  Plants grow according to controlled randomness.  
They are more likely to appear near healthy plants.  And the more
healthy plants in their vicinity, the more healthy they appear.  Healthier plants provide 
greater energy boosts to creatures.

The second source of energy is other creatures.  Eating others is only possible for creatures with a
positive preference for pursuing non-kin.  Creatures never attack kin.  Attacking another creature
leads to a trading of blows, and the prey has a certain likelihood of evading every round of combat.

### Misc.

Other characteristics govern a creature's need to rest, its likelihood of wandering after long bouts 
of hunger, and its method of determining random moves when there is not enough information in
its vicinity to make a decision.  

## License

Copyright © 2013 John Mumm

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.
