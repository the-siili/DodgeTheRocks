import { Game } from "./main";





export function OpenStartMenu(){

    if (document.getElementById("startbtn") != null){
        return
    }

    let startBtn = document.createElement("button");
    startBtn.className = "button-58"
    startBtn.id = "startbtn"
    startBtn.innerText = "Start";
    startBtn.style.position = "fixed";
    startBtn.style.left = "50%";
    startBtn.style.top = "50%";
    startBtn.style.transform ="translate(-50%, -50%)";

    startBtn.onclick = function(){
        CloseStartMenu()
        Game()
    };
    console.log("hello")
    document.body.appendChild(startBtn);
}

export function CloseStartMenu(){
    document.getElementById("startbtn").remove()
}