import { User } from '../../../domain/entities/UserEntity';
import { UserRepository } from '../../repositories/UserRepository';
import { UUID } from '../../../domain/value-objects/UUID';
import { Email } from '../../../domain/value-objects/EMAIL';
import { Password } from '../../../domain/value-objects/PASSWORD';

interface UserData {
  userId: UUID;
  username: string;
  email: Email;
  motDePasse: Password;
  role: string;
}

export class UserUseCases {
  constructor(private userRepository: UserRepository) {}

  async createUser(username: string, email: Email, motDePasse: Password, role: string): Promise<User> {
    const user = User.create(new UUID(), username, email, motDePasse, role);
    return this.userRepository.save(user);
  }

  async getUserById(userId: UUID): Promise<User | null> {
    return this.userRepository.findById(userId);
  }

  async updateUser(userId: UUID, updatedData: Partial<UserData>): Promise<User | null> {
    const user = await this.userRepository.findById(userId);
    if (!user) return null;

    const updatedUser = User.create(
      user.userId,
      updatedData.username || user.username,
      updatedData.email || user.email,
      updatedData.motDePasse || user.motDePasse,
      updatedData.role || user.role
    );
    
    return this.userRepository.save(updatedUser);
  }

  async deleteUser(userId: UUID): Promise<boolean> {
    return this.userRepository.delete(userId);
  }
}
