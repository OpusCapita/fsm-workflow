### Synopsis

Viewport is 
*Write here a short introduction and/or overview that explains **what** component is.*

### Props Reference

| Name                           | Type                    | Description                                                 |
| ------------------------------ | :---------------------- | ----------------------------------------------------------- |
| demoProp                       | string                  | Write a description of the property                         |

### Code Example

```
<div style={{ display:'flex', width: '640px', height: '480px', outline: '1px solid #333' }}>
  <Viewport
    scale={_scope.state.scale}
    onWheel={_scope.handleWheel.bind(_scope)}
    onMouseMove={(e, mousePosition) => console.log(e, mousePosition)}
    onPan={_scope.handlePan.bind(_scope)}
    gridSize={20}
    showGrid={true}
    allowMove={true}
    panOffsetX={_scope.state.panOffsetX}
    panOffsetY={_scope.state.panOffsetY}
  >
    {_scope.state.viewportChildren}
  </Viewport>
</div>
```

### Component Name

Viewport

### License

Licensed by © 2017 OpusCapita

