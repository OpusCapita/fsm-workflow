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
  "schema": {
    "name": "Approval",
    "initialState": "created",
    "finalStates": [
      "waitingForPayment",
      "requiresReview",
      "closed"
    ],
    "objectStateFieldName": "status",
    "states": [
      {
        "name": "created",
        "description": "Created"
      },
      {
        "name": "valid",
        "description": "Valid"
      },
      {
        "name": "requiresReview",
        "description": "Requires Review"
      },
      {
        "name": "closed",
        "description": "Closed"
      },
      {
        "name": "ready",
        "description": "Ready to be paid"
      },
      {
        "name": "waitingForPayment",
        "description": "WaitingForPayment"
      }
    ],
    "transitions": [
      {
        "event": "valid",
        "from": "created",
        "to": "valid"
      },
      {
        "event": "not valid",
        "from": "created",
        "to": "requiresReview"
      },
      {
        "event": "is internal or prepaid",
        "from": "valid",
        "to": "closed"
      },
      {
        "event": "approve",
        "from": "valid",
        "to": "ready",
        "guards": [
          {
            "name": "guard_04403761948612651"
          }
        ]
      },
      {
        "event": "ERP approved",
        "from": "ready",
        "to": "waitingForPayment"
      },
      {
        "event": "ERP declined",
        "from": "ready",
        "to": "closed"
      }
    ]
  },
  "guards": [
    {
      "name": "guard_04403761948612651",
      "body": "object.netAmount < 1000000"
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