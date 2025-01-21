import * as THREE from 'three';


export class Tunnel{
    
    position = new THREE.Vector3(0, 0, 0)

    corners = 0;
    radius = 0;

    lines = [];
    line_objects = []

    constructor(corners, radius){
        this.corners = corners;
        this.radius = radius
        for(let a = 0.0; a < 360; a += 360/corners){
            this.material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

            this.vertecies = []
            let x = this.position.x + radius * Math.cos(Math.PI * a / 180)
            let y = this.position.y + radius * Math.sin(Math.PI * a / 180)
            this.vertecies.push(new THREE.Vector3(x, y+4, this.position.z))
            this.vertecies.push(new THREE.Vector3(x, y+4, this.position.z-10000))
            

            this.lines.push(this.vertecies)
            this.geometry = new THREE.BufferGeometry().setFromPoints( this.vertecies);
            this.line_objects.push(new THREE.Line( this.geometry, this.material )); 
        }
    }
    initialize(scene){
        for(let line_object of this.line_objects){
            scene.add( line_object)
        }
    }

    addSegment(radius_offset, position_offset, scene){

        this.new_radius = this.radius+radius_offset

        for(let line of this.lines){

            this.dir_to_center = new THREE.Vector2(line[line.length-1].x - this.position.x, line[line.length-1].y - this.position.y)
            this.dir_to_center.normalize();
            this.x = line[line.length-1].x + position_offset.x // - this.dir_to_center.x*this.new_radius
            this.y = line[line.length-1].y + position_offset.y
            this.z = line[line.length-1].z + position_offset.z
            
            line.push(new THREE.Vector3(this.x, this.y, this.z))
        }

        for(let a = 0.0; a < 360; a += 360/corners){
            console.log(a)
            this.material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

            this.vertecies = []
            let x = this.position.x + radius * Math.cos(Math.PI * a / 180)
            let y = this.position.y + radius * Math.sin(Math.PI * a / 180)
            this.vertecies.push(new THREE.Vector3(x, y, this.position.z))
            this.vertecies.push(new THREE.Vector3(x, y, this.position.z-30))
            

            this.lines.push(this.vertecies)
            this.geometry = new THREE.BufferGeometry().setFromPoints( this.vertecies);
            this.line_objects.push(new THREE.Line( this.geometry, this.material )); 
        }

    }

}