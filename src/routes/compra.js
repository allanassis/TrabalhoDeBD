var express = require('express');
var router = express.Router();
//let con = require('../helpers/conexao');
let compraController = require('../controllers/compraController');

router.post('/', function(req, res, next){
    console.log("to aqui");
    let obj = req.body;
    console.log(obj);
    compraController.add(obj)
    .then((id) => res.sendStatus(id));

});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
