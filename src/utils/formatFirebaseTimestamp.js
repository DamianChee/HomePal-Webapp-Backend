const formatFirebaseTimestamp = (timestamp) => {
  // Convert nanoseconds to milliseconds
  const totalMs =
    timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1e6);

  // Create Date object
  const date = new Date(totalMs);

  // Format the date parts
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Return formatted string
  return `${day} ${month} ${year} at ${hours}:${minutes}:${seconds} UTC+8`;
};

module.exports = formatFirebaseTimestamp;
