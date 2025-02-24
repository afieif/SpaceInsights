export const extractSummary = (messageBody) => {
  const match = messageBody.match(/## Summary:\n\n([\s\S]+?)(\n\n##|\n\nNASA|\n\nActivity ID:|\n\nNotes:|\n$)/);

  if (!match) return false;

  let summary = match[1].trim();

  // Regex to match timestamps like "2025-02-03T13:07Z"
  const timestampRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}Z/g;

  // Replace timestamps with human-readable format
  summary = summary.replace(timestampRegex, (match) => formatTimestamp(match));

  return summary;
};

function formatTimestamp(isoString) {
  const date = new Date(isoString);

  // Extract parts
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options); // Example: "February 3, 2025"
  const formattedTime = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }); // Example: "1:07 PM"

  return `${formattedDate}, ${formattedTime}`;
}
