import express from 'express'
import fsm from '../fsm';
import storage from '../storage';
import { eventsProp } from '../../common'
import { extractObject } from '../utils';

const router = express.Router();

router.get('/api/objects', async(req, res) => {
  const objects = await storage.getAllObjects();
  const businessObjects = objects.map(extractObject);
  const { machine } = fsm;
  Promise.all(businessObjects.map(object => machine.availableTransitions({ object }))).
    then(result => {
      res.send(businessObjects.map((object, index) => ({
        ...object,
        [eventsProp]: result[index].transitions.map(({ event }) => event)
      })))
    }).
    catch(err => {
      console.log(err)
      res.status(500).send({ error: err.message })
      throw err
    })
})

export default router;
