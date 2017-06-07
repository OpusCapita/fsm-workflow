### Actions and Conditions(guards/automatic)

1. JS code as text(expression). E.g.
  - condition ```invoice.total > 1000```
  - action ```sendEmail({to: 'mr.smith@dot.com'})```

2. Structured function call definition in JSON that refer to externally implemented/defined function and specified arguments:
  - condition
```
{
  name: 'totalCostIsGreaterThan'
  arguments: {
    value: 1000
  }
}
```
  - action
```
{
  name: 'sendEmail'
  arguments: {
    to: 'mr.smith@dot.com'
  }
}
```
3. ...other options?


Pure JavaScript is easier to define at once, but hard to support. Non developer will be able to write the code but its hard to believe that it would work and as javaScript untyped/dynamically typed language it is hard to constrain people from such error by checking/parsing the code. Code that is not written by developers and could be created on the fly in production is not supportable (ho to apply migration process to something that is not known).

> Anything that can go wrong will go wrong

With structured approach it is possible to update code/implantation as soon as you change/update application API in  non compatible way. Structural approach provides possibility to build up workflow UI designer that is more ( average) user friendly.
In simple case JS expression/code is much faster to write (no one can stop you from doing this, sure you'll do it):
```invoice.total > 1000```
 But that does not mean that people would be smart enough to not creates complexity by writing a lot of code:
```
if (invoice.items) {
    var foundItem = null;
    for (var i=0; i < invoice.items.legth; i++){
        if (invoice.item[i].amount > 700) {
            return true
        }
    }
}
return false
```
Instead there could named function with good description, input parameter (+ description and type definition like in React/Flow) and unit tests.
