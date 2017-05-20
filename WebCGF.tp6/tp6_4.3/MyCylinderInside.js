/**
 * MyCylinderInside
 * @constructor
 */
function MyCylinderInside(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
}
;MyCylinderInside.prototype = Object.create(CGFobject.prototype);
MyCylinderInside.prototype.constructor = MyCylinderInside;

MyCylinderInside.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var ang = Math.PI * 2 / this.slices;

    for (j = 0; j < this.stacks + 1; j++) {
        for (i = 0; i <= this.slices; i++) {
            if(j == 0)
                this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), 0);
            else
                this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), j/this.stacks);

            this.normals.push(-Math.cos(i * ang), -Math.sin(i * ang), -Math.sin(i * ang));
                this.texCoords.push(i/this.slices,j/this.stacks);
            
        }
    }

    for (j = 0; j < this.stacks; j++) {
        for (i = 0; i <= this.slices; i++) {
            if (i == this.slices) {
                this.indices.push(0 + (this.slices+1) * j, 0 + i + (this.slices+1) * (j + 1), 0 + (this.slices+1) * (j + 1));
                this.indices.push(0 + (this.slices+1) * j, 0 + i + (this.slices+1) * j, 0 + i + (this.slices+1) * (j + 1));
            } else {
                this.indices.push(0 + i + (this.slices+1) * j, 0 + i + (this.slices+1) * (j + 1), 1 + i + (this.slices+1) * j);
                this.indices.push(1 + i + (this.slices+1) * j, 0 + i + (this.slices+1) * (j + 1), 1 + i + (this.slices+1) * (j + 1));
            }
        }

    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;

