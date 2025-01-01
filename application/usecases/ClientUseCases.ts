import { Client } from '../../domain/entities/ClientEntity';
import { ClientRepository } from '../../application/repositories/ClientRepository';
import { UUID } from '../../domain/value-objects/UUID';

export class ClientUseCases {
  constructor(private clientRepository: ClientRepository) {}

  async createClient(clientId: UUID, nom: string, prenom: string, mail: string, telephone: string, numeroDeRue: number, nomDeRue: string, codePostal: string, ville: string, pays: string, userId: UUID): Promise<Client> {
    const client = Client.create(clientId, nom, prenom, mail, telephone, numeroDeRue, nomDeRue, codePostal, ville, pays, userId);
    return this.clientRepository.save(client);
  }

  async getClientById(clientId: UUID): Promise<Client | null> {
    return this.clientRepository.findById(clientId);
  }

  async updateClient(clientId: UUID, updatedData: Partial<Client>): Promise<Client | null> {
    const client = await this.clientRepository.findById(clientId);
    if (!client) return null;
    
    return this.clientRepository.save(client);
  }
  

  async deleteClient(clientId: UUID): Promise<boolean> {
    return this.clientRepository.delete(clientId);
  }
}
