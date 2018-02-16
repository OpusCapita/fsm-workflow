import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap'; // TODO lib imports

export default class HomePage extends PureComponent {
  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <h1>Business Objects</h1>
          </Col>
        </Row>
      </Grid>
    )
  }
}