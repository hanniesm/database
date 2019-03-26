// Update with your config settings.

const settings = require("./settings");

// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     user     : settings.user,
//     password : settings.password,
//     database : settings.database,
//     host     : settings.hostname,
//     port     : settings.port,
//     ssl      : settings.ssl
//   }
// })


module.exports = {

  development: {
    client: 'pg',
    connection: {
      // filename: './dev.sqlite3'
      user     : settings.user,
      password : settings.password,
      database : settings.database,
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
