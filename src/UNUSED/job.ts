

class Job{
    constructor(public id:string, public jobType:string){
        if(!id || !jobType || !JobType[jobType])throw new Error("Invalid Parameters!");
        if(Memory.jobs[id]) throw new Error("jobId is already in use!");
        Memory.jobs[id]={id:id,jobType:jobType};
    }
}