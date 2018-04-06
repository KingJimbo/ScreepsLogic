/** */
interface INavigation {

    NavigateToRoomPosition(creep:Creep, pos:RoomPosition):number;
    NavigateToLandMark(creep:Creep, landMarkName:string):number;

}