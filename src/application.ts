// ==========================================================================
//                              SCREEP APPLICATION
// ==========================================================================
// ==========================================================================
// The object which will control everything.
// ==========================================================================
//
// NOTES/TODO
// Track no. of ticks
// Should also track the spawns and create intial 
// 

/// <reference path=".\reference.ts"/>
/// <reference path=".\settings.ts"/>
/// <reference path=".\manager.economy.ts"/>
/// <reference path=".\spawn\helper.ts"/>
/// <reference path=".\creep\helper.ts"/>
/// <reference path=".\room\helper.ts"/>
/// <reference path=".\job\helper.ts"/>

class Application {
    //public economy:EconomyManager;
    public creeps:CreepHelper;
    public spawn:SpawnHelper;
    public jobs:JobHelper;
    public rooms:RoomHelper;

    constructor(){
        this.initialise();
    }

    //===================================
    //              Methods 
    //===================================

    // Initialises default values
    private initialise(): void {
        Logger.log("App Start");

        this.checkBucket();

        if (!Memory.app) {
            Memory.app = {};
            new Settings();
        }
        else if(Memory.settings.version !== Settings.version){
            new Settings();
        }

        this.creeps = new CreepHelper();
        this.spawn = new SpawnHelper(this);
        this.rooms = new RoomHelper();
    }

    private checkBucket(){
        if (Game.cpu.bucket < 500) {
            var errorMessage = 'Extremely low bucket - aborting script run at top level';
            Logger.log(errorMessage);
            throw new Error(errorMessage);
        }
    }

    public run(): void{
        //run this at the start or it will clean out vital memory from newly spawning creeps
        this.creeps.cleanUpDeadCreeps();

        for(var r in Game.rooms){
            var room = Game.rooms[r];
            if(!room.memory.sources){
                room.memory.sources = {};
                this.assignToSourceMiner(room);
            }
        }
    }

    public runGCLOne():void{
        // What do you want to do in GCL one?
        // need to find the sources
        for(var r in Game.rooms){
            var room = Game.rooms[r];
            if(!room.memory.sources){
                room.memory.sources = {};
                const sources = this.rooms.getRoomSourcesUnassigned(room);


            }
        }
        
        // assign harvesters (harvest and transport back)
        // Scout?

    }

    public assignOperationToSource(){
        
    }

    public assignToSourceMiner(room:Room){
        // find all sources that need to be assigned to
        const sources = this.rooms.getRoomSourcesUnassigned(room);

        // iterate round all unassigned sources
        for(var s in sources){
            var source = sources[s];
            if(!room.memory.sources[source.id]) room.memory.sources[source.id]=source.id;
            if(!Memory.sources[source.id]) Memory.sources[source.id] = {id:source.id, capacity:source.energyCapacity, pos:source.pos };

            // assign free creep to source as miner
            var miner = this.creeps.getAvailableCreep(CreepType.Miner);
            if(!miner){
                // if no free creeps add miner to spawn queue
                this.spawn.addCreepToSpawnQueue(CreepType.Miner);
            }

            // create job and add to queue
            var job = this.jobs.mining.createMiningJob(source.id,miner);
        }
    }

}