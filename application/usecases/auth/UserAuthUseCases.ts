import { User } from "../../../domain/entities/UserEntity";
import { AuthRepository } from "../../repositories/AuthRepository";
import { UUID } from "../../../domain/value-objects/UUID";
import { Email } from "../../../domain/value-objects/EMAIL";
import { Password } from "../../../domain/value-objects/PASSWORD";
import { AuthentificationService } from "@application/services/AuthentificationService";
import { PasswordService } from "@application/services/PasswordService";
import { NotificationService } from "@application/services/NotificationService";
import { RegisterDTO, LoginDTO, ForgotPasswordDTO, ChangePasswordDTO } from "@application/dtos/AuthDTO";
import { Username } from "@domain/value-objects/USERNAME";
import { Role } from "@domain/value-objects/ROLE";

export class UserAuthUseCases {
  constructor(
    private userRepository: AuthRepository,
    private authenticationService: AuthentificationService,
    private passwordService: PasswordService,
    private notificationService: NotificationService
  ) { }

  // Login avec LoginDTO
  async login(loginDTO: LoginDTO): Promise<string | null> {
    const email = new Email(loginDTO.email);
    const password = new Password(loginDTO.password);

    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;
    console.log(user);  
    const userPassword = user.password.toString();

    const isPasswordValid = await this.passwordService.verifyPassword(
      password.toString(),
      userPassword
    );

    console.log(isPasswordValid);
    if (!isPasswordValid) return null;  

    return await this.authenticationService.createAuthenticationToken(user.userId.toString());
  }

  // Changement de mot de passe avec ChangePasswordDTO
  async changePassword(changePasswordDTO: ChangePasswordDTO): Promise<User | null> {
    const userId = await this.authenticationService.verifyAuthenticationToken(changePasswordDTO.token);
    if (!userId) throw new Error("Invalid or expired token");

    const user = await this.userRepository.findById(new UUID(userId));
    if (!user) return null;

    if (changePasswordDTO.password !== changePasswordDTO.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const hashedPassword = await this.passwordService.hashPassword(changePasswordDTO.password);
    const updatedUser = User.create(
      user.userId,
      user.username,
      user.email,
      new Password(hashedPassword),
      user.role,
      user.isValidated,
      user.dateCreation,
      new Date() 
    );

    return await this.userRepository.update(updatedUser);
  }

  // Reset password avec ForgotPasswordDTO
  async resetPassword(forgotPasswordDTO: ForgotPasswordDTO): Promise<boolean> {
    const email = new Email(forgotPasswordDTO.email);
    const user = await this.userRepository.findByEmail(email);
    if (!user) return false;

    const resetToken = await this.authenticationService.createAuthenticationToken(user.userId.toString());
    await this.notificationService.sendResetPasswordEmail(email.toString(), resetToken);

    return true;
  }

  // Register avec RegisterDTO
  async register(registerDTO: RegisterDTO): Promise<void | null> {

    const emailExists = await this.userRepository.findByEmail(new Email(registerDTO.email));
    if (emailExists) throw new Error("Email already exists");

    if (registerDTO.password !== registerDTO.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const email = new Email(registerDTO.email);
    const username = new Username(registerDTO.username);
    const role = new Role("USER");
    const hashedPassword = await this.passwordService.hashPassword(registerDTO.password);

    const user = User.create(
      new UUID(),
      username,
      email,
      new Password(hashedPassword),
      role,
      false,
      new Date(),
      new Date()
    );

    await this.userRepository.save(user);

    const validationToken = await this.authenticationService.createAuthenticationToken(user.userId.toString());
    console.log(validationToken);
    
    await this.notificationService.sendValidationEmail(email.toString(), validationToken);

    return;
  }

  // Dans UserAuthUseCases.ts (optionnel si tu veux valider un email via un token)
  async validateEmail(token: string): Promise<boolean> {
    const userId = await this.authenticationService.verifyAuthenticationToken(token);
    if (!userId) {
      throw new Error("Invalid or expired token");
    }

    const user = await this.userRepository.findById(new UUID(userId));
    if (!user) return false;

    // On met le user en validé
    const updatedUser = User.create(
      user.userId,
      user.username,
      user.email,
      user.password, 
      user.role,
      true,
      user.dateCreation,
      new Date() 
    );
    await this.userRepository.update(updatedUser);

    return true;
  }

}
