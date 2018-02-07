import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Viz from 'viz.js';
import isEqual from 'lodash/isEqual';
import './WorkflowGraph.less';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

const propTypes = {
  schema: PropTypes.object,
  selectedStates: PropTypes.arrayOf(PropTypes.string),
  getStateLabel: PropTypes.func.isRequired
};

const defaultProps = {
  schema: null,
  selectedStates: []
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
    this.renderGraph(this.props.schema);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.schema, nextProps.schema)) {
      this.renderGraph(nextProps.schema);
    }
  }

  convertSchemaToDotLang(schema) {
    // DOT language used by graphviz: https://graphviz.gitlab.io/_pages/doc/info/lang.html
    const { transitions, initialState, finalStates } = schema;

    const { getStateLabel } = this.props;

    let src = '';
    src += `digraph schema {\n`;
    src += `graph [splines=ortho, nodesep=0.6, size=7]`;
    src += `\trankdir=LR;\n`;
    src += `\tedge [fontname="Helvetica"];\n`;
    // eslint-disable-next-line max-len
    src += `\tnode [shape = record fillcolor="#b71c1c" margin="0.2,0.1" color="transparent" fontname="Helvetica" style="rounded,filled"];\n`;
    src += `\t${finalStates.map(state => `"${getStateLabel(state)}"`).join(' ')}\n`; // render final state nodes
    src += `\tnode [fillcolor="#14892c"];\n`;
    src = initialState ? src + `\t"${getStateLabel(initialState)}"\n` : src; // render initial state node
    src += `\tnode [fillcolor="#0277bd"];\n`; // render regular state nodes
    src += transitions.
      filter(({ from, to, event }) => (from && to && event)).
      // map(({ from, to, event }) => (`\t"${getStateLabel(from)}" -> "${getStateLabel(to)}" [label = "${event}"];`)).
      map(({ from, to, event }) => (`\t"${getStateLabel(from)}" -> "${getStateLabel(to)}"`)).
      join(`\n`);
    src += `}`;

    return src;
  }

  renderGraph = (schema) => {
    const vizSrc = this.convertSchemaToDotLang(schema);
    this.setState({
      svg: Viz(vizSrc, { format: "svg", engine: "dot", totalMemory: 16777216 })
    });
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
            <div>— regular state nodes</div>
          </div>
          <div className="oc-fsm-crud-editor--workflow-graph__legend-item">
            <div
              className={`
                oc-fsm-crud-editor--workflow-graph__legend-item-badge
                oc-fsm-crud-editor--workflow-graph__legend-item-badge--initial-state
              `}
            ></div>
            <div>— initial state nodes</div>
          </div>
          <div className="oc-fsm-crud-editor--workflow-graph__legend-item">
            <div
              className={`
                oc-fsm-crud-editor--workflow-graph__legend-item-badge
                oc-fsm-crud-editor--workflow-graph__legend-item-badge--final-state
              `}
            ></div>
            <div>— final state nodes</div>
          </div>
        </div>
      </div>
    );
  }
}

WorkflowGraph.propTypes = propTypes;
WorkflowGraph.defaultProps = defaultProps;
