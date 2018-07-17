$(document).ready(function(){
    $("#btn_div_cadastrar").click(function(){
        $("#div_funcionarios").hide();
        $("#div_compra").hide();
        $("#div_clientes").hide()
        $("#div_produtos").hide()
        $("#div_produto_compra").hide()
        $("#form_cli").hide()
        $("#form_fun").hide()
        $("#form_pro").hide()
        $("#div_cadastrar").show();
    })
    $("#btn_show_form_cli").click(function(){
        $("#form_fun").hide()
        $("#form_pro").hide()
        $("#form_cli").show()
    })
    $("#btn_show_form_fun").click(function(){
        
        let senha = prompt("Digite a senha de acesso");

        $.get('/funcionario/autenticar', {senha : senha}, function(result, err){
            console.log(result);
            console.log("volto");
        })
        
        $("#form_fun").show()
        $("#form_pro").hide()
        $("#form_cli").hide()
    })
    $("#btn_show_form_pro").click(function(){
        $("#form_fun").hide()
        $("#form_pro").show()
        $("#form_cli").hide()
    })
})