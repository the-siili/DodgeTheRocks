import * as THREE from 'three';

import * as INPUT from '../common/input'

export class Player{
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    constructor(fov){

        this.camera.fov = fov;

    }

    Update(){
        
        if(INPUT.Buttons.UP.pressed) { this.camera.position.z -= 0.2; console.log("")}
        if(INPUT.Buttons.DOWN.pressed) { this.camera.position.z += 0.2; }
        if(INPUT.Buttons.LEFT.pressed) { this.camera.position.x -= 0.2; }
        if(INPUT.Buttons.RIGHT.pressed) { this.camera.position.x += 0.2; }
    }
}