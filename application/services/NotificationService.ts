import { Entretien } from "@domain/entities/EntretienEntity";
import { Moto } from "@domain/entities/MotoEntity";

export interface NotificationService {
  sendEmailNotification(to: string, subject: string, body: string): Promise<void>;
  sendValidationEmail(email: string, validationToken: string): Promise<void>;
  sendResetPasswordEmail(to: string, token: string): Promise<void>;
  sendEntretienReminder(entretien: Entretien, moto:Moto, clientEmail: string, gestionnaireEmail: string): Promise<void>;
}
