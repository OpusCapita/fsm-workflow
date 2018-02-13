### Synopsis

SelectableTable is 
*Write here a short introduction and/or overview that explains **what** component is.*

### Props Reference

| Name                           | Type                    | Description                                                 |
| ------------------------------ | :---------------------- | ----------------------------------------------------------- |
| demoProp                       | string                  | Write a description of the property                         |

### Code Example

```
<SelectableTable 
  columnNames={['Name', 'Description']}
  actionsColumnName="Actions"
  items={{
    'notifyMail': ['Notify mail', 'Send Email to user.'],
    'notifySlack': ['Notify slack', 'Send message to Slack channel.'],
    'updateObjectField': ['Update object field', 'Updates an object field to a given value.']
  }}
  onChange={_scope.handleChange.bind(_scope)}
  selectedItem={_scope.state.selectedItem}
  actions={{
    edit: {
      svg: '<svg  xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" focusable="false"><path d="M6 34.5V42h7.5l22.13-22.13-7.5-7.5L6 34.5zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z"/></svg>',
      title: 'Edit',
      action: (e, itemKey) => console.log(e, itemKey)
    },
    remove: {
      svg: '<svg  xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" focusable="false"><path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/></svg>',
      title: 'Delete',
      action: (e, itemKey) => console.log(e, itemKey)
    }
  }}
/>
```

### Component Name

SelectableTable

### License

Licensed by © 2017 OpusCapita

