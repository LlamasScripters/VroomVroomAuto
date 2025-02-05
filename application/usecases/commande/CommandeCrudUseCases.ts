// application/usecases/commande/CommandeCrudUseCases.ts
import { Commande } from '@domain/entities/CommandeEntity';
import { CommandeRepository } from '@application/repositories/CommandeRepository';
import { PieceFournisseurRepository } from '@application/repositories/PieceFournisseurRepository';
import { UUID } from '@domain/value-objects/UUID';
import { CreateCommandeDTO, UpdateCommandeDTO } from '@application/dtos/CommandeDTO';
import { CommandeStatut } from '@domain/entities/CommandeEntity';

export class CommandeCrudUseCases {
  constructor(
    private commandeRepository: CommandeRepository,
    private pieceFournisseurRepository: PieceFournisseurRepository,
  ) {}

  async createCommande(commandeData: CreateCommandeDTO): Promise<Commande> {
    const piece = await this.pieceFournisseurRepository.findById(new UUID(commandeData.pieceId));
    if (!piece) {
        throw new Error('Pièce non trouvée');
    }

    // vérification du stock
    if (piece.quantiteEnStock < commandeData.quantiteCommandee) {
        throw new Error('Stock insuffisant');
    }

    const coutTotal = piece.prixUnitaire * commandeData.quantiteCommandee;

    const commande = Commande.create(
        new UUID(),
        new UUID(commandeData.pieceId),
        new UUID(commandeData.gestionnaireid),
        commandeData.quantiteCommandee,
        coutTotal,
        new Date(),
        new Date(commandeData.dateLivraisonPrevue),
        CommandeStatut.EN_ATTENTE,
        {
            nom: piece.nom,
            reference: piece.reference,
            prixUnitaire: piece.prixUnitaire,
            categorie: piece.categorie,
            fournisseur: piece.fournisseur
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
        commande.gestionnaireid,                     
        updatedData.quantiteCommandee ?? commande.quantiteCommandee, 
        commande.coutTotal,                        
        commande.dateCommande,                     
        updatedData.dateLivraisonPrevue ? new Date(updatedData.dateLivraisonPrevue) : commande.dateLivraisonPrevue, 
        updatedData.statut as CommandeStatut ?? commande.statut, 
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