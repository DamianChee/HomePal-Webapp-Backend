class Bed {
  constructor(
    bedId,
    bedNumber,
    createdAt,
    deviceId,
    deviceNumber,
    isAssigned,
    isOccupied,
    patientId,
    type,
    updatedAt,
    wardId,
    wardNumber
  ) {
    this.bedId = bedId;
    this.bedNumber = bedNumber;
    this.createdAt = createdAt;
    this.deviceId = deviceId;
    this.deviceNumber = deviceNumber;
    this.isAssigned = isAssigned;
    this.isOccupied = isOccupied;
    this.patientId = patientId;
    this.type = type;
    this.updatedAt = updatedAt;
    this.wardId = wardId;
    this.wardNumber = wardNumber;
  }
}

export default Bed;
