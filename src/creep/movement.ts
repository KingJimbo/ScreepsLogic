

class CreepMovement{
    constructor(public manager:CreepHelper){

    }

    public MoveToPosition(creep:Creep,x:number,y:number,opts:any = null):number{
        creep.memory.lastPos = creep.pos;
        return creep.moveTo(x,y,opts);
    }

    public MoveToTarget(creep:Creep,target:any,opts:any = null):number{
        creep.memory.lastPos = creep.pos;
        return creep.moveTo(target,opts);
    }

    public MoveByPath(creep:Creep,path:RoomPosition[]):number{
        creep.memory.lastPos = creep.pos;
        return creep.moveByPath(path);
    }


}