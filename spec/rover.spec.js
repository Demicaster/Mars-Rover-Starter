const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function() {
    let testRover = new Rover(100);
    expect(testRover.position).toEqual(100);
    expect(testRover.mode).toEqual('NORMAL');
    expect(testRover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains the name of the message", function() {
    let testCommand = new Command("MODE_CHANGE", "LOW_POWER");
    let testMessage = new Message('hi', [testCommand]);
    let testRover = new Rover(100);
    let response = testRover.receiveMessage(testMessage);
    expect(response.message).toEqual('hi');
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let testCommand1 = new Command("MODE_CHANGE", "LOW_POWER");
    let testCommand2 = new Command("STATUS_CHECK");
    let testMessage = new Message('hi', [testCommand1, testCommand2]);
    let testRover = new Rover(100);
    let response = testRover.receiveMessage(testMessage);
    expect(response.results.length).toEqual(2);
  });

  it("responds correctly to the status check command", function() {
    let testCommand = new Command("STATUS_CHECK");
    let testMessage = new Message('hi', [testCommand]);
    let testRover = new Rover(100);
    let response = testRover.receiveMessage(testMessage);
    expect(response.results[0].completed).toEqual(true);
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(100);
  });

  it("responds correctly to the mode change command", function() {
    let testCommand = new Command("MODE_CHANGE", "LOW_POWER");
    let testMessage = new Message('hi', [testCommand]);
    let testRover = new Rover(100);
    let response = testRover.receiveMessage(testMessage);
    expect(testRover.mode).toEqual('LOW_POWER');
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let testCommand1 = new Command("MODE_CHANGE", "LOW_POWER");
    let testCommand2 = new Command("MOVE", 1000);
    let testMessage = new Message('hi', [testCommand1, testCommand2]);
    let testRover = new Rover(100);
    let response = testRover.receiveMessage(testMessage);
    expect(response.results[1].completed).toEqual(false);
    expect(testRover.position).toEqual(100);
  });

  it("responds with the position for the move command", function() {
    let testCommand = new Command("MOVE", 1000);
    let testMessage = new Message('hi', [testCommand]);
    let testRover = new Rover(100);
    let response = testRover.receiveMessage(testMessage);
    expect(testRover.position).toEqual(1000);
  });
});