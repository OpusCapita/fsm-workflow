import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Viz from 'viz.js';
import isEqual from 'lodash/isEqual';
import './WorkflowGraph.less';
import { getLabel } from '../utils';

export default class WorkflowGraph extends Component {
  static propTypes = {
    schema: PropTypes.object
  }

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  }

  static defaultProps = {
    schema: null
  }

  state = {
    svg: ''
  }

  componentDidMount() {
    this.renderGraph(this.props.schema);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.schema, nextProps.schema)) {
      this.renderGraph(nextProps.schema);
    }
  }

  convertSchemaToDotLang = schema => {
    const { i18n } = this.context;
    // DOT language used by graphviz: https://graphviz.gitlab.io/_pages/doc/info/lang.html
    const { transitions = [], initialState, finalStates = [] } = schema;
    const getStateLabel = getLabel(i18n)('states');

    let src = '';
    src += `digraph finite_state_machine {\n`;
    src += `\trankdir=LR;\n`;
    src += `\tedge [fontname="Helvetica"];\n`;
    // eslint-disable-next-line max-len
    src += `\tnode [shape = rect fillcolor="#b71c1c" margin="0.2,0.1" color="transparent" fontname="Helvetica" style="rounded,filled"];\n`;
    src += `\t${finalStates.map(state => `"${getStateLabel(state)}"`).join(' ')}\n`;
    src += `\tnode [fillcolor="#14892c"];\n`;
    src = initialState ? src + `\t"${getStateLabel(initialState)}"\n` : src;
    src += `\tnode [fillcolor="#0277bd"];\n`;
    src += transitions.
      filter(({ from, to, event }) => (from && to && event)).
      map(({ from, to, event }) => (`\t"${getStateLabel(from)}" -> "${getStateLabel(to)}" [label = "${event}"];`)).
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
    const { i18n } = this.context;
    const { schema } = this.props;

    if (!schema) {
      return (
        <div className="oc-fsm-crud-editor--workflow-graph">
          <h4>
            {i18n.getMessage('fsmWorkflowEditor.ui.preview.nothingToVisualize')}
          </h4>
        </div>
      );
    }

    const { svg } = this.state;

    return (
      <div
        className="oc-fsm-crud-editor--workflow-graph"
      >
        <div
          dangerouslySetInnerHTML={{ __html: svg }}
        >
        </div>
        <div className="oc-fsm-crud-editor--workflow-graph__legend">
          <div className="oc-fsm-crud-editor--workflow-graph__legend-item">
            <div
              className={`
                oc-fsm-crud-editor--workflow-graph__legend-item-badge
                oc-fsm-crud-editor--workflow-graph__legend-item-badge--regular-state
              `}
            ></div>
            <div>— {i18n.getMessage('fsmWorkflowEditor.ui.preview.meta.regular')}</div>
          </div>
          <div className="oc-fsm-crud-editor--workflow-graph__legend-item">
            <div
              className={`
                oc-fsm-crud-editor--workflow-graph__legend-item-badge
                oc-fsm-crud-editor--workflow-graph__legend-item-badge--initial-state
              `}
            ></div>
            <div>— {i18n.getMessage('fsmWorkflowEditor.ui.preview.meta.initial')}</div>
          </div>
          <div className="oc-fsm-crud-editor--workflow-graph__legend-item">
            <div
              className={`
                oc-fsm-crud-editor--workflow-graph__legend-item-badge
                oc-fsm-crud-editor--workflow-graph__legend-item-badge--final-state
              `}
            ></div>
            <div>— {i18n.getMessage('fsmWorkflowEditor.ui.preview.meta.final')}</div>
          </div>

        </div>
      </div>
    );
  }
}

