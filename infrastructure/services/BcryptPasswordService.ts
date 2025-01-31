import bcrypt from 'bcryptjs';
import { PasswordService } from '../../application/services/PasswordService';

export class BcryptPasswordService implements PasswordService {
  async hashPassword(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(plainPassword, salt);
  }

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      console.error('Erreur lors de la comparaison des mots de passe:', error);
      throw error;
    }
  }
}
