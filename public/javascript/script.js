$(document).ready(function(){

    $("#div_cadastrar").hide();
    $("#btn_fun_editar").hide();
    $("#div_funcionarios").hide();
    $("#div_clientes").hide()

    $.get('/funcionario', function(result,err){
        for(let func in result){
            $("#tabela_funcionarios").append(`              
                <tr id="tr_${result[func].fun_id}">
                    <th>${result[func].fun_id}</th>
                    <th>${result[func].fun_nome}</th>
                    <th>${result[func].fun_cpf}</th> 
                    <th>${result[func].fun_tipo}</th>
                    <th>${result[func].fun_dataAdmissao}</th>
                    <th style="display:none">${result[func].fun_senhaAcesso}</th>
                    <th><button id="btn_edit_funcionario_${result[func].fun_id}" value="${result[func].fun_id}">edit</button></th>
                    <th><button id="btn_del_funcionario_${result[func].fun_id}" value="${result[func].fun_id}">del</button></th>
                </tr>`);

                $("#select_funcionario").append(`                              
                <optgroup label="${result[func].fun_nome}">
                    <option style="display:none" value="${result[func].fun_id}"></option>
                    <option style="display:none" value="${result[func].fun_cpf}"></option>
                    <option style="display:none" value="${result[func].fun_tipo}"></option>
                    <option style="display:none" value="${result[func].fun_dataAdmissao}"></option>
                </optgroup>`);

        }    
    })

    $.get('/cliente', function(result,err){
        for(let cli in result){

            $("#tabela_clientes").append(`              
            <tr>
                <th>${result[cli].cli_id}</th>
                <th>${result[cli].cli_nome}</th>
                <th>${result[cli].cli_cpf}</th> 
                <th>${result[cli].cli_endereco}</th>
                <th>${result[cli].cli_dataNascimento}</th>
                <th>${result[cli].cli_telefone1}</th>
                <th>${result[cli].cli_telefone2}</th>
            </tr>`);

            $("#select_cliente").append(`                              
                <optgroup label="${result[cli].cli_nome}">
                    <option style="display:none" value="${result[cli].cli_id}"></option>
                    <option style="display:none" value="${result[cli].cli_cpf}"></option>
                    <option style="display:none" value="${result[cli].cli_endereco}"></option>
                    <option style="display:none" value="${result[cli].cli_dataNascimento}"></option>
                    <option style="display:none" value="${result[cli].cli_telefone1}"></option>
                    <option style="display:none" value="${result[cli].cli_telefone2}"></option>
                </optgroup>`);

        } 
          
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

        $("th > button").click(function(){
            let button = $(this);
            if(button.text() == "edit"){
                let tr = $(button.parent().parent());                
                console.log(tr.find('td'));
                console.log(tr);
                console.log($(tr)[0])

                $("#form_cli").hide()
                $("#form_pro").hide()                
                $("#div_cadastrar").show();
                $("#btn_fun_editar").show();
                $("#form_fun").show();



                $("#btn_fun_editar").click

                
            }
        })

    })

    $("#btn_div_clientes").click(function(){
        $("#div_funcionarios").hide();
        $("#div_compra").hide();        
        $("#div_cadastrar").hide();
        $("#div_clientes").show()
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
})