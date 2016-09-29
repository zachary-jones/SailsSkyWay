var util = require('util');
var Promise = require('bluebird');
var readFile = Promise.promisify(require('fs').readFile);
var config = require('config');
var knex = require('knex')({
  client: 'postgres',
  connection: process.env.url
});
var bookshelf = require('bookshelf')(knex);

/**
 * Define DB Model for Quota records
 */
var School = bookshelf.Model.extend({
  tableName: 'salesforce.account',
  idAttribute: 'sfid',
});

var Schools = bookshelf.Collection.extend({
  model: School
});

exports.schoolsGET = function (args, res, next) {
  // Get only University Client School type accounts
  var uc = 'University Client';
  Schools.query({
    where: {
      type: 'University Client'
    }
  }).fetch().then((sc) => {
    //console.log('\nSchool Stringified:\n');
    //console.log(JSON.stringify(sc, null, 4));
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(sc, null, 4));
  }).catch(function (err) {
    console.error("---ERROR---");
    console.error(err);
    // Return example School record
    var examples = {};
    examples['application/json'] = {
      "data": [{
        "abreviatedname": "aeiou",
        "type": "University Clients",
        "name": "FIT",
        "createddate": "2016-07-25T16:55:48.000Z",
        "systemmodstamp": "2016-07-26T04:00:27.000Z",
        "id": 123,
        "university_abbreviations__c": null,
        "sfid": "0012C0000030jXpQAI"
      }],
    };
    if (Object.keys(examples).length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
      res.end();
    }
  });
};