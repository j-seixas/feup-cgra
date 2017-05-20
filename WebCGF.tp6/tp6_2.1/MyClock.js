/**
 * MyClock
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClock(scene, slices, stacks) {
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.cylinder = new MyCylinder(this.scene,this.slices,this.stacks)
    this.base = new CylinderBase(this.scene,this.slices);
    this.seconds = new MyClockHand(this.scene);
    this.minutes = new MyClockHand(this.scene);
    this.hours = new MyClockHand(this.scene);

    this.seconds.setAngle(0);
    this.minutes.setAngle(0);
    this.hours.setAngle(0);
}
;MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.materialClock.apply();
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 1);
    this.scene.materialClockBase.apply();
    this.base.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.materialPtr.apply();
    this.scene.rotate(-this.seconds.angle, 0, 0, 1);
    this.scene.translate(0, -0.1, 1.1);
    this.scene.scale(0.025, 1, 0.1);
    this.seconds.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.materialPtr.apply();
    this.scene.rotate(-this.minutes.angle, 0, 0, 1);
    this.scene.translate(0, -0.1, 1.1);
    this.scene.scale(0.05, 0.75, 0.1);
    this.minutes.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.materialPtr.apply();
    this.scene.rotate(-this.hours.angle, 0, 0, 1);
    this.scene.translate(0, -0.1, 1.1);
    this.scene.scale(0.075, 0.5, 0.1);
    this.hours.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.materialClock.apply();
    this.base.display();
    this.scene.popMatrix();

}
;

MyClock.prototype.update = function(currTime) {
    var date = new Date(currTime);

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var miliseconds = date.getMilliseconds();

    if(hours >= 12)
        hours -= 12;

    this.seconds.setAngle((seconds*1000 + miliseconds)*360/(60*1000));
    this.minutes.setAngle((minutes*60*1000 + seconds*1000 + miliseconds)*360/(60*60*1000));
    this.hours.setAngle((hours*60*60*1000 + minutes*60*1000 + seconds*1000 + miliseconds)*360/(12*60*60*1000));
}
;
