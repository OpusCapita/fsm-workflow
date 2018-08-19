Actions (and conditions) configuration
========

Action storage
--------------
FS based, Action code could be server specific
(you can't run it out of the box in browser and expect successfull invocation result)

```javascript
// sendMail.js

function sendMail({ receiver, template, greeting }) {
  // ...do something
}

sendMail.paramsSchema = {
  "type": "object",
  "properties": {
    "receiver": {
      "type": "string"
    },
    // ..
  },
  "required": ["receiver"]
}

module.exports = sendMail;
```

**E.g.** as result we get JS object that is a function which has property __paramsSchema__.

Machine definition: action passing
----------------------------------

```javascript
actions: {
  "sendMail": require('./sendMail.js'),
  //    ...other actions
  }
}
```

When the same information is passed to Workflow editor, then action function will not be passed while but in reality only describing info will be in result JSON
```javascript
{
  "sendMail": {
    "paramsSchema": {
      "type": "object",
      "properties": {
        "fromAddress": {
          "type": "string"
        },
        "greeting": {
          "type": "string"
        },
        "sendCopy": {
          "type": "boolean"
        }
      },
      "required": ["fromAddress'", "greeting"]
    }
  }
 // ...other actions
}
```

Machine schema: action(s) invocation definition
----------------------------------------------

```javascript
{
  "name": "sendMail",               // action name
  "params": [                    // list of arguments
    {
      "name": "sendTo",             // actions receive own named parameters along with implicit ones (object, from, to, event, context...)
      "value": "support@client.com" // if no `expression` field is specified, `value` is directly mapped to value passed to editor
    },
    {
      "name": "greeting",
      "value": "path.to.some.prop", // possibly it will not be a string but object (?), will see later
      "expression": "path"          // if `expression` is specified, special rules are applied to value (see below); later
    }
  ]
}
```

`expression` field indicates that this argument needs a special component as editor input.

For now, we know about the need of 'path' expression, when a path to business object field can be specified as a parameter value for future invocation. Possible custom component should receive path string compatible with `lodash.get` and return a string of same type.
Proposed requirement for custom components: `in` and `out` values should be of the same schema type (string -> string, number -> number, object -> object of the same structure).


Type checking
--------------
For ordinary parameters type defined in paramsSchema should be the same as type of entered value.
For `path expression` perameters type is taken from paramsSchema and checked against **business object** schema (where type of field is defined).


Arguments types and corresponding editors
--------------
Action editor supports the following types of parameters and provides corresponding editor components. Types of parameters are defined in `paramsSchema` field of `action` object.

| Type        | Format | Enum | Component | Notes  |
| ------------- | --------- | ------- | --------- | ----- |
| `string`      |  |  | StringInput | Also used as a fallback component for types not mentioned in this table. Signature: `string` => `string`. |
| `string` |  | yes | EnumInput | Select box based on values in `enum` array. |
| `string` | `date` |  | DateInput | Accepts and returns `date` formatted date string. Signature: `date` => `date`.|
| `integer`      |  |  | IntegerInput | Signature: `integer` => `integer`. |
| `integer` |  | yes | EnumInput | Select box based on values in `enum` array. |
| `number` |  |  | DecimalInput | Treats all numbers as `decimal`. Signature: `number` => `number`. |
| `number` |  | yes | EnumInput | Select box based on values in `enum` array. |
| `boolean` |  |  | BooleanInput | Checkbox. |

For collection-type parameters it is possible to define `array` type in schema. In this case it is required to define also `items` field where schema of individual item is defined. For example:

```
someParameter: {
  "type": "array",
  "items": {
    "type": "number",
    ?"enum": [1, 2, 3, 4]
  }
}
```

UI components for `array` type are listed in the following table.

| Items type | Format | Enum | Component |
| ------------- | --------- | --------- | ------- |
| `string` |  |  | Collection of StringInput components |
| `string` | `date` |  | Collection of DateInput components |
| `string` |  | yes | MultiSelect |
| `integer` |  |   | Collection of IntegerInput components |
| `integer` |  |  yes | MultiSelect |
| `number` |  |  | Collection of NumberInput components |
| `number` |  | yes | MultiSelect |


