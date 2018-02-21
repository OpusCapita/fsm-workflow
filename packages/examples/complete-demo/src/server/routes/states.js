import express from 'express'
import storage from '../storage';

const router = express.Router();

router.get('/states', async(req, res) => {
  const { states } = await storage.getSchema();
  res.send({ states })
})

export default router;
