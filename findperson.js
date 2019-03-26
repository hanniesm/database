const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const findPerson = (name, cb) => {

  const selectQueryText = `SELECT * FROM famous_people WHERE first_name = (VALUES ($1)) OR last_name = (VALUES ($1))`;
  client.query(selectQueryText, [name], (err, res) => {
    if (err) {
      console.log(`Error running query: ${err.stack}`)
    } else {
      console.log(`Found ${res.rows.length} person(s) by the name ${name}`);
      cb(res.rows);
      client.end();
    }
  })

}

const printPeople = peopleArr => {
  for (const people of peopleArr) {
    console.log(
      `Id: ${people.id} First Name: ${people.first_name} Last Name: ${
        people.last_name} DOB: ${people.birthdate}`
    );
  }
};

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  } else {
    console.log(`Searching...`);
    const [node, path, name] = process.argv;
    findPerson(name, printPeople)
  }

});



