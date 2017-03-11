/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
	this.vertices = [];
	this.indices = [];
	this.normals = [];
 	var ang = Math.PI*2/this.slices;
	

	for(j = 0; j < this.stacks ; j++){
 		for(i = 0; i < this.slices*2 ; i++){
		
 			this.vertices.push(Math.cos(i*ang), Math.sin(i*ang), j);
 			this.vertices.push(Math.cos(i*ang), Math.sin(i*ang), j+1);
 			this.vertices.push(Math.cos((i+1)*ang), Math.sin((i+1)*ang), j);
 			this.vertices.push(Math.cos((i+1)*ang), Math.sin((i+1)*ang), j+1);


			this.normals.push(Math.cos((i+0.5)*ang), Math.sin((i+0.5)*ang), 0);
 			this.normals.push(Math.cos((i+0.5)*ang), Math.sin((i+0.5)*ang), 0);
 			this.normals.push(Math.cos((i+0.5)*ang), Math.sin((i+0.5)*ang), 0);
 			this.normals.push(Math.cos((i+0.5)*ang), Math.sin((i+0.5)*ang), 0);


 			this.indices.push(1+(2*i)+(4*this.slices*j), 0+(2*i)+(4*this.slices*j), 2+(2*i)+(4*this.slices*j));
 			this.indices.push(2+(2*i)+(4*this.slices*j), 3+(2*i)+(4*this.slices*j), 1+(2*i)+(4*this.slices*j));


 		}
	}
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
