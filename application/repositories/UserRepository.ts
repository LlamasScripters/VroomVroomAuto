import { User } from '@domain/entities/UserEntity';
import { UUID } from '@domain/value-objects/UUID';
import { Email } from '@domain/value-objects/EMAIL';

export interface UserRepository {
  save(user: User): Promise<User>;
  findById(userId: UUID): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  findByRolesGestionnaire(): Promise<User[]>;
  findByRolesAdmin(): Promise<User[]>;
  delete(userId: UUID): Promise<boolean>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<User>;
  findFirstGestionnaire(): Promise<User | null>;
}
