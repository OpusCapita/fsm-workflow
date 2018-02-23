import express from 'express'
import schema from '../schema';

const router = express.Router();

router.get('/api/states', async(req, res) => {
  const { states } = await schema.getSchema();
  res.send({ states })
})

export default router;
