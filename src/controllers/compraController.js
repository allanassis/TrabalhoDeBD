let CompraModel = require('../models/compra');
let createQuery = require('../helpers/createQuery');
let saveDados = require('../helpers/saveDados');
let createTable = require('../helpers/createTable');
let con = require('../helpers/conexao');

const TABELA = createTable.tablesNames.COMPRA;

module.exports = {

    add : function(obj){

        let compra = new CompraModel(obj);
        let colunas = compra.getColuns();
        let valores = compra.getValues();

        return new Promise((resolve, reject)=>{

            createQuery.add(colunas, valores, TABELA)
            .then((query) =>{
                saveDados.addData(query,true)
                .then((id) => resolve(id))
                .catch((err) => reject(err))
            })
        })        
    },

    get : function(id){

        let colunas = new CompraModel().getColuns();
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

        let compra = new CompraModel(obj);
        let colunas = compra.getColuns();
        let valores = compra.getValues();

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