import * as THREE from 'three';


export class Map {

    scene = new THREE.Scene();
    
    constructor() {

      const geometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube = new THREE.Mesh( geometry, material );
      this.scene.add( cube );

    }
  }
  