export function getNotificationHeader(type: 'success' | 'error', message: string): string {
  return JSON.stringify({
    notification: {
      type,
      message: encodeURIComponent(message),
    },
  });
}
