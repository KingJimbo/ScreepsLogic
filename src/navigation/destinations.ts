/// <reference path=".\nav-point.ts"/>

abstract class Destination {
    /**
     *
     */
    constructor(public nav:NavPoint, public description:string) {
        
    }
}

class LocalDestination extends Destination {
    /**
     *
     */
    constructor(public posName:string, nav:NavPoint, description:string) {
        super(nav, description);
    }
}

class RoomDestination extends Destination {
    /**
     *
     */
    constructor(public roomName:string, nav:NavPoint, description:string) {
        super(nav, description);
    }
}