import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../app.service';
// Importation de la fonction de génération d'UUID
import { v4 as uuidv4 } from 'uuid';

interface Incident {
  // Ces champs peuvent être soit une chaîne, soit un objet contenant une propriété "value"
  incidentId: string | { value: string };
  typeIncident: string;
  description: string;
  dateIncident: string;
  gravite: 'FAIBLE' | 'MOYENNE' | 'HAUTE';
  essaiId: string | { value: string };
}

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  incidents: Incident[] = [];
  isLoading = false;
  error: string | null = null;
  showAddIncidentModal = false;
  showEditIncidentModal = false;
  showDeleteIncidentModal = false;
  newIncident: Partial<Incident> = {};
  selectedIncident: Incident | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getIncidents();
  }

  getIncidentId(incidentId: string | { value: string }): string {
    return typeof incidentId === 'string' ? incidentId : incidentId.value;
  }

  getIncidents() {
    this.isLoading = true;
    this.error = null;
    
    this.apiService.getIncidents().subscribe(
      (data: Incident[]) => {
        this.incidents = data;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Erreur lors de la récupération des incidents';
        this.isLoading = false;
        console.error('Erreur lors de la récupération des incidents', error);
      }
    );
  }

  openAddIncidentModal() {
    this.showAddIncidentModal = true;
    this.newIncident = {};
  }

  closeAddIncidentModal() {
    this.showAddIncidentModal = false;
    this.newIncident = {};
  }

  addIncident() {
    // Vérification des champs obligatoires
    if (!this.newIncident.typeIncident ||
        !this.newIncident.description ||
        !this.newIncident.dateIncident ||
        !this.newIncident.gravite) {
      this.error = 'Veuillez remplir tous les champs obligatoires';
      return;
    }
    
    // Génération d'un UUID valide pour essaiId s'il n'est pas fourni
    if (!this.newIncident.essaiId) {
      this.newIncident.essaiId = "8f622ec1-25d6-4856-a6a1-2561351186a2"
    } else if (typeof this.newIncident.essaiId === 'object' && 'value' in this.newIncident.essaiId) {
      this.newIncident.essaiId = this.newIncident.essaiId.value;
    }

    this.apiService.createIncident(this.newIncident).subscribe(
      (response) => {
        console.log('Incident créé avec succès', response);
        this.getIncidents();
        this.closeAddIncidentModal();
      },
      (error) => {
        this.error = 'Erreur lors de la création de l\'incident';
        console.error('Erreur lors de la création de l\'incident', error);
      }
    );
  }

  openEditIncidentModal(incident: Incident) {
    // Création d'une copie de l'incident pour ne pas modifier directement la liste affichée
    this.selectedIncident = { ...incident };
    this.showEditIncidentModal = true;
  }

  closeEditIncidentModal() {
    this.showEditIncidentModal = false;
    this.selectedIncident = null;
  }

  updateIncident() {
    if (!this.selectedIncident) return;

    // Extraction de l'identifiant pour l'URL
    let id: string;
    if (typeof this.selectedIncident.incidentId === 'object' && 'value' in this.selectedIncident.incidentId) {
      id = this.selectedIncident.incidentId.value;
    } else {
      id = this.selectedIncident.incidentId as string;
    }

    // Création d'un payload propre pour l'update
    const payload = { ...this.selectedIncident };

    // Nettoyage : convertir incidentId et essaiId en chaînes si nécessaire
    if (typeof payload.incidentId === 'object' && 'value' in payload.incidentId) {
      payload.incidentId = payload.incidentId.value;
    }
    if (typeof payload.essaiId === 'object' && 'value' in payload.essaiId) {
      payload.essaiId = payload.essaiId.value;
    } else if (!payload.essaiId) {
      // Générer un nouvel UUID pour essaiId si absent (selon la logique métier)
      payload.essaiId = uuidv4();
    }

    this.apiService.updateIncident(id, payload).subscribe(
      (response) => {
        console.log('Incident mis à jour avec succès', response);
        this.getIncidents();
        this.closeEditIncidentModal();
      },
      (error) => {
        this.error = 'Erreur lors de la mise à jour de l\'incident';
        console.error('Erreur lors de la mise à jour de l\'incident', error);
      }
    );
  }

  openDeleteIncidentModal(incident: Incident) {
    this.selectedIncident = incident;
    this.showDeleteIncidentModal = true;
  }

  closeDeleteIncidentModal() {
    this.showDeleteIncidentModal = false;
    this.selectedIncident = null;
  }

  deleteIncident() {
    if (!this.selectedIncident) return;

    let id: string;
    if (typeof this.selectedIncident.incidentId === 'object' && 'value' in this.selectedIncident.incidentId) {
      id = this.selectedIncident.incidentId.value;
    } else {
      id = this.selectedIncident.incidentId as string;
    }

    this.apiService.deleteIncident(id).subscribe(
      (response) => {
        console.log('Incident supprimé avec succès', response);
        this.getIncidents();
        this.closeDeleteIncidentModal();
      },
      (error) => {
        this.error = 'Erreur lors de la suppression de l\'incident';
        console.error('Erreur lors de la suppression de l\'incident', error);
      }
    );
  }
}
