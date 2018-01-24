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
      initialState: "open",
      finalStates: ["approved"],
      objectStateFieldName: "status",
      transitions: [
        {
          event: "approve",
          from: "open",
          to: "approved",
          guards: [
            {
              name: 'condition_awesome-guard'
            }
          ]
        }
      ]
    },
    guards: [
      {
        name: 'condition_awesome-guard',
        body: 'object.netAmount > 100'
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

  onSave={console.log}
/>
```

## Contributors

Egor Stambakio <stambakio@scand.com>

## Component Name

WorkflowEditor

## License

Licensed by © 2018 OpusCapita