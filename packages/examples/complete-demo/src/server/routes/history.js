import express from 'express'
import fsm from '../fsm';

const router = express.Router();

router.get('/history', async(req, res) => {
  const historyData = await fsm.history.search();
  const history = historyData.
    map(({ dataValues }) => dataValues).
    filter(({ event }) => event !== '__START__');
  res.send({ history })
})

export default router;
