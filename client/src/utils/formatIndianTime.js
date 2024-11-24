exports.formatIndianTime = (dateString) => {
  const date = new Date(dateString); // Convert to Date object
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata", // Indian Standard Time
  };
  return date.toLocaleString("en-IN", options);
};

exports.isSessionOut = () => {
  const now = new Date(); // Current date and time
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Midnight of today

  const currentTime = now.getTime(); // Current time in milliseconds

  // Create today's session start time (9:00 AM)
  let startTime = new Date(today);
  startTime.setHours(9); // 9 AM
  startTime.setMinutes(0); // 0 minutes past 9 AM
  startTime.setSeconds(0); // No seconds
  startTime.setMilliseconds(0); // No milliseconds

  // Create today's session end time (12:20 PM)
  let endTime = new Date(today);
  endTime.setHours(12); // 12 PM
  endTime.setMinutes(20); // 20 minutes past 12 PM
  endTime.setSeconds(0); // No seconds
  endTime.setMilliseconds(0); // No milliseconds

  // Check if the current time is within the session window (9:00 AM to 12:20 PM)
  const isSessionOut = currentTime < startTime.getTime() || currentTime > endTime.getTime();
  
  console.log("Current Time:", now);
  console.log("Session Start Time (9:00 AM):", startTime);
  console.log("Session End Time (12:20 PM):", endTime);
  console.log("Is session out:", isSessionOut);  // Will log true if outside the session time window

  return isSessionOut;
}

