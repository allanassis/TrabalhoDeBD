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


