function MyTorpedo(scene) {
    CGFobject.call(this, scene);
    this.lastTime = -1;
    
    //Angles
	this.y_angle = scene.submarine.y_angle;
	this.x_angle = scene.submarine.x_angle;

	//Coordinates
	this.x = scene.submarine.x;
	this.y = scene.submarine.y;
	this.z = scene.submarine.z;

	//Parts
	this.cylinder = new MyCylinder(scene, 20, 10);
	this.semisphere = new MySemisphere(scene, 20, 10);
	this.trapezium = new MyTrapezium(scene);

	this.target = null;
	this.distance = 0.0;
	this.end = false;

	//Offset
	this.y_offset = -1.6;
	this.z_offset = 1.5;
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.generatePoint2 = function(){
	var x = this.x + 6*Math.sin(this.y_angle)/(Math.sqrt(1 + Math.pow(Math.sin(this.x_angle),2))); 
	var y = this.y + 6*Math.sin(this.x_angle)/(Math.sqrt(1 + Math.pow(Math.sin(this.x_angle),2))); 
	var z = this.z + 6*Math.cos(this.y_angle)/(Math.sqrt(1 + Math.pow(Math.sin(this.x_angle),2))); 
	return new MyPoint(x,y,z);
}

MyTorpedo.prototype.assignTarget = function(target){
    this.target = target;
    this.distance = Math.sqrt(Math.pow(target.x - this.x,2) +
                              Math.pow(target.y - this.y,2) +
                              Math.pow(target.z - this.z,2)); 

    //Bezier
	this.p1 = new MyPoint(this.x,this.y,this.z);
	this.p2 = this.generatePoint2();
	this.p3 = new MyPoint(target.x,target.y + 3,target.z);
	this.p4 = new MyPoint(target.x,target.y,target.z);
	this.t = 0.0;
}

MyTorpedo.prototype.update = function(currTime){
	var delta = 0;
	if(this.lastTime != -1)
		delta = (currTime - this.lastTime) / 1000;
	this.lastTime = currTime;

	var incT = delta / this.distance;
	this.t += incT;

    if(this.t >= 1.0) {
    	target = null;
		this.end = true;
    	this.t = 1;
    }

    var blend_1 = Math.pow(1-this.t, 3);
    var blend_2 = 3*this.t*(Math.pow(1-this.t,2));
    var blend_3 = 3*Math.pow(this.t, 2)*(1-this.t);
    var blend_4 = Math.pow(this.t, 3);

    var new_x = blend_1 * this.p1.x + blend_2 * this.p2.x + blend_3 * this.p3.x + blend_4 * this.p4.x;
    var new_y = blend_1 * this.p1.y + blend_2 * this.p2.y + blend_3 * this.p3.y + blend_4 * this.p4.y;
    var new_z = blend_1 * this.p1.z + blend_2 * this.p2.z + blend_3 * this.p3.z + blend_4 * this.p4.z;

	var dx = new_x - this.x;
	var dy = new_y - this.y;
	var dz = new_z - this.z;

	this.x = new_x;
	this.y = new_y;
	this.z = new_z;

	this.y_angle = Math.atan(dx / dz) + (dz < 0 ? 180.0*degToRad : 0);
	this.x_angle = Math.atan(dy / Math.sqrt(dx*dx + dy*dy + dz*dz));

	this.y_offset = (1 - this.t) * -1.6;
	if(this.y_offset > 0) this.y_offset = 0;
	this.z_offset = (1 - this.t) * 1.5;
	if(this.z_offset < 0) this.z_offset = 0;
}

MyTorpedo.prototype.display = function(){
	this.scene.translate(this.x,this.y,this.z);
    this.scene.rotate(this.y_angle, 0, 1, 0);
    this.scene.rotate(-this.x_angle, 1, 0, 0);
    this.scene.translate(0, this.y_offset , this.z_offset);

    //Cylinder
	this.scene.pushMatrix();
	this.scene.scale(0.3, 0.3, 2);
    this.cylinder.display();
    this.scene.popMatrix();   

    //Front Semisphere
	this.scene.pushMatrix();
	this.scene.rotate(180.0 * degToRad, 0, 1, 0);
	this.scene.scale(0.3, 0.3, 0.4);
    this.semisphere.display();
    this.scene.popMatrix();

    //Back Semisphere
	this.scene.pushMatrix();
	this.scene.translate(0,0,2);
	this.scene.scale(0.3, 0.3, 0.4);
    this.semisphere.display();
    this.scene.popMatrix(); 

    //Trapezium Back (Horizontal)
	this.scene.pushMatrix();
	this.scene.translate(0,0,-0.2);
	this.scene.scale(0.5,0.75,0.7);
	this.trapezium.display();
    this.scene.popMatrix();

    //Trapezium Back (Vertical)
	this.scene.pushMatrix();
	this.scene.translate(0,0,-0.2);
	this.scene.rotate(90.0*degToRad,0,0,1);
	this.scene.scale(0.5,0.75,0.7);
	this.trapezium.display();
    this.scene.popMatrix();
}