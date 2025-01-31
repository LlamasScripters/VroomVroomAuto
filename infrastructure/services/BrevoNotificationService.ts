import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
  HttpError
} from '@getbrevo/brevo';

import { NotificationService } from '../../application/services/NotificationService';

const templateIds = {
  confirmation: 12,
  forgotPassword: 3
};

export class BrevoNotificationService implements NotificationService {
  private apiInstance: TransactionalEmailsApi;

  constructor() {
    const apiKey = process.env.BREVO_API_KEY;
    console.log("API KEY BREVO ->", apiKey);
    if (!apiKey) {
      throw new Error("BREVO_API_KEY is not defined in environment variables");
    }

    this.apiInstance = new TransactionalEmailsApi();
    this.apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, apiKey);
    // console.log("API INSTANCE ->", this.apiInstance);
  }

  async sendEmailNotification(to: string, subject: string, body: string): Promise<void> {
    const mail = new SendSmtpEmail();
    mail.to = [{ email: to }];
    mail.sender = { email: 'noreply@yourdomain.com', name: 'MonApp' };
    mail.subject = subject;
    mail.htmlContent = body;

    try {
      await this.apiInstance.sendTransacEmail(mail);
    } catch (error) {
      if (error instanceof HttpError) {
        console.log('HttpError statusCode ', error.statusCode);
        console.log('HttpError body', error.body);
      }
      throw error;
    }
  }

  async sendValidationEmail(email: string, validationToken: string): Promise<void> {
    const mail = new SendSmtpEmail();
    mail.to = [{ email }];
    mail.sender = { email: 'noreply@yourdomain.com', name: 'MonApp' };
    mail.templateId = templateIds.confirmation;
    mail.params = {
      TOKEN_URL: `http://localhost:3000/api/auth/validate-email/${validationToken}`
    };

    console.log("Tentative d'envoi de l'email avec les paramètres suivants :", mail);

    try {
      await this.apiInstance.sendTransacEmail(mail);
    } catch (error) {
      if (error instanceof HttpError) {
        console.log('HttpError statusCode', error.statusCode);
        console.log('HttpError body', error.body);
      }
      throw error;
    }
  }

  async sendResetPasswordEmail(to: string, token: string): Promise<void> {
    const mail = new SendSmtpEmail();
    mail.to = [{ email: to }];
    mail.sender = { email: 'noreply@yourdomain.com', name: 'MonApp' };
    mail.templateId = templateIds.forgotPassword;
    mail.params = {
      TOKEN_URL: `http://localhost:3000/auth/reset-password/${token}`
    };

    try {
      await this.apiInstance.sendTransacEmail(mail);
    } catch (error) {
      if (error instanceof HttpError) {
        console.log('HttpError statusCode', error.statusCode);
        console.log('HttpError body', error.body);
      }
      throw error;
    }
  }
}
