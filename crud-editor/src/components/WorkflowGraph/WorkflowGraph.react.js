import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Viz from 'viz.js';
import isEqual from 'lodash/isEqual';
import './WorkflowGraph.less';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import Color from 'color';
import rgbHex from 'rgb-hex';

const INITIAL_STATE_COLOR = '#14892c';
const FINAL_STATE_COLOR = '#b71c1c';
const REGULAR_STATE_COLOR = '#0277bd';

const propTypes = {
  schema: PropTypes.object,
  selectedStates: PropTypes.arrayOf(PropTypes.string),
  getStateLabel: PropTypes.func.isRequired,
  onStatesSelect: PropTypes.func,
  onTransitionsSelect: PropTypes.func
};

const defaultProps = {
  schema: null,
  selectedStates: [],
  onStatesSelect: () => {},
  onTransitionsSelect: () => {}
};

export default
class WorkflowGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svg: ''
    };
  }

  componentDidMount() {
    this.renderGraph({
      schema: this.props.schema,
      selectedStates: this.props.selectedStates,
      getStateLabel: this.props.getStateLabel
    });
  }

  componentWillReceiveProps(nextProps) {
    this.renderGraph({
      schema: nextProps.schema,
      selectedStates: nextProps.selectedStates,
      getStateLabel: nextProps.getStateLabel
    });
  }

  componentWillUnmount() {
    clearTimeout(this.addNodesEventListenersTimeout);
    clearTimeout(this.addNodesEdgesListenersTimeout);
  }

  addNodesEventListeners = () => {
    clearTimeout(this.addNodesEventListenersTimeout);

    if (this.svgRef) {
      this.addNodesEventListenersTimeout = setTimeout(() => {
        let svgNodes = Array.from(this.svgRef.querySelectorAll('[id^=oc-fsm--graph__node----]'));

        svgNodes.map((node) => {
          let nodeName = decodeURIComponent(node.id.replace('oc-fsm--graph__node----', ''));
          node.addEventListener('click', () => this.props.onStatesSelect([nodeName]));
        });
      }, 200);
    } else {
      this.addNodesEventListeners();
    }
  }

  addEdgesEventListeners = () => {
    clearTimeout(this.addEdgesEventListenersTimeout);
    console.log('1');
    if (this.svgRef) {
      console.log('2');
      this.addEdgesEventListenersTimeout = setTimeout(() => {
        let svgEdges = Array.from(this.svgRef.querySelectorAll('[id^=oc-fsm--graph__edge----]'));
        console.log('sv', svgEdges);
        svgEdges.map((edge) => {
          let edgeFromTo = decodeURIComponent(edge.id.replace('oc-fsm--graph__edge----', ''));
          let splittedEdgeFromTo = edgeFromTo.split('----');
          let edgeFrom = splittedEdgeFromTo[0];
          let edgeTo = splittedEdgeFromTo[1];

          edge.addEventListener('click', () => this.props.onTransitionsSelect([{ from: edgeFrom, to: edgeTo }]));
        });
      }, 200);
    } else {
      this.addEdgesEventListeners();
    }
  }

  renderStates = ({
    states,
    initialState,
    finalStates,
    selectedStates,
    regularStateColor,
    finalStateColor,
    initialStateColor,
    getStateLabel
  }) => {
    return states.map((state, i) => {
      let { name } = state;

      let type;
      let fillColor;

      if (finalStates.indexOf(name) !== -1) {
        type = 'FINAL_STATE';
        fillColor = finalStateColor;

      } else if (initialState === name) {
        type = 'INITIAL_STATE';
        fillColor = initialStateColor;

      } else {
        type = 'REGULAR_STATE';
        fillColor = regularStateColor;
      }

      let isSelected = selectedStates.indexOf(name) !== -1;

       // border color
      let color = isSelected ?
         `#${rgbHex(Color(fillColor).darken(0.3).rgb().string())}` :
        'transparent';

      // eslint-disable-next-line max-len
      let nodeStr = `node [shape = record fillcolor="${fillColor}" margin="0.2,0.1" color="${color}" fontname="Helvetica" style="rounded,filled", penwidth=6];`;

      return `${nodeStr} "${getStateLabel(state.name)}" [id="oc-fsm--graph__node----${encodeURIComponent(state.name)}"]`;
    }).join(' ');
  }

  convertSchemaToDotLang({ schema, selectedStates, getStateLabel }) {
    // DOT language used by graphviz: https://graphviz.gitlab.io/_pages/doc/info/lang.html
    const { transitions, initialState, finalStates, states } = schema;

    let src = '';
    src += `digraph schema {\n`;
    src += `graph [splines=true, nodesep=0.3, size=10]`;
    src += `\trankdir=LR;\n`;
    src += `\tedge [fontname="Helvetica"];\n`;
    src += `\t${this.renderStates({
        states,
        initialState,
        finalStates,
        selectedStates,
        regularStateColor: REGULAR_STATE_COLOR,
        initialStateColor: INITIAL_STATE_COLOR,
        finalStateColor: FINAL_STATE_COLOR,
        getStateLabel
    })}\n`;
    src += transitions.
      filter(({ from, to, event }) => (from && to && event)).
      // map(({ from, to, event }) => (`\t"${getStateLabel(from)}" -> "${getStateLabel(to)}" [label = "${event}"];`)).
      map(({ from, to, event }) => (`\t"${getStateLabel(from)}" -> "${getStateLabel(to)}" [id="oc-fsm--graph__edge----${encodeURIComponent(from)}----${encodeURIComponent(to)}", penwidth=1, color="#333333", label = "${event}"]`)).
      join(`\n`);
    src += `}`;

    return src;
  }

  renderGraph = ({ schema, selectedStates, getStateLabel }) => {
    const vizSrc = this.convertSchemaToDotLang({ schema, selectedStates, getStateLabel });
    this.setState({
      svg: Viz(vizSrc, { format: "svg", engine: "dot", totalMemory: 16777216 })
    });

    this.addNodesEventListeners();
    this.addEdgesEventListeners();
  }

  render() {
    const { schema } = this.props;

    if (!schema) {
      return (
        <div className="oc-fsm-crud-editor--workflow-graph">
          <h4>
            Nothing to visualize
          </h4>
        </div>
      );
    }

    const { svg } = this.state;

    return (
      <div
        className="oc-fsm-crud-editor--workflow-graph"
      >
        <Navbar fluid={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <span>Schema</span>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavDropdown eventKey={3} title="Available events" id="oc-fsm--crud-editor--workflow-graph-nav">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider={true} />
              <MenuItem eventKey={3.4}>Reset</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div
          ref={ref => (this.svgRef = ref)}
          className="oc-fsm-crud-editor--workflow-graph__svg"
          dangerouslySetInnerHTML={{ __html: svg }}
        >
        </div>

        <div className="oc-fsm-crud-editor--workflow-graph__legend panel-body">
          <div className="oc-fsm-crud-editor--workflow-graph__legend-item">
            <div
              className={`
                oc-fsm-crud-editor--workflow-graph__legend-item-badge
                oc-fsm-crud-editor--workflow-graph__legend-item-badge--regular-state
              `}
            ></div>
            <div>regular state nodes</div>
          </div>
          <div className="oc-fsm-crud-editor--workflow-graph__legend-item">
            <div
              className={`
                oc-fsm-crud-editor--workflow-graph__legend-item-badge
                oc-fsm-crud-editor--workflow-graph__legend-item-badge--initial-state
              `}
            ></div>
            <div>initial state nodes</div>
          </div>
          <div className="oc-fsm-crud-editor--workflow-graph__legend-item">
            <div
              className={`
                oc-fsm-crud-editor--workflow-graph__legend-item-badge
                oc-fsm-crud-editor--workflow-graph__legend-item-badge--final-state
              `}
            ></div>
            <div>final state nodes</div>
          </div>
        </div>
      </div>
    );
  }
}

WorkflowGraph.propTypes = propTypes;
WorkflowGraph.defaultProps = defaultProps;
