/**
 * MyTrapezium
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTrapezium(scene) {
	CGFobject.call(this,scene);
    
    this.tri = new MyTriangle(this.scene);
    this.quad = new MyQuad(this.scene);

};

MyTrapezium.prototype = Object.create(CGFobject.prototype);
MyTrapezium.prototype.constructor=MyTrapezium;

MyTrapezium.prototype.display = function (){
	//TOP
		//TOP BASE QUAD
	this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2, -1, 0, 0);
    this.scene.scale(1.64, 0.35, 1);
    this.quad.display();
    this.scene.popMatrix();

    	//TOP BASE TRIANGLE RIGHT
    this.scene.pushMatrix();  
	this.scene.translate(-0.82, 0, 0);
    this.scene.scale(0.35, 1, 0.35);
  	this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.PI/2, 0 ,-1, 0);
    this.tri.display();
    this.scene.popMatrix();

    	//TOP BASE TRIANGLE LEFT
    this.scene.pushMatrix();
	this.scene.translate(0.82, 0, 0);
    this.scene.scale(0.35, 1, 0.35);
    this.scene.translate(0, 0, -0.5);
    this.tri.display();
    this.scene.popMatrix();
	

	//BOTTOM
		//BOTTOM BASE QUAD
	this.scene.pushMatrix(); 
	this.scene.translate(0, -0.15, 0);
	this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.scene.rotate(Math.PI/2, -1, 0, 0);
    this.scene.scale(1.64, 0.35, 1);
    this.quad.display();
    this.scene.popMatrix();

    	//BOTTOM BASE TRIANGLE RIGHT
    this.scene.pushMatrix(); 
    this.scene.translate(0, -0.15, 0);
   	this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.rotate(Math.PI, 1, 0, 0);
	this.scene.translate(-0.82, 0, 0);
    this.scene.scale(0.35, 1, 0.35);
  	this.scene.translate(0, 0, -0.5);
    this.scene.rotate(Math.PI/2, 0 ,-1, 0);
    this.tri.display();
    this.scene.popMatrix();

    	//BOTTOM BASE TRIANGLE LEFT
    this.scene.pushMatrix();
    this.scene.translate(0, -0.15, 0);
	this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.rotate(Math.PI, 1, 0, 0);
	this.scene.translate(0.82, 0, 0);
    this.scene.scale(0.35, 1, 0.35);
    this.scene.translate(0, 0, -0.5);
    this.tri.display();
    this.scene.popMatrix();

    
    //BACK
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.scale(2.34,0.15,1);
    this.scene.translate(0,-0.5,0.175);
    this.quad.display();
    this.scene.popMatrix();

    //FRONT
    this.scene.pushMatrix();
    this.scene.scale(1.64,0.15,1);
    this.scene.translate(0,-0.5,0.175);
    this.quad.display();
    this.scene.popMatrix();

    //SIDE RIGHT
    this.scene.pushMatrix();
 	this.scene.translate(0.82+0.35/2, -0.075, 0);
    this.scene.rotate(Math.PI/4, 0, 1, 0);
    this.scene.scale(Math.sqrt(2*Math.pow(0.35, 2)),0.15,0);
    this.quad.display();
    this.scene.popMatrix();
    
    //SIDE LEFT
    this.scene.pushMatrix();
 	this.scene.translate(-0.82-0.35/2, -0.075, 0);
    this.scene.rotate(Math.PI/4, 0, -1, 0);
    this.scene.scale(Math.sqrt(2*Math.pow(0.35, 2)),0.15,0);
    this.quad.display();
    this.scene.popMatrix();
	

};
