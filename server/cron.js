import { TaskModel } from "./models/task"
import { UserModel } from "./models/user"
import { ActiveSession } from "./models/activeSession"
import { mongoose } from "mongoose"
import { MONGO_DB_URI } from "./helper"
import axios from "axios"
import twilio from "twilio"


export class Cron {
  constructor() {
    this.#connect();
  }

  /**
   * Private method used to connect to the DB.
   */
  #connect() {
    mongoose.connect(MONGO_DB_URI);
  }


  /**
   * Method that checks the weather schedule.
   */
  async runSingleSchedule(task) {
    const now = new Date();

    console.log("Running schedule for " + task.title + " in " + task.location + " at " + task.hour);

    if (now.getHours() + ":" + now.getMinutes() == task.hour) {
        const result = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + task.location + "&units=metric&appid=e3f4db5c669116d1a7e3c49b2f05dc47");
        
        require ('dotenv');
        const accountSid = process.env.tw_accountSid; 
        const authToken = process.env.tw_authToken;
        const client = require('twilio')(accountSid, authToken); 

        client.messages 
          .create({ 
            body: 'Current temp in ' + task.location + ' is: ' + result.data.main.temp +
            ", feels like " + result.data.main.feels_like + ". Today's min is " +
            result.data.main.temp_min + " and max " + result.data.main.temp_max, 
            from: 'whatsapp:+14155238886',       
            to: 'whatsapp:' + task.title 
       }) 
      .then(message => console.log(message.sid));
      }
  }

  /**
   * Method that will be called by the cron job. 
   * 
   * The method will iterate through the active weather schedules.
   */
  async runSchedules() {
    const now = new Date();
    console.log("Running Schedules at " + now.getHours() + ":" + now.getMinutes());

    try {
      const result = await TaskModel.find({active: true});
      result.forEach(async (elem) => {
        await this.runSingleSchedule(elem);
      })
    } catch (error) {
      console.log("Error deleting tasks", error);
    }

  }
}
