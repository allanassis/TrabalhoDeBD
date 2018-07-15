let con = require('./conexao');
let ClienteModel = require('../models/cliente');

module.exports = {
    tablesNames : {
        CLIENTE : 'cliente',
        FUNCIONARIO : 'funcionario',
        PRODUTO : 'produto',
        COMPRA : 'compra',
        COMPRAITEM : 'compra_item' 
    },
    createTableCliente : function(){

        let query = `CREATE TABLE IF NOT EXISTS ${this.tablesNames.CLIENTE} (
            cli_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            cli_nome VARCHAR(50) NOT NULL,
            cli_cpf VARCHAR(11) NOT NULL,
            cli_endereco VARCHAR(70) NOT NULL,
            cli_dataNascimento DATE NOT NULL,
            cli_telefone1 VARCHAR(12) NULL DEFAULT '',
            cli_telefone2 VARCHAR(12) NULL DEFAULT ''
            )`;
        return criaTabela(query);            
    },

    createTableFuncionario : function(){

        let query =`CREATE TABLE IF NOT EXISTS ${this.tablesNames.FUNCIONARIO} (
            fun_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            fun_nome VARCHAR(50) NOT NULL,
            fun_cpf VARCHAR(11) NOT NULL,
            fun_tipo VARCHAR(1) NOT NULL,
            fun_dataAdmissao DATE NOT NULL,
            fun_senhaAcesso VARCHAR(15) NULL DEFAULT '',
            
            CONSTRAINT funTipo CHECK(fun_tipo in ('V','G')),
            CONSTRAINT senhaMin CHECK(len(fun_senhaAcesso) > 7)
            )`;
        
        return criaTabela(query);
    },

    createTableProduto : function(){
        let query = `CREATE TABLE IF NOT EXISTS ${this.tablesNames.PRODUTO} (
             pro_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
             pro_descricao VARCHAR(50) NOT NULL,
             pro_valor DECIMAL(10,2) NOT NULL,
             pro_saldoEstoque INT(100) NOT NULL,
             
             CONSTRAINT ChecarValor CHECK(pro_valor > 0)
            );`
            
        return criaTabela(query);
    },

    createTableCompra : function(){
        let query = `CREATE TABLE IF NOT EXISTS ${this.tablesNames.COMPRA} (
            com_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            com_idFuncionario INT NOT NULL REFERENCES Funcionario(fun_Id),
            com_idCliente INT NOT NULL REFERENCES Cliente(cli_Id),
            com_data DATE NOT NULL,
            com_valorTotal DECIMAL(10,2) NOT NULL,
            
            CONSTRAINT ChecarValorTotal CHECK(com_valorTotal> 0)
            );`
        return criaTabela(query);
    },

    createTableCompraIten : function(){
        let query = `CREATE TABLE IF NOT EXISTS ${this.tablesNames.COMPRAITEM} (
             coi_id INT NOT NULL REFERENCES Compra(com_Id),
             coi_seq INT NOT NULL AUTO_INCREMENT,
             coi_idProduto INT NOT NULL REFERENCES Produto(pro_Id),
             coi_quantidade INT NOT NULL,
             coi_valorUnitario DECIMAL(10,2) NOT NULL,
             
             CONSTRAINT CompraItem_PK PRIMARY KEY (coi_seq,coi_id),
             CONSTRAINT ChecarQuantidade CHECK(coi_quantidade> 0),
             CONSTRAINT ChecarValorUnitario CHECK(coi_valorUnitario> 0)
            );`
        return criaTabela(query);
    },

    createAllTables : function(){
            
        return new Promise((resolve, reject) =>{

            this.createTableCliente().then((result) => console.log('cliente'))            

            this.createTableFuncionario().then((result) => console.log('funcionario'))
            .then(() =>
            {
                this.createTableCompra().then((result) => console.log('compra'))        
            })            

            this.createTableProduto().then((result) => console.log('produto'))
            .then(() =>
            {
                this.createTableCompraIten().then((result) => console.log('produto item'))            
            })

            resolve();
        })            
    }
}



function criaTabela(query){
    return new Promise((resolve, reject) =>{
        con.query(query, (err, result) =>{
            if(err){
                console.log(err);
                con.rollback();
                reject();
            }
            else{                
                resolve(result);
            }
        })            
    })
}