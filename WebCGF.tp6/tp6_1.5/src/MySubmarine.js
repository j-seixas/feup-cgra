function MySubmarine(scene) {
    CGFobject.call(this, scene);

	this.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.initBuffers = function(){
    this.vertices = [
        0.5, 0.3, 0,
       -0.5, 0.3, 0,
        0, 0.3, 2
	];

	this.indices = [
        0, 1, 2, 
    ];
		
	this.normals = [
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
	];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MySubmarine.prototype.display = function(){
	CGFobject.prototype.display.call(this);	
};