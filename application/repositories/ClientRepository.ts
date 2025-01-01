import { Client } from '../../domain/entities/ClientEntity';
import { UUID } from '../../domain/value-objects/UUID';

export interface ClientRepository {
  save(client: Client): Promise<Client>;
  findById(clientId: UUID): Promise<Client | null>;
  delete(clientId: UUID): Promise<boolean>;
  findAll(): Promise<Client[]>;
  update(client: Client): Promise<Client>;
}
