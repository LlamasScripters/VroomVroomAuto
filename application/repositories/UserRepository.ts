import { User } from '../../domain/entities/UserEntity';
import { UUID } from '../../domain/value-objects/UUID';

export interface UserRepository {
  save(user: User): Promise<User>;
  findById(userId: UUID): Promise<User | null>;
  delete(userId: UUID): Promise<boolean>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<User>;
}
