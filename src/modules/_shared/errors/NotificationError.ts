import { $t } from '../utils/$t';

export type NotificationErrorDetails = {
  status: number;
  message: string;
};

type NotificationErrorType = 'Not Found' | 'Bad Request' | 'Permission Denied' | 'Mongo Error';

export class NotificationError extends Error {
  constructor(type: NotificationErrorType | NotificationErrorDetails) {
    const details: NotificationErrorDetails =
      typeof type === 'string'
        ? (() => {
            switch (type) {
              case 'Not Found':
                return { status: 404, message: $t('_errors.notFound') };
              case 'Permission Denied':
                return { status: 403, message: $t('_errors.permissionDenied') };
              case 'Mongo Error':
                return { status: 500, message: $t('_errors.mongoError') };
              default:
                return { status: 400, message: $t('_errors.badRequest') };
            }
          })()
        : type;

    super(JSON.stringify(details));
  }
}
