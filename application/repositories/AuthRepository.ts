import { User } from "@domain/entities/UserEntity";
import { Email } from "@domain/value-objects/EMAIL";
import { UUID } from "@domain/value-objects/UUID";

export interface AuthRepository {
  findByEmail(email: Email): Promise<User | null>;
  findById(userId: UUID): Promise<User | null>;
  update(user: User): Promise<User>;
  save(user: User): Promise<User>;
}
