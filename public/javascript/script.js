$(document).ready(function(){

    let compraitens = [];
    let valorTotal = 0;

    $("#div_cadastrar").hide();
    $("#btn_fun_editar").hide();
    $("#div_funcionarios").hide();
    $("#div_clientes").hide()
    $("#div_produtos").hide()
    $("#div_produto_compra").hide()

    $.get('/compra',function(result, err){
        console.log(result);

    })

    $("#btn_add_pro").click(function(){
        $("#div_funcionarios").hide();
       // $("#div_compra").hide();
        $("#div_clientes").hide()
        $("#div_produto").hide();
        $("#div_cadastrar").hide();
        $("#div_produto_compra").show()        
    })
    

    $("#btn_div_compra").click(function(){        
        $("#div_cadastrar").hide();        
        $("#div_funcionarios").hide();
        $("#div_clientes").hide();
        $("#div_produtos").hide();
        $("#div_produto_compra").hide()
        $("#div_compra").show();
    })

    $('#select_produtos_compra').on('change', function() {

        $("#pro_valor_compra").val($("#tr_pro_" + this.value + " > .th_valor").text());
        $("#pro_quantidade_compra").attr({'max' :  $("#tr_pro_" + this.value + " > .th_saldoEstoque").text()});

      })      

      $("#btn_add_pro_compra").click(function(){

        if(Number.parseInt($("#tr_pro_" + $("#select_produtos_compra option:selected").val() + " > .th_saldoEstoque").text())
            > Number.parseInt($("#pro_quantidade_compra").val())){

                let obj = {
                    id : $("#select_produtos_compra option:selected").val(),
                    descricao : $("#select_produtos_compra option:selected").text(),
                    quantidade : $("#pro_quantidade_compra").val(),
                    valor : $("#pro_valor_compra").val(),
                    subTotal : (Number.parseInt( $("#pro_quantidade_compra").val()) * Number.parseFloat($("#pro_valor_compra").val())).toFixed(2)
                }
                compraitens.push(obj);
                valorTotal += Number.parseFloat(obj.subTotal);

                $("#valorTotal").val(valorTotal);

                $("#tabela_compra > tbody").append(`
                <tr id="tr_${obj.id}">
                    <th>${obj.id}</th>
                    <th>${obj.descricao}</th>
                    <th>${obj.quantidade}</th>
                    <th>${obj.valor}</th>
                    <th th_subTotal_${obj.id}>${obj.subTotal}</th>
                </tr>
                `)
            }
            else{
                alert("Estoque insuficiente")
            }
    
        $("#pro_quantidade_compra").val("")
    })

    $("#btn_realizar_compra").click(function(){
        let objPost = {
            com_idFuncionario : $("#select_funcionario option:selected").val(),
            com_idCliente : $("#select_cliente option:selected").val(),
            com_data : (new Date()).toLocaleString('en-us'),
            com_valorTotal : $("#valorTotal").val(),            
        }
        console.log("clicou");

        $.post('/compra', objPost, function(result, err){
            console.log(result);
            console.log(compraitens);
            for(let obj in compraitens){
                let objPost = {
                    coi_id : result,
                    coi_idProduto : compraitens[obj].id,
                    coi_quantidade : compraitens[obj].quantidade,
                    coi_valorUnitario : compraitens[obj].valor
                }
                $.post('/compraItem', objPost, function(err, result){
                    console.log(err);
                    console.log(result);
                })
            }

        })
    })

})
