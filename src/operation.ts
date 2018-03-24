// ==========================================================================
//                              OPERATION
// ==========================================================================
// ==========================================================================
// This purpose of this class is to hold all task details
// ==========================================================================
//
// NOTES/TODO
//

/// <reference path=".\reference.ts"/>

abstract class Operation {

    constructor(public id:string, public opType:OperationType, public energyCapacity:number){
        // TODO generate id
        Memory.operations[id] = {id:id, opType:opType, energyCapacity:energyCapacity};
    }

    delete():void{
        Operation.DeleteOperation(this.id);
    }

    public static DeleteOperation(id:string){
        if(Memory.operations[id]){
            delete Memory.operations[id];
        }
    }
}