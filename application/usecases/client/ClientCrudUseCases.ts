import { Client } from '../../../domain/entities/ClientEntity';
import { ClientRepository } from '../../repositories/ClientRepository';
import { UUID } from '../../../domain/value-objects/UUID';

interface ClientData {
  nom: string;
  prenom: string;
  mail: string;
  telephone: string;
  numeroDeRue: number;
  nomDeRue: string;
  codePostal: string;
  ville: string;
  pays: string;
}

export class ClientUseCases {

  constructor(private clientRepository: ClientRepository) {}

  async createClient(nom: string, prenom: string, mail: string, telephone: string, numeroDeRue: number, nomDeRue: string, codePostal: string, ville: string, pays: string, userId: UUID): Promise<Client> {
    const client = Client.create(new UUID(), nom, prenom, mail, telephone, numeroDeRue, nomDeRue, codePostal, ville, pays, userId);
    return this.clientRepository.save(client);
  }

  async getClientById(clientId: UUID): Promise<Client | null> {
    return this.clientRepository.findById(clientId);
  }

  async updateClient(clientId: UUID, updatedData: Partial<ClientData>): Promise<Client | null> {
    const client = await this.clientRepository.findById(clientId);
    if (!client) return null;

    const updatedClient = Client.create(
      client.clientId,
      updatedData.nom || client.nom,
      updatedData.prenom || client.prenom,
      updatedData.mail || client.mail,
      updatedData.telephone || client.telephone,
      updatedData.numeroDeRue || client.numeroDeRue,
      updatedData.nomDeRue || client.nomDeRue,
      updatedData.codePostal || client.codePostal,
      updatedData.ville || client.ville,
      updatedData.pays || client.pays,
      client.userId
    );
    
    return this.clientRepository.save(updatedClient);
  }
  

  async deleteClient(clientId: UUID): Promise<boolean> {
    return this.clientRepository.delete(clientId);
  }
}
