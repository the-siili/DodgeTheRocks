



export let Buttons = {
    UP:{ codes:['w', 'ArrowUp'], pressed:false},
    DOWN:{ codes:['s', 'ArrowDown'], pressed:false},
    LEFT:{ codes:['a', 'ArrowLeft'], pressed:false},
    RIGHT:{ codes:['d', 'ArrowRight'], pressed:false},
    SPACE:{ codes:[' '], pressed:false},
    SHIFT:{ codes:['Shift'], pressed:false}
}



window.addEventListener("keydown", function(e) {
    for (let [key, button] of Object.entries(Buttons)){
        button.codes.forEach(code => {
            if(e.key == code) { 
                button.pressed = true;
            }
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