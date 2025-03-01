class Device {
  constructor(
    deviceId,
    createdAt,
    bedId,
    deviceNumber,
    lastMaintenance,
    status,
    type
  ) {
    this.deviceId = deviceId;
    this.createdAt = createdAt;
    this.bedId = bedId;
    this.deviceNumber = deviceNumber;
    this.lastMaintenance = lastMaintenance;
    this.status = status;
    this.type = type;
  }
}

export default Device;
