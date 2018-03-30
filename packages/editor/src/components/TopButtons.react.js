import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import FileSaver from 'file-saver';

export default class TopButtons extends PureComponent {
  static propTypes = {
    schema: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired
  }

  handleDownload = _ => {
    const { schema } = this.props;
    const blob = new Blob( // eslint-disable-line no-undef
      [JSON.stringify(schema, null, 2)],
      { type: 'application/json' }
    );
    FileSaver.saveAs(blob, 'schema.json');
  }

  render() {
    const { schema, onSave } = this.props;

    return (
      <div className="btn-group" style={{ float: 'right', marginTop: '16px' }}>
        <Dropdown id='top-buttons'>
          <Button
            disabled={!schema.name ||
              (schema.transitions || []).some(({ from, to, event }) => !(from && to && event))
            }
            onClick={onSave}
            bsStyle='primary'
          >
            Save
          </Button>
          <Dropdown.Toggle bsStyle='primary'/>
          <Dropdown.Menu className='pull-right'>
            <MenuItem onClick={this.handleDownload}>
              <span className="btn-sm text-left">
                Download
              </span>
            </MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}
