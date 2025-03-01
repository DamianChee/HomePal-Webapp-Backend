function parseBoolean(value) {
  if (typeof value === "boolean") return value;
  if (!value) return false;
  return String(value).toLowerCase() === "true";
}

module.exports = parseBoolean;
