function formatDate() {
  const date = new Date(Date.now());

  const damiansDate = new Date(
    date.toLocaleString("en-US", {
      timeZone: "Asia/Shanghai",
    })
  );

  // Format time
  const hours = damiansDate.getHours();
  const minutes = damiansDate.getMinutes();
  const seconds = damiansDate.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  // Format date
  const day = damiansDate.getDate();
  const month = damiansDate.getMonth() + 1;
  const year = damiansDate.getFullYear();

  // Return formatted string
  return `${formattedHours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}${ampm} ${day}/${month}/${year}`;
}

module.exports = formatDate;
