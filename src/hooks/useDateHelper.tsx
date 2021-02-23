const useDateHelper = () => {
  const getMinutesSince = (date: string) => {
    const currentTime = new Date();
    const d = new Date(date.trim());

    if (d.toString() === 'Invalid Date') {
      return 'Unknown';
    }

    const rtf1 = new Intl.RelativeTimeFormat('en', {
      style: 'long',
      numeric: 'auto',
    });

    const diff = d.getTime() - currentTime.getTime();
    const diffDays = getZeroFloor(diff / 86400000);
    const diffHrs = getZeroFloor((diff % 86400000) / 3600000);
    const diffMins = getZeroFloor(((diff % 86400000) % 3600000) / 60000);
    const diffSeconds = getZeroFloor(
      ((diff % 86400000) % 3600000) / 60000 / 60
    );

    if (diffDays !== 0) {
      return rtf1.format(diffDays, 'days');
    }
    if (diffHrs !== 0) {
      return rtf1.format(diffHrs, 'hours');
    }

    if (diffMins !== 0) {
      return rtf1.format(diffMins, 'minutes');
    }

    return rtf1.format(diffSeconds, 'seconds');
  };

  const getZeroFloor = (input: number): number => {
    if (input < 1 && input > -1) {
      return 0;
    }
    return Math.floor(input);
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
