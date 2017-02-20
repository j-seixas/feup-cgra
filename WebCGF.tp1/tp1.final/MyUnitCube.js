/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, -0.5, 	//vertice mais afastado
            0.5, -0.5, -0.5,	//vertice inferior do lado direito
            0.5, -0.5, 0.5,		//vertice inferior mais proximo
            -0.5, -0.5, 0.5,	//vertice inferior do lado esquerdo
            -0.5, 0.5, -0.5,	//vertice superior mais afastado
             0.5, 0.5, -0.5,	//vertice superior do lado direito
            0.5, 0.5, 0.5,		//vertice mais proximo
             -0.5, 0.5, 0.5		//vertice superior do lado esquerdo
			]; 

	this.indices = [
            0, 1, 2, 	//Triangulo direito da face virada para yy's(Green) negativos 
            0, 2, 3,	//Triangulo esquerdo da face virada para yy's(Green) negativos
            0, 5, 1,	//Triangulo direito da face virada para zz's(Blue) negativos
            0, 4, 5,	//Triangulo esquerdo da face virada para zz's(Blue) negativos
            0, 3, 4,	//Triangulo esquerdo da face virada para xx's(Red) negativos
            4, 3, 7,	//Triangulo direito da face virada para xx's(Red) negativos
			1, 5, 2,	//Triangulo da face virada para xx's(Red) positivos
			2, 5, 6,	//Triangulo da face virada para xx's(Red) positivos
			2, 7, 3,	//Triangulo da face virada para zz's(Blue) positivos
			2, 6, 7,	//Triangulo da face virada para zz's(Blue) positivos
			7, 6, 4,	//Triangulo da face virada para yy's(Green) positivos
			6, 5, 4		//Triangulo da face virada para yy's(Green) positivos
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
