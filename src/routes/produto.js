var express = require('express');
var router = express.Router();
//let con = require('../helpers/conexao');
let produtoController = require('../controllers/produtoController');

router.post('/', function(req, res, next){
    console.log("to aqui");
    let obj = req.body;
    console.log(obj);
    produtoController.add(obj)
    .then((id) => res.sendStatus(id));

});
/* GET home page. */
router.get('/', function(req, res, next) {
  produtoController.get()
  .then((result)=>{
     res.json(result);
  })
  .catch((err) => console.log(err))
});


module.exports = router;
