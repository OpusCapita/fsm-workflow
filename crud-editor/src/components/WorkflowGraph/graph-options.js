export default {
  layout: {
    hierarchical: false
  },
  edges: {
    color: {
      color: '#0277bd',
      highlight: '#0277bd'
    },
    font: {
      color: '#333',
      size: 16,
      strokeWidth: 4
    },
    smooth: {
      type: 'cubicBezier',
      forceDirection: 'vertical'
    },
    labelHighlightBold: false,
    arrows: {
      to: {
        scaleFactor: 1.2
      }
    },
    width: 2,
    selectionWidth: 0
  },
  nodes: {
    fixed: false,
    borderWidth: 2,
    borderWidthSelected: 2,
    mass: 5,
    shape: 'box',
    shapeProperties: {
      borderRadius: 2
    },
    color: {
      background: '#0277bd',
      border: '#0277bd',
      highlight: {
        background: '#0277bd',
        border: '#01578b'
      }
    },
    labelHighlightBold: false,
    font: {
      color: '#fff',
      size: 16
    },
    margin: {
      top: 10,
      bottom: 10,
      left: 30,
      right: 30
    }
  },
  physics: {
    enabled: false
    // barnesHut: {
    //   avoidOverlap: 1,
    //   damping: 1,
    //   centralGravity: 1
    // }
  },
  solver: 'repulsion'
};
