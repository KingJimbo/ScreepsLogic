/// <reference path=".\operation.source.ts"/>

class HarvestSourceOp extends SourceOp{

    
    constructor(
        id:string,
        sourceId:string,
        energyCapcity:number=0,
        depositId = "",
        public requiredHarvesters:number,
        public harvesters:string[]=[]){
        super(id,sourceId,energyCapcity,depositId);
        
        if(!requiredHarvesters){
            this.delete();
            return;
        }
        Memory.operations[id].requiredHarvesters = requiredHarvesters;
        Memory.operations[id].harvesters = harvesters;
    }
}