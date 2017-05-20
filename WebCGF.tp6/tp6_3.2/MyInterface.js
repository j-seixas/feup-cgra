/**
 * MyInterface
 * @constructor
 */
 
const W = 87;
const A = 65;
const S = 83;
const D = 68;

const w = 119;
const a = 97;
const s = 115;
const d = 100;
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
		
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () {  }; 

	this.gui.add(this.scene, 'PauseClock');
	this.gui.add(this.scene, 'ResumeClock');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Lights");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	for (i = 0; i < this.scene.num_lights; i++)
    	group.add(this.scene, 'light_' + i.toString());
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5);

	return true;
};

MyInterface.prototype.processKeyboard = function(event) {
	
};

MyInterface.prototype.processKeyDown = function(a) {
	switch (event.keyCode)
	{
		case w:
		case W:
			this.scene.submarine.translate(-1);
			break;
		case a:
		case A:
			this.scene.submarine.rotate(-1);
			break;
		case s:
		case S:
			this.scene.submarine.translate(1);
			break;

		case d:
		case D:
			this.scene.submarine.rotate(1);
			break;

	};
};

MyInterface.prototype.processKeyUp = function(a) {
	switch (event.keyCode)
	{
		case w:
		case W:
			this.scene.submarine.translate(0);
			break;
		case a:
		case A:
			this.scene.submarine.rotate(0);
			break;
		case s:
		case S:
			this.scene.submarine.translate(0);
			break;
		case d:
		case D:
			this.scene.submarine.rotate(0);
			break;
	};
};
