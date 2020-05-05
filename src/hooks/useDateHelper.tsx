const useDateHelper = () => {
  const getMinutesSince = (date: string) => {
    const d = new Date(date.trim());

    if (d.toString() === 'Invalid Date') {
      return 'Unknown';
    }
    const currentTime = new Date();
    const diff = Math.abs(d.getTime() - currentTime.getTime());
    const diffDays = Math.floor(diff / 86400000);
    const diffHrs = Math.floor((diff % 86400000) / 3600000);
    const diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);

    if (diffDays > 0) {
      return d.toLocaleString();
    }
    if (diffHrs > 0) {
      const str = `about ${diffHrs.toString()} ${
        diffHrs < 1 ? 'hours' : 'hour'
      } ago`;
      return str;
    }
    if (diffMins < 1) {
      return `Just now`;
    }
    return `${diffMins.toString()} ${diffMins > 1 ? 'minutes' : 'minute'} ago`;
  };

  const getLocalDateString = (date: string) => {
    const d = new Date(date.trim());
    if (d.toString() === 'Invalid Date') {
      return 'Unknown';
    }
    return d.toLocaleString();
  };

  return { getMinutesSince, getLocalDateString };
};

export { useDateHelper };
