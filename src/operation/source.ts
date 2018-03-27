
/// <reference path="..\reference.ts"/>
/// <reference path="..\utility.ts"/>
/// <reference path="..\creep\helper.ts"/>
/// <reference path="..\operation\helper.ts"/>
/// <reference path="..\spawn\helper.ts"/>
/// <reference path="..\job\helper.ts"/>

class SourceOperation{
    constructor(public opHelper:OperationHelper, public spawnHelper:SpawnHelper, public jobHelper:JobHelper){
        if(!Memory.ops)Memory.ops = {};
    }

    // TODO
    // create operation and return operation id
    createOp(source:Source):any{
        // where is it located
        // what resources are needed?
        // creeps
        // find out what is the current potential for creeps
        //this.spawnHelper.GetCurrentMaxCreepPotential();
        // what distinguishes source optypes?
        // harvester ops no miners or haulers available
        // miner op there are miners and haulers available

        // if room has storage create haulers
        // if room doesn't create fillers

        let miner = null,
            hauler = null,
            filler = null,
            worker = null;

        
        // check if remote mining
        if(source.room.controller.my){
            // is remote mining
            return this.createMiningRemote(source);
        }
        else{
            // local room mining
            return this.createMiningLocal(source);
        }

        // if spawn can spawn miners then

        // what resources are available
        if(this.opHelper.creepHelper.isAvailable(CreepType.Miner)){//&& this.opHelper.creepHelper.isAvailableCreep(CreepType.Hauler)){
            miner = this.opHelper.creepHelper.getAvailableCreep(CreepType.Miner);
            // // both available create Miner ops
            // let minerJob = this.jobHelper.mining.createJob(source.id,miner);
            
            // // find pick up and drop off positions

            // //source.pos.findPathTo(source.spawn.)

            // let haulerJob = this.jobHelper.hauling.createJob(source.id,hauler);

            // this.createSourceOp(source,
            //     [miner.name],
            //     [hauler.name]);
        }

        if(source.room.storage){
            // create hauler
            if(this.opHelper.creepHelper.isAvailable(CreepType.Hauler)){
                // both available create Miner ops
                hauler = this.opHelper.creepHelper.getAvailableCreep(CreepType.Hauler);
            }
        }
        else {
            // create filler
            if(this.opHelper.creepHelper.isAvailable(CreepType.Filler)){
                // both available create Miner ops
                filler = this.opHelper.creepHelper.getAvailableCreep(CreepType.Filler);
            }
        }

        if (source.room.controller.level < 2 && !miner && (!filler || !hauler) && this.opHelper.creepHelper.isAvailable(CreepType.Worker)){
            // create harvester op
            this.createSourceOp(source,
                undefined,
                undefined,
                [this.opHelper.creepHelper.getAvailableCreep(CreepType.Worker).name]);
        }
        else {
            // find out what resources are available
            // e.g. if start of game create a worker to harvest, if late game create miner and haulers
            // nothing available add creep to creep pool

        }
        
        // assign correct jobs
    }

    public createMiningRemote(source:Source):any{

    }

    public createMiningLocal(source:Source):any{

    }

    public createSourceOp(source:Source, minerjobIds:string[]=[], haulerJobIds:string[]=[],workerJobIds:string[]=[]){
        var opId = Utility.getNextId(IdType.Operation);
        Memory.ops[opId] = this.createSouceOperationMemory(opId,source.id,minerjobIds,haulerJobIds,workerJobIds);
        this.createSourceMemory(source,opId);
    }

    public createSouceOperationMemory(
        opId:string,
        sourceId:string,
        minerjobIds:string[]=[], 
        haulerJobIds:string[]=[], 
        workerJobIds:string[]=[],
        fillerJobIds:string[]=[] ){


        Memory.ops[opId] = {
            id:opId,
            type:OperationType.Source,
            sourceId:sourceId,
            jobs:{
                miners:minerjobIds,
                harvesters:haulerJobIds,
                haulers:workerJobIds,
                fillers:fillerJobIds
            }
        }
    }

    public createSourceMemory(source:Source, opId:string = null){
        if(source && source.id && !Memory.sources[source.id]) { 
            Memory.sources[source.id] = {
                opId:opId
            }
        }
    }

    // assess an operation to see if it is meeting it's maximum potential
    // when to stop
    assessOp(){

    }

    // required to remove all references to the operation from creeps, memory, etc...
    cleanUpOp(){

    }
}