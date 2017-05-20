const max_steering = 45.0 * degToRad;
const max_height = 0;
const min_height = -1;

function MySubmarine(scene) {
    CGFobject.call(this, scene);
    this.lastTime = -1;

	//Coordinates
	this.x = 5;
	this.y = 0;
	this.z = 5;

	//Angles
	this.y_angle = 150.0 * degToRad;
	this.x_angle = 0;
	this.helix_angle = 0;
	this.steering_y_angle = 0;
	this.steering_x_angle = 0;

	//Animation
    this.y_rotation = 0;
    this.x_rotation = 0;
    this.periscope_height = max_height;
    this.translation = 0;

	//Parts
	this.cylinder = new MyCylinder(scene, 20, 10);
	this.cylinder_inside = new MyCylinderInside(scene, 20, 10)
	this.semisphere = new MySemisphere(scene, 20, 10);
	this.base = new CylinderBase(scene, 20);
	this.trapezium = new MyTrapezium(scene);
	this.prism = new MyUnitCubeQuad(scene);

    this.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.rotate_y = function(direction){
	this.y_rotation = direction;
};

MySubmarine.prototype.rotate_x = function(direction){
	this.x_rotation = direction;
};

MySubmarine.prototype.translate = function(direction){
	this.translation = direction;
};

MySubmarine.prototype.trimAngle = function(angle){
	if(angle >= 2*Math.PI)
		angle -= 2*Math.PI;
	else if(angle <= -2*Math.PI)
		angle += 2*Math.PI;
};


MySubmarine.prototype.update = function(currTime){
	var delta = 0;
	if(this.lastTime != -1)
		delta = (currTime - this.lastTime) / 1000;
	this.lastTime = currTime;

	this.y_angle += this.y_rotation * delta * Math.abs(this.scene.speed) * Math.PI / 10;
	this.x_angle += this.x_rotation * delta * Math.abs(this.scene.speed) * Math.PI / 10;
	this.trimAngle(this.y_angle);
	this.trimAngle(this.x_angle);

	this.x += delta * this.scene.speed * Math.sin(this.y_angle);
	this.y += delta * this.scene.speed * Math.sin(this.x_angle);
	this.z += delta * this.scene.speed * Math.cos(this.y_angle);
	
	this.helix_angle += delta * this.scene.speed * Math.PI * 2;
	this.trimAngle(this.helix_angle);

	//Trapezium
	if(this.x_rotation != 0){
		this.steering_x_angle += this.x_rotation * delta * Math.PI;
		if(Math.abs(this.steering_x_angle) > max_steering)
			this.steering_x_angle = max_steering * this.x_rotation;
	}
	else if(this.steering_x_angle > 0){
		this.steering_x_angle -= delta * Math.PI;
		if(this.steering_x_angle < 0)
			this.steering_x_angle = 0;
	}
	else if(this.steering_x_angle < 0){
		this.steering_x_angle += delta * Math.PI;
		if(this.steering_x_angle > 0)
			this.steering_x_angle = 0;
	}
	

	if(this.y_rotation != 0){
		this.steering_y_angle += this.y_rotation * delta * Math.PI;
		if(Math.abs(this.steering_y_angle) > max_steering)
			this.steering_y_angle = max_steering * this.y_rotation;
	}
	else if(this.steering_y_angle > 0){
		this.steering_y_angle -= delta * Math.PI;
		if(this.steering_y_angle < 0)
			this.steering_y_angle = 0;
	}
	else if(this.steering_y_angle < 0){
		this.steering_y_angle += delta * Math.PI;
		if(this.steering_y_angle > 0)
			this.steering_y_angle = 0;
	}

	//Periscope
	this.periscope_height += this.translation * delta;
	if(this.periscope_height >= max_height){
		this.translation = 0;
		this.periscope_height = max_height;
	} else if(this.periscope_height <= min_height){
		this.translation = 0;
		this.periscope_height = min_height;
	}
};

MySubmarine.prototype.display = function(){
	this.scene.translate(this.x,this.y,this.z);
    this.scene.rotate(this.y_angle, 0, 1, 0);
    this.scene.rotate(-this.x_angle, 1, 0, 0);

	//Cylinder
	this.scene.pushMatrix();
	this.scene.scale(0.75, 1, 5);
    this.cylinder.display();
    this.scene.popMatrix();

    //Front Semisphere
	this.scene.pushMatrix();
	this.scene.rotate(180.0 * degToRad, 0, 1, 0);
	this.scene.scale(0.75, 1, 0.75);
    this.semisphere.display();
    this.scene.popMatrix();

    //Back Semisphere
	this.scene.pushMatrix();
	this.scene.translate(0,0,5);
	this.scene.scale(0.75, 1, 0.75);
    this.semisphere.display();
    this.scene.popMatrix();

    //Tower
  	this.scene.pushMatrix();
  	this.scene.translate(0,1.75,3);
  	this.scene.rotate(90.0 * degToRad,1,0,0);
  	this.scene.scale(0.55, 0.8, 1.2);
	this.cylinder.display();
    this.scene.popMatrix();

    //Tower base
    this.scene.pushMatrix();
    this.scene.translate(0, 1.75, 3);
  	this.scene.scale(0.55, 1.2, 0.8);
    this.scene.rotate(-90 * degToRad, 1,0,0);
	this.base.display();
    this.scene.popMatrix();

	//Periscope
	this.scene.pushMatrix();
	this.scene.translate(0,this.periscope_height,0);

    	//Periscope (Vertical part)
    	this.scene.pushMatrix();
		this.scene.translate(0,3,3.35);
		this.scene.rotate(90.0 * degToRad,1,0,0);
		this.scene.scale(0.1, 0.1, 2.3);
		this.cylinder.display();
    	this.scene.popMatrix();

    	//Periscope (Horizontal part)
    	this.scene.pushMatrix();
		this.scene.translate(0,3,3.275); 
		this.scene.scale(0.1, 0.1, 0.3);
		this.cylinder.display();
    	this.scene.popMatrix();

    	//Periscope base back
    	this.scene.pushMatrix();
		this.scene.translate(0,3,3.575); 
  		this.scene.scale(0.1, 0.1, 1);
		this.base.display();
    	this.scene.popMatrix();

    	//Periscope base front
    	this.scene.pushMatrix();
		this.scene.translate(0,3,3.275); 
  		this.scene.scale(0.1, 0.1, 1);
  		this.scene.rotate(180.0 * degToRad, 1,0,0);
		this.base.display();
    	this.scene.popMatrix();

    this.scene.popMatrix();

	//Trapezium Midle
	this.scene.pushMatrix();
	this.scene.translate(0,1.25,3); 
  	this.scene.rotate(180.0 * degToRad, 1,0,0);
  	this.scene.rotate(this.steering_x_angle,1,0,0);
  	this.scene.scale(0.9,0.9,0.9);
	this.trapezium.display();
    this.scene.popMatrix();

    //Trapezium Back (Horizontal)
	this.scene.pushMatrix();
	this.scene.translate(0,0,-0.25);
	this.scene.rotate(this.steering_x_angle,1,0,0);
	this.scene.scale(1.5,1,1);
	this.trapezium.display();
    this.scene.popMatrix();

    //Trapezium Back (Vertical)
	this.scene.pushMatrix();
	this.scene.translate(0,0,-0.25);
	this.scene.rotate(90.0*degToRad,0,0,1);
	this.scene.rotate(-this.steering_y_angle,1,0,0);
	this.scene.scale(1.75,1,1);
	this.trapezium.display();
    this.scene.popMatrix();

    //Propeller Cylinders
	this.scene.pushMatrix();
	this.scene.scale(0.4,0.4,0.4);
	this.scene.translate(2.65,-1.5,0);
	this.cylinder.display();
	this.cylinder_inside.display();
	this.scene.translate(-2*2.65,0,0);
	this.cylinder.display();
	this.cylinder_inside.display();
    this.scene.popMatrix();

	//Propeller Prism
    this.scene.pushMatrix();
	this.scene.translate(1.06,-0.6,0.2);
	this.scene.rotate(this.helix_angle,0,0,1);
	this.scene.scale(0.15,0.6,0.05);
	this.prism.display();
    this.scene.popMatrix();

    //Propeller Prism
    this.scene.pushMatrix();
	this.scene.translate(-1.06,-0.6,0.2);
	this.scene.rotate(-this.helix_angle,0,0,1);
	this.scene.scale(0.15,0.6,0.05);
	this.prism.display();	
    this.scene.popMatrix();

    //Propeller Sphere
    this.scene.pushMatrix();
	this.scene.translate(-1.06,-0.6,0.2);
	this.scene.scale(0.1,0.1,0.1);
	this.semisphere.display();	
    this.scene.popMatrix();

    //Propeller Sphere
    this.scene.pushMatrix();
	this.scene.translate(1.06,-0.6,0.2);
	this.scene.scale(0.1,0.1,0.1);
	this.semisphere.display();	
    this.scene.popMatrix();

};