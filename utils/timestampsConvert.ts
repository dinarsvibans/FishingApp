export const TimeStampToTime = (timestamp: string | undefined) => {
  if (!timestamp) return '';

  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const TimeStampToDate = (timestamp: string | undefined) => {
  return timestamp ? new Date(timestamp).toLocaleDateString() : '';
};
