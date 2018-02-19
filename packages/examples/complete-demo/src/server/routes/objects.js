import express from 'express'
import storage from '../storage';
import { eventsProp } from '../../common'

const router = express.Router();

router.get('/objects', (req, res) => {
  const businessObjects = storage.get('businessObjects');
  const machine = storage.get('machine');

  Promise.all(
    businessObjects.map(object => machine.availableTransitions({ object }))
  ).
    then(result => {
      res.send(businessObjects.map((object, index) => ({
        ...object,
        [eventsProp]: result[index].transitions.map(({ event }) => event)
      })))
    }).
    catch(err => {
      console.log(err)
      res.status(500).send(err.message)
      throw err
    })
})

export default router;
