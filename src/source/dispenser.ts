/**This class is used for dispensing energy from an origin to one or more destinations */
class SourceDispenser{
    private _destinationIds:any;
    private _originId:string;
    
    public constructor(){

    }

    public addDestination(id:string){
        this._destinationIds.push(id);
    }

    public removeDestination(id:string):number{
        // search for destination
        // if found remove destination
        // if not found return ERR_NOT_FOUND

    }
}