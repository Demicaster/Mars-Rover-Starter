const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      if (!(message instanceof Message)) {
          throw Error("Invalid message received.");
      }
  
      let results = [];
  
      for (let command of message.commands) {
          let result = {};
          switch (command.commandType) {
              case 'MOVE':
                  if (this.mode === 'LOW_POWER') {
                      result.completed = false;
                  } else {
                      this.position = command.value;
                      result.completed = true;
                  }
                  break;
              case 'STATUS_CHECK':
                  result.completed = true;
                  result.roverStatus = {
                      mode: this.mode,generatorWatts: this.generatorWatts, position: this.position
                    
                  };
                  break;
              case 'MODE_CHANGE':
                  this.mode = command.value;
                  result.completed = true;
                  break;
              default:
                result.complete = false;
          }
          results.push(result);
      }
  
      return {
          message: message.name,
          results: results
      };
  }
}


   
   module.exports = Rover;

   //adding for push