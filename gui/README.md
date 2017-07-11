# FSM GUI

## Visual representation

### State node

```
―――*――――*――――*――――
|                |
*   Node Title   *
|                |
―――*――――*――――*――――

"|" and "―" - are border of rectangle element
"*" - is a port
```

- [ ] should render rectangle element
- [ ] should render title at the center of rectangle element
- [ ] should increase or decrease rectangle element width on title length change
- [ ] should be draggable by mouse
- [ ] should render 8 *ports* at the sides of rectangle
- [ ] should start new transition creation on left mouse button down
- [ ] should finish new transition creation on left mouse button up
- [ ] should have coordinates properties `x` and `y`

### Transition

```
[start state port] ――――――――Transition-1――――――――> [end state port]



        
                           [start state port]
                                    |    
                                    |    
                                    |    
                                    /    
                                   /     
                             Transition-2
                                 /       
[end state port]<―――――――――――――――/       
```

- [ ] should render [bezier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
- [ ] should render an arrow directed to `endState` at bezier curve
- [ ] should have two draggable [control points](https://en.wikipedia.org/wiki/Control_point_(mathematics))
- [ ] should have property `startState`
- [ ] should have property `startStatePort`
- [ ] should have property `endState`
- [ ] should have property `endStatePort`

### Viewport

```
|――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――|
|                                                                      |
|       ――*―――*―――*――                             ――*―――*―――*――        |
|       |           |                             |           |        |
|       *  State-1  *<―――――――Transition-1―――――――――*  State-2  *        |
|       |           |                             |           |        |
|       ――*―――*―――*――                             ――*―――*―――*――        |
|                                                       |              |
|                                                       |              |
|                                                       |              |
|                                                       /              |
|                                                      /               |
|                    ――*―――*―――*――               Transition-2          |
|                    |           |                   /                 |
|                    *  State-3  *<―――――――――――――――――/                  |
|                    |           |                                     |
|                    ――*―――*―――*――                                     |
|                                                                      |
|――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――|
```

* should render rectangle area
* should render children (states and transitions)
* should pan by holding left mouse button + mouse move
* should zoom by mouse wheel

## Existing libraries for creating flow diagram editors

### React based

#### [STORM React Diagrams](https://github.com/projectstorm/react-diagrams)

* 272 stars on github; May 2016 - Jul 2017; MIT License; 
* Written in TypeScript. Author's comment below:

> Because it can transpile into any level of ECMA Script, and the library got really complicated, so I ported it to Typescript to accommodate the heavy architectural changes I was starting to make. <3 Type Script

* Well readable source code
* Pure documentation
* Has no tests
* 

#### [The Graph Editor](https://github.com/flowhub/the-graph)

* 503 stars on github; Sep 2013 - Jul 2017; MIT License; more-less actively maintained
* Focus on graphs used for dataflow and Flow-based programming
* Pure documentation (Some docs can be found at maintainer-company [product docs](https://noflojs.org/documentation/graphs/))
* Has tests written in CoffeeScript

```
/* Node */

           ――――――――――――――――――
           |                |
In port 1  *                *  Out port 1
           |                | 
           |                | 
In port 2  *   Node icon    *  Out port 2
           |                | 
           |                | 
In port 3  *                *  Out port 3
           |                |
           ――――――――――――――――――
           |   Node title   | 
           ――――――――――――――――――
```

**There is no sense to consider this library because :**

* Nodes can be connected in only `Out port => In port` ports relations - it's not what we need

### Non-React based
  * http://modeling-languages.com/javascript-drawing-libraries-diagrams/
