import * as dotenv from 'dotenv';
import {TransactionalEmailsApi,TransactionalEmailsApiApiKeys,SendSmtpEmail,HttpError} from '@getbrevo/brevo';
import { NotificationService } from '../../application/services/NotificationService';
import { Entretien } from '@domain/entities/EntretienEntity';
import { Moto } from '@domain/entities/MotoEntity';

const templateIds = {
  confirmation: 12,
  forgotPassword: 3
};

dotenv.config({ path: '.env' });
export class BrevoNotificationService implements NotificationService {
  private apiInstance: TransactionalEmailsApi;

  constructor() {
    const apiKey = process.env.BREVO_API_KEY;
    // console.log("API KEY BREVO ->", apiKey);
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

  async sendEntretienReminder(entretien: Entretien, moto: Moto, clientEmail: string, gestionnaireEmail: string): Promise<void> {
    const mail = new SendSmtpEmail();
    mail.to = [{ email: clientEmail }, { email: gestionnaireEmail }];
    mail.sender = { email: 'faireEntretien@triumph-motorcycles.fr', name: 'Triumph Motorcycles' };
    mail.subject = `Rappel d'entretien pour votre moto ${moto.marque} ${moto.model}`;
  
    mail.htmlContent = `
      <h1>Rappel d'entretien</h1>
      <p>Un entretien est prévu pour votre moto <strong>${moto.marque} ${moto.model}</strong> (N° de série: ${moto.serialNumber}) le <strong>${entretien.datePrevue.toISOString()}</strong></p>
      <p>Type d'entretien : <strong>${entretien.typeEntretien}</strong></p>
        <p>
          <a href="http://localhost:5173/mise-a-jour-km?entretienId=${entretien.entretienId.toString()}">
            Cliquez ici pour modifier votre kilométrage
          </a>
        </p>
      <p>Merci de prendre rendez-vous rapidement.</p>
    `;
  
    try {
      await this.apiInstance.sendTransacEmail(mail);
      console.log(mail);
      console.log("Email envoyé à", clientEmail, "et", gestionnaireEmail, "pour entretien", entretien.entretienId.toString());
    } catch (error) {
      if (error instanceof HttpError) {
        console.error('HttpError statusCode', error.statusCode);
        console.error('HttpError body', error.body);
      }
      throw error;
    }
  }
}
  
