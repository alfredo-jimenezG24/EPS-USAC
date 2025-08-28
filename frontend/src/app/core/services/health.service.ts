import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface HealthStatus {
  status: string;
  service: string;
}

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getHealthStatus(): Observable<HealthStatus> {
    return this.http.get<HealthStatus>(`${this.apiUrl}/health`);
  }
}