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
      "name": "InvoiceApproval",
      "initialState": "inspectionRequired",
      "finalStates": [
        "approved"
      ],
      "transitions": [
        {
          "from": "inspectionRequired",
          "to": "approvalRequired",
          "event": "inspect",
          "guards": [
            {
              expression: "invoice[\"netAmount\"] > 100"
            },
            {
              name: 'userHasRoles',
              params: [
                {
                  name: 'restrictedRoles',
                  value: ['REV']
                }
              ],
              negate: true
            }
          ],
          "actions": [
            {
              name: "testAction",
              params: [
                {
                  name: "dinnerMenu",
                  value: ['Steak', 'Mashrooms']
                },
                {
                  name: "fullName",
                  value: "John Smith"
                }
              ]
            },
            {
              name: 'sendMail',
              params: [
                {
                  name: 'fromAddress',
                  value: 'support@client.com'
                },
                {
                  name: 'greeting',
                  value: 'Mr. Twister'
                }
              ]
            },
            {
              name: 'updateProcessedBy',
              params: [
                {
                  name: 'processedByFieldName',
                  value: "customerId"
                }
              ]
            }
          ]
        },
        {
          "from": "inspectionRequired",
          "to": "approvalRequired",
          "event": "automatic-inspect",
          "automatic": true
        },
        {
          "from": "inspectionRequired",
          "to": "inspClrRequired",
          "event": "sendToClarification",
          "automatic": [
            {
              "expression": "invoice[\"netAmount\"] < 100"
            }
          ]
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
          "description": "Inspection Required",
          release: [
            {
              guards: [
                {
                  expression: 'object.enabled === true'
                }
              ]
            },
            {
              to: 'approvalRequired',
              guards: [
                {
                  name: 'userHasRoles',
                  params: [
                    {
                      name: 'restrictedRoles',
                      value: ['REV']
                    }
                  ],
                  negate: true
                },
                {
                  expression: 'object.status === "fulfilled"'
                }
              ]
            }
          ]
        },
        {
          "name": "approvalRequired"
        },
        {
          "name": "inspClrRequired"
        },
        {
          "name": "inspectionRejected"
        },
        {
          "name": "approved"
        },
        {
          "name": "appClrRequired"
        },
        {
          "name": "approvalRejected"
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
      releaseGuards: {
        toState: 'single' // all, single, multiple (default)
      },
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