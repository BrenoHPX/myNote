const modal = document.getElementById("alertModal");
let logedUser = JSON.parse(localStorage.getItem("Usuário logado"));

document.addEventListener("DOMContentLoaded", () => {
    if(!logedUser){
        alertModal("Usuário não logado!");
        setTimeout(() => {
        closeModal();    
          }, 2000);
        location.href = "/index.html";
    }
    createTable();
});

function createTable(){
    logedUser.mensagens.forEach((note) => printNote(note));
}

function printNote(note){

    let row = document.createElement("tr");
    row.id=note.msgNum;

    let columnNum = document.createElement("td");
    columnNum.className="tdNum";
    let columnDesc = document.createElement("td");
    let columnDet = document.createElement("td");
    let columnAct = document.createElement("td");
    let table = document.getElementById("tBody");

    let botaoEditar = document.createElement("button");
    botaoEditar.id="botaoEditar";
    botaoEditar.innerHTML="Edit";
    botaoEditar.addEventListener("click", () => {
        editarMsg(row.id);
    })

    let botaoApagar = document.createElement("button");
    botaoApagar.id="botaoApagar";
    botaoApagar.innerHTML="Delete";
    botaoApagar.addEventListener("click", () => {
        apagarMsg(row.id);
    })

    columnAct.appendChild(botaoEditar);
    columnAct.appendChild(botaoApagar);
    row.appendChild(columnNum);
    row.appendChild(columnDesc);
    row.appendChild(columnDet);
    row.appendChild(columnAct);
    table.appendChild(row);
    
    columnNum.innerHTML = note.msgNum;
    columnDesc.innerHTML = note.descricao;
    columnDet.innerHTML = note.detalhamento;
}

let botaoSalvar = document.querySelector(".botaoSalvar");
botaoSalvar.addEventListener("click", salvarMsg);

function salvarMsg(){

    let checkNum=1;

    const inputDescricao = document.getElementById("inputDescricao").value;
    const inputDetalhamento = document.getElementById("inputDetalhamento").value;

    if(!inputDescricao){
        // alert("Não é possível salvar uma mensagem sem um título.");
        alertModal("Não é possível salvar uma mensagem sem um título.");
        setTimeout(() => {
        closeModal();    
          }, 2000);
        return;
    }

    listaTdNum = document.getElementsByClassName("tdNum");
    for (const iterator of listaTdNum) {
        let tdNum = Number(iterator.innerText);
        console.log(tdNum); 
            if (tdNum>=checkNum){
                checkNum=tdNum+1;
            };
        };

    let msgObj =
    {
    descricao: inputDescricao,
    detalhamento: inputDetalhamento,
    msgNum: checkNum
    };

    logedUser.mensagens.push(msgObj);
    localStorage.setItem("Usuário logado",JSON.stringify(logedUser));
    document.getElementById("inputLine").reset();
    printNote(msgObj);
}   

function apagarMsg(targetMsg){

    if (confirm("Are you sure to delete?")){
        const targetTr = document.getElementById(targetMsg);
        targetTr.remove();
    
        let targetMsgIndex = logedUser.mensagens.findIndex((msg) => msg.msgNum == targetMsg);
        logedUser.mensagens.splice(targetMsgIndex,1);
    
        localStorage.setItem("Usuário logado",JSON.stringify(logedUser));
    }
}

function editarMsg(targetMsg){

    const targetTr = document.getElementById(targetMsg);
    const targetDesc = targetTr.childNodes[1];
    const targetDet = targetTr.childNodes[2];
    const targetBtns = targetTr.childNodes[3];
    let targetMsgIndex = logedUser.mensagens.findIndex((msg) => msg.msgNum == targetMsg);
  
    targetDesc.innerHTML=`<input id="descInput" value="${targetDesc.innerText}">`;
    targetDet.innerHTML=`<input id="detInput" value="${targetDet.innerText}">`;
    targetBtns.innerHTML=`
    <button type="button" id="btnOk">OK</button>
    <button type="button" id="btnOkCancel">Cancel</button>`;

    const botaoOkCancel = document.getElementById("btnOkCancel");
    botaoOkCancel.id="botaoOkCancel";
    botaoOkCancel.addEventListener("click", () => {
        targetDesc.innerHTML= logedUser.mensagens[targetMsgIndex].descricao;
        targetDet.innerHTML=logedUser.mensagens[targetMsgIndex].detalhamento;

        const botaoApagar = document.createElement("button");
        botaoApagar.setAttribute("id", "botaoApagar");
        botaoApagar.innerHTML="Delete";
        botaoApagar.addEventListener("click", () => apagarMsg(targetMsg));

        const botaoEditar = document.createElement("button");
        botaoEditar.id="botaoEditar";
        botaoEditar.innerHTML="Edit";
        botaoEditar.addEventListener("click", () => editarMsg(targetMsg));

        targetBtns.appendChild(botaoEditar);
        targetBtns.appendChild(botaoApagar);
        targetBtns.removeChild(botaoOk);
        targetBtns.removeChild(botaoOkCancel);
    });

    const botaoOk = document.getElementById("btnOk");
    botaoOk.id="botaoOk";
    botaoOk.addEventListener("click", () => {
        
        logedUser.mensagens[targetMsgIndex].descricao = document.getElementById("descInput").value;
        logedUser.mensagens[targetMsgIndex].detalhamento = document.getElementById("detInput").value;

        localStorage.setItem("Usuário logado",JSON.stringify(logedUser));

        const botaoApagar = document.createElement("button");
        botaoApagar.setAttribute("id", "botaoApagar");
        botaoApagar.innerHTML="Delete";
        botaoApagar.addEventListener("click", () => apagarMsg(targetMsg));

        const botaoEditar = document.createElement("button");
        botaoEditar.id="botaoEditar";
        botaoEditar.innerHTML="Edit";
        botaoEditar.addEventListener("click", () => editarMsg(targetMsg));

        targetDesc.innerHTML=document.getElementById("descInput").value;
        targetDet.innerHTML=document.getElementById("detInput").value;

        targetBtns.appendChild(botaoEditar);
        targetBtns.appendChild(botaoApagar);
        targetBtns.removeChild(botaoOk);
        targetBtns.removeChild(botaoOkCancel);
    });
}

let sair = document.getElementById("botaoSair");
sair.addEventListener("click", logOut);

function logOut(){

    let usersDB = JSON.parse(localStorage.getItem("Lista de Usuários"));
    let loggedUserOnDB = usersDB.find((user)=>user.ID==logedUser.ID);
    
    loggedUserOnDB.mensagens=logedUser.mensagens;

    localStorage.setItem("Lista de Usuários",JSON.stringify(usersDB));

    localStorage.removeItem("Usuário logado")
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

window.onunload = () => logOut()