import * as THREE from './three/three';

import * as PLAYER from "./class/player";
import {Obstacle} from "./class/obstacle"
import { Tunnel } from './class/tunnel';
import { OpenStartMenu } from './start';


export function Game(){

document.getElementById("scoreText")?.remove()

document.body.innerHTML += `<a id='scoreText' style='
	color: red;
	position: absolute;
	top: 10%;
	width: 100%;
	text-align: center;
	z-index: 100;
	display:block;'>SCORE: </a> `



const renderer = new THREE.WebGLRenderer();;
renderer.setSize( 800, 600 );
renderer.domElement.style.position = "fixed";
renderer.domElement.style.left = "50%";
renderer.domElement.style.top = "50%";
renderer.domElement.style.transform ="translate(-50%, -50%)";
document.body.appendChild( renderer.domElement );


const scene = new THREE.Scene();

let update_objects = [];


const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)

let tunnel = new Tunnel(12, 3)
tunnel.initialize(scene);



let player = new PLAYER.Player(75);
player.initialize(scene)


update_objects.push(player)

//TESTING

//END TESTING
let oldZ = 0
function GameLoop() {
	let newZ = player.model.scene.position.z

	if(newZ - oldZ < -20){
		for(let i = 0; i < 3; i++){
			let test_cube = new Obstacle(scene, player, StopGame)
			update_objects.push(test_cube)
		}
		player.forward_speed += 0.001
		oldZ = newZ
	}

    update_objects.forEach((object) => object.Update(scene, player, update_objects));

	renderer.render( scene, player.camera);
}
setTimeout(renderer.setAnimationLoop, 500, GameLoop)

function StopGame(){
	renderer.setAnimationLoop(null)
	renderer.domElement.remove()
	console.log("bruh")
	
}



//renderer.setAnimationLoop( GameLoop );
}

OpenStartMenu()