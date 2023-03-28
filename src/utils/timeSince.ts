export default function timeSince(date: number | string | Date): string {
  const convertedDate = new Date(date).getTime();
  const seconds = Math.floor((new Date().getTime() - convertedDate) / 1000);
  let interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return new Date(convertedDate).toLocaleDateString([], {
      dateStyle: 'short',
    });
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} дн. назад`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} ч. назад`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} мин. назад`;
  }
  return `Сейчас`;
}
