import express from 'express'
import storage from '../storage';
import { objectIdProp } from '../../common';

const router = express.Router();

router.post('/transitions', (req, res) => {
  const { objectId } = req.body;
  const machine = storage.get('machine');
  const object = storage.get('businessObjects').find(obj => obj[objectIdProp] === objectId);
  console.log('/transitions', object, objectId)
  machine.availableTransitions({ object }).
    then(result => {
      console.log('success', result)
      res.send(result)
    }).
    catch(err => {
      console.log('getAvailableTransitions failed')
      console.log(err)
      res.status(500).send('Get transitions failed!')
    })
})

export default router;
