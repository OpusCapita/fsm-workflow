import express from 'express'
import fsm from '../fsm';

const router = express.Router();

router.get('/api/history/:objectId', async(req, res) => {
  const { objectId } = req.params;
  if (!objectId) {
    return res.status(400).send({ error: 'Bad request: objectId not specified' })
  }
  const historyData = await fsm.history.search({
    searchParameters: {
      object: {
        businessObjId: objectId,
        businessObjType: 'invoice'
      }
    }
  });
  const history = historyData.
    filter(({ event }) => event !== '__START__');
  return res.send({ history })
})

export default router;
