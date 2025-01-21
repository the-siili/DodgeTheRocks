import { Game } from "./main";





export function OpenDeathMenu(){

    if (document.getElementById("restartbtn") != null){
        return
    }

    let startBtn = document.createElement("button");
    startBtn.className = "button-58"
    startBtn.id = "restartbtn"
    startBtn.innerText = "Try Again";
    startBtn.style.position = "fixed";
    startBtn.style.left = "50%";
    startBtn.style.top = "50%";
    startBtn.style.transform ="translate(-50%, -50%)";

    startBtn.onclick = function(){
        CloseDeathMenu()
        Game()
    };
    console.log("hello")
    document.body.appendChild(startBtn);
}

export function CloseDeathMenu(){
    document.getElementById("restartbtn").remove()
}