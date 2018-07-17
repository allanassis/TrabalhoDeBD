let CompraItem = function CompraItem(obj){

    const COLUNAS = ['coi_id','coi_idProduto','coi_quantidade','coi_valorUnitario']

    if(obj){
        //let cli_id = obj.cli_id;
        let coi_id = obj.coi_id;
        let coi_idProduto = obj.coi_idProduto;
        let coi_quantidade = obj.coi_quantidade;
        let coi_valorUnitario = obj.coi_valorUnitario;

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

module.exports = CompraItem;


