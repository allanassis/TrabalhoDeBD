$(document).ready(function(){

    $.get('/produto',function(result, err){
        carregaTabelaProduto(result);
        carregaComboProduto(result);
    })

    $("#btn_pro_cadastrar").click(function(){
        let obj = {
            pro_descricao : $("#pro_descricao").val(),
            pro_valor : Number.parseFloat($("#pro_valor").val().trim()),
            pro_saldoEstoque : Number.parseInt($("#pro_saldoEstoque").val())
        }
        console.log(obj);
        $.post('/produto', obj, function(err, result){
            alert(result);
        })
    })

    $("#btn_div_produtos").click(function(){
        $("#div_funcionarios").hide();
        $("#div_compra").hide();
        $("#div_clientes").hide()
        $("#div_produtos").show()
        $("#div_produto_compra").hide()
        $("#div_cadastrar").hide();

        $("#tabela_produtos tbody > tr > th > button").click(function(){

            let button = $(this);

            if(button.text() == "edit"){

                $("#pro_descricao").val($("#tr_pro_" + button.val() + " > .th_cpf").text());
                $("#pro_valor").val($("#tr_pro_" + button.val() + " > .th_endereco").text());
                $("#pro_saldoEstoque").val($("#tr_pro_" + button.val() + " > .th_dataNascimento").text().slice(0,10));
                

                $("#form_pro").show()
                $("#form_cli").hide()                
                $("#div_cadastrar").show();
                $("#btn_pro_editar").show();
                $("#form_fun").hide();

                $("#btn_pro_editar").click(function(){
                    
                    let obj = {
                        id : button.val(),
                        idname : 'pro_id',
                        descricao : $("#pro_descricao").val(),
                        valor : $("#pro_valor").val(),
                        estoque : $("#pro_saldoEstoque").val()
                    }

                    //Salert(obj);

                    $.ajax({
                        url: '/produto',
                        data: obj,                        
                        type: 'PUT',
                        success: function(response) {
                          console.log(response)
                        }
                     });
                })    
            }
            else if(button.text() == "del"){
                let obj = {
                    id : button.val(),
                    idname : 'pro_id',
                }

                $.ajax({
                    url: '/produto',
                    data: obj,                        
                    type: 'DELETE',
                    success: function(response) {
                      location.reload();
                    }
                 });
            }
        })
    })

    function carregaComboProduto(produtos) {
        for (let prop in produtos) {
            $("#select_produtos_compra").append(`
                <option value="${produtos[prop].pro_id}">${produtos[prop].pro_descricao}</option>
            `);
        }
    }

    function carregaTabelaProduto(pro){
        console.log(pro);
        for(let prop in pro){
            $("#tabela_produtos > tbody").append(`              
                <tr id="tr_pro_${pro[prop].pro_id}">
                    <th class="th_id">${pro[prop].pro_id}</th>
                    <th class="th_descricao">${pro[prop].pro_descricao}</th>
                    <th class="th_valor">${pro[prop].pro_valor}</th>
                    <th class="th_saldoEstoque">${pro[prop].pro_saldoEstoque}</th> 

                    <th><button id="btn_edit_produto_${pro[prop].pro_id}" value="${pro[prop].pro_id}">edit</button></th>
                    <th><button id="btn_del_produto_${pro[prop].pro_id}" value="${pro[prop].pro_id}">del</button></th>
                </tr>`);            
        }
    }
})