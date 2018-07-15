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

router.put('/', function(req, res, next) {
  
  let fun = {
    fun_nome : req.body.nome,
    fun_cpf : req.body.cpf,
    fun_tipo : req.body.tipo,
    fun_dataAdmissao : new Date(req.body.dataAdmissao),
    fun_senhaAcesso : req.body.senhaAcesso
  }
  let id = {
    value : req.body.id,
    name : req.body.idname
  }
  
  funcionarioController.edit(fun, id)
  .then((result)=>{
     res.json(result);
  })
  .catch((err) => console.log(err))
});

module.exports = router;
