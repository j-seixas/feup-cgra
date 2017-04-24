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

    this.delta = 0;
    this.lastCurrTime = 0;

    this.first = 0;

    this.seconds.setAngle(270);
    this.minutes.setAngle(180);
    this.hours.setAngle(90);
}
;MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.display = function() {

    this.scene.pushMatrix();
    this.scene.scale(1, 1, 0.1);
    this.cylinder.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.1);
    this.scene.clockAppearance.apply();
    this.base.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.materialSecondsPtr.apply();
    this.scene.rotate(-this.seconds.angle, 0, 0, 1);
    this.scene.translate(0, -0.1, 0.11);
    this.scene.scale(0.025, 1, 0.1);
    this.seconds.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.materialSecondsPtr.apply();
    this.scene.rotate(-this.minutes.angle, 0, 0, 1);
    this.scene.translate(0, -0.1, 0.11);
    this.scene.scale(0.05, 0.75, 0.1);
    this.minutes.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.materialSecondsPtr.apply();
    this.scene.rotate(-this.hours.angle, 0, 0, 1);
    this.scene.translate(0, -0.1, 0.11);
    this.scene.scale(0.075, 0.5, 0.1);
    this.hours.display();
    this.scene.popMatrix();
   // console.log(this.hours);
}
;

MyClock.prototype.update = function(currTime) {
    var increm = currTime * (360.0 / (60 * 1000));
    this.seconds.setAngle(increm);
    this.minutes.setAngle(increm/60.0);
    this.hours.setAngle(increm/3600.0);

}
;
