import * as THREE from 'three';

import * as MAP from "./class/map";
import * as PLAYER from "./class/player";

const renderer = new THREE.WebGLRenderer();;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let update_objects = [];

let map = new MAP.Map();

let player = new PLAYER.Player(75);


update_objects.push(player)





function GameLoop() {
    update_objects.forEach((object) => object.Update());
	renderer.render( map.scene, player.camera);
}

renderer.setAnimationLoop( GameLoop );
