$(document).ready(function(){

    $("#div_cadastrar").hide();
    $("#btn_fun_editar").hide();
    $("#div_funcionarios").hide();
    $("#div_clientes").hide()

    
    $.get('/funcionario', function(result,err){
        carregaTabelaFuncionario(result);
        carregaComboFuncionario(result);
    })

    $.get('/cliente', function(result,err){
        carregaTabelaCliente(result);
        carregaComboCliente(result); 
          
    })



    $("#btn_div_cadastrar").click(function(){
        $("#div_funcionarios").hide();
        $("#div_compra").hide();
        $("#div_clientes").hide()
        $("#div_cadastrar").show();
    })

    $("#btn_div_funcionarios").click(function(){        
        $("#div_cadastrar").hide();
        $("#div_compra").hide();
        $("#div_clientes").hide()
        $("#div_funcionarios").show();

        $("#tabela_funcionarios tbody > tr > th > button").click(function(){

            let button = $(this);

            if(button.text() == "edit"){

                $("#fun_nome").val($("#tr_fun_" + button.val() + " > .th_nome").text());
                $("#fun_cpf").val($("#tr_fun_" + button.val() + " > .th_cpf").text());
                $("#fun_tipo").val($("#tr_fun_" + button.val() + " > .th_tipo").text());
                $("#fun_dataAdmissao").val($("#tr_fun_" + button.val() + " > .th_dataAdmissao").text().slice(0,10));
                $("#fun_senhaAcesso").val($("#tr_fun_" + button.val() + " > .th_senhaAcesso").text());                

                $("#form_cli").hide()
                $("#form_pro").hide()                
                $("#div_cadastrar").show();
                $("#btn_fun_editar").show();
                $("#form_fun").show();

                $("#btn_fun_editar").click(function(){
                    
                    let obj = {
                        id : button.val(),
                        idname : 'fun_id',
                        nome : $("#fun_nome").val(),
                        cpf : $("#fun_cpf").val(),
                        tipo : $("#fun_tipo").val(),
                        dataAdmissao : $("#fun_dataAdmissao").val(),
                        senhaAcesso : $("#fun_senhaAcesso").val(),
                    }

                    $.ajax({
                        url: '/funcionario',
                        data: obj,
                        dataType: 'array',
                        type: 'PUT',
                        success: function(response) {
                          console.log(response)
                        }
                     });
                })    
            }
        })

    })

    $("#btn_div_clientes").click(function(){
        $("#div_funcionarios").hide();
        $("#div_compra").hide();        
        $("#div_cadastrar").hide();
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
        })
    })

    $("#btn_div_compra").click(function(){        
        $("#div_cadastrar").hide();        
        $("#div_funcionarios").hide();
        $("#div_clientes").hide()
        $("#div_compra").show();
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
            alert(result);
        })
    })
    $("#btn_fun_cadastrar").click(function(){
        let obj = {
            fun_nome : $("#fun_nome").val(),
            fun_cpf : $("#fun_cpf").val(),
            fun_tipo : $("#fun_tipo").val(),
            fun_dataAdmissao : $("#fun_dataAdmissao").val(),
            fun_senhaAcesso : $("#fun_senhaAcesso").val(),            
        }
        console.log(obj);
        $.post('/funcionario', obj, function(err, result){
            alert(result);
        })
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

    function carregaComboFuncionario(fun){
        for(let prop in fun){

            $("#select_funcionario").append(`                              
            <option value="${fun[prop].fun_id}">
                ${fun[prop].fun_nome}
            </option>`);
        }
    }

    function carregaTabelaFuncionario(fun){
        for(let prop in fun){
            $("#tabela_funcionarios > tbody").append(`              
                <tr id="tr_fun_${fun[prop].fun_id}">
                    <th class="th_id">${fun[prop].fun_id}</th>
                    <th class="th_nome">${fun[prop].fun_nome}</th>
                    <th class="th_cpf">${fun[prop].fun_cpf}</th> 
                    <th class="th_tipo">${fun[prop].fun_tipo}</th>
                    <th class="th_dataAdmissao">${fun[prop].fun_dataAdmissao}</th>
                    <th class="th_senhaAcesso" style="display:none">${fun[prop].fun_senhaAcesso}</th>
                    <th><button id="btn_edit_funcionario_${fun[prop].fun_id}" value="${fun[prop].fun_id}">edit</button></th>
                    <th><button id="btn_del_funcionario_${fun[prop].fun_id}" value="${fun[prop].fun_id}">del</button></th>
                </tr>`);            
        }
    }

    
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