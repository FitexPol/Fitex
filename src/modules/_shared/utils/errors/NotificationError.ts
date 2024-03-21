export type NotificationErrorDetails = {
  status: number;
  message: string;
};

export class NotificationError extends Error {
  constructor(errorDetails: NotificationErrorDetails) {
    super(JSON.stringify(errorDetails));
  }
}
