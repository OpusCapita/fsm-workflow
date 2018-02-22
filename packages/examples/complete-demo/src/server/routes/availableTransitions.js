import express from 'express'
import fsm from '../fsm';
import storage from '../storage';
import { objectIdProp } from '../../common';

const router = express.Router();

router.post('/transitions', async(req, res) => {
  const { objectId } = req.body;
  const objects = await storage.getAllObjects();
  const object = objects.find(obj => obj[objectIdProp] === objectId);
  fsm.machine.availableTransitions({ object }).
    then(result => {
      res.send(result)
    }).
    catch(err => {
      console.log('getAvailableTransitions failed')
      console.log(err)
      res.status(500).send('Get transitions failed!')
    })
})

export default router;
