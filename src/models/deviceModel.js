class Device {
  constructor(deviceId, bedId, deviceNumber, lastMaintenance, status, type) {
    this.deviceId = deviceId;
    this.bedId = bedId;
    this.deviceNumber = deviceNumber;
    this.lastMaintenance = lastMaintenance;
    this.status = status;
    this.type = type;
  }
}

export default Device;
