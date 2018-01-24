const TABLE_NAME = 'BusinessObjFlowHistory';

/*
 * The function return Model.create(...) promise
 * which resolved value is a row instance.
 */
const addHistory = ({
  sequelize,
  fields: {
    from,
    to,
    event,
    businessObjectType,
    businessObjectId,
    initiator,
    description
  }
}) => sequelize.model(TABLE_NAME).create({
  from,
  to,
  event,
  businessObjectType,
  businessObjectId,
  initiator,
  description
});

/*
 * The function returns Model.findAll(...) promise
 * which resolved value is an array of objects.
 */
const searchHistory = ({
  sequelize,
  where, // searchable fields are "from", "to", "event", "businessObjectType", "businessObjectId".
  order = ['executedOn']
}) => sequelize.model(TABLE_NAME).findAll({
  where,
  order
});

module.exports = {
  addHistory,
  searchHistory
};
