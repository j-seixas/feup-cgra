/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
    CGFobject.call(this, scene);

    this.cube = new MyUnitCubeQuad(this.scene);

};
MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function() {

    //Perna eixo negativo dos xx e negativo dos zz
    this.scene.pushMatrix();
    this.scene.translate(-2.25, 1.75, -1.25);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    //Perna eixo negativo dos xx e positivo dos zz
    this.scene.pushMatrix();
    this.scene.translate(-2.25, 1.75, 1.25);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    //Perna eixo positivo dos xx e positivo dos zz
    this.scene.pushMatrix();
    this.scene.translate(2.25, 1.75, 1.25);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    //Perna eixo positivo dos xx e negativo dos zz
    this.scene.pushMatrix();
    this.scene.translate(2.25, 1.75, -1.25);
    this.scene.scale(0.3, 3.5, 0.3);
    this.cube.display();
    this.scene.popMatrix();

    //Tampo da mesa
    this.scene.pushMatrix();
    this.scene.translate(0,3.65,0);
    this.scene.scale(5, 0.3, 3);
    this.cube.display();
    this.scene.popMatrix();

};
