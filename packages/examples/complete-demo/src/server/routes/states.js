import express from 'express'
import storage from '../storage';

const router = express.Router();

router.get('/states', (req, res) => {
  const states = storage.get('schema').states;
  res.send({ states })
})

export default router;
