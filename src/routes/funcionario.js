var express = require('express');
var router = express.Router();
//let con = require('../helpers/conexao');
let funcionarioController = require('../controllers/funcionarioController');

router.post('/', function(req, res, next){
    console.log("to aqui");
    let obj = req.body;
    console.log(obj);
    funcionarioController.add(obj)
    .then((id) => res.send(id.toString()));

});
/* GET home page. */
router.get('/', function(req, res, next) {
  funcionarioController.get()
  .then((result)=>{
     res.json(result);
  })
  .catch((err) => console.log(err))
});


module.exports = router;
