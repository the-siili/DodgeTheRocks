import * as THREE from 'three';
import * as GLTFLDR from 'three/addons/loaders/GLTFLoader.js'

import { Buttons } from '../common/input';

const gltfLoader = new GLTFLDR.GLTFLoader();


export class Player{
    camera = new THREE.PerspectiveCamera( 90, 800 / 600, 0.1, 1000 );
    model = null;
    box = new THREE.Box3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)) 
    forward_speed = 0.6;
    
    just_shot = false;

    bullets = []


    score = 0
    scoreText = window.document.getElementById("scoreText")


    constructor(fov, scene){

        this.camera.fov = fov;
        this.camera.rotateOnAxis(new THREE.Vector3(1, 0, 0),-0.6 )
        this.camera.position.setY(4)
        

    }

    initialize(scene){
        
         gltfLoader.load( '../../res/models/spaceship.glb', (gltf) => {
            gltf.scene.scale.multiplyScalar(0.05);
            
            let material = new THREE.MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true
            });
        
            gltf.scene.traverse( function ( child ) {
                // child.material.lights = false // This line breaks the Three.js model 
                child.material = material;
                child.material.needsUpdate = true;         
            });

            this.model = gltf;
            this.box.setFromObject(this.model.scene, true);
            scene.add( gltf.scene )
          
          }, undefined, function ( error ) {
            
            console.error( error );
            return null;
        
          } );


        //this.model.scene.position.setX(this.camera.position.x)
        //this.model.scene.position.setX(this.camera.position.y)
        //this.model.scene.position.setX(this.camera.position.z+10)
    }

    Update(scene, player, update_objects){
        this.oldz = this.model.scene.position.z
        for(let bullet of this.bullets){
            bullet.Update(scene, update_objects)
        }
        
        if(this.just_shot == false){
            if(Buttons.SPACE.pressed) { 
                this.Shoot(scene)
                this.just_shot = true
            }
        }
        if(!Buttons.SPACE.pressed){
            this.just_shot = false
        }

        if(this.model == undefined){return}
        
        this.offset = new THREE.Vector3(0, 0, 0)

        if(Buttons.LEFT.pressed && this.model.scene.position.x > -4.5) { 
            this.model.scene.position.x -= 0.24; 
            if(this.model.scene.rotation.z < 0.15){
                this.model.scene.rotation.z += 0.02;  
            }
        }
        if(Buttons.RIGHT.pressed && this.model.scene.position.x < 4.5) { 
            this.model.scene.position.x += 0.24; 
            if(this.model.scene.rotation.z > -0.15){
                this.model.scene.rotation.z -= 0.02;  
            }
        }

        if(!Buttons.RIGHT.pressed && !Buttons.LEFT.pressed){
            this.model.scene.rotation.z = 0; 
        } 
        if(!Buttons.DOWN.pressed && !Buttons.UP.pressed){
            this.model.scene.rotation.y = 0; 
        }

        this.camera.position.setZ(this.model.scene.position.z+2)
        
        this.model.scene.position.setZ(this.model.scene.position.z - this.forward_speed)
        this.box.setFromObject(this.model.scene);


        this.AddScore((this.model.scene.position.z - this.oldz)/100)
    }

    AddScore(score){
        this.score += score
        this.scoreText.innerHTML = "SCORE: " + ~~-this.score
    }
    Shoot(scene){
        this.bullets.push(new Bullet(scene, this.model.scene.position, this.bullets))
    }

    Die(){
        window.location.reload();
    }
}

class Bullet{
    geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.5 ); s
    material = new THREE.MeshBasicMaterial( {color: 0xfa001d} ); 
    cube = new THREE.Mesh( this.geometry, this.material );
    box = new THREE.Box3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)) 
    constructor(scene, position, bullets){

        this.bullets = bullets
        this.cube.position.setZ(position.z-1)
        this.cube.position.setY(position.y)
        this.cube.position.setX(position.x)
        this.cubeBox = new THREE.Box3().setFromObject(this.cube);
        window.setTimeout(this.Destroy, 3000, this.cube, scene, bullets); 
        scene.add( this.cube );

    }


    Destroy(cube, scene, bullets){
        scene.remove(cube)
        bullets.includes(this) && bullets.splice(bullets.indexOf(this), 1)
    }
    Update(scene, update_objects){
        this.cube.position.setZ(this.cube.position.z - 2)
        
        update_objects.forEach(element => {
            this.box.setFromObject(this.cube, true)
            if(this.box.intersectsBox(element.box)){
                try{
                    
                    element.TakeDamage(30, scene, update_objects)
                }
                catch{}
                this.Destroy(this.cube, scene, update_objects)
            }

        });

    }
}