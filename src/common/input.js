



export let Buttons = {
    UP:{ codes:['w'], pressed:false},
    DOWN:{ codes:['s'], pressed:false},
    LEFT:{ codes:['a'], pressed:false},
    RIGHT:{ codes:['d'], pressed:false}
}




window.addEventListener("keydown", function(e) {
    for (let [key, button] of Object.entries(Buttons)){
        console.log(button);
        button.codes.forEach(code => {
            if(e.key == code) { button.pressed = true; }
        });
    }
  });

  window.addEventListener("keyup", function(e) {
    for (let [key, button] of Object.entries(Buttons)){
        button.codes.forEach(code => {
            if(e.key == code) { button.pressed = false; }
        });
    }
  });