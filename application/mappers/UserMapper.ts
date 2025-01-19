import { User } from "@domain/entities/UserEntity";
import { UUID } from "@domain/value-objects/UUID";
import { Email } from "@domain/value-objects/EMAIL";
import { Password } from "@domain/value-objects/PASSWORD";
import { UserDTO } from "@application/dtos/UserDTO";
import { Role } from "@domain/value-objects/ROLE";
import { Username } from "@domain/value-objects/USERNAME";

export function toDTO(user: User): UserDTO {
  return {
    userId: user.userId.toString(),
    username: user.username.toString(),
    email: user.email.toString(),
    password: user.password.toString(),
    role: user.role.toString(),
    isValidated: user.isValidated,
    dateCreation: user.dateCreation,
    derniereConnexion: user.derniereConnexion
  };
}

export function toDomain(dto: UserDTO): User {
  return User.create(
    new UUID(dto.userId),
    new Username(dto.username),
    new Email(dto.email),
    new Password(dto.password),
    new Role(dto.role as 'USER' | 'ADMIN'),
    dto.isValidated,
    dto.dateCreation,
    dto.derniereConnexion
  );
}

