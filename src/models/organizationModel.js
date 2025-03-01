class Organization {
  constructor(
    address,
    contactInfo,
    createdAt,
    orgName,
    organizationId,
    updatedAt
  ) {
    this.address = address;
    this.contactInfo = contactInfo;
    this.createdAt = createdAt;
    this.orgName = orgName;
    this.organizationId = organizationId;
    this.updatedAt = updatedAt;
  }
}

export default Organization;
