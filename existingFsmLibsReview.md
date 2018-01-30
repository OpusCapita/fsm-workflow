#### http://machina-js.org
It looks strange
 - states are dynamic, calculated inside function
 - is able to set up timer and timeout based automatic event sending via "on enter  " for specific state

#### http://statejs.org
- one of ideas is to define object states in each state object could behave differently

#### https://github.com/fschaefer/Stately.js
- action dynamically calculates and returns target state/node (or nothing to prevent transition)
- transition could be static, e.g. no action: {from, event, to}, to is a state (String) instead of action (function)

#### https://github.com/apla/dataflo.ws

Is not FSM. Looks more like mvc where controller actions are defined as series of tasks. Each task is actually one JS statement that is function call which result could be assigned to variable.
"project documentation sucks"

#### https://github.com/jakesgordon/javascript-state-machine

FSM: event, from, to
+
callbacks : onbefore<EVENT>, onafter<EVENT>, onleave<STATE>, onenter<STATE>
each callback is a function(event, from, to, <other passed arguments>)

guards could be emulated via onbefore<EVENT> and onleave<STATE>: if false is returned event is canceled

actions needs to be defined in callbacks, for example in onleave<STATE>

#### https://github.com/vzaccaria/fluent-fsm
transitions are defined using regular expressions
documentation is rather poor

#### https://github.com/neochrome/simple-fsm
defines states and machine behavior (methods/functions) in each state

fsm.SOMESTATE();
fsm.action1(); // action1 is available in "SOMESTATE"

#### http://ignitejs.com/getting_started/introduction.html
is not available, still sources without documentation is here: https://github.com/ignitejs/ignite

#### noblemachine (https://github.com/noblesamurai/noblemachine)
linear queue/state machine - no graph

#### Automata (https://github.com/hyperandroid/Automata)
supports automatic transitions - via defined timeout (!)
supports guards
supports subStates(?)

theoretically looks ok, but small amount of tests

#### https://github.com/stephenhandley/states
no events, just state e.g. object.state('some state') -> means set up specific state. in addition onEnter and onExit handlers could be defined

#### https://github.com/mtabini/chine
"schema" (graph) is not a plain JS object; basically each transition is a function, each state and event declaration is function call: name('event'), incoming('from state'), outcoming('to state')

#### https://github.com/dolphin278/fsm (https://github.com/dolphin278/graph)
transition is an edge
very primitive
callback for each successful transition could be defined

#### https://github.com/ichernev/node-state


#### https://github.com/vstirbu/fsm-as-promised
Heavy influenced by https://github.com/jakesgordon/javascript-state-machine

Based on Promise-s.

Improvements/extensions:
- function/callback argument is one object that has named properties 'name' (event), 'from', 'to', 'args' (passed when firing event)
- more callbacks: onleave, onenter, onentered - specific states/event agnostic

looks good, a lot of tests

#### http://getcontenttools.com/api/fsm

only simple transitions and callbacks
