import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'opuscapita-react-ui-buttons/lib/Button';
import VerticalList from 'opuscapita-react-ui-autocompletes/lib/VerticalList';
import './TransitionInspector.less';

const defaultTransitionOptions = {
  'properties': { label: 'Properties', onClick: () => {}, count: 0 },
  'triggers': { label: 'Triggers', onClick: () => {}, count: 5 },
  'conditions': { label: 'Conditions', onClick: () => {}, count: 0 },
  'validators': { label: 'Validators', onClick: () => {}, count: 8 },
  'postFunction': { label: 'Post Functions', onClick: () => {}, count: 0 }
};

const propTypes = {
  onSave: PropTypes.func,
  transitionOptions: PropTypes.objectOf(
    PropTypes.shape({
      count: PropTypes.number,
      label: PropTypes.string,
      onClick: PropTypes.func
    })
  )
};

const defaultProps = {
  onSave: () => {},
  transitionOptions: defaultTransitionOptions
};

export default
class TransitionInspector extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {
      onSave,
      transitionOptions
    } = this.props;

    return (
      <div className="fsm--transition-inspector">
        <h4>Transition</h4>
        <div className="fsm--transition-inspector__main-properties">
          <div className="form-group">
            <label className="control-label">Name:</label>
            <input className="form-control" />
          </div>
          <div className="form-group">
            <label className="control-label">Description:</label>
            <textarea
              className="form-control fsm--transition-inspector__description-textarea"
              rows={6}
            />
          </div>
          <div>
            <label className="control-label">Options:</label>
            <div className="fsm--transition-inspector__options">
              {Object.keys(transitionOptions).map(optionId => (
                <div key={optionId} className="fsm--transition-inspector__option">
                  <button type="button" className="btn btn-link fsm--transition-inspector__option-button">
                    {transitionOptions[optionId].label}
                  </button>
                  <span>&nbsp;({transitionOptions[optionId].count || '0'})</span>
                </div>
              ))}
            </div>
          </div>
          <div className="fsm--transition-inspector__action-buttons">
            <Button
              label="Delete transition"
              color="#fff"
              bgColor="#B71C1C"
              style={{ marginBottom: '12px' }}
              className="fsm--transition-inspector__action-button"
            />
            <Button
              label="Save transition"
              color="#fff"
              bgColor="#0277BD"
              className="fsm--transition-inspector__action-button"
            />
          </div>
        </div>
      </div>
    );
  }
}

TransitionInspector.propTypes = propTypes;
TransitionInspector.defaultProps = defaultProps;
