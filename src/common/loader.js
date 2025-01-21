import * as THREE from 'three';
import * as GLTFLDR from 'three/addons/loaders/GLTFLoader.js'




export function LoadGltf(path, obj, scene, initial_scale = 1, wireframe = false){
    gltfLoader.load( path, function ( gltf ) {
    gltf.scene.scale.multiplyScalar(initial_scale);
    
    if(wireframe == true){
      let material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
      });

      gltf.scene.traverse( function ( child ) {
        // child.material.lights = false // This line breaks the Three.js model 
        child.material = material;
        child.material.needsUpdate = true;         
      });
    }
    obj = gltf;
    scene.add( gltf.scene )
  
  }, undefined, function ( error ) {
    
    console.error( error );
    return null;

  } );
}