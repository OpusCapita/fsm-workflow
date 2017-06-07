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
  columnName={['Name', 'Description']}
  items={{
    'notifyMail': ['Notify mail', 'Send Email to user.'],
    'notifySlack': ['Notify slack', 'Send message to Slack channel.'],
    'updateObjectField': ['Update object field', 'Updates an object field to a given value.']
  }}
  onChange={_scope.handleChange.bind(_scope)}
  selectedItem={_scope.state.selectedItem}
/>
```

### Component Name

SelectableTable

### License

Licensed by © 2017 OpusCapita

