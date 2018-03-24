
/// <reference path=".\constants.ts"/>
/// <reference path=".\reference.ts"/>
/// <reference path=".\utility.ts"/>
/// <reference path=".\job.ts"/>

class Fill extends Job{
    constructor(public id:string, public pickUpPos:RoomPosition, public depositPos){
        super(id, "mine");
        if(!pickUpPos || !depositPos) throw new Error("Invalid parameters");
        Memory.jobs[id].pickUpPos = pickUpPos;
    }

    public static DoJob(creep:Creep):JobReturnValue{
        if(creep.memory.jobId){
            if(Memory.jobs[creep.memory.jobId]){
                var job = Memory.jobs[creep.memory.jobId];
                if(job.jobType === JobType.Fill){
                    // check for energy
                    if(creep.carry[RESOURCE_ENERGY]===creep.carryCapacity){
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