/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class Task {
      static remote = new Remote("https://a2icu7uszk3ljrbnq2pirxewn40bwxdy.lambda-url.us-east-1.on.aws/")
  
      static async getAllTasksByUser(token, userId) {
          return Task.remote.call("Task.getAllTasksByUser", token, userId)  
      }
  
      static async createTask(token, title, location, hour, ownerId) {
          return Task.remote.call("Task.createTask", token, title, location, hour, ownerId)  
      }
  
      static async updateTask(token, id, title, active) {
          return Task.remote.call("Task.updateTask", token, id, title, active)  
      }
  
      static async deleteTask(token, id) {
          return Task.remote.call("Task.deleteTask", token, id)  
      }
  
      
  }
  
  export { Remote };
  