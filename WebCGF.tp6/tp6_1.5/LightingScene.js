const degToRad = Math.PI / 180.0;

function LightingScene() {
    CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.doSomething = function () {
	console.log("Doing something..."); 
};

LightingScene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
	this.option1 = true;
	this.option2 = false; 
	this.speed = 3;
    this.enableTextures(true);
    this.initCameras();
    this.initLights();

    this.gl.clearColor(0.0, 0.0, 0.4, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	//Axis
    this.axis = new CGFaxis(this,5);

	//Materials
    this.materialDefault = new CGFappearance(this);

    this.oceanFloorMaterial = new CGFappearance(this);
	this.oceanFloorMaterial.setAmbient(0.5,0.5,0.5,1);
	this.oceanFloorMaterial.setDiffuse(0.2,0.5,1,1);
	this.oceanFloorMaterial.setSpecular(0.1,0.1,0.1,1);
	this.oceanFloorMaterial.setShininess(10);
    this.oceanFloorMaterial.loadTexture("../resources/images/ocean_floor.png");
    this.oceanFloorMaterial.setTextureWrap("REPEAT", "REPEAT");

    this.materialClockBase = new CGFappearance(this);
	this.materialClockBase.setAmbient(0.5,0.5,0.5,1);
	this.materialClockBase.setDiffuse(0.5,0.5,0.5,1);
	this.materialClockBase.setSpecular(0.7,0.7,0.7,1);
	this.materialClockBase.setShininess(20);
	this.materialClockBase.loadTexture("../resources/images/clock.png");

	this.materialClock = new CGFappearance(this);
	this.materialClock.setAmbient(0.5,0.5,0.5,1);
	this.materialClock.setDiffuse(0.5,0.5,0.5,1);
	this.materialClock.setSpecular(0.7,0.7,0.7,1);
	this.materialClock.setShininess(20);

	this.materialPtr = new CGFappearance(this);
	this.materialPtr.setAmbient(0.5,0.5,0.5,1);
	this.materialPtr.setDiffuse(0,0,0,1);
	this.materialPtr.setSpecular(0.1,0.1,0.1,1);
	this.materialPtr.setShininess(10);

    //Objects
    this.submarine = new MySubmarine(this);
    this.oceanFloor = new Plane(this, 100, -2, 3, -2, 3);
    this.cylinder = new MyCylinder(this, 20, 1);
    this.clock = new MyClock(this, 20, 1);

    this.setUpdatePeriod(100);
};

LightingScene.prototype.update = function(currTime) {
    this.clock.update(currTime);
};

LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(30, 30, 30),vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 1.0);

    this.lights[0].setPosition(0, 10, 0, 1);
    this.lights[0].setVisible(true); 
    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();

    this.lights[1].setPosition(8, 5, 5, 1);
    this.lights[1].setVisible(true); 
    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();

};

LightingScene.prototype.updateLights = function() {
    for (i = 0; i < this.lights.length; i++)
        this.lights[i].update();
}

LightingScene.prototype.display = function() {
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Update all lights used
    this.updateLights();

    // Draw axis
    this.axis.display(); //TODO REMOVE

    this.materialDefault.apply();

	//Submarine
    this.pushMatrix();
    this.translate(5,0,5);
    this.rotate(150*degToRad, 0, 1, 0);
    this.submarine.display();
    this.popMatrix();

	//Cylinder
    this.pushMatrix();
    this.translate(8,0,-0.5);
    this.scale(0.5, 10, 0.5);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.cylinder.display();
    this.popMatrix();

    //Clock
    this.pushMatrix();
    this.translate(8,5,0);
    this.scale(0.75, 0.75, 0.25);
	this.materialClock.apply();
	this.clock.display();
    this.popMatrix();
    
	//Ocean Floor
    this.pushMatrix();
    this.scale(50, 1, 50);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.oceanFloorMaterial.apply();
    this.oceanFloor.display();
    this.popMatrix();
};

LightingScene.prototype.update = function(currTime) {
 	this.clock.update(currTime);
};
