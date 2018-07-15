$(document).ready(function(){

    $("#div_cadastrar").hide();

    $.get('/funcionario', function(result,err){
        for(let func in result){
            $("#tabela_funcionarios").append(`              
                <tr>
                    <th>${result[func].fun_id}</th>
                    <th>${result[func].fun_nome}</th>
                    <th>${result[func].fun_cpf}</th> 
                    <th>${result[func].fun_tipo}</th>
                    <th>${result[func].fun_dataAdmissao}</th>
                    <th style="display:none">${result[func].fun_senhaAcesso}</th>
                </tr>`);

        }    
    })

    $("#btn_div_cadastrar").click(function(){
        $("#div_funcionarios").hide();
        $("#div_cadastrar").show();
    })

    $("#btn_div_funcionarios").click(function(){        
        $("#div_cadastrar").hide();
        $("#div_funcionarios").show();
    })

    $("#cli_cadastrar").click(function(){
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
    $("#fun_cadastrar").click(function(){
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

    $("#pro_cadastrar").click(function(){
        let obj = {
            pro_descricao : $("#pro_descricao").val(),
            pro_valor : Number.parseFloat($("#pro_valor").val().trim()),
        }
        console.log(obj);
        $.post('/produto', obj, function(err, result){
            alert(result);
        })
    })
})