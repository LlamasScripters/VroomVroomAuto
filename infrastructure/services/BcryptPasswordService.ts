import bcrypt from 'bcryptjs';
import { PasswordService } from '../../application/services/PasswordService';

export class BcryptPasswordService implements PasswordService {
  async hashPassword(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainPassword, salt);
  }

  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
