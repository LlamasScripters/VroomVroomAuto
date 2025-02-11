import { UserRepository } from "@application/repositories/UserRepository";
import { PieceRepository } from "@application/repositories/PieceRepository";
import { NotificationService } from "@application/services/NotificationService";

export class CheckPieceLowUseCase {
    constructor(
        private notificationService: NotificationService,
        private userRepository: UserRepository,
        private pieceRepository: PieceRepository,
    ) {}

    async execute(): Promise<void> {
        const pieces = await this.pieceRepository.findByCriticalStock();
        for (const piece of pieces) {
    
            const pieceInfo = await this.pieceRepository.findById(piece.pieceId);
            if (!pieceInfo) {
                console.error("CRON: Piece introuvable pour piece", piece.pieceId.toString());
                continue;
            }
    
           // 1) On récupère LES gestionnaires et admins (tableaux de User).
           const gestionnaireUsers = await this.userRepository.findByRolesGestionnaire();
           const adminUsers = await this.userRepository.findByRolesAdmin();
    
           // 2) Vérifier qu’il existe au moins un gestionnaire et un admin
           if (!gestionnaireUsers.length || !adminUsers.length) {
               console.error(
                 "CRON: Aucun gestionnaire ou admin trouvé en BDD pour la pièce",
                 piece.pieceId.toString()
               );
               continue;
           }
    
           // 3) On prend le premier de chaque tableau
           const gestionnaireEmail = gestionnaireUsers[0].email.toString();
           const adminEmail = adminUsers[0].email.toString();
    
          // 4) On passe les deux emails à la fonction de notification
           await this.notificationService.sendStocklowNotification(
            gestionnaireEmail,
             adminEmail,
             piece
           );
        }
    }
    
}




