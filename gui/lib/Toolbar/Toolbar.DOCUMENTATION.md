### Synopsis

Toolbar is 
*Write here a short introduction and/or overview that explains **what** component is.*

### Props Reference

| Name                           | Type                    | Description                                                 |
| ------------------------------ | :---------------------- | ----------------------------------------------------------- |
| demoProp                       | string                  | Write a description of the property                         |

### Code Example

```
<Toolbar
  controlsLeft={[
    {
      action: () => {},
      iconSVG: null,
      title: 'Back',
      label: 'Back',
      active: false,
      disabled: false
    },
    {
      action: () => {},
      iconSVG: null,
      title: 'Forward',
      label: 'Forward',
      active: false,
      disabled: true
    },
    {
      action: () => {},
      iconSVG: null,
      title: 'Cut',
      label: 'Cut',
      active: false,
      disabled: true
    }
  ]}
  
  controlsRight={[
    {
      action: () => {},
      iconSVG: null,
      title: 'Cancel',
      label: 'Cancel',
      active: false,
      disabled: false
    },
    {
      action: () => {},
      iconSVG: null,
      title: 'Save',
      label: 'Save',
      active: false,
      disabled: false,
      color: '#fff',
      bgColor: '#0277bd'
    }
  ]}
/>
```

### Component Name

Toolbar

### License

Licensed by © 2017 OpusCapita

