import express from 'express'
import fsm from '../fsm';
import storage from '../storage';
import { eventsProp } from '../../common'

const router = express.Router();

router.get('/objects', async(req, res) => {
  const businessObjects = await storage.getAllObjects();
  Promise.all(businessObjects.map(object => fsm.machine.availableTransitions({ object }))).
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
