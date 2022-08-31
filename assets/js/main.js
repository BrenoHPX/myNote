document.addEventListener("DOMContentLoaded", (event) => localStorage.removeItem("Usuário logado"));
const modal = document.getElementById("alertModal");

let entradaUsuario;
let entradaSenha;
let logginStatus=false;
let arrBuscarDadosDB = buscarDadosDB();

const accessForm = document.getElementById("accessForm");
const criarConta = document.getElementById("botaoNovaConta");
criarConta.addEventListener("click", entrarCadastro);

accessForm.addEventListener("submit", (event) => {
    event.preventDefault();

    entradaUsuario = document.getElementById("username").value.toLowerCase();
    entradaSenha = document.getElementById("password").value; 

    arrBuscarDadosDB.forEach((element) => {
        if (element.nome === entradaUsuario && element.senha === entradaSenha){
            
            const usuarioLogado = {
                ID: element.ID,
                mensagens: element.mensagens
            }

            localStorage.setItem("Usuário logado", JSON.stringify(usuarioLogado));
            logginStatus = true;
            window.location.href="/assets/html/home.html";
        }
    });

    if(!logginStatus){
        alertModal("Acesso negado!");
        setTimeout(() => {
        closeModal();    
          }, 2000);
        
        accessForm.reset();
    } 
});

function buscarDadosDB(){
    return JSON.parse(localStorage.getItem("Lista de Usuários")) ?? [];
}

function entrarCadastro(){
    return location.href = "/assets/html/cadastro.html"
}

function alertModal(msg){
    modal.style.display="none";
    modal.innerHTML=`<p>${msg}</p>`;
    modal.style.display="block";
}

function closeModal(){
    modal.style.display="none";
}
