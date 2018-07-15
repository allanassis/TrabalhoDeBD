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
            cli_telefone1 VARCHAR(12) NULL,
            cli_telefone2 VARCHAR(12) NULL
            )`;
        return criaTabela(query);            
    },

    createTableFuncionario : function(){

        let query =`CREATE TABLE IF NOT EXISTS ${this.tablesNames.FUNCIONARIO} (
            fun_Id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            fun_Nome VARCHAR(50) NOT NULL,
            fun_CPF VARCHAR(11) NOT NULL,
            fun_Tipo VARCHAR(1) NOT NULL,
            fun_DataAdmissao DATE NOT NULL,
            fun_SenhaAcesso VARCHAR(15) NULL,
            
            CONSTRAINT funTipo CHECK(fun_Tipo in ('V','G')),
            CONSTRAINT senhaMin CHECK(len(fun_SenhaAcesso) > 7)
            )`;
        
        return criaTabela(query);
    },

    createTableProduto : function(){
        let query = `CREATE TABLE IF NOT EXISTS ${this.tablesNames.PRODUTO} (
             pro_Id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
             pro_Descricao VARCHAR(50) NOT NULL,
             pro_Valor DECIMAL(10,2) NOT NULL,
             
             CONSTRAINT ChecarValor CHECK(pro_Valor> 0)
            );`
        return criaTabela(query);
    },

    createTableCompra : function(){
        let query = `CREATE TABLE IF NOT EXISTS ${this.tablesNames.COMPRA} (
            com_Id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            com_IdFuncionario INT NOT NULL REFERENCES Funcionario(fun_Id),
            com_IdCliente INT NOT NULL REFERENCES Cliente(cli_Id),
            com_Data DATE NOT NULL,
            com_ValorTotal DECIMAL(10,2) NOT NULL,
            
            CONSTRAINT ChecarValorTotal CHECK(com_ValorTotal> 0)
            );`
        return criaTabela(query);
    },

    createTableCompraIten : function(){
        let query = `CREATE TABLE IF NOT EXISTS ${this.tablesNames.COMPRAITEM} (
             coi_Id INT NOT NULL REFERENCES Compra(com_Id),
             coi_Seq INT NOT NULL AUTO_INCREMENT,
             coi_IdProduto INT NOT NULL REFERENCES Produto(pro_Id),
             coi_Quantidade INT NOT NULL,
             coi_ValorUnitario DECIMAL(10,2) NOT NULL,
             
             CONSTRAINT CompraItem_PK PRIMARY KEY (coi_Seq,coi_Id),
             CONSTRAINT ChecarQuantidade CHECK(coi_Quantidade> 0),
             CONSTRAINT ChecarValorUnitario CHECK(coi_ValorUnitario> 0)
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