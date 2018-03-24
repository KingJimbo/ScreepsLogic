/// <reference path="..\reference.ts"/>
/// <reference path="..\logger.ts"/>
/// <reference path="..\constants.ts"/>
/// <reference path=".\movement.ts"/>

class CreepHelper{

    public movement:CreepMovement
    

    constructor(){

        if(!Memory.creepHelper){
            // add creep pool object
            Memory.creepHelper= {currentPool:0, availablePools:{}};
            
            // add job types to job queue
            for(var key in CreepType){
                Memory.creepHelper.availablePools[key]=[];
            }
        }

        this.movement = new CreepMovement(this);
    }

    public getAvailableCreep(type:CreepType):Creep{
        var pool = Memory.creepPools.availablePools[type]; 
        if(pool){
            // find first non dead creep
            for(var name in pool){
                if(this.IsCreepAlive(pool[name])){
                    var creep = Game.creeps[pool.shift()];
                    if(creep) return creep;
                }
                else{
                    pool.shift();
                }
            }
        }
        return null;
    }

    //TODO
    public isAvailable(type:CreepType){

    }

    public IsCreepAlive(creepName:string):boolean{
        return Game.creeps[creepName]?true:false;
    }

    public addCreepToAvailablePool(creep:Creep){
        // logic to navigate to nearest spawn
        Memory.creepHelper.creepPools.availablePools[creep.memory.type].push(creep.name);
        const spawns = creep.room.find(FIND_MY_SPAWNS) as Spawn[];
        if(spawns){
            var path = creep.room.findPath(creep.pos,spawns[0].pos, {
                maxOps: 1000
            });      
            creep.moveByPath(path);
        }
    }

    // TODO need to remove names from array
    public cleanUpDeadCreeps(creepName?:string[]){
        if(creepName)
            for(var i in creepName) 
                if(!Game.creeps[i])
                    delete creepName[i];
        else
            for(var i in Memory.creeps)
                if(!Game.creeps[i])
                    delete Memory.creeps[i];
    }

    public getAvailableCreeps(type:CreepType):Creep{
        var pool = Memory.creepPools.availablePools[type]; 
        if(pool){
            // find first non dead creep
            this.cleanUpDeadCreeps(pool);
            for(var name in pool){
                if(this.IsCreepAlive(pool[name])){
                    var creep = Game.creeps[pool.shift()];
                    if(creep) return creep;
                }
                else{
                    pool.shift();
                }
            }
        }
        return null;
    }


}