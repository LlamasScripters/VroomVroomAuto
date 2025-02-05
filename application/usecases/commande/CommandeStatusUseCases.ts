// application/usecases/commande/CommandeStatusUseCases.ts
import { Commande } from '@domain/entities/CommandeEntity';
import { CommandeRepository } from '@application/repositories/CommandeRepository';
import { PieceRepository } from '@application/repositories/PieceRepository';
import { UUID } from '@domain/value-objects/UUID';

export class CommandeStatusUseCases {
    constructor(
      private commandeRepository: CommandeRepository,
      private pieceRepository: PieceRepository
    ) {}
  
    async updateStatus(commandeId: string, nouveauStatut: string): Promise<Commande> {
        const commande = await this.commandeRepository.findById(new UUID(commandeId));
        if (!commande) {
          throw new Error('Commande non trouvée');
        }
    
        if (nouveauStatut === 'LIVREE') {
          const piece = await this.pieceRepository.findById(commande.pieceId);
          if (!piece) {
            throw new Error('Pièce non trouvée');
          }
    
          // Mise à jour du stock lors de la livraison
          const nouvelleQuantite = piece.quantiteEnStock + commande.quantiteCommandee;
          await this.pieceRepository.updateStock(piece.pieceId, nouvelleQuantite, 'AJOUT');
        }
    
        // Mise à jour du statut de la commande
        const updatedCommande = await this.commandeRepository.updateStatus(
          new UUID(commandeId),
          nouveauStatut
        );
    
        return updatedCommande;
      }
  }