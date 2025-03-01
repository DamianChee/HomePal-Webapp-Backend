class Facility {
  constructor(
    address,
    contactInfo,
    facilityID,
    facilityName,
    numberOfFloors,
    numberOfWards,
    organizationId,
    type,
    updatedAt
  ) {
    this.address = address;
    this.contactInfo = contactInfo;
    this.facilityID = facilityID;
    this.facilityName = facilityName;
    this.numberOfFloors = numberOfFloors;
    this.numberOfWards = numberOfWards;
    this.organizationId = organizationId;
    this.type = type;
    this.updatedAt = updatedAt;
  }
}

export default Facility;
