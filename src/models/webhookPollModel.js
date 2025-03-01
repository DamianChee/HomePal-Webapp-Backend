class WebhookPoll {
  constructor(action, deviceNumber, eventId, pollQuestion, timestamp) {
    this.action = action;
    this.deviceNumber = deviceNumber;
    this.eventId = eventId;
    this.pollQuestion = pollQuestion;
    this.timestamp = timestamp;
  }
}

export default WebhookPoll;
