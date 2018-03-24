/// <reference path="..\reference.ts"/>
/// <reference path=".\helper.ts"/>

class Mining {
    constructor(private helper:JobHelper){
    }

    public createJob(sourceId:string, creep:Creep):any{
        if(!sourceId)return null;
        var name = "";
        if(creep)name = creep.name;
        return this.helper.createJob(JobType.Mining, name, {sourceId:sourceId});
    }

    
}