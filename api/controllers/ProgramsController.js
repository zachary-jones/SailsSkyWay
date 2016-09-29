var url = require('url');
var Programs = require('../services/ProgramsService');

//http://localhost:1337/programs/programsGET/?schoolid=0012C0000030jXpQAI
module.exports.programsGET = function programsGET (req, res, next) {
  Programs.programsGET(req.query.schoolid, res, next);
};
