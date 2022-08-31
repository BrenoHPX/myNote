let inputUsername, inputNovaSenha, inputRepeteSenha;
let isUser = 0;
const modal = document.getElementById("alertModal");

function buscarDadosDB(){
    return JSON.parse(localStorage.getItem("Lista de Usuários")) ?? [];
}

let arrBuscarDadosDB = buscarDadosDB();

const botaoCriarConta = document.getElementById('botaoCriarConta');
botaoCriarConta.addEventListener("click", (event) => {
    event.preventDefault();
    if(checkPassCreation()){
        if(checkUser()){
            addUser();
        } 
    }
});

const botaoVoltar = document.getElementById('botaoVoltar');
botaoVoltar.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = "/index.html" 
});

function checkPassCreation(){
    console.log("checkPassCreation-----------");
    getInput();
    if(!inputNovaSenha || !inputRepeteSenha || !inputUsername){
        alertModal("Favor preencher todos os campos!");
        setTimeout(() => {
        closeModal();    
          }, 2000);
        return;
    }
    if(inputNovaSenha === inputRepeteSenha && inputUsername){
        return true;
    }
    alertModal("Ops, as senhas não conferem! Por favor, tente novamente.");
        setTimeout(() => {
        closeModal();    
          }, 2000);
    const formCadastro = document.getElementById("formCadastro");
    formCadastro.reset()

}

function getInput(){
    console.log("getInput-------------")
    inputUsername = document.getElementById("newUsername").value.toLowerCase();
    inputNovaSenha = document.getElementById("newPassword").value;
    inputRepeteSenha = document.getElementById("repeatPassword").value;
}

function checkUser(){
    console.log("checkUser-----------")
    const isUser = arrBuscarDadosDB.some((user) => user.nome===inputUsername);
    if(isUser){
        alertModal("Usuário existente.");
        setTimeout(() => {
        closeModal();    
          }, 2000);
        return;
    } 
    return true;
    }

function addUser(){
    const id = Math.floor((Math.random() * (1000000000 - 10)) + 10);
    const userObj = {
        ID: id,
        nome: inputUsername, 
        senha: inputNovaSenha, 
        mensagens: [],
    };

    arrBuscarDadosDB.push(userObj);
    localStorage.setItem("Lista de Usuários",JSON.stringify(arrBuscarDadosDB));

    alertModal("Usuário adicionado!");
    setTimeout(() => {
    closeModal();    
      }, 2000);
    location.href = "/index.html" 
}

function alertModal(msg){
    modal.style.display="none";
    modal.innerHTML=`<p>${msg}</p>`;
    modal.style.display="block";
}

function closeModal(){
    modal.style.display="none";
}

