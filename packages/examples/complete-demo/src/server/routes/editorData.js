import express from 'express'
import storage from '../storage';
import { mapFuncsToParamsSchema } from '../utils';
import actions from '../data/actions';
import conditions from '../data/conditions';
import createMachine from '../createMachine';

const router = express.Router();

router.get('/editordata', (req, res) => {
  const schema = storage.get('schema');
  res.send({
    schema,
    actions: mapFuncsToParamsSchema(actions),
    conditions: mapFuncsToParamsSchema(conditions)
  })
})

router.post('/editordata', (req, res) => {
  const { schema } = req.body;
  if (schema) {
    const machine = createMachine({ schema });
    storage.set({ schema, machine });
    res.send({ status: 'OK', schema })
  } else {
    res.status(400).send({ error: 'Schema in undefined' })
  }
})

export default router;
