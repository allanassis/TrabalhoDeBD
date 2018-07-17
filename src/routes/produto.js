var express = require('express');
var router = express.Router();
//let con = require('../helpers/conexao');
let produtoController = require('../controllers/produtoController');

router.post('/', function(req, res, next){
    let obj = req.body;
    produtoController.add(obj)
    .then((id) => res.sendStatus(id));

});

router.get('/', function(req, res, next) {
  produtoController.get()
  .then((result)=>{
     res.json(result);
  })
  .catch((err) => console.log(err))
});

router.put('/', function(req, res, next) {

  let pro = {
    pro_descricao : req.body.descricao,
    pro_valor : req.body.valor,
    pro_saldoEstoque : req.body.estoque,
    
  }
  let id = {
    value : req.body.id,
    name : req.body.idname
  }
  

  produtoController.edit(pro, id)
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
    produtoController.del(obj)
    .then((result) =>{
       res.json(result);
    })
    .catch((err) => console.log(err))
});


module.exports = router;
