// ==========================================================================
//                              OPERATIONS MANAGER
// ==========================================================================
// ==========================================================================
// Object which manages and creates operations
// ==========================================================================
//
// NOTES/TODO
// 
/// <reference path=".\logger.ts"/>
/// <reference path=".\operation.source.harvest.ts"/>

class OperationsManager {

    public static readonly MemoryStrings={
        OperationsManager:"operationsManager",
        LatestOpId:"latestOpId"
    }
    constructor(){
        this.initialise();
        Logger.log("operation manager intialised");
    }

    // Initialises default values
    private initialise(): void {
        if(!Memory.operations)Memory.operationManager={currentOpId:0};
    }

    public assignOpToSource(source:Source):void{
        // logic to create source operation
        var id = this.getNextOpId();
        var energyCapacity = Game.rooms[Memory.settings.homeRoom].energyCapacityAvailable;
        var targets = source.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => { 
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity}});

            
        var harvestOp = new HarvestSourceOp(id,source.id,energyCapacity,null, requiredHarvesters,harvesters);

    }

    public assignOpToMineral(mineral:Mineral):void{
        // logic to create a mineral operation
    }

    public getNextOpId(): string{     
        var lastOpId = this.getCurrentOpId();
        var newOpId = lastOpId++;
        Memory.operationManager.currentOpId = newOpId;
        return "Operation"+newOpId;
    }

    public getCurrentOpId():number{
        return Memory.operationManager.currentOpId;
    }

    public findOp(jobId:number):any{
        // if(this.app.memory[JobManager.MemoryStrings.Jobs][jobId] !== undefined &&
        //     this.app.memory[JobManager.MemoryStrings.Jobs][jobId] !== null){
        //         return this.app.memory[JobManager.MemoryStrings.Jobs][jobId];
        //     }
        // else return null;
    }
    
}