
let Compra = function Compra(obj){

    const COLUNAS = ['com_idFuncionario','com_idCliente', 'com_data', 'com_valorTotal'];    

    //let fun_id = obj.fun_id;
    if(obj){
        let com_idFuncionario = obj.com_idFuncionario;
        let com_idCliente = obj.com_idCliente;
        let com_data = obj.com_data;
        let com_valorTotal = obj.com_valorTotal;
    }

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

module.exports = Compra;

/*let obj = {
     fun_id : '1',
     fun_nome : 'allan',
     fun_cpf : '12345678',
     fun_endereco : 'rua santos melo',
     fun_dataNascimento : new Date(1996,05,14),
     fun_telefone1 : '8898972384',
     fun_telefone2 : '98457292393',
}*/
