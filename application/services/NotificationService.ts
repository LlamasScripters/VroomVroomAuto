export interface NotificationService {
    sendEmailNotification(to: string, subject: string, body: string): Promise<void>;
    sendValidationEmail(email: string, validationToken: string): Promise<void>;
    sendResetPasswordEmail(to: string, token: string): Promise<void>;
  }
  