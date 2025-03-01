class Event {
  constructor(action, deviceId, eventId, handledAt, isHandled, teleFlag, time) {
    this.action = action;
    this.deviceId = deviceId;
    this.eventId = eventId;
    this.handledAt = handledAt;
    this.isHandled = isHandled;
    this.teleFlag = teleFlag;
    this.time = time;
  }
}

export default Event;
