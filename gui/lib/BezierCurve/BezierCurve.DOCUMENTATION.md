### Synopsis

Controllable BezierCurve

### Props Reference

| Name                           | Type                    | Description                                                                    |
| ------------------------------ | :---------------------- | -----------------------------------------------------------                    |
| bezier                         | arrayOf(number)         | First and last points - start and end of curve. `[x1,y1, x2,y2, x3,y3, x4,y4]` |
| pointColor1                    | string                  |                                                                                |
| pointColor2                    | string                  |                                                                                |
| pointSize                      | number                  |                                                                                |
| showControls                   | bool                    | Show points                                                                    |
| onChange                       | func                    | `(bezier, pathElement) => {}` Callback fired on drag any point.                |
| ...restProps                   |                         | Any curve `<path />` element props.                                            |


### Code Example

```
<div style={{ widht: '640px', height: '480px', outline: '1px solid #333' }}>
  <svg
    version="1.1"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <BezierCurve
      bezier={_scope.state.bezier}
      onChange={_scope.handleBezierChange.bind(_scope)}
      showControls={true}
      stroke="#00f"
      strokeWidth={2}
    />
  </svg>
</div>

```

### Component Name

BezierCurve

### License

Licensed by © 2017 OpusCapita

