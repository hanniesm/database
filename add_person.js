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

const [node, path, firstName, lastName, dob] = process.argv;

const listPeople = cb => {
  knex.select()
  .from('famous_people')
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
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

const addPerson = (firstName, lastName, dob) => {
  knex.insert([
    {first_name: firstName, last_name: lastName, birthdate: dob}], ['id']).into('famous_people')
    .finally(function() {
      listPeople(printPeople)
      knex.destroy();
    })
}

addPerson(firstName, lastName, dob)