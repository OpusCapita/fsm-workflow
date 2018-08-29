import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';

cytoscape.use(coseBilkent);

const colors = {
  text: '#222',
  highlight: '#129BE6',
  initialStateBg: 'lightgreen',
  finalStateBg: '#ffb9b9'
};

export function render({ element, nodes, edges }) {
  const cy = cytoscape({
    container: element,

    boxSelectionEnabled: true,
    autounselectify: true,
    // userZoomingEnabled: false,

    style: [
      {
        selector: 'core',
        style: {
          'active-bg-color': colors.highlight,
          'selection-box-color': colors.highlight
        }
      },
      {
        selector: 'node',
        style: {
          'background-color': 'white',
          'transition-property': 'color, background-color',
          'transition-duration': '.4s',
          'transition-timing-function': 'ease-out-sine'
        }
      },
      {
        selector: "node[label != '$initial']",
        style: {
          content: function(ele) {
            return ele.data('label');
          },
          'text-wrap': 'wrap',
          'text-valign': 'top',
          'text-halign': 'center',
          'font-size': '8px',
          'font-family': 'Helvetica Neue',
          'font-weight': 'bold',
          shape: 'roundrectangle',
          width: 'label',
          height: 'label',
          'padding-left': '5px',
          'padding-right': '5px',
          'padding-top': '5px',
          'padding-bottom': '5px',
          'border-width': '1px',
          'border-color': colors.text
        }
      },
      // {
      //   selector: 'node[?parallel] > node',
      //   style: {
      //     'border-style': 'dashed'
      //   }
      // },
      {
        selector: 'node:active',
        style: {
          'overlay-color': colors.text,
          'overlay-padding': '0',
          'overlay-opacity': '0.1'
        }
      },
      // {
      //   selector: 'node[?initial]',
      //   style: {
      //     content: '',
      //     width: '5px',
      //     height: '5px',
      //     'padding-left': 0,
      //     'padding-right': 0,
      //     'padding-top': 0,
      //     'padding-bottom': 0,
      //     shape: 'ellipse',
      //     'background-color': colors.text
      //   }
      // },
      {
        selector: '$node > node',
        style: {
          'padding-top': '1px',
          'padding-left': '10px',
          'padding-bottom': '10px',
          'padding-right': '10px',
          'border-width': '1px',
          'border-color': colors.text
        }
      },
      {
        selector: 'node:childless',
        style: {
          'text-valign': 'center',
          'text-halign': 'center'
        }
      },
      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          width: '1px',
          'target-arrow-shape': 'triangle',
          label: 'data(label)',
          'font-size': '6px',
          'font-weight': 'bold',
          'text-background-color': '#fff',
          'text-background-padding': '1px',
          'line-color': colors.text,
          'target-arrow-color': colors.text,
          'z-index': '100',
          'text-wrap': 'wrap',
          'text-background-opacity': '1',
          'target-distance-from-node': '2px',
          'text-rotation': 'autorotate'
        }
      },
      {
        selector: 'edge.initial',
        style: {
          'source-arrow-shape': 'circle',
          'source-arrow-color': colors.text
        }
      },
      {
        selector: 'node.actions',
        style: {
          'border-width': 0,
          'background-color': 'white',
          padding: 0,
          'compound-sizing-wrt-labels': 'include',
          'font-size': '5px'
        }
      },
      {
        selector: 'node.active',
        style: {
          'background-color': colors.highlight,
          'border-color': colors.highlight
        }
      },
      {
        selector: 'node.active:childless',
        style: {
          color: 'white'
        }
      },
      {
        selector: 'node.highlight',
        style: {
          'border-color': colors.highlight
        }
      },
      {
        selector: 'node.active > node.actions',
        style: {
          'background-color': colors.highlight,
          color: 'white'
        }
      },
      {
        selector: 'edge.highlight',
        style: {
          'line-color': colors.highlight,
          'target-arrow-color': colors.highlight,
          color: colors.highlight
        }
      },
      {
        selector: 'node[initialState]',
        style: {
          'background-color': colors.initialStateBg
        }
      },
      {
        selector: 'node[finalState]',
        style: {
          'background-color': colors.finalStateBg
        }
      }
    ],

    elements: {
      nodes: nodes,
      edges: edges
    },

    layout: {
      name: 'cose-bilkent',
      // randomize: true,
      idealEdgeLength: 80,
      nodeRepulsion: 4500,
      animate: false,
      tile: true,
      tilingPaddingVertical: 10,
      tilingPaddingHorizontal: 10,
      nodeDimensionsIncludeLabels: true,

      fit: true,
      padding: 10,
      edgeElasticity: 0.65,
      nestingFactor: 0.8
    }
  });

  cy.on('tap', 'node', function(event) {
    const node = event.target;
    cy.center(node);
  });

  return cy;
}
