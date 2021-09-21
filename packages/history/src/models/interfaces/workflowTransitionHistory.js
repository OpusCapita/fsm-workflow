'use strict';

/*
 * The function return Model.create(...) promise
 * which resolved value is a row instance.
 */
const add = model => fields => model.create(fields);

/*
 * The function returns Model.findAll(...) promise
 * which resolved value is an array of objects.
 */
const search = model => {
  const Op = (
    model.sequelize &&
    model.sequelize.constructor &&
    model.sequelize.constructor.Op
  ) || {
    gt: '$gt',
    gte: '$gte',
    lt: '$lt',
    lte: '$lte'
  };
  const { gt, gte, lt, lte } = Op
  return (
    {
      object: { businessObjId, businessObjType } = {},
      user,
      workflowName,
      finishedOn = {}
    } = {},
    {
      max = 25,
      offset = 0
    } = {},
    {
      by = 'finishedOn',
      order = 'desc'
    } = {}
  ) => {
    return model.
      findAll({
        where: {
          ...(businessObjId && { businessObjId }),
          ...(businessObjType && { businessObjType }),
          ...(user && { user }),
          ...(workflowName && { workflowName }),
          ...(Object.keys(finishedOn).length && {
            finishedOn: {
              ...(finishedOn.gt && { [gt]: finishedOn.gt }),
              ...(finishedOn.gte && { [gte]: finishedOn.gte }),
              ...(finishedOn.lt && { [lt]: finishedOn.lt }),
              ...(finishedOn.lte && { [lte]: finishedOn.lte })
            }
          })
        },
        raw: true,
        order: [[by, order.toUpperCase()]],
        limit: max,
        offset
      })
  }
};

/*
 * The function return Model.delete(...) promise
 * which resolved value is number of removed records.
 */
const del = model => (where = null) => {
  return model.destroy({ where });
};

module.exports = model => ({
  add: add(model),
  search: search(model),
  delete: del(model)
});
