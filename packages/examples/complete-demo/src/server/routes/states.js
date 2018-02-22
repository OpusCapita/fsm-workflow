import express from 'express'
import fsm from '../fsm';

const router = express.Router();

router.get('/states', async(req, res) => {
  const { states } = await fsm.getSchema();
  res.send({ states })
})

export default router;
