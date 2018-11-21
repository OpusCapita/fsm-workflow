import express from 'express'
import currentSchema from '../schema';
import objectConfig from '../objectConfig';
import { mapFuncsToParamsSchema } from '../utils';
import actions from '../data/actions';
import conditions from '../data/conditions';

const router = express.Router();

router.get('/api/editordata', async(req, res) => {
  const schema = currentSchema.getSchema();
  const objectConfiguration = objectConfig.getConfig();
  res.send({
    schema,
    actions: mapFuncsToParamsSchema(actions),
    conditions: mapFuncsToParamsSchema(conditions),
    objectConfiguration
  })
})

router.post('/api/editordata', async(req, res) => {
  const { schema } = req.body;
  if (schema) {
    await currentSchema.setSchema(schema);
    res.send({ status: 'OK', schema })
  } else {
    res.status(400).send({ error: 'Schema in undefined' })
  }
})

export default router;
