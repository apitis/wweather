/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
   
  import { Remote } from "./remote.js"
  
  export class User {
      static remote = new Remote("http://127.0.0.1:8083/User")
  
      static async register(name, email, password) {
          return User.remote.call("User.register", name, email, password)  
      }
  
      static async login(email, password) {
          return User.remote.call("User.login", email, password)  
      }
  
      static async checkSession(token) {
          return User.remote.call("User.checkSession", token)  
      }
  
      
  }
  
  export { Remote };
  