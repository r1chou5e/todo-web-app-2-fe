export const timeDiffFromNow = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);

  const now = new Date();

  const inputTime = new Date();
  inputTime.setHours(hours, minutes, 0, 0);

  const diffMilliseconds = inputTime - now;

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

export const convertToLocalDateTime = (inputTime) => {
  const now = new Date();
  const [hours, minutes] = inputTime.split(':').map(Number);
  const targetDate = new Date(now);

  targetDate.setHours(hours, minutes, 0, 0); // Đặt giờ, phút cho targetDate
  if (targetDate <= now) targetDate.setDate(targetDate.getDate() + 1); // Nếu nhỏ hơn hiện tại, cộng thêm 1 ngày

  return targetDate.toISOString().slice(0, 19); // Trả về định dạng "yyyy-MM-ddTHH:mm:ss"
};

export const getTimeFromLocalDateTime = (localDateTime) => {
  return new Date(localDateTime).toLocaleTimeString().slice(0, 5);
};
