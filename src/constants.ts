/// <reference path=".\reference.ts"/>

enum OperationType {
    Source = "source"
}

enum IdType {
    Miner="miner"
}

enum JobType{
    Mining = "mining",
    Filling = "filling",
    Hauling = "hauling"
}

enum JobReturnValue{
    Okay,
    InvalidJobType,
    DoesNotExist,
    NoJobFound
}

var ERR_ARRIVED = -13

enum IdType{
    Job="job",
    Operation="op"
}

enum CreepType{
    Miner="miner",
    Hauler="hauler",
    Worker="worker",
    Filler="filler"
}

enum RoomThreatLevel{
    Green=1, // No threats
    Amber=2, // Threats but managable
    Red=3 // Unmanageable threat
}

class CreepTemplatePart{
    constructor(public partType:string, public percentage:number){
    }
}

var CreepTemplates = {
    "miner": {
        parts:[new CreepTemplatePart(MOVE,0.02),new CreepTemplatePart(CARRY,0.02),new CreepTemplatePart(WORK,0.96)], 
        minCost: (BODYPART_COST[MOVE]+BODYPART_COST[CARRY]+BODYPART_COST[WORK]) 
    },
    "filler":{
        parts:[new CreepTemplatePart(MOVE,0.5),new CreepTemplatePart(WORK,0.02),new CreepTemplatePart(CARRY,0.48)],
        minCost: (BODYPART_COST[MOVE]+BODYPART_COST[CARRY]+BODYPART_COST[WORK]) 
    }
}

