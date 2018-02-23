import express from 'express'
import fsm from '../fsm';
import storage from '../storage';
import { objectIdProp } from '../../common';
import { extractObject } from '../utils';

const router = express.Router();

router.post('/api/transitions', async(req, res) => {
  const { objectId } = req.body;
  const objects = (await storage.getAllObjects()).map(extractObject);
  const object = objects.find(obj => obj[objectIdProp] === objectId);
  const { machine } = fsm;
  machine.availableTransitions({ object }).
    then(result => {
      res.send(result)
    }).
    catch(err => {
      console.log('getAvailableTransitions failed')
      console.log(err)
      res.status(500).send({ error: 'Get transitions failed!' })
    })
})

export default router;
