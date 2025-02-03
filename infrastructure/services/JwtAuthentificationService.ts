import jwt from 'jsonwebtoken';
import { AuthentificationService } from '../../application/services/AuthentificationService';

interface JwtPayload {
  userId: string;
}

export class JwtAuthentificationService implements AuthentificationService {
  private secret: string;
  private expiresIn: number;

  constructor() {
    this.secret = process.env.LOGIN_JWT_SECRET || 'secret';
    this.expiresIn = 3600;
  }
  
  async createAuthenticationToken(userId: string): Promise<string> {
    return jwt.sign({ userId }, this.secret, { expiresIn: this.expiresIn });
  }

  async verifyAuthenticationToken(token: string): Promise<string | null> {
    try {
      const decoded = jwt.verify(token, this.secret) as JwtPayload;
      return decoded.userId;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
