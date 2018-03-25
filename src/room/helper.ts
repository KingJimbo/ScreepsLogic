/// <reference path="..\reference.ts"/>

class RoomHelper{
    constructor(){

    }

    public getRoomSources(room:Room, filter:any):Source[]{
        // find all sources that need to be assigned to
        return room.find(FIND_SOURCES, filter) as Source[];
    }

    public getRoomSourcesUnassigned(room:Room):Source[]{
        return this.getRoomSources(room, {
            filter: function(source:Source) {
                // does a source have a miner assigned to it?
                return room.memory.sources[source.id]?true:false;
            }
        });
    }

    public initialiseRoomMemory(room:Room){
        if(room.memory.initialisedTick !== undefined){
            room.memory = null;
        }

        room.memory = {
            initialisedTick: Game.time,
            threatLvl: RoomThreatLevel.Green
        };
    }
}