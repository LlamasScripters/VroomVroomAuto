// application/usecases/commande/CommandeCrudUseCases.ts
import { Commande } from '@domain/entities/CommandeEntity';
import { CommandeRepository } from '@application/repositories/CommandeRepository';
import { PieceRepository } from '@application/repositories/PieceRepository';
import { UUID } from '@domain/value-objects/UUID';
import { CreateCommandeDTO, UpdateCommandeDTO } from '@application/dtos/CommandeDTO';

export class CommandeCrudUseCases {
  constructor(
    private commandeRepository: CommandeRepository,
    private pieceRepository: PieceRepository
  ) {}

  async createCommande(commandeData: CreateCommandeDTO): Promise<Commande> {
    const piece = await this.pieceRepository.findById(new UUID(commandeData.pieceId));
    if (!piece) {
      throw new Error('Pièce non trouvée');
    }
  
    const coutTotal = piece.prixUnitaire ? piece.prixUnitaire * commandeData.quantiteCommandee : 0;
  
    const commande = Commande.create(
      new UUID(),
      new UUID(commandeData.pieceId),
      commandeData.quantiteCommandee,
      coutTotal,
      new Date(),
      new Date(commandeData.dateLivraisonPrevue),
      'EN_ATTENTE',
      new UUID(commandeData.userId),
      {
        nom: piece.nom,
        reference: piece.reference,
        prixUnitaire: piece.prixUnitaire || 0
      }
    );
  
    return await this.commandeRepository.save(commande);
  }

  async getCommandeById(commandeId: string): Promise<Commande | null> {
    return await this.commandeRepository.findById(new UUID(commandeId));
  }

  async updateCommande(updatedData: UpdateCommandeDTO): Promise<Commande | null> {
    const commande = await this.commandeRepository.findById(new UUID(updatedData.commandeId));
    if (!commande) return null;

    const updatedCommande = Commande.create(
      commande.commandeId,
      updatedData.pieceId ? new UUID(updatedData.pieceId) : commande.pieceId,
      updatedData.quantiteCommandee ?? commande.quantiteCommandee,
      commande.coutTotal,
      commande.dateCommande,
      updatedData.dateLivraisonPrevue ? new Date(updatedData.dateLivraisonPrevue) : commande.dateLivraisonPrevue,
      updatedData.statut ?? commande.statut,
      commande.userId,
      commande.pieceDetails
    );

    return await this.commandeRepository.update(updatedCommande);
  }

  async deleteCommande(commandeId: string): Promise<boolean> {
    return await this.commandeRepository.delete(new UUID(commandeId));
  }

  async getAllCommandes(): Promise<Commande[]> {
    return await this.commandeRepository.findAll();
  }
}