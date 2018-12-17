const Sequelize = require('sequelize');
const Sequelizer = require('sequelizer');

const generateSchema = _ => {
  const chars = 'abcdefghi'.split('');

  const schema = {
    name: "TestWorkflow",
    initialState: chars[0],
    finalStates: [
      chars[chars.length - 1]
    ],
    transitions: chars.reduce(
      (trs, char, i) => {
        if (i === 0) {
          return trs
        }
        return [
          ...trs,
          {
            from: chars[i - 1],
            to: char,
            event: `${chars[i - 1]}->${char}`
          }
        ]
      }
      , []
    ),
    states: chars.map(char => ({ name: char }))
  }

  return schema;
}

const generateObjects = n => {
  if (!(n > 0)) {
    throw Error('Error: "n" must be greater than 0!')
  }

  const objects = [];

  for (let i = 0; i < n; i++) {
    objects.push({
      objectId: i
    })
  }

  return objects;
}

const dbName = 'testdb';
const user = 'testUser';

const run = async({
  nObjects
}) => {
  // generate data
  const schema = generateSchema();
  const objects = generateObjects(nObjects);
  const events = schema.transitions.map(({ event }) => event);

  console.log(`\nGenerated schema: ${schema.states.length} states, ${schema.transitions.length} transitions`)
  console.log(`\nGenerated ${objects.length} objects, first one: ${JSON.stringify(objects[0])}`);
  console.log(`\nExpected records: ${schema.transitions.length * objects.length}`);
  // drop & create db
  // get the client
  const mysql = require('mysql2/promise');
  // create the connection
  const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'xxxx' });
  // query database
  await connection.execute(`DROP DATABASE IF EXISTS ${dbName}`);
  await connection.execute(`CREATE DATABASE ${dbName} CHARACTER SET utf8 COLLATE utf8_general_ci;`);

  // run
  await connection.execute('CREATE TABLE IF NOT EXISTS testdb.`WorkflowTransitionHistory` (`id` INTEGER NOT NULL auto_increment , `from` VARCHAR(255) NOT NULL, `to` VARCHAR(255) NOT NULL, `event` VARCHAR(255) NOT NULL, `businessObjType` VARCHAR(255) NOT NULL, `businessObjId` VARCHAR(255) NOT NULL, `user` VARCHAR(255) NOT NULL, `workflowName` VARCHAR(255) NOT NULL, `description` TEXT, `finishedOn` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;');

  const populateStart = process.hrtime();

  for (let i = 0; i < objects.length; i++) {
    const hrstart = process.hrtime();
    const object = objects[i];
    for (let j = 0; j < events.length; j++) {
      const event = events[j];
      // TODO: proper randomized request
      await connection.execute(`
        INSERT INTO \`WorkflowTransitionHistory\` (\`id\`,\`from\`,\`to\`,\`event\`,\`businessObjType\`,\`businessObjId\`,\`user\`,\`workflowName\`,\`finishedOn\`) VALUES (DEFAULT,'${object.status}','${object.status}','${event}','testObject',0,'testUser','TestWorkflow','2018-12-17 13:51:59');
      `)
    }
    const hrend = process.hrtime(hrstart);
    console.info(`Execution time for ${i}: %ds %dms`, hrend[0], hrend[1] / 1000000);
  }

  const populateEnd = process.hrtime(populateStart);
  console.info(`Data populated in: %ds %dms`, populateEnd[0], populateEnd[1] / 1000000);

  console.log(`\nGenerated schema: ${schema.states.length} states, ${schema.transitions.length} transitions`)
  console.log(`\nGenerated ${objects.length} objects, first one: ${JSON.stringify(objects[0])}`);
  console.log(`\nExpected records: ${schema.transitions.length * objects.length}`);

  const selects = [];

  for (k = 0; k < objects.length; k++) {
    const hrstart = process.hrtime();
    await machine.getHistory({ object: objects[k], user });
    const hrend = process.hrtime(hrstart);
    console.info(`Execution time for ${k}: %ds %dms`, hrend[0], hrend[1] / 1000000);
    selects.push({
      s: hrend[0],
      ms: hrend[1] / 1000000
    });
  }

  console.log(`Average on select: ${selects.reduce((acc, { s, ms }) => acc + (s * 1000) + ms, 0) / selects.length}ms`);

  console.log('Closing sequelize...');
  // await sequelize.drop();
  await sequelize.close();
  await connection.close();
}

run({
  nObjects: 1
}).then(console.log).catch(err => { console.log(err); throw err });
