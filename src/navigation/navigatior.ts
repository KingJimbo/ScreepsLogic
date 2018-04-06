/// <reference path="..\reference.ts"/>
/// <reference path=".\inavigator.ts"/>
/** 
*
*/
class Navigation implements INavigation {

    /**
     *
     */
    constructor() {
        //Memory.navPoints = {};
    }

    public NavigateToRoomPosition(creep: Creep, pos: RoomPosition): number {
        throw new Error("Method not implemented.");
    }
    public NavigateToLandMark(creep: Creep, landMarkName: string): number {
        throw new Error("Method not implemented.");
    }

    private AddLandMark(pos:RoomPosition):number{
        
        throw new Error("Method not implemented.");
    }

    private AddNavPoint(navPoint:NavPoint){
        Memory.navPoints
    }
}