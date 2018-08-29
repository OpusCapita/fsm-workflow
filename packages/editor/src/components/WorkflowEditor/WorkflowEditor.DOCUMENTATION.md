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
    objectConfiguration: {
      stateFieldName: "status",
      alias: "invoice",
      schema: {
        type: "object",
        properties: {
          invoiceNo: {
            type: "string"
          },
          customerId: {
            type: "string"
          },
          supplierId: {
            type: "string"
          },
          netAmount: {
            type: "integer"
          },
          grossAmount: {
            type: "integer"
          },
          vatAmount: {
            type: "integer"
          },
          currencyId: {
            type: "string"
          },
          status: {
            type: "string"
          },
        },
        required: ["invoiceNo"]
      },
      example: {
        "invoiceNo": "1111",
        "customerId": "wefwefewfew",
        "supplierId": "33333",
        "netAmount": 1000,
        "grossAmount": 1200,
        "vatAmount": 200,
        "currencyId": "EUR",
        "status": "reviewRequired",
        "secondaryObject": {
          "number": 5675756,
          "text": "WHoa im text",
          "stringArray": ["first", "second", "boogaloo"],
          "thirdLevel": {
            "secretProp": "Secret indeed.",
            "someOtherProp": "23423432"
          }
        }
      }
    },
    "schema": {
      "name": "supplier approval",
      "initialState": "new",
      "finalStates": ["activated"],
      "states": [
        { "name": "new", "description": "new" },
        { "name": "activated", "description": "activated" },
        { "name": "inUpdatePending", "description": "inUpdatePending" },
        { "name": "inCustomerReview", "description": "inCustomerReview" },
        { "name": "inRegistration", "description": "inRegistration" },
        { "name": "inQualificationPending", "description": "inQualificationPending" },
        { "name": "inCommodityGroupApproval", "description": "inCommodityGroupApproval" },
        { "name": "rejected", "description": "rejected" },
        { "name": "inComplianceCheck", "description": "inComplianceCheck" },
        { "name": "inSupplierResponsibilityPending", "description": "inSupplierResponsibilityPending" }
      ],
      "transitions": [
        {
          "from": "new",
          "event": "doLicenseConfirm",
          "to": "inRegistration"
        },
        {
          "from": "activated",
          "event": "doLicenseConfirm",
          "to": "inUpdatePending"
        },
        {
          "from": "inUpdatePending",
          "event": "doCustomerReview",
          "to": "inCustomerReview",
          "actions": [{ "name": "onCustomerReview" }]
        },
        {
          "from": "inCustomerReview",
          "event": "approve",
          "to": "activated",
          "actions": [{ "name": "onCustomerApprove" }]
        },
        {
          "from": "inCustomerReview",
          "event": "return",
          "to": "inUpdatePending",
          "actions": [{ "name": "onCustomerReturn" }]
        },
        {
          "from": "inRegistration",
          "event": "doCustomerReview",
          "to": "inQualificationPending",
          "actions": [{ "name": "onCustomerReviewInRegistration" }]
        },
        {
          "from": "inQualificationPending",
          "event": "approve",
          "to": "inCommodityGroupApproval",
          "actions": [{ "name": "onApproveQualification" }]
        },
        {
          "from": "inQualificationPending",
          "event": "reject",
          "to": "rejected",
          "actions": [{ "name": "onRejectQualification" }]
        },
        {
          "from": "inQualificationPending",
          "event": "return",
          "to": "inRegistration",
          "actions": [{ "name": "onReturnQualification" }]
        },
        {
          "from": "inCommodityGroupApproval",
          "event": "approveCommodityGroups",
          "to": "inComplianceCheck",
          "actions": [{ "name": "onApproveCommodityGroups" }]
        },
        {
          "from": "inCommodityGroupApproval",
          "event": "rejectCommodityGroups",
          "to": "rejected",
          "actions": [{ "name": "onRejectCommodityGroups" }]
        },
        {
          "from": "inComplianceCheck",
          "event": "approve",
          "to": "inSupplierResponsibilityPending",
          "actions": [{ "name": "onApproveComplianceCheck" }]
        },
        {
          "from": "inComplianceCheck",
          "event": "reject",
          "to": "rejected",
          "actions": [{ "name": "onRejectComplianceCheck" }]
        },
        {
          "from": "inSupplierResponsibilityPending",
          "event": "done",
          "to": "activated",
          "actions": [{ "name": "onDone" }]
        }
      ]
    },
    actions: {
      testAction: {
        paramsSchema: {
          "type": "object",
          "properties": {
            nickname: {
              "type": "string"
            },
            fullName: {
              "type": "string",
              "uiComponent": "fullName"
            },
            age: {
              "type": "integer"
            },
            bankAccountBalance: {
              "type": "number"
            },
            adult: {
              "type": "boolean"
            },
            favoriteColor: {
              "type": "string",
              "enum": ['red', 'green', 'blue', 'yellow', 'I\'m achromate']
            },
            children: {
              "type": "integer",
              "enum": [0,1,2,3,4,5,6,7,8,9,10]
            },
            confidenceRate: {
              "type": "number",
              "enum": [15.75, 44.55, 66.7, 99999.9]
            },
            dateOfBirth: {
              "type": "string",
              "format": "date"
            },
            todoList: {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            nextLotteryNumbers: {
              "type": "array",
              "items": {
                "type": "integer"
              }
            },
            montlyInterestHistory: {
              "type": "array",
              "items": {
                "type": "number"
              }
            },
            importantDates: {
              "type": "array",
              "items": {
                "type": "string",
                "format": "date"
              }
            },
            dinnerMenu: {
              "type": "array",
              "items": {
                "type": "string",
                "enum": ['Steak', 'Vegetables', 'Mashrooms', 'Beer']
              }
            }
          }
        }
      },
      sendMail: {
        paramsSchema: {
          "type": "object",
          "properties": {
            fromAddress: {
              "type": "string"
            },
            greeting: {
              "type": "string"
            },
            sendCopy: {
              "type": "boolean"
            },
            maxRetries: {
              "type": "integer"
            },
            interest: {
              "type": "number"
            },
            language: {
              "type": "string",
              "enum": ['en', 'de', 'fi', 'ru', 'sv', 'no']
            },
            priority: {
              "type": "integer",
              "enum": [0, 1, 2, 3, 4, 5]
            },
            expiryDate: {
              "type": "string",
              "format": "date"
            }
          },
          "required": ["fromAddress", "greeting"]
        }
      },
      updateProcessedBy: {
        paramsSchema: {
          "type": "object",
          "properties": {
            processedByFieldName: {
              "type": "string"
            }
          },
          "required": ["processedByFieldName"]
        }
      }
    },
    conditions: {
      userHasRoles: {
        paramsSchema: {
          type: "object",
          properties: {
            restrictedRoles: {
              type: "array",
              items: {
                type: "string",
                enum: ["REV", "BOSS"]
              }
            }
          }
        }
      }
    }
  }}

  componentsRegistry={_scope.componentsRegistry}

  onSave={v => console.log(JSON.stringify(v.schema, null, 2))}

  schemaConfig = {{
    state: {
      availableNames: [
        'inspectionRequired',
        'approvalRequired',
        'approved',
        'inspClrRequired',
        'inspectionRejected',
        'appClrRequired',
        'approvalRejected',
        'rejected',
        'inspected'
      ]
    }
  }}
/>
```

## Contributors

Egor Stambakio <egor.stambakio@opuscapita.com>

## Component Name

WorkflowEditor

## License

Licensed by © 2018 OpusCapita