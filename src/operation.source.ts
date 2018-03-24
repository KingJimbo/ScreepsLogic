
/// <reference path=".\operation.ts"/>
/// <reference path=".\constants.ts"/>
/// <reference path=".\creep.manager.ts"/>

class SourceOp extends Operation{

    constructor(id:string, 
        public sourceId:string, 
        public energyCapacity:number,
        public depositId:string = ""){

        super(id, OperationType.Source, energyCapacity);
        if(!sourceId){
            // invalid job
            this.delete();
            return;
        }
        
        
        if(energyCapacity){
            energyCapacity = (Game.getObjectById(sourceId)as Source).room.energyCapacityAvailable;
        }

        Memory.operations[id].sourceId = sourceId;
        Memory.operations[id].depositId = depositId;
    }
}