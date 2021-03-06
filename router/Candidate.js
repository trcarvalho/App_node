var express              = require('express');
var path                 = require('path');
var body_parser          = require('body-parser')
var controller_candidate = require('../Controller/controller_candidate')
var candidate            = express.Router();

candidate.use(express.static(path.join(__dirname, '../public'))); // buscar um jeito mais elegante para solucionar essa perrenga
candidate.use(body_parser.urlencoded({extended: true}));
candidate.use(body_parser.json());

candidate.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

candidate.get('/formulario_candidato', controller_candidate.form_candidate);

candidate.route('/')
      .get(controller_candidate.list_candidate)
      .post(controller_candidate.add_candidate,return_index)
      .delete(controller_candidate.remove_candidate)

function return_index(req, res) {
  url = req.protocol + '://' + req.get('host')
  res.redirect(url);
}
module.exports = candidate;
