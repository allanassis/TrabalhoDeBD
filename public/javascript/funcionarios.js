$(document).ready(function(){
    
    $.get('/funcionario', function(result,err){
        carregaTabelaFuncionario(result);
        carregaComboFuncionario(result);
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
    
    $("#btn_div_funcionarios").click(function(){        
        $("#div_cadastrar").hide();
        $("#div_compra").hide();
        $("#div_clientes").hide()
        $("#div_produtos").hide()
        $("#div_produto_compra").hide()
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
            else if(button.text() == "del"){
                let obj = {
                    id : button.val(),
                    idname : 'fun_id',
                }

                $.ajax({
                    url: '/funcionario',
                    data: obj,                        
                    type: 'DELETE',
                    success: function(response) {
                      location.reload();
                    }
                 });
            }
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
})