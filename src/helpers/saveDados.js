const db = require('mysql');
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

let tabela = 'pessoa';


function addData (query,getId = false){

    con.query(query, (err, result) => {
        if(err){
            console.log(err);
            con.rollback()
            return false;
        }
        else{
            console.log(result.insertId);
           return getId == true ? result.insertId : true;
        }
    })

}

function editData (query){

    con.query(query, (err, result) =>{
        if(err){
            con.rollback();
            return false;
        }
        else{
            console.log(result);
            return true;
        }
    })
}

function delData(query){

    con.query(query, (err, result) =>{
        if(err){
            con.rollback();
            return false;
        }else{
            console.log(result);
            return true;
        }
    })
}

function getData(query){
    con.query(query, (err, result) =>{
        if(err){      
            console.log(err);                  
            con.rollback();
            return false;
        }
        else{
            console.log(result);
            return result.RowDataPacket;
        }
    })
}
