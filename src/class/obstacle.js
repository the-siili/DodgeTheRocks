import * as THREE from 'three';
import * as GLTFLDR from 'three/addons/loaders/GLTFLoader.js'

import { Game } from '../main';
import { OpenDeathMenu } from '../death';

const gltfLoader = new GLTFLDR.GLTFLoader();



const asteroid_paths = ["../../res/models/asteroid1.glb",
                        "../../res/models/asteroid2.glb",
                        "../../res/models/asteroid3.glb",
                        "../../res/models/asteroid4.glb",
                        "../../res/models/asteroid5.glb",]


const colours = [0xffffff, 0x7dffbc, 0xcf66ff, 0xffff66]


export class Obstacle{
    player = null;

    cube = null;
    box = new THREE.Box3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)) 

    health = 100
    constructor(scene, player, StopGame){

        this.StopGame = StopGame
        this.player = player;
        asteroid_paths.sort(function() {return 0.5 - Math.random()})

        gltfLoader.load( asteroid_paths[0], (gltf) => {
            gltf.scene.scale.multiplyScalar(Math.random() * (0.4 - (0.2)) + (0.2));
            

        
            gltf.scene.traverse( function ( child ) {
                // child.material.lights = false // This line breaks the Three.js model
                colours.sort(function() {return 0.5 - Math.random()}) 
                let material = new THREE.MeshBasicMaterial({
                    color: colours[0],
                    wireframe: true
                });
                child.material = material;
                child.material.needsUpdate = true;    
            });

            this.cube = gltf.scene;
            this.cube.position.set(Math.random() * (8 - (-8)) + (-8), player.model.scene.position.y, player.model.scene.position.z-100)
            this.cube.rotation.y= Math.random()
            this.cube.rotation.x= Math.random()
            this.cube.rotation.z= Math.random()
            this.cubeBox = new THREE.Box3().setFromObject(this.cube);

            //this.helper = new THREE.Box3Helper( this.box, 0xffff00 );
            //scene.add( this.helper );

            scene.add( this.cube )
          
          }, undefined, function ( error ) {
            
            console.error( error );
            return null;
        
          } );
    }


    Update(scene, player, update_objects){
        if(this.cube == null){
            return;
        }
        this.box.setFromObject(this.cube, true)
        if(this.box.intersectsBox(player.box)){
            OpenDeathMenu()
            this.StopGame()
        }
        if(this.cube.position.z > player.camera.position.z){
            this.Destroy(scene, update_objects)
        }
    }

    TakeDamage(amount, scene, update_objects){
        this.health -= amount
        if (this.health <= 0){
            this.Die(scene, update_objects)
        }
    }
    Die(scene, update_objects){
        this.player.AddScore(-1)
        update_objects.includes(this) && update_objects.splice(update_objects.indexOf(this), 1)
        scene.remove(this.cube)
    }
    Destroy(scene, update_objects){
        update_objects.includes(this) && update_objects.splice(update_objects.indexOf(this), 1)
        scene.remove(this.cube)
    }

}