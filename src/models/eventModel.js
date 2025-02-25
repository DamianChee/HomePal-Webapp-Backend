class Event {
  constructor(eventId, deviceId, action, handledAt, isHandled, teleFlag, time) {
    this.eventId = eventId;
    this.deviceId = deviceId;
    this.action = action;
    this.handledAt = handledAt;
    this.isHandled = isHandled;
    this.teleFlag = teleFlag;
    this.time = time;
  }
}

export default Event;
