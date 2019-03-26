// const pg = require("pg");
const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
})

const [node, path, name] = process.argv;

const findPerson = (name, cb) => {
  knex.select()
  .from('famous_people')
  .where('first_name', name)
  .orWhere('last_name', name)
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
    console.log(`Found ${rows.length} person(s) by the name ${name}`)
    cb(rows)
  })
  .finally(function() {
    knex.destroy();
  });
}

const printPeople = peopleArr => {
  for (const people of peopleArr) {
    console.log(
      `Id: ${people.id} First Name: ${people.first_name} Last Name: ${
        people.last_name} DOB: ${people.birthdate}`
    );
  }
};

findPerson(name, printPeople)