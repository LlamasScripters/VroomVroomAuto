// application/usecases/commande/CommandeStatusUseCases.ts
import { Commande } from '@domain/entities/CommandeEntity';
import { CommandeRepository } from '@application/repositories/CommandeRepository';
import { PieceFournisseurRepository } from '@application/repositories/PieceFournisseurRepository';
import { PieceRepository } from '@application/repositories/PieceRepository';
import { UUID } from '@domain/value-objects/UUID';
import { Piece } from '@domain/entities/PieceEntity';

export class CommandeStatusUseCases {
    constructor(
      private commandeRepository: CommandeRepository,
      private pieceFournisseurRepository: PieceFournisseurRepository,
      private pieceRepository: PieceRepository
    ) {}
  
    async updateStatus(commandeId: string, nouveauStatut: string): Promise<Commande> {
        const commande = await this.commandeRepository.findById(new UUID(commandeId));
        if (!commande) {
          throw new Error('Commande non trouvée');
        }
    
        if (nouveauStatut === 'LIVREE') {
          const piece = await this.pieceFournisseurRepository.findById(commande.pieceId);
          if (!piece) {
            throw new Error('Pièce non trouvée');
          }
    
          // mise à jour du stock lors de la livraison
          await this.pieceFournisseurRepository.updateStock(
            piece.pieceId,
            commande.quantiteCommandee,
            'RETRAIT'
          );

          const existingPiece = await this.pieceRepository.findByReference(piece.reference);

          if (!existingPiece) {
            const newPiece = Piece.create(
              new UUID(),
              piece.nom,
              piece.reference,
              commande.quantiteCommandee, 
              5,                                // default critical stock
              piece.categorie,
              piece.fournisseur,
              piece.prixUnitaire
            );
            await this.pieceRepository.save(newPiece);
          } else {
            await this.pieceRepository.updateStock(
              existingPiece.pieceId,
              commande.quantiteCommandee,
              'AJOUT'
            );
          }

        }
    
        // mise à jour du statut de la commande
        const updatedCommande = await this.commandeRepository.updateStatus(
          new UUID(commandeId),
          nouveauStatut
        );
    
        return updatedCommande;
      }
  }