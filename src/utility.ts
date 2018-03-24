/// <reference path=".\reference.ts"/>
/// <reference path=".\constants.ts"/>


class Utility{
    public static getNextId(type:IdType): string{    

        var lastId = this.getCurrentId(type);
        var newId = lastId++;
        Utility.setCurrentId(type,newId);
        return type+newId;
    }

    public static getCurrentId(type:IdType):number{
        switch(type){
            case IdType.Job:
            return Memory.counts.currentJobId;

            default:
            throw new Error("This idType is not currently supported.");
        }
    }
    
    public static setCurrentId(type:IdType,id:number):void{
        switch(type){
            case IdType.Job:
            Memory.counts.currentJobId = id;

            default:
            throw new Error("This idType is not currently supported.");
        }
    }

    public static IsNextTo(pos:RoomPosition,pos2:RoomPosition){
        return (pos.x-1 === pos2.x && (pos.y+1 === pos2.y || pos.y === pos2.y || pos.y-1 === pos2.y)) ||
            (pos.x === pos2.x && (pos.y+1 === pos2.y || pos.y === pos2.y || pos.y-1 === pos2.y)) ||
            (pos.x+1 === pos2.x && (pos.y+1 === pos2.y || pos.y === pos2.y || pos.y-1 === pos2.y));
    }

    public static getCreepCarry(carry?:any,creep?:Creep){
        if(!carry && creep) 
        else throw new Error("Invalid arguements.");

    }
}