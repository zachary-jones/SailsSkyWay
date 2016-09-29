var url = require('url');
var Schools = require('../services/SchoolsService');

//http://localhost:1337/schools/schoolsGET
module.exports.schoolsGET = function schoolsGET (req, res, next) {
  Schools.schoolsGET(req.query, res, next);
};
