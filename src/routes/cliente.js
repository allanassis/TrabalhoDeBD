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

router.put('/', function(req, res, next) {
  
  console.log(req.body);

  let cli = {
    cli_nome : req.body.nome,
    cli_cpf : req.body.cpf,
    cli_endereco : req.body.endereco,
    cli_dataNascimento : new Date(req.body.dataNascimento),
    cli_telefone1 : req.body.telefone1,
    cli_telefone2 : req.body.telefone2
  }
  let id = {
    value : req.body.id,
    name : req.body.idname
  }
  

  clienteController.edit(cli, id)
  .then((result)=>{
     res.json(result);
  })
  .catch((err) => console.log(err))
});

router.delete('/', (req, res, next) => {

  obj = {
    value : req.body.id,
    name : req.body.idname
  }
  clienteController.del(obj)
  .then((result) =>{
     res.json(result);
  })
  .catch((err) => console.log(err))
});

module.exports = router;
