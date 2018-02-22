import express from 'express'
import fsm from '../fsm';
import storage from '../storage';
import { extractObject } from '../utils';

const router = express.Router();

router.post('/event', async(req, res) => {
  const { objectId, event } = req.body;
  const object = await storage.getObjectById(objectId);
  const { machine } = fsm;
  machine.sendEvent({ object: extractObject(object), event, user: 'demouser' }).
    then(async(result) => {
      await storage.updateObject(result.object)
      console.log('\nGetting history\n')
      const historyData = await fsm.history.search();
      console.log(historyData)
      res.send(result)
    }).
    catch(err => {
      console.log('send event failed')
      console.log(err)
      res.status(500).send('Send event failed!')
    })
})

export default router;
