import express from 'express'
import storage from '../storage';

const router = express.Router();

router.post('/event', (req, res) => {
  const { objectId, event } = req.body;
  const machine = storage.get('machine');
  machine.sendEvent({
    object: storage.getObjectById(objectId),
    event
  }).then(result => {
    res.send(result)
  }).catch(err => {
    console.log('send event failed')
    console.log(err)
    res.status(500).send('Send event failed!')
  })
})

export default router;
