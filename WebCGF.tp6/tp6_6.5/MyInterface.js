const W = 87;
const A = 65;
const S = 83;
const D = 68;
const P = 80;
const Q = 81;
const E = 69;
const L = 76;
const F = 70;
const G = 71;

const w = 119;
const a = 97;
const s = 115;
const d = 100;
const p = 112;
const q = 113;
const e = 101;
const f = 102;
const l = 108;
const g = 103;


const max_speed = 40;
const min_speed = -40;
 
function MyInterface() {
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	CGFinterface.prototype.init.call(this, application);
		
	this.gui = new dat.GUI();

	this.gui.add(this.scene, 'PauseClock');
	this.gui.add(this.scene, 'ResumeClock');	
	
	var group=this.gui.addFolder("Lights");
	group.open();
	
	for (i = 0; i < this.scene.num_lights; i++)
    	group.add(this.scene, 'light_' + i.toString());
	
	this.gui.add(this.scene, 'speed', min_speed, max_speed);

	this.gui.add(this.scene, 'texture', { Rust: 0, Wood: 1, Camouflage: 2, Granite: 3 } );

	return true;
};

MyInterface.prototype.processKeyboard = function(event) {
	
};

MyInterface.prototype.processKeyDown = function(a) {
switch (event.keyCode)
	{
		case w:
		case W:
			this.scene.speed += this.scene.acceleration;
			if(this.scene.speed > max_speed)
				this.scene.speed = max_speed;
			break;
		case a:
		case A:
			this.scene.submarine.rotate_y(1);
			break;
		case s:
		case S:
			this.scene.speed -= this.scene.acceleration;
			if(this.scene.speed < min_speed)
				this.scene.speed = min_speed;
			break;
		case d:
		case D:
			this.scene.submarine.rotate_y(-1);
			break;
		case q:
		case Q:
			this.scene.submarine.rotate_x(1);
			break;
		case e:
		case E:
			this.scene.submarine.rotate_x(-1);
			break;
		case l:
		case L:
			this.scene.submarine.translate(-1);
			break;
		case p:
		case P:
			this.scene.submarine.translate(1);
			break;
		case f:
		case F:
			this.scene.launchTorpedo();
			break;
		case g:
		case G:
			this.scene.spawnTarget();
			break;
	};
};

MyInterface.prototype.processKeyUp = function(a) {
	switch (event.keyCode)
	{
		case a:
		case A:
			this.scene.submarine.rotate_y(0);
			break;
		case d:
		case D:
			this.scene.submarine.rotate_y(0);
			break;
		case q:
		case Q:
			this.scene.submarine.rotate_x(0);
			break;
		case e:
		case E:
			this.scene.submarine.rotate_x(0);
			break;
	};
};
