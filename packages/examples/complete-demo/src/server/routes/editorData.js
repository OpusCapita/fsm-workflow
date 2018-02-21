import express from 'express'
import storage from '../storage';
import { mapFuncsToParamsSchema } from '../utils';
import actions from '../data/actions';
import conditions from '../data/conditions';

const router = express.Router();

router.get('/editordata', async(req, res) => {
  const schema = await storage.getSchema();
  res.send({
    schema,
    actions: mapFuncsToParamsSchema(actions),
    conditions: mapFuncsToParamsSchema(conditions)
  })
})

router.post('/editordata', async(req, res) => {
  const { schema } = req.body;
  if (schema) {
    console.log('new schema >>>>>>>>>\n', schema)
    await storage.setSchema(schema);
    res.send({ status: 'OK', schema })
  } else {
    res.status(400).send({ error: 'Schema in undefined' })
  }
})

export default router;
