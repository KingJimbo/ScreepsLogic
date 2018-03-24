
/// <reference path=".\constants.ts"/>
/// <reference path=".\reference.ts"/>
/// <reference path=".\utility.ts"/>
/// <reference path=".\job.ts"/>

class Mine extends Job{
    constructor(public id:string, public sourceId:string){
        super(id, "mine");
        Memory.jobs[id].sourceId = sourceId;
    }

    public static DoJob(creep:Creep):JobReturnValue{
        if(creep.memory.jobId){
            if(Memory.jobs[creep.memory.jobId]){
                var job = Memory.jobs[creep.memory.jobId];
                if(job.jobType === JobType.Mine){
                    var source = Game.getObjectById(job.sourceId)as Source;
                    if(Utility.IsNextTo(creep.pos, source.pos)){
                        creep.harvest(source);
                        // return okay
                        return JobReturnValue.Okay;
                    }
                    else{
                        //move to
                        creep.moveTo(source);
                        //return okay
                        return JobReturnValue.Okay;
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