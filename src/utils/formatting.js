export const timeDiffFromNow = (timeString) => {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeString.split(':').map(Number);

  // Create a new Date object for the current time
  const now = new Date();

  // Create a Date object for the input time (same day as now)
  const inputTime = new Date();
  inputTime.setHours(hours, minutes, 0, 0); // set seconds and milliseconds to 0

  // Calculate the difference in milliseconds
  const diffMilliseconds = inputTime - now;

  // Convert to a readable format (e.g., minutes or hours)
  const diffSeconds = Math.floor(diffMilliseconds / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  return {
    diffMilliseconds,
    diffSeconds,
    diffMinutes,
    diffHours,
  };
};
