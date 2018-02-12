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
  const { gt, gte, lt, lte } = model.sequelize && model.sequelize.Op || { // Sequelize v.4 || v.3
    gt: '$gt',
    gte: '$gte',
    lt: '$lt',
    lte: '$lte'
  };

  return (
    {
      searchParameters: {
        object: { businessObjId, businessObjType } = {},
        user,
        finishedOn = {}
      } = {},
      paging: {
        max = 25,
        offset = 0
      } = {},
      sorting: {
        by = 'finishedOn',
        order = 'desc'
      } = {}
    } = {}
  ) => model.findAll({
    where: {
      ...(businessObjId && { businessObjId }),
      ...(businessObjType && { businessObjType }),
      ...(user && { user }),
      ...(Object.keys(finishedOn).length && {
        finishedOn: {
          ...(finishedOn.gt && { [gt]: finishedOn.gt }),
          ...(finishedOn.gte && { [gte]: finishedOn.gte }),
          ...(finishedOn.lt && { [lt]: finishedOn.lt }),
          ...(finishedOn.lte && { [lte]: finishedOn.lte })
        }
      })
    },
    order: [[by, order.toUpperCase()]],
    limit: max,
    offset
  });
};

module.exports = model => ({
  add: add(model),
  search: search(model)
});
