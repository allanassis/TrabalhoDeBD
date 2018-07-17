$(document).ready(function(){

    $.get('/cliente', function(result,err){
        carregaTabelaCliente(result);
        carregaComboCliente(result); 
          
    })

    $("#btn_cli_cadastrar").click(function(){
        let obj = {
            cli_nome : $("#cli_nome").val(),
            cli_cpf : $("#cli_cpf").val(),
            cli_endereco : $("#cli_endereco").val(),
            cli_dataNascimento : $("#cli_dataNascimento").val(),
            cli_telefone1 : $("#cli_telefone1").val(),
            cli_telefone2 : $("#cli_telefone2").val()
        }
        console.log(obj);
        $.post('/cliente', obj, function(err, result){
        })
    })
    

    $("#btn_div_clientes").click(function(){
        $("#div_funcionarios").hide();
        $("#div_compra").hide();        
        $("#div_cadastrar").hide();
        $("#div_produtos").hide()
        $("#div_produto_compra").hide()
        $("#div_clientes").show();

        $("#tabela_clientes tbody > tr > th > button").click(function(){

            let button = $(this);

            if(button.text() == "edit"){

                $("#cli_nome").val($("#tr_cli_" + button.val() + " > .th_nome").text());
                $("#cli_cpf").val($("#tr_cli_" + button.val() + " > .th_cpf").text());
                $("#cli_endereco").val($("#tr_cli_" + button.val() + " > .th_endereco").text());
                $("#cli_dataNascimento").val($("#tr_cli_" + button.val() + " > .th_dataNascimento").text().slice(0,10));
                $("#cli_telefone1").val($("#tr_cli_" + button.val() + " > .th_telefone1").text());
                $("#cli_telefone2").val($("#tr_cli_" + button.val() + " > .th_telefone2").text());                

                $("#form_cli").show()
                $("#form_pro").hide()                
                $("#div_cadastrar").show();
                $("#btn_cli_editar").show();
                $("#form_fun").hide();

                $("#btn_cli_editar").click(function(){
                    
                    let obj = {
                        id : button.val(),
                        idname : 'cli_id',
                        nome : $("#cli_nome").val(),
                        cpf : $("#cli_cpf").val(),
                        endereco : $("#cli_endereco").val(),
                        dataNascimento : $("#cli_dataNascimento").val(),
                        telefone1 : $("#cli_telefone1").val(),
                        telefone2 : $("#cli_telefone2").val(),
                    }

                    //Salert(obj);

                    $.ajax({
                        url: '/cliente',
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
                    idname : 'cli_id',
                }

                $.ajax({
                    url: '/cliente',
                    data: obj,                        
                    type: 'DELETE',
                    success: function(response) {
                      location.reload();
                    }
                 });
            }
        })
    })


    function carregaComboCliente(cli){
        for(let prop in cli){
            $("#select_cliente").append(`                              
            <option value="${cli[prop].cli_id}">
                ${cli[prop].cli_nome}
            </option>`);
        }
    }

    function carregaTabelaCliente(cli){
        for(let prop in cli){
            $("#tabela_clientes > tbody").append(`              
            <tr id="tr_cli_${cli[prop].cli_id}">
                <th class="th_id">${cli[prop].cli_id}</th>
                <th class="th_nome">${cli[prop].cli_nome}</th>
                <th class="th_cpf">${cli[prop].cli_cpf}</th> 
                <th class="th_endereco">${cli[prop].cli_endereco}</th>
                <th class="th_dataNascimento">${cli[prop].cli_dataNascimento}</th>
                <th class="th_telefone1">${cli[prop].cli_telefone1}</th>
                <th class="th_telefone2">${cli[prop].cli_telefone2}</th>
                <th><button id="btn_edit_cliente_${cli[prop].cli_id}" value="${cli[prop].cli_id}">edit</button></th>
                <th><button id="btn_del_cliente_${cli[prop].cli_id}" value="${cli[prop].cli_id}">del</button></th>
            </tr>`);
        }
    }
})