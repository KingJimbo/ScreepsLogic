
/// <reference path="..\reference.ts"/>
/// <reference path=".\mining.ts"/>
/// <reference path=".\hauling.ts"/>
/// <reference path="..\utility.ts"/>
/// <reference path="..\constants.ts"/>

class JobHelper{
    public mining:Mining;
    public hauling:Hauling;

    constructor(){
        if(!Memory.jobHelper){
            // add job queue object
            Memory.jobHelper = {jobQueues:{}};
            // add job types to job queue
            for(var key in JobType){
                Memory.jobHelper.jobQueues[key]=[];
            }
        }
        this.mining = new Mining(this);
        this.hauling = new Hauling(this);
    }

    public assignCreep(jobId?:string, job?:any, creepName?:string, creep?:Creep):number{
        if(!creep && creepName)creep = Game.creeps[creepName];
        else return ERR_NOT_FOUND;
        if(!job && jobId)job = Memory.jobs[jobId];
        else return ERR_NOT_FOUND;
        if(!job) return ERR_NOT_FOUND;

        job.creepName = creepName;

    }

    public createJob(jobType:JobType, creepName:string, opts:any):any{
        var jobId = Utility.getNextId(IdType.Job);
        Memory.jobs[jobId] = _.assign({},{id:jobId,type:jobType, creepName:creepName}, opts);
        
        // if no creepname add to job queue
        if(!Memory.jobs[jobId].creepName) this.addJobToJobQueue(jobId);
        return Memory.jobs[jobId];
    }

    public addJobToJobQueue(id:string):number{
        if(!Memory.jobs[id])return ERR_NOT_FOUND;
        this.getMemory().jobQueues[Memory.jobs[id].type].push(id);
        return OK;
    }

    private getMemory():any{
        return Memory.jobHelper;
    }

    


}