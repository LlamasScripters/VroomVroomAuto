import { User } from "@domain/entities/UserEntity";
import { AuthDTO } from "@application/dtos/AuthDTO";

export function toDTO(user: User): AuthDTO {
  return {
    username: user.username.toString(),
    email: user.email.toString(),
    password: user.password.toString(),
    confirmPassword: user.password.toString(),
  };
}

// on met pas de function toDomain car on utilise celui de UserMapper.ts ca sert a rien de dupliquer




