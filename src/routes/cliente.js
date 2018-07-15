var express = require('express');
var router = express.Router();
//let con = require('../helpers/conexao');
let clienteController = require('../controllers/clienteController');

router.post('/', function(req, res, next){
    console.log("to aqui");
    let obj = req.body;
    console.log(obj);
    clienteController.add(obj)
    .then((id) => res.sendStatus(id));

});
/* GET home page. */
router.get('/', function(req, res, next) {
  clienteController.get()
  .then((result)=>{
     res.json(result);
  })
  .catch((err) => console.log(err))
});


module.exports = router;
