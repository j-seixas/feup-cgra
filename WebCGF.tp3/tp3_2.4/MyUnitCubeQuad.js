/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);
    
    this.quad = new MyQuad(this.scene);

};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function (){
	//Face virada para o lado positivo dos zz (Blue)
    this.scene.translate(0,0,0.5);
    this.quad.display();
    
    //Face virada para o lado negativo dos yy (Green)
	this.scene.translate(0,-0.5,-0.5);
	this.scene.rotate(Math.PI/2,1,0,0);
    this.quad.display();
    
    //Face virada para o lado negativo dos zz (Blue)
    this.scene.translate(0,-0.5,-0.5);
	this.scene.rotate(Math.PI/2,1,0,0);
    this.quad.display();

	//Face virada para o lado positivo dos yy (Green)
    this.scene.translate(0,-0.5,-0.5);
	this.scene.rotate(Math.PI/2,1,0,0);
    this.quad.display();
    
    //Face virada para o lado positivo dos xx (Red)
    this.scene.translate(0.5,0,-0.5);
    this.scene.rotate(Math.PI/2,1,0,0);
	this.scene.rotate(Math.PI/2,0,1,0);
    this.quad.display();

	//Face virada para o lado negativo dos xx (Red)
    this.scene.translate(0,0,-1);
	this.scene.rotate(Math.PI,0,1,0);
    this.quad.display();


};
