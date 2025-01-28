export interface AuthentificationService {
  createAuthenticationToken(userId: string): Promise<string>;
  verifyAuthenticationToken(token: string): Promise<string | null>;
}
