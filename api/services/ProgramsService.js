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
var Program = bookshelf.Model.extend({
  tableName: 'salesforce.program__c',
  idAttribute: 'sfid'
});

var Programs = bookshelf.Collection.extend({
  model: Program
});

exports.programsGET = function (args, res, next) {
  var schoolid = args;

  Programs.query({
    where: {
      university__c: schoolid
    }
  }).fetch().then((sc) => {
    //console.log('\nPrograms Stringified:\n');
    //console.log(JSON.stringify(sc, null, 4));
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(sc, null, 4));
  }).catch(function (err) {
    console.error("---ERROR---");
    console.error(err);
    // Example Program record for Error case
    // Handle error
    var examples = {};
    examples['application/json'] = {
      "data": [{
        "id": 77,
        "sfid": "a032C000000knQaQAI",
        "university__c": "0012C0000030jXwQAI",
        "universityname__c": "Jacksonville University",
        "status__c": "Inactive",
        "name": "RN to MSN Informatics Specialization",
        "bisk_program_id__c": "556",
        "createddate": "2016-07-25T17:13:32.000Z",
        "bisk_division_id__c": "32",
        "sub_type__c": null,
        "biskcommon_program_id__c": "556",
        "type__c": "Graduate",
        "description__c": "RN to MSN Informatics Specialization",
        "systemmodstamp": "2016-07-29T23:39:42.000Z",
        "universityinstitutionid__c": "UC104",
        "academic_calendar__c": "a0H2C000000lNXkUAM",
        "bisk_discipline_id__c": "237"
      }],
    };
    if (Object.keys(examples).length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
      res.end();
    }
  })
}