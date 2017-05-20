function MyExplosion(scene, target) {
    CGFobject.call(this, scene);

    this.lastTime = -1;

    this.x = target.x;
    this.y = target.y;
    this.z = target.z;
    this.size = target.size / 2;
    this.original_size = target.size;

    this.lastTime = -1;
    this.reverse = false;
    this.end = false;

    this.semisphere = new MySemisphere(scene,20,10);
};

MyExplosion.prototype = Object.create(CGFobject.prototype);
MyExplosion.prototype.constructor = MyTarget;

MyExplosion.prototype.update = function(currTime){
    var delta = 0;
    if(this.lastTime != -1)
        delta = (currTime - this.lastTime)/1000;
    this.lastTime = currTime;
    
    if(this.reverse){
        this.size -= delta * this.original_size * 2.5;
        if(this.size <= this.original_size / 2)
            this.end = true;
    }
    else {
        this.size += delta * this.original_size * 5;
        if(this.size >= 2 * this.original_size)
            this.reverse = true;
    }
};

MyExplosion.prototype.display = function(){
    //Semisphere
    this.scene.pushMatrix();
    this.scene.translate(this.x, this.y, this.z);
    this.scene.scale(this.size, this.size, this.size);
    this.scene.rotate(90.0*degToRad,1,0,0);
    this.semisphere.display();
    this.scene.rotate(180.0*degToRad,1,0,0);
    this.semisphere.display();
    this.scene.popMatrix();
};


