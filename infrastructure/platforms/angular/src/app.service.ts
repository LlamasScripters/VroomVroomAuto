import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:4000/api/nestJs';

  constructor(private http: HttpClient) { }

  getIncidents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/incident`);
  }

  getIncidentById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/incident/${id}`);
  }

  createIncident(incident: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/incident`, incident);
  }

  updateIncident(id: string, incident: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/incident/${id}`, incident);
  }

  deleteIncident(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/incident/${id}`);
  }
}
