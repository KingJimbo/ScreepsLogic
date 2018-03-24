

/// <reference path="..\reference.ts"/>

class Filling {
    constructor(){
    }

    public createJob(jobId:string,pickupPos:RoomPosition,creepName?:string):any{
        return {
            jobId:jobId,
            pickUpPos:pickupPos,
            creeps:[creepName?creepName:null]
        }
    }

    public assignCreepToJob(jobId?:string, job?:any, creepName?:string, creep?:Creep):number{
        if(!creep && creepName)creep = Game.creeps[creepName];
        else return ERR_NOT_FOUND;
        if(!job && jobId)job = Memory.jobs[jobId];
        else return ERR_NOT_FOUND;
        if(!job) return ERR_NOT_FOUND;
        job.creeps.push(creep.name);
    }

    public static DoJob(creep:Creep):JobReturnValue{
        if(creep.memory.jobId){
            if(Memory.jobs[creep.memory.jobId]){
                var job = Memory.jobs[creep.memory.jobId];
                if(job.jobType === JobType.Filling){
                    // check for energy
                    if(creep.carry.energy < creep.carryCapacity){
                        if(Utility.IsNextTo(creep.pos, job.pickUpPos)){
                            const energies = creep.room.lookForAt(LOOK_ENERGY,job.pickUpPos)as Resource[];
                            if(energies) creep.pickup(energies[0]);
                            // return okay
                            return JobReturnValue.Okay;
                        }
                        else{
                            //move to
                            if(!creep.memory.path){
                                creep.memory.path = creep.pos.findPathTo(job.pickUpPos);
                            }
                            creep.moveByPath(creep.memory.path);
                            //return okay
                            return JobReturnValue.Okay;
                        }
                    }
                    else{
                        
                    }
                }
                else{
                    // return invalid job type
                    return JobReturnValue.InvalidJobType;
                }
            }
            else{
                //job doesn't exist so set to 0 and send creep to creep pools
                creep.memory.jobId = 0;
                return JobReturnValue.NoJobFound;
            }
        }
        else{
            //creep needs to go to creep pool
            return JobReturnValue.NoJobFound;
        } 
    }
}