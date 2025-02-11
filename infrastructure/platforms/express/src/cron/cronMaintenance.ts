import cron from "node-cron";
import { CheckEntretienDueUseCase } from "../../../../../application/usecases/entretien/CheckEntretienUseCases";
import { EntretienSQLRepository } from "../../../express/src/repositories/entretien.repository.sql";
import { UserRepositorySQL } from "../../../express/src/repositories/user.repository.sql";
import { SqlMotoRepository } from "../../../express/src/repositories/moto.repository.sql";
import { BrevoNotificationService } from "@infrastructure/services/BrevoNotificationService";


export function scheduleEntretienReminderJob() {
  cron.schedule("* * * * *", async () => {
    console.log("CRON: Vérification des entretiens déjà dus…");
    try {
      const entretienRepo = new EntretienSQLRepository();
      const userRepo = new UserRepositorySQL();
      const motoRepository = new SqlMotoRepository();
      const notificationService = new BrevoNotificationService();

      const useCase = new CheckEntretienDueUseCase(entretienRepo, userRepo, motoRepository, notificationService);
      await useCase.execute();
      console.log("CRON: Vérification terminée.");
    } catch (error) {
      console.error("CRON: Erreur lors de la vérification:", error);
    }
  });
}
