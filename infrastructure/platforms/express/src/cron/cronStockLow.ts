import cron from "node-cron";
import { CheckPieceLowUseCase } from "../../../../../application/usecases/piece/PieceLowUseCases";
import { PieceSQLRepository } from "../../../express/src/repositories/piece.repository.sql";
import { UserRepositorySQL } from "../../../express/src/repositories/user.repository.sql";
import { BrevoNotificationService } from "@infrastructure/services/BrevoNotificationService";


export function scheduleStockLowJob() {
  cron.schedule('* * * * *', async () => {
    console.log("CRON: Vérification des stocks bas…");
    try {
      const notificationService = new BrevoNotificationService();
      const userRepository = new UserRepositorySQL();
      const pieceRepository = new PieceSQLRepository();

      const checkPieceLowUseCase = new CheckPieceLowUseCase(notificationService, userRepository, pieceRepository);

      await checkPieceLowUseCase.execute();
      console.log("CRON: Vérification terminée.");
    } catch (error) {
      console.error("CRON: Erreur lors de la vérification:", error);
    }
  });
}   
