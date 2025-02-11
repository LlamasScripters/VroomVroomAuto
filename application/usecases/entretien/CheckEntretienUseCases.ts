import { EntretienRepository } from "@application/repositories/EntretienRepository";
import { UserRepository } from "@application/repositories/UserRepository";
import { MotoRepository } from "@application/repositories/MotoRepository";
import { NotificationService } from "@application/services/NotificationService";

export class CheckEntretienDueUseCase {
  constructor(
    private entretienRepository: EntretienRepository,
    private userRepository: UserRepository,
    private motoRepository: MotoRepository, 
    private notificationService: NotificationService
  ) {}

  async execute(): Promise<void> {
    const entretiens = await this.entretienRepository.findAllEntretienDus();

    for (const entretien of entretiens) {
      console.log("CRON: Entretien trouvé:", entretien);

      // 1) Récupérer les infos de la moto
      const moto = await this.motoRepository.findById(entretien.motoId);
      if (!moto) {
        console.error("CRON: Moto introuvable pour entretien", entretien.entretienId.toString());
        continue;
      }

      // 2) Récupère le user (client)
      const clientUser = await this.userRepository.findById(entretien.userId);
      // 3) Récupère le gestionnaire
      const gestionnaireUser = await this.userRepository.findById(entretien.gestionnaireId);

      if (!clientUser || !gestionnaireUser) {
        console.error("CRON: Impossible de récupérer le client ou le gestionnaire pour entretien", entretien.entretienId.toString());
        continue;
      }

      // 4) Appel au NotificationService avec les infos moto
      await this.notificationService.sendEntretienReminder(
        entretien,
        moto, // Passer les infos de la moto
        clientUser.email.toString(),
        gestionnaireUser.email.toString()
      );
    }
  }
}
