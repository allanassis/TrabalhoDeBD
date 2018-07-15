
let Produto = function Produto(obj){

    const COLUNAS = ['pro_descricao','pro_valor'];    

    //let fun_id = obj.fun_id;
    let pro_descricao = obj.pro_valor;
    let pro_valor = obj.pro_valor;

    this.getColuns = function(){
        return COLUNAS;
    }

    this.getValues = function(){
        let values = [];
        for(let prop in obj){
            let value = typeof(obj[prop]) == 'object'? 
                            obj[prop].toLocaleString():
                            obj[prop].toString();
            values.push(`'${value}'`);
        }
        return values;
    }
}

module.exports = Produto;

/*let obj = {
     fun_id : '1',
     fun_nome : 'allan',
     fun_cpf : '12345678',
     fun_endereco : 'rua santos melo',
     fun_dataNascimento : new Date(1996,05,14),
     fun_telefone1 : '8898972384',
     fun_telefone2 : '98457292393',
}*/
