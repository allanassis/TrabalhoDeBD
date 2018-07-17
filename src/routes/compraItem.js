var express = require('express');
var router = express.Router();
//let con = require('../helpers/conexao');
let compraItemController = require('../controllers/compraItemController');

router.post('/', function(req, res, next){
    
    let obj = req.body;
    //obj.com_data = new Date(obj.com_data);
    console.log(obj);
    compraItemController.add(obj)
    .then((id) => res.json(id))
    .catch((err) => console.log(err));

});
/* GET home page. */
router.get('/', function(req, res, next) {
  compraItemController.get()
  .then((result)=>{
     res.json(result);
  })
  .catch((err) => console.log(err))
});


module.exports = router;
