import express from 'express'
import storage from '../storage';

const router = express.Router();

router.get('/objects', (req, res) => {
  const businessObjects = storage.get('businessObjects');
  const machine = storage.get('machine');

  Promise.all(
    businessObjects.map(object => machine.availableTransitions({ object }))
  ).
    then(result => {
      console.log(result)
      res.send(businessObjects)
    }).
    catch(err => {
    console.log(err)
    res.status(500).send(err.message)
    throw err
  })
})

export default router;