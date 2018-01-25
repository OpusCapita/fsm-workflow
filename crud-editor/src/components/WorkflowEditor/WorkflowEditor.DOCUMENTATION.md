# WorkflowEditor

## Synopsis


### Props Reference

| Name                           | Type                     | Description                                                                                             |
| ------------------------------ | :----------------------  | -----------------------------------------------------------                                             |

## Details

## Code Example

```js
<WorkflowEditor
  title="Contract"

  workflow={{
    schema: {
      name: "invoice approval",
      initialState: "start",
      finalStates: ["finish"],
      objectStateFieldName: "status",
      transitions: [
        {
          event: "event 1",
          from: "start",
          to: "step 1"
        },
        {
          event: "event 2",
          from: "start",
          to: "finish"
        },
        {
          event: "event 3",
          from: "step 1",
          to: "finish"
        }
      ]
    },
    transitionGuards: [
      {
        transition: {
          event: "event 1",
          from: "start",
          to: "step 1"
        },
        guards: [
          {
            body: 'object.netAmount > 100'
          }
        ]
      }
    ]
  }}

  exampleObject={{
    "invoiceNo": "1111",
    "customerId": "22222",
    "supplierId": "33333",
    "netAmount": 1000,
    "grossAmount": 1200,
    "vatAmount": 200,
    "currencyId": "EUR",
    "status": "reviewRequired"
  }}

  onSave={v => console.log(JSON.stringify(v, null, 2))}
/>
```

## Contributors

Egor Stambakio <stambakio@scand.com>

## Component Name

WorkflowEditor

## License

Licensed by © 2018 OpusCapita