### Synopsis

Transition is 
*Write here a short introduction and/or overview that explains **what** component is.*

### Props Reference

| Name                           | Type                    | Description                                                 |
| ------------------------------ | :---------------------- | ----------------------------------------------------------- |
| demoProp                       | string                  | Write a description of the property                         |

### Code Example

```
<div style={{ widht: '640px', height: '480px', outline: '1px solid #333' }}>
  <svg
    version="1.1"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <BezierTransition
      label="Transition_0"
      selected={true}
      snap={false}
      bezier={_scope.state.bezier}
      color="#6a9fe1"
      showPoints={true}
      lineWidth={4}
      arrowPosition={2}
      onChange={_scope.handleBezierChange.bind(_scope)}
      cursorPosition={_scope.state.cursorPosition}
    />
  </svg>
</div>
```

### Component Name

BezierTransition

### License

Licensed by © 2017 OpusCapita

