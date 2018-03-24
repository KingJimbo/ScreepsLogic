

class Logger{

    public static dateString:string;

    public static log (message:string):void {
        console.log(this.dateString+message)
      }
    
}

(function(){
    var date = new Date();
    var dateString = "["+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"]";
    Logger.dateString = dateString;
})();
