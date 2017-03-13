/**
 * MyPrism
 * @constructor
 */
function MyPrism(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
}
;
MyPrism.prototype = Object.create(CGFobject.prototype);
MyPrism.prototype.constructor = MyPrism;

MyPrism.prototype.initBuffers = function() {

    this.vertices = [];
    this.indices = [];
    this.normals = [];
    var ang = Math.PI * 2 / this.slices;

    for (j = 0; j < this.stacks; j++) {
        for (i = 0; i < this.slices; i++) {

            if (j == 0) {

                this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), 0);
                this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), (j + 1) / this.stacks);
                this.vertices.push(Math.cos((i + 1) * ang), Math.sin((i + 1) * ang), 0);
                this.vertices.push(Math.cos((i + 1) * ang), Math.sin((i + 1) * ang), (j + 1) / this.stacks);

                this.normals.push(Math.cos((i + 0.5) * ang), Math.sin((i + 0.5) * ang), 0);
                this.normals.push(Math.cos((i + 0.5) * ang), Math.sin((i + 0.5) * ang), 0);
                this.normals.push(Math.cos((i + 0.5) * ang), Math.sin((i + 0.5) * ang), 0);
                this.normals.push(Math.cos((i + 0.5) * ang), Math.sin((i + 0.5) * ang), 0);

                this.indices.push(1 + (4 * i) + (4 * this.slices * j), 0 + (4 * i) + (4 * this.slices * j), 2 + (4 * i) + (4 * this.slices * j));
                this.indices.push(2 + (4 * i) + (4 * this.slices * j), 3 + (4 * i) + (4 * this.slices * j), 1 + (4 * i) + (4 * this.slices * j));

            } else {

                this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), j / this.stacks);
                this.vertices.push(Math.cos(i * ang), Math.sin(i * ang), (j + 1) / this.stacks);
                this.vertices.push(Math.cos((i + 1) * ang), Math.sin((i + 1) * ang), j / this.stacks);
                this.vertices.push(Math.cos((i + 1) * ang), Math.sin((i + 1) * ang), (j + 1) / this.stacks);

                this.normals.push(Math.cos((i + 0.5) * ang), Math.sin((i + 0.5) * ang), 0);
                this.normals.push(Math.cos((i + 0.5) * ang), Math.sin((i + 0.5) * ang), 0);
                this.normals.push(Math.cos((i + 0.5) * ang), Math.sin((i + 0.5) * ang), 0);
                this.normals.push(Math.cos((i + 0.5) * ang), Math.sin((i + 0.5) * ang), 0);

                this.indices.push(1 + (4 * i) + (4 * this.slices * j), 0 + (4 * i) + (4 * this.slices * j), 2 + (4 * i) + (4 * this.slices * j));
                this.indices.push(2 + (4 * i) + (4 * this.slices * j), 3 + (4 * i) + (4 * this.slices * j), 1 + (4 * i) + (4 * this.slices * j));
            }
        }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}
;
