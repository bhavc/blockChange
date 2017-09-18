//your also gonna have to run cronjob for this
var request = require('request');
const settings = require('./settings')
var nodemailer = require('nodemailer');

const knex = require('knex') ({
  client : 'pg',
  connection : {
    user : settings.user,
    password : settings.password,
    database : settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
  }
});
