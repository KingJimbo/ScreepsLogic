/// <reference path="..\reference.ts"/>
/// <reference path="..\application.ts"/>
/// <reference path="..\logger.ts"/>
/// <reference path="..\models\creep-spawn-details.ts"/>
/// <reference path="..\constants.ts"/>

class SpawnHelper{

    constructor(public app:Application){
        Memory.spawnHelper = {}//canSpawn:{}}
        Memory.spawnQueue = [];
    }

    addCreepToSpawnQueue(details:CreepType):boolean{
        //TODO
        //this.validateValues(body,name,memory);
        Memory.spawnQueue.push(details);
        return true;
    }

    spawn():void{
        for(var s in Game.spawns){
            var spawn = Game.spawns[s];
            // not spawning creep and creeps queued
            if(!spawn.spawning && Memory.spawnQueue.length && (spawn.room.energyCapacityAvailable == spawn.room.energyAvailable){
                //this.spawnCreep(Memory.spawnQueue.shift());
                var template = CreepTemplates[Memory.spawnQueue.shift()];
                this.getCreepBody(template,spawn.room.energyCapacityAvailable);
            }
        }
    }

    // spawnCreep(creepType:CreepType):number{
    //     var template = CreepTemplates[creepType];

    // }

    getCreepBody(template:Array<CreepTemplatePart>,energy:number):string[]{
        var energyLeft = energy,bodyArray:string[] = [];
        var bodyIndex = [];
        
        // calculate part type cost and push to array
        for(var b  in template){
            var body = template[b];
            var type = body.partType
            var per = body.percentage;
            var cost = BODYPART_COST[type];

            var totalPartEnergy = energy * per;
            var noParts = totalPartEnergy / cost;
            if(noParts < 1) noParts = 1;
            else noParts = Math.floor(noParts);

            var totalPartCost = noParts*cost;
            if(energyLeft < totalPartCost) return null;
            energyLeft -= totalPartCost;
            // need to be pushed to put them in the correct order for unshift below
            bodyIndex.push({type:type,noParts:noParts});
        }

        // add all body parts to body array
        for(var index in bodyIndex){
            var bodyI = bodyIndex[index];
            for(var i=0;i<bodyI.noParts; i++) bodyArray.unshift(bodyI.type);
        }
        
        return bodyArray;
    }

    public canSpawn(creepType:CreepType, energy:number):boolean{
        return (energy - CreepTemplates[creepType].minCost) > 0;
        // // check if valid value has been stored
        // if(Memory.spawnHelper.canSpawn[creepType] && 
        //     Memory.spawnHelper.canSpawn[creepType].canSpawn &&
        //     Memory.spawnHelper.canSpawn[creepType].energy < energy)
        //     return true;

        // // value hasn't been stored so calculate
        // var canSpawn = (energy - CreepTemplates[creepType].minCost) > 0;
        // // store value to be checked later
        // Memory.spawnHelper.canSpawn[creepType]={ energy:energy, canSpawn:canSpawn };

        // return canSpawn;
        
    }

    public canRoomSpawn(room:Room, creepType:CreepType){
        return this.canSpawn(creepType, room.energyCapacityAvailable);
    }
}