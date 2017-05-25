import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'opuscapita-react-ui-buttons/lib/Button';
import Markdown from 'react-remarkable';
import './Help.less';

import markdownContent from '../../../../README.md';

const propTypes = {
  onHide: PropTypes.func
};

const defaultProps = {
  onHide: () => {}
};

export default
class Help extends PureComponent {
  render() {
    return (
      <div className="fsm--help">
        <Markdown
          source={markdownContent}
          options={{
            html: true,
            linkify: true,
            breaks: true,
            highlight: this.highlightCode
          }}
        />
      </div>
    );
  }
}

Help.propTypes = propTypes;
Help.defaultProps = defaultProps;
