/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class Cron {
      static remote = new Remote("https://6akjafdbzeq5iu6wangg7f5cxa0uxpnr.lambda-url.us-east-1.on.aws/")
  
      static async runSingleSchedule(task) {
          return Cron.remote.call("Cron.runSingleSchedule", task)  
      }
  
      
  }
  
  export { Remote };
  