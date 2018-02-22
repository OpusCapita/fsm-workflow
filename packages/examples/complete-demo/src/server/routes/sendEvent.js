import express from 'express'
import fsm from '../fsm';
import storage from '../storage';

const router = express.Router();

router.post('/event', async(req, res) => {
  const { objectId, event } = req.body;
  const object = await storage.getObjectById(objectId);
  fsm.machine.sendEvent({ object, event }).
    then(async(result) => {
      await storage.updateObject(result.object)
      res.send(result)
    }).
    catch(err => {
      console.log('send event failed')
      console.log(err)
      res.status(500).send('Send event failed!')
    })
})

export default router;
