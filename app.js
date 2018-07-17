let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let con = require('./src/helpers/conexao');
let createTable = require('./src/helpers/createTable');

let index = require('./src/routes/index');
let users = require('./src/routes/users');
let cliente = require('./src/routes/cliente');
let funcionario = require('./src/routes/funcionario');
let produto = require('./src/routes/produto');
let compra = require('./src/routes/compra');
let compraItem = require('./src/routes/compraItem');

let app = express();

con.connect((err) => {
  if(err) console.log(err);

  else{
      console.log('conectado ao banco');

      createTable.createAllTables().then(() =>{
        console.log("tabelas criadas");
      })
    }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', index);
app.use('/cliente', cliente);
app.use('/funcionario', funcionario);
app.use('/produto', produto);
app.use('/compra', compra);
app.use('/compraItem', compraItem);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
