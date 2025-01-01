import { Commande } from '../../domain/entities/CommandeEntity';
import { CommandeRepository } from '../repositories/CommandeRepository';
import { UUID } from '../../domain/value-objects/UUID';

export class CommandeUseCases {
  constructor(private commandeRepository: CommandeRepository) {}

  async createCommande(commandeId: UUID, dateCommande: Date, pieceId: UUID, quantiteCommandee: number, coutTotal: number, dateLivraison: Date, statutCommande: string, userId: UUID): Promise<Commande> {
    const commande = Commande.create(commandeId, dateCommande, pieceId, quantiteCommandee, coutTotal, dateLivraison, statutCommande, userId);
    return this.commandeRepository.save(commande);
  }

  async getCommandeById(commandeId: UUID): Promise<Commande | null> {
    return this.commandeRepository.findById(commandeId);
  }

  async updateCommande(commandeId: UUID, updatedData: Partial<Commande>): Promise<Commande | null> {
    const commande = await this.commandeRepository.findById(commandeId);
    if (!commande) return null;
    
    return this.commandeRepository.save(commande);
  }

  async deleteCommande(commandeId: UUID): Promise<boolean> {
    return this.commandeRepository.delete(commandeId);
  }
}
