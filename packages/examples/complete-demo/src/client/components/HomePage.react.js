import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import superagent from 'superagent';
import {
  Grid,
  Row,
  Col,
  Table
} from 'react-bootstrap'; // TODO lib imports

export default class HomePage extends PureComponent {
  state = {
    businessObjects: null
  }

  componentDidMount() {
    const self = this;

    superagent.
      get('/objects').
      accept('application/json').
      then(res => {
        // console.log(res, typeof res);
        self.setState(prevState => ({ businessObjects: res.body }))
      }).
      catch(err => {
        console.log('Failed to load objects')
        throw err
      })
  }

  render() {
    const { businessObjects } = this.state;

    return (
      <Grid>
        <Row>
          <Col>
            <h1>Business Objects</h1>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Invoice No</th>
                  <th>Current Status</th>
                  <th>Available Events</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  businessObjects ?
                  businessObjects.map((object, index) => (
                    <tr key={object.invoiceNo}>
                      <td>{index}</td>
                      <td>{object.invoiceNo}</td>
                      <td>{object.status}</td>
                      <td>todo</td>
                      <td>maybe todo</td>
                    </tr>
                  )) :
                  (
                    <tr><td colSpan={4}>No business objects found</td></tr>
                  )
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    )
  }
}