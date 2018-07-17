var express = require('express');
var router = express.Router();
//let con = require('../helpers/conexao');
let compraController = require('../controllers/compraController');

router.post('/', function(req, res, next){
    
    let obj = req.body;
    obj.com_data = new Date(obj.com_data);
    compraController.add(obj)
    .then((id) => res.json(id))
    .catch((err) => console.log(err));

});
/* GET home page. */
router.get('/', function(req, res, next) {
  compraController.get()
  .then((result)=>{
     res.json(result);
  })
  .catch((err) => console.log(err))
});


module.exports = router;
