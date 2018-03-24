// ==========================================================================
//                              ECONOMY MANAGER
// ==========================================================================
// ==========================================================================
// This purpose of this class is to track the current economy of your screeps
// ==========================================================================
//
// NOTES/TODO
// Track income & outgoings
// Have set measurements defined for stages of economy e.g. village, town, city
// Current capabilities of the room e.g. enough energy to spawn big creeps
// Should this also manage cpu capacity?

/// <reference path=".\operation.manager.ts"/>

class EconomyManager {

    //============================================
    //              Memory Strings
    //============================================
    private static readonly MemoryStrings = {
        Economy: "economy",
        EnergyTotal: "energyTotal",
        Source: "source",
        OperationId:"operationId"
    };
    //===========================================

    // public totalTickEnergyTotal:number = 0;
    // public energyIncomeProjection:number[]=[10];
    public operations:OperationsManager;

    constructor(){
        this.operations = new OperationsManager();
        if(!Memory.sources)Memory.sources = {};
        if(!Memory.positions)Memory.positions = {};
    }


    // TODO: No idea what I'm going to do
    public run():any{

        for(var r in Game.rooms){
            var room = Game.rooms[r];
            if(room.memory.sourceIds === undefined){
                this.assessRoomSources(room);
            }
        }
    }

    public assessRoomSources(room:Room):void{
        const sources = room.find(FIND_SOURCES);
        room.memory.sourceIds= [];
            for(var s in sources){
                var source = sources[s] as Source;
                room.memory.sourceIds.push(source.id);
                if(!Memory.sources[source.id]) Memory.sources[source.id] = {};
                if(!Memory.sources[source.id].operationId){
                    // assign source harvesting operation
                    this.operations.assignOpToSource(source);
                }
            }
        
    }

    public assessRoomBuildingPlacements(room:Room):void{
        const flags = room.find(FIND_FLAGS,{
            filter: { memory: { isStrucFlag: true }}
        });
    }
}