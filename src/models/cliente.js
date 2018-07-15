let Cliente = function Cliente(obj){

    const COLUNAS = ['cli_nome','cli_cpf','cli_endereco','cli_dataNascimento','cli_telefone1','cli_telefone2'];    

    if(obj){
        //let cli_id = obj.cli_id;
        let cli_nome = obj.cli_nome;
        let cli_cpf = obj.cli_cpf;
        let cli_endereco = obj.cli_endereco;
        let cli_dataNascimento = obj.cli_dataNascimento;
        let cli_telefone1 = obj.cli_telefone1;
        let cli_telefone2 = obj.cli_telefone2;
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

module.exports = Cliente;

let obj = {
     cli_id : '1',
     cli_nome : 'allan',
     cli_cpf : '12345678',
     cli_endereco : 'rua santos melo',
     cli_dataNascimento : new Date(1996,05,14),
     cli_telefone1 : '8898972384',
     cli_telefone2 : '98457292393',
}
