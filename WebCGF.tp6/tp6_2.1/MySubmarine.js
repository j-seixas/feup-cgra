function MySubmarine(scene) {
    CGFobject.call(this, scene);

	this.x = 4;
	this.y = 0;
	this.z = 4;
	this.angle = 120 * degToRad;

	this.lastTime = -1;

    this.translation = 0;
    this.rotation = 0;

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

MySubmarine.prototype.rotate = function(direction){
	this.rotation = direction;
};

MySubmarine.prototype.translate = function(direction){
	this.translation = direction;
};

MySubmarine.prototype.update = function(currTime){
	var delta = 0;
	if(this.lastTime != -1)
		delta = (this.lastTime - currTime) / 1000;
	this.lastTime = currTime;

	this.angle += this.rotation * delta * this.scene.speed * Math.PI / 3;
	this.x += this.translation * delta * this.scene.speed * Math.sin(this.angle);
	this.z += this.translation * delta * this.scene.speed * Math.cos(this.angle);
};

MySubmarine.prototype.display = function(){
	this.scene.translate(this.x,this.y,this.z);
    this.scene.rotate(this.angle, 0, 1, 0);
	
	//TODO Remove this when the submarine model is ready
	CGFobject.prototype.display.call(this);	
};