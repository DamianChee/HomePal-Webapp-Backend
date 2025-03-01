class Patient {
  constructor(
    activityLevel,
    assistanceLevel,
    bedId,
    behavioralPattern,
    cognitiveFunction,
    createdAt,
    gender,
    hasDiaper,
    hasRestraints,
    mobility,
    patientId,
    patientName,
    showAttemptedBedExitAlerts,
    showBedExitAlerts,
    showBedsideFallAlerts,
    updatedAt,
    yearOfBirth
  ) {
    this.activityLevel = activityLevel;
    this.assistanceLevel = assistanceLevel;
    this.bedId = bedId;
    this.behavioralPattern = behavioralPattern;
    this.cognitiveFunction = cognitiveFunction;
    this.createdAt = createdAt;
    this.gender = gender;
    this.hasDiaper = hasDiaper;
    this.hasRestraints = hasRestraints;
    this.mobility = mobility;
    this.patientId = patientId;
    this.patientName = patientName;
    this.showAttemptedBedExitAlerts = showAttemptedBedExitAlerts;
    this.showBedExitAlerts = showBedExitAlerts;
    this.showBedsideFallAlerts = showBedsideFallAlerts;
    this.updatedAt = updatedAt;
    this.yearOfBirth = yearOfBirth;
  }
}

export default Patient;
