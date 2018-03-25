/// <reference path="..\reference.ts"/>
/// <reference path=".\source.ts"/>

class OperationHelper{

    private _sourceOp:SourceOperation;

    constructor(public creepHelper:CreepHelper, sourceOp:SourceOperation){
        this._sourceOp = sourceOp;
    }

    public createSourceOps (room?:Room):any{

        if(room){
            this.createRoomSourceOps(room);
        }
        else{
            for(const i in Game.rooms) {
                this.createRoomSourceOps(Game.rooms[i]);
            }
        }
    }

    private createRoomSourceOps(room:Room, 
        opts:any = { 
            filter: function(source:Source) {
                return Memory.sources[source.id] && Memory.sources[source.id].opId;
            } 
    }){
        // prechecks before creating operation
        // Don't create op if room threat level is high

        if(room.memory.threatLvl === RoomThreatLevel.Green){
            let sources = room.find(FIND_SOURCES, opts);
         
            if(sources){
                for(var i=0; i<sources.length; i++){
                    let source = sources[i] as Source;
                    this._sourceOp.createOp(source);
                } 
            }
        }
        
    }
    
}