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
    "name": "InvoiceApproval",
    "initialState": "inspectionRequired",
    "finalStates": [
      "approved"
    ],
    "objectStateFieldName": "status",
    "transitions": [
      {
        "from": "inspectionRequired",
        "to": "approvalRequired",
        "event": "inspect",
        "guards": [
          {
            "name": "guard_15486021085119572"
          }
        ]
      },
      {
        "from": "inspectionRequired",
        "to": "approvalRequired",
        "event": "automatic-inspect"
      },
      {
        "from": "inspectionRequired",
        "to": "inspClrRequired",
        "event": "sendToClarification"
      },
      {
        "from": "inspClrRequired",
        "to": "inspectionRequired",
        "event": "clarifyForInspection"
      },
      {
        "from": "inspectionRequired",
        "to": "inspectionRejected",
        "event": "rejectInspection"
      },
      {
        "from": "inspClrRequired",
        "to": "inspectionRejected",
        "event": "rejectInspection"
      },
      {
        "from": "inspectionRejected",
        "to": "inspectionRequired",
        "event": "cancelRejection"
      },
      {
        "from": "approvalRequired",
        "to": "inspectionRequired",
        "event": "cancelInspection"
      },
      {
        "from": "approvalRequired",
        "to": "inspectionRejected",
        "event": "rejectInspection"
      },
      {
        "from": "approvalRequired",
        "to": "approved",
        "event": "approve"
      },
      {
        "from": "approvalRequired",
        "to": "appClrRequired",
        "event": "sendToClarification"
      },
      {
        "from": "approvalRequired",
        "to": "inspClrRequired",
        "event": "sendToClarification"
      },
      {
        "from": "approvalRequired",
        "to": "approvalRejected",
        "event": "rejectApproval"
      },
      {
        "from": "appClrRequired",
        "to": "approvalRequired",
        "event": "clarifyForApproval"
      },
      {
        "from": "appClrRequired",
        "to": "approvalRejected",
        "event": "rejectApproval"
      },
      {
        "from": "approved",
        "to": "approvalRequired",
        "event": "cancelApproval"
      },
      {
        "from": "approved",
        "to": "approvalRejected",
        "event": "rejectApproval"
      },
      {
        "from": "approved",
        "to": "appClrRequired",
        "event": "sendToClarification"
      },
      {
        "from": "approvalRejected",
        "to": "approvalRequired",
        "event": "cancelRejection"
      }
    ],
    "states": [
      {
        "name": "inspectionRequired",
        "description": "Inspection Required"
      },
      {
        "name": "approvalRequired",
        "description": "Approval Required"
      },
      {
        "name": "inspClrRequired",
        "description": "Insp Clr Required"
      },
      {
        "name": "inspectionRejected",
        "description": "Inspection Rejected"
      },
      {
        "name": "approved",
        "description": "Approved"
      },
      {
        "name": "appClrRequired",
        "description": "App Clr Required"
      },
      {
        "name": "approvalRejected",
        "description": "Approval Rejected"
      }
    ]
  },
  "guards": [
    {
      "name": "guard_15486021085119572",
      "body": "object.netAmount > 0"
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