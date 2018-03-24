/// <reference path="..\reference.ts"/>
/// <reference path=".\helper.ts"/>

class Hauling {
    constructor(private helper:JobHelper){
    }

    public createJob(pickUpPos:RoomPosition, dropOffPos:RoomPosition, creep:Creep):any{
        if(!pickUpPos)return null;
        if(!dropOffPos)return null;
        var name = "";
        if(creep)name = creep.name;
        return this.helper.createJob(JobType.Hauling, name, {pickUpPos:pickUpPos, dropOffPos:dropOffPos});
    }

    
}