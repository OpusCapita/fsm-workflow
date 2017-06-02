## Intro
Task manager is and addition to workflow machine (Machine class). It is designed to monitor 
objects (a.k.a. _tasks_) for which workflow is started (status field is in between initial 
and final state) and execute _automatic_ transitions.

## Configuration
###Workflow schema with automatic transitions example:
```
{
  "name": "process",
  "initialState": "started",
  "finalStates": [
    "finished"
  ],
  "objectStateFieldName": "status",
  "transitions": [
    {
      "from": "started",
      "event": "register",
      "to": "registered",
      "actions": [
        {
          "name": "logAction"
        }
      ]
    },
    {
      "from": "registered",
      "event": "toAutoBranch",
      "to": "autoStepA",
      "actions": [
        {
          "name": "logAction"
        }
      ]
    },
    {
      "from": "autoStepA",
      "event": "autoEvent1",
      "to": "autoStepB",
      "actions": [
        {
          "name": "logAction"
        }
      ],
      "auto": [
        {"name": "isTrue"}
      ]
    },
    {
      "from": "autoStepB",
      "event": "autoFinish",
      "to": "finished",
      "actions": [
        {
          "name": "logAction"
        }
      ],
      "auto": [
        {"name": "isTrue"}
      ]
    }
  ]
}

```

_isTrue_ - is a 'auto' guard, function that should exist in {guards} parameter of _MachineDefinition_ 
constructor.

_Auto-guards_ execution result (should be true or false) signal whether to execute or not transition automatically.
If you need the node to be automatic 'as is by default' configure it like "auto": []

###Configuring process Manager
```
      this.machine = new Machine({
        machineDefinition: new MachineDefinition({schema,actions,guards}),
        context
      });
  
      this.processManager = new TaskManager({
        machine: this.processMachine,
        search: search,
        update: update
      });
      
      //function that return promise that is resolved with task list
      function search(searchParams) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([{status: ''}, {status: ''}]);
          }, 500)
        })
      };
      
     //function that return promise that is resolved afte object saving
     function update(object) {
       return new Promise((resolve, reject) => {
        //some hard-working persistent saving code
        resolve();
       })
     };
```

##Starting the process
After configuration there is only one thing is left behind - to start task list monitoring.
```
  const timeout = 1000;
  processManager.run(timeout); 
```

_timeout_ argument indicates the frequency of calling _search_ action and checking for 
available automatic event / sending events (in case found auto-transitions);

##Stopping the process
If the time has come to kill the process, you have to do the next:
```
  processManager.stop(); 
```
This method return true/false in case of correct/incorrect process finish, correspondingly.

##Getting ongoing/stopped process statistic
Sometime you may need to get the process statistic (currently available values are: machine name,
start & end timestamps)

```
  processManager.processCache
```

This field is an object with next signature:
{<timer_descriptor> : {
  <name>,
  <started>,
  <finished>
}}

TBD: increase process cache notation usability
TBD: add 1 by 1 event sending queue


