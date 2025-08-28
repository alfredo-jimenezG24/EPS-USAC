import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar';
import { HealthService, HealthStatus } from '../../core/services/health.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  healthStatus: HealthStatus | null = null;
  healthError: string | null = null;
  username: string = '';
  userRoles: string[] = [];

  constructor(
    private healthService: HealthService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadHealthStatus();
  }

  private loadUserInfo(): void {
    if (this.authService.isLoggedIn()) {
      this.username = this.authService.getUsername();
      this.userRoles = this.authService.getUserRoles();
    }
  }

  private loadHealthStatus(): void {
    this.healthService.getHealthStatus().subscribe({
      next: (status) => {
        this.healthStatus = status;
        this.healthError = null;
      },
      error: (error) => {
        this.healthError = 'Error al conectar con el backend';
        console.error('Health check error:', error);
      }
    });
  }

  refreshHealthStatus(): void {
    this.loadHealthStatus();
  }
}
