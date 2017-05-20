const degToRad = Math.PI / 180.0;

function LightingScene() {
    CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.PauseClock = function () {
	this.clockIsEnabled = false;
};

LightingScene.prototype.ResumeClock = function () {
	this.clockIsEnabled = true;
};

LightingScene.prototype.init = function(application) {
    CGFscene.prototype.init.call(this, application);
	
	//GUI
	this.acceleration = 1;
    this.speed = 1;
	this.clockIsEnabled = true;

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
	this.materialClockBase.setDiffuse(1,1,1,1);
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

	this.rust = new CGFappearance(this);
	this.rust.setAmbient(0.5,0.5,0.5,1);
	this.rust.setDiffuse(0.4,0.4,0.4,1);
	this.rust.setSpecular(0.1,0.1,0.1,1);
	this.rust.setShininess(10);
	this.rust.loadTexture("../resources/images/rust.png");

	this.wood = new CGFappearance(this);
	this.wood.setAmbient(0.5,0.5,0.5,1);
	this.wood.setDiffuse(0.5,0.5,0.5,1);
	this.wood.setSpecular(0.75,0.75,0.75,0);
	this.wood.setShininess(20);
	this.wood.loadTexture("../resources/images/wood.png");

	this.camo = new CGFappearance(this);
	this.camo.setAmbient(0.5,0.5,0.5,1);
	this.camo.setDiffuse(0.3,0.3,0.3,1);
	this.camo.setSpecular(0,0,0,1);
	this.camo.setShininess(10);
	this.camo.loadTexture("../resources/images/camouflage.png");

	this.granite = new CGFappearance(this);
	this.granite.setAmbient(0.5,0.5,0.5,1);
	this.granite.setDiffuse(1,1,1,1);
	this.granite.setSpecular(1,1,1,1);
	this.granite.setShininess(20);
	this.granite.loadTexture("../resources/images/granite.png");

	this.pillar = new CGFappearance(this);
	this.pillar.setAmbient(0.5,0.5,0.5,1);
	this.pillar.setDiffuse(0.5,0.5,0.5,1);
	this.pillar.setSpecular(0.2,0.2,0.2,1);
	this.pillar.setShininess(10);
	this.pillar.loadTexture("../resources/images/pillar.png");

	this.explosion = new CGFappearance(this);
	this.explosion.setAmbient(0.5,0.5,0.5,1);
	this.explosion.setDiffuse(0.5,0.5,0.5,1);
	this.explosion.setSpecular(0,0,0,1);
	this.explosion.setShininess(100);
	this.explosion.loadTexture("../resources/images/explosion.png");
	this.explosion.setTextureWrap("REPEAT", "REPEAT");

    //Objects
    this.submarine = new MySubmarine(this);
    this.oceanFloor = new Plane(this, 100, -2, 3, -2, 3);
    this.cylinder = new MyCylinder(this, 20, 20);
    this.cylinderinside = new MyCylinderInside(this, 20, 20);
    this.clock = new MyClock(this, 20, 1);

	//Textures
	this.submarineAppearances = [];
	this.submarineAppearances.push(this.rust, this.wood, this.camo, this.granite);
	this.texture = 0;

	//Targets
	this.targets = [];
	var num_targets = 5;
	for(var i = 0; i < num_targets; i++)
		this.targets.push(new MyTarget(this));

	//Torpedos
	this.torpedos = [];

	//Explosions
	this.explosions = [];

    this.setUpdatePeriod(25);
};

LightingScene.prototype.launchTorpedo = function() {
	for(var i = 0; i < this.targets.length; i++){
		if(this.targets[i] != null){
			if(!this.targets[i].locked){
				this.targets[i].locked = true;
				var torpedo = new MyTorpedo(this);
				torpedo.assignTarget(this.targets[i]);
				if(this.torpedos.length <= i)
					this.torpedos.push(torpedo);
				else
					this.torpedos[i] = torpedo;
				return;			
			}						
		}	
	}
}

LightingScene.prototype.spawnTarget = function() {
	this.targets.push(new MyTarget(this));
};

LightingScene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(30, 30, 30),vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.num_lights = 3;
	this.setGlobalAmbientLight(0,0,0, 1.0);

    this.lights[0].setPosition(0, 10, 0, 1); 
    this.lights[0].setVisible(true); 
    this.lights[0].setAmbient(0, 0, 0, 1);
    this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.light_0 = true;
	
    this.lights[1].setPosition(0, 4, 0, 1); 
    this.lights[1].setVisible(true); 
    this.lights[1].setAmbient(0, 0, 0, 1);
    this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
	this.light_1 = true;

	this.lights[2].setPosition(8, 5, 10, 1); 
    this.lights[2].setVisible(true); 
    this.lights[2].setAmbient(0, 0, 0, 1);
    this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
    this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[2].enable();
	this.light_2 = true;
};

LightingScene.prototype.updateLights = function() {
    this.light_0 ? 	this.lights[0].enable() : this.lights[0].disable(); 
    this.light_1 ? 	this.lights[1].enable() : this.lights[1].disable(); 
    this.light_2 ? 	this.lights[2].enable() : this.lights[2].disable(); 

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
    this.axis.display(); 

    this.materialDefault.apply();

	//Cylinder
    this.pushMatrix();
    this.translate(8,0,-0.5);
    this.scale(0.5, 10, 0.5);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.pillar.apply();
    this.cylinder.display();
    this.cylinderinside.display();
    this.popMatrix();

    //Clock
    this.pushMatrix();
    this.translate(8,5,0);
    this.scale(0.75, 0.75, 0.25);
	this.clock.display();
    this.popMatrix();
    
	//Ocean Floor
    this.pushMatrix();
    this.scale(50, 1, 50);
    this.rotate(-90 * degToRad, 1, 0, 0);
    this.oceanFloorMaterial.apply();
    this.oceanFloor.display();
    this.popMatrix();

    //Explosions
	for(var i = 0; i < this.explosions.length; i++){
		this.pushMatrix();
		this.explosion.apply();
		if(!this.explosions[i].end)
			this.explosions[i].display();
		else 
			this.explosions.splice(i,1);
		this.popMatrix();
	}

    //Targets
	for(var i = 0; i < this.targets.length; i++){
		if(this.targets[i] != null){
			this.pushMatrix();
			this.rust.apply();
			this.targets[i].display();
			this.popMatrix();
		}
	}

this.pushMatrix();
this.submarineAppearances[this.texture].apply();
    //Submarine
    this.pushMatrix();
    this.submarine.display();
    this.popMatrix();

    //Torpedo
	for(var i = 0; i < this.targets.length; i++){
		if(this.torpedos[i] != null){
			this.pushMatrix();
			if(this.torpedos[i].end){
				this.explosions.push(new MyExplosion(this,this.targets[i]));
				this.torpedos.splice(i,1);
				this.targets.splice(i,1);
			} else 
			 	this.torpedos[i].display();		
			this.popMatrix();
		}
	}
this.popMatrix();
};

LightingScene.prototype.update = function(currTime) {
	if(this.clockIsEnabled)
 		this.clock.update(currTime);
 	this.submarine.update(currTime);
 	for(var i = 0; i < this.targets.length; i++)
		if(this.torpedos[i] != null)
 			this.torpedos[i].update(currTime);
 	for(var i = 0; i < this.explosions.length; i++)
		if(this.explosions[i] != null)
 			this.explosions[i].update(currTime);
};
