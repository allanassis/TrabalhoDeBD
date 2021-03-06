let ClienteModel = require('../models/cliente');
let createQuery = require('../helpers/createQuery');
let saveDados = require('../helpers/saveDados');
let createTable = require('../helpers/createTable');
let con = require('../helpers/conexao');

const TABELA = createTable.tablesNames.CLIENTE;

module.exports = {

    add : function(obj){

        let cliente = new ClienteModel(obj);
        let colunas = cliente.getColuns();
        let valores = cliente.getValues();

        return new Promise((resolve, reject)=>{

            createQuery.add(colunas, valores, TABELA)
            .then((query) =>{
                saveDados.addData(query,true)
                .then((id) => resolve(id))
                .catch((err) => reject(err))
            })
        })        
    },

    get : function(id = false){

        let colunas = new ClienteModel().getColuns();
        colunas.unshift('cli_id');
        
        let tabela = TABELA;

        return new Promise((resolve, reject) =>{
            createQuery.get(colunas, tabela, id)
            .then((query) =>{
                saveDados.getData(query)
                .then((result) => resolve(result))
                .catch((err) => reject(err))
            })
        })        
    },

    edit : function(obj, id){

        let cliente = new ClienteModel(obj);
        let colunas = cliente.getColuns();
        let valores = cliente.getValues();

        return new Promise((resolve, reject) =>{

            createQuery.edit(colunas, valores, TABELA, id)
            .then((query) =>{                
                saveDados.editData(query)
                .then((result) => resolve(result))
                .catch((err) => reject(err))
            })
        })        
    },

    del : function(id){

        return new Promise((resolve, reject) =>{
            createQuery.del(TABELA, id)
            .then((query) =>{
                saveDados.delData(query)
                .then((result) => resolve(result))
                .catch((err) => reject(err))
            })
        })        
    }

}