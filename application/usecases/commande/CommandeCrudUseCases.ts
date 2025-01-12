import { Commande } from '../../../domain/entities/CommandeEntity';
import { CommandeRepository } from '../../repositories/CommandeRepository';
import { UUID } from '../../../domain/value-objects/UUID';

interface CommandeData {
  commandeId: UUID;
  dateCommande: Date;
  pieceId: UUID;
  quantiteCommandee: number;
  coutTotal: number;
  dateLivraison: Date;
  statutCommande: string;
  userId: UUID;
}

export class CommandeUseCases {
  constructor(private commandeRepository: CommandeRepository) {}

  async createCommande(dateCommande: Date, pieceId: UUID, quantiteCommandee: number, coutTotal: number, dateLivraison: Date, statutCommande: string, userId: UUID): Promise<Commande> {
    const commande = Commande.create(new UUID(), dateCommande, pieceId, quantiteCommandee, coutTotal, dateLivraison, statutCommande, userId);
    return this.commandeRepository.save(commande);
  }

  async getCommandeById(commandeId: UUID): Promise<Commande | null> {
    return this.commandeRepository.findById(commandeId);
  }

  async updateCommande(commandeId: UUID, updatedData: Partial<CommandeData>): Promise<Commande | null> {
    const commande = await this.commandeRepository.findById(commandeId);
    if (!commande) return null;

    const updatedCommande = Commande.create(
      commande.commandeId,
      updatedData.dateCommande || commande.dateCommande,
      updatedData.pieceId || commande.pieceId,
      updatedData.quantiteCommandee || commande.quantiteCommandee,
      updatedData.coutTotal || commande.coutTotal,
      updatedData.dateLivraison || commande.dateLivraison,
      updatedData.statutCommande || commande.statutCommande,
      commande.userId
    );
    
    return this.commandeRepository.save(updatedCommande);
  }

  async deleteCommande(commandeId: UUID): Promise<boolean> {
    return this.commandeRepository.delete(commandeId);
  }
}
