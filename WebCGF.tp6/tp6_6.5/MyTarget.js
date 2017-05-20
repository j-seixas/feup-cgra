function MyTarget(scene) {
    CGFobject.call(this, scene);

    this.x = Math.random() * 30 - 15;
    this.y = 0;
    this.z = Math.random() * 30 - 15;
    this.size = Math.random() + 0.5;

    this.locked = false;

    this.semisphere = new MySemisphere(scene,20,10);
    this.cube = new MyUnitCubeQuad(scene);
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function(){
    //Semisphere
    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.scene.scale(this.size, this.size, this.size);
    this.scene.rotate(90.0*degToRad,1,0,0);
    this.semisphere.display();
    this.scene.rotate(180.0*degToRad,1,0,0);
    this.semisphere.display();
    this.scene.popMatrix();

    //Cube
    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.scene.scale(this.size * 1.4, this.size * 1.4, this.size * 1.4);
    this.cube.display();
    this.scene.popMatrix();

    //Cube
    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.scene.rotate(45.0 * degToRad, 1, 0 , 0);
    this.scene.rotate(45.0 * degToRad, 0, 0 , 1);
    this.scene.scale(this.size * 1.4, this.size * 1.4, this.size * 1.4);
    this.cube.display();
    this.scene.popMatrix();
};


