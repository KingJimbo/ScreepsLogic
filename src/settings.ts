// ==========================================================================
//                              SETTINGS
// ==========================================================================
// ==========================================================================
// This class will store and manage the application settings.
// ==========================================================================
//
// Features
// 1. Stores global variables relevant to the game 
// 2. Default values are loaded on first start and peristed in Memory
// 3. Notifications
// 4. Version for updates

// NOTES/TODO
// 
// 

/// <reference path=".\reference.ts"/>

class Settings {
    //============================================
    //              Memory Strings
    //============================================
    public static readonly MemoryStrings = {
        Settings: "settings",
        DebugMode: "isDebugOn",
        Logging: "isLoggingOn",
        Notify: "isNotifyOn",
        Version: "version",
        HWT: "hwt",
        HomeRoom:"homeRoom"
    };

    constructor(){
        this.initialise();
    }
    
    //===================================
    //              Methods 
    //===================================

    public static readonly version:string="0.1";

    public initialise():void{
        var version = Settings.version;
        const struc = _.find(Game.structures) as StructureSpawn;
        const creep = _.find(Game.creeps)
        Memory.username = (struc ? struc.owner.username : false) || (creep ? creep.owner.username : false);

        var room = Game.spawns["spawn1"].room;
        // default settings.
        Memory.settings = {
            [Settings.MemoryStrings.DebugMode] : true,
            [Settings.MemoryStrings.Logging] : true,
            [Settings.MemoryStrings.Notify] : true,
            [Settings.MemoryStrings.Version] : version,
            [Settings.MemoryStrings.HWT]: Game.time,
            [Settings.MemoryStrings.HomeRoom]: room.name
        }

        Memory.sources = {};
    }

    //public getNextActionID(): string{
    //    var id =this.getMemoryValue(Settings.MemoryStrings.CurrentActionId)as number;
    //    id++;
    //    this.setMemoryValue(Settings.MemoryStrings.CurrentActionId, id);
    //    return "Action"+id;
    //}
}