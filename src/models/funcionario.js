
let Funcionario = function Funcionario(obj){

    const COLUNAS = ['fun_nome','fun_cpf','fun_tipo','fun_dataAdmissao','fun_senhaAcesso'];    

    //let fun_id = obj.fun_id;
    if(obj){
        let fun_nome = obj.fun_nome;
        let fun_cpf = obj.fun_cpf;
        let fun_tipo = obj.fun_tipo;
        let fun_dataAdmissao = obj.fun_dataAdmissao;
        let fun_senhaAcesso = obj.fun_senhaAcesso;
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

module.exports = Funcionario;

/*let obj = {
     fun_id : '1',
     fun_nome : 'allan',
     fun_cpf : '12345678',
     fun_endereco : 'rua santos melo',
     fun_dataNascimento : new Date(1996,05,14),
     fun_telefone1 : '8898972384',
     fun_telefone2 : '98457292393',
}*/
