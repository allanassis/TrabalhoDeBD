let con = require('../helpers/conexao');

module.exports = {
    addData : function addData (query,getId = false){
        return new Promise((resolve,reject) => {
            con.query(query, (err, result) => {
                if(err){                
                    con.rollback()
                    reject(err);
                }
                else{                
                   resolve(getId == true ? result.insertId : true)
                }
            })
        })
    },
    
    editData : function editData (query){
        return new Promise((resolve,reject)=>{
            con.query(query, (err, result) =>{
                if(err){
                    console.log(err);
                    con.rollback();
                    reject(err);
                }
                else{                    
                    resolve(result);
                }
            })
        })
    },
    
    delData : function delData(query){
        return new Promise((resolve,reject)=>{
            con.query(query, (err, result) =>{
                if(err){
                    con.rollback();
                    reject(err)
                }else{                
                    resolve(result)
                }
            })
        })
    },
    
    getData : function getData(query){
        return new Promise((resolve, reject)=>{
            con.query(query, (err, result) =>{
                if(err){                                        
                    con.rollback();
                    reject(err);
                }
                else{                
                    resolve(result);
                }
            })
        })
    }    
}



/*const db = require('mysql');
let createQuery = require('./createQuery');

let con = db.createConnection({
    host: "localhost",
    user: "root",//"admin",
    password: "root1234",
    database:"teste"//,//'trabbd',
    //port:'3306'
});

con.connect((err) =>{
    if(err) console.log(err)
    else{   
        let query = "show tables like 'pessoa'";    
        con.query(query,function(err,result){

            if(!result.length){

                let create = `create table pessoa (
                                id int(5) NOT NULL primary key auto_increment,
                                nome varchar(50) not null, 
                                 area varchar(50), 
                                 estadocivil varchar(20) not null
                                 )
                                 AUTO_INCREMENT = 1;`;
                                 console.log(create);
                con.query(create,(err,result) =>{
                    if(err){
                        console.log(err)
                        con.rollback();
                    }

                    else{
                        console.log('tabela criada');
                    }
                })

            }
            else{
                console.log('tabela ja existe');
            }
        })
        console.log('conectado');
    }

})
let valores = [["'neji'","'enfermagem'","'solteiro'"],
                ["'naruto'","'ninja'","'casado'"],["'sasuke'","'nukenin'","'enrolado'"]];

let colunas = ['nome','area','estadocivil'];

let tabela = 'pessoa';*/
