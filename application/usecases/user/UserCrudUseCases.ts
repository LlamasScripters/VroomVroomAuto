import { User } from '../../../domain/entities/UserEntity';
import { UserRepository } from '../../repositories/UserRepository';
import { UUID } from '../../../domain/value-objects/UUID';
import { Email } from '../../../domain/value-objects/EMAIL';
import { Password } from '../../../domain/value-objects/PASSWORD';
import { Role } from '@domain/value-objects/ROLE';
import { CreateUserDTO, UpdateUserDTO, GetUserDTO } from '@application/dtos/UserDTO';
import { Username } from '@domain/value-objects/USERNAME';
import { UserResponse } from '@application/response/UserResponse';
import { AuthenticationService } from '@application/services/AuthentificationService';
import { PasswordService } from '@application/services/PasswordService';

export class UserCrudUseCases {
  constructor(
    private userRepository: UserRepository,
    private authenticationService: AuthenticationService,
    private passwordService: PasswordService
  ) {}

  async createUser(token: string, userData: CreateUserDTO): Promise<UserResponse> {

    const requesterId = await this.authenticationService.verifyAuthenticationToken(token);
    if (!requesterId) throw new Error('Invalid token');

    
    const username = new Username(userData.username);
    const email = new Email(userData.email);
    const hashedPassword = await this.passwordService.hashPassword(userData.password); 
    

    const user = User.create(
      new UUID(),
      username,
      email,
      new Password(hashedPassword),
      new Role('USER'),
      true,
      new Date(),
      new Date()
    );

    try {
      const savedUser = await this.userRepository.save(user);
      return {userId: savedUser.userId.toString()};
    } catch (error) {
      throw error;
    }
  }

  async getUserById(token: string, userData: GetUserDTO): Promise<User | null> {
    const userIdentifier = new UUID(userData.userId);
    
    const requesterId = await this.authenticationService.verifyAuthenticationToken(token);
    if (!requesterId) throw new Error('Invalid token');
    
    return await this.userRepository.findById(userIdentifier);
  }

  async updateUser(token: string, updatedData: UpdateUserDTO): Promise<User | null> {
    let username: Username | undefined;
    let email: Email | undefined;
    let password: Password | undefined;
    let role: Role | undefined;
    let isValidated: boolean | undefined;

      if (updatedData.username) {
        username = new Username(updatedData.username);
      }
      if (updatedData.email) {
        email = new Email(updatedData.email);
      } 
      if (updatedData.password) {
        password = new Password(updatedData.password);
      }
      if (updatedData.isValidated) {
          isValidated = updatedData.isValidated;
      }

      const requesterId = await this.authenticationService.verifyAuthenticationToken(token);
      if (!requesterId) throw new Error('Invalid token');


    const userIdentifier = new UUID(updatedData.userId);
    const user = await this.userRepository.findById(userIdentifier);
    if (!user) return null;

    const updatedUser = User.create(
      user.userId,
      username || user.username,
      email || user.email,
      password || user.password,
      role || user.role,
      isValidated || user.isValidated,
      user.dateCreation,
      user.derniereConnexion
    );
    
    return await this.userRepository.update(updatedUser);
  }

  async deleteUser(token: string, userId: string): Promise<boolean> {
    const userIdentifier = new UUID(userId);

    const requesterId = await this.authenticationService.verifyAuthenticationToken(token);
    if (!requesterId) throw new Error('Invalid token');

    return await this.userRepository.delete(userIdentifier);
  }

  async getAllUsers(token: string): Promise<User[]> {

    const requesterId = await this.authenticationService.verifyAuthenticationToken(token);
    if (!requesterId) throw new Error('Invalid token');
    
    return await this.userRepository.findAll();
  }

}
