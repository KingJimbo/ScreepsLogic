
/// <reference path=".\reference.ts"/>
/// <reference path=".\creep.manager.ts"/>

Creep.prototype._moveByPath = Creep.prototype.moveByPath;
Creep.prototype.moveByPath = function(path){
    // delete job id from memory
    this.memory.lastPos = creep.pos;
    var lastPos = path[path.length-1];

    // has arrived?
    if(lastPos.roomName === this.pos.roomName && lastPos.x === this.pos.x && lastPos.y === this.pos.y){
        delete this.memory.path;
        return ERR_ARRIVED;
    }
    else{
        this._moveByPath(path);
    }
}


Creep.prototype._moveTo = Creep.prototype.moveTo;
Creep.prototype.moveTo = function(myArg1, myArg2, myArg3) {
    // check for job/local path
    this.memory.lastPos = this.pos;
    if(!this.memory.path){
        this.memory.path = this.pos.findPathTo(myArg1, myArg2, myArg3);
    }
    let returnValue = this.moveByPath(this.memory.path);
    //let returnValue = this._moveTo(myArg1, myArg2, myArg3);
     return returnValue; // return original value
 };


Creep.prototype.reportToCreepPool = function() {
    // check for job/local path
    this.memory.jobId = 0;

    if(!this.memory.tempType) {
        Logger.log("Creep " + this.name + ": No creep template found in memory!");
        return;
    }

    CreepManager.addCreepToAvailablePool(this);

    
 };




