# WorkflowEditor

## Synopsis


### Props Reference

| Name                           | Type                     | Description                                                                                             |
| ------------------------------ | :----------------------  | -----------------------------------------------------------                                             |

## Details

## Code Example

```js
<WorkflowEditor
  title="Invoice"

  workflow={{
    schema: {
      name: "invoice approval",
      initialState: "open",
      finalStates: ["approved"],
      objectStateFieldName: "status",
      transitions: [
        {
          event: "validate",
          from: "open",
          to: "validated"
        },
        {
          event: "auto-approve",
          from: "open",
          to: "approved",
          guards: [
            {
              body: 'object.netAmount < 100'
            }
          ]
        },
        {
          event: "approve",
          from: "validated",
          to: "approved"
        }
      ]
    },
    states: [
      {
        id: 'initial_state_open_id',
        name: 'open',
        description: 'Description for open state.',
        isInitial: true
      },
      {
        name: 'validated',
        description: 'Description for validated state.'
      },
      {
        name: 'approved',
        description: 'Description for approved state.',
        isFinal: true
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