import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloakService: KeycloakService) {}

  async login(): Promise<void> {
    await this.keycloakService.login();
  }

  logout(): void {
    this.keycloakService.logout();
  }

  isLoggedIn(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  getUserRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  hasRole(role: string): boolean {
    return this.keycloakService.isUserInRole(role);
  }

  getUsername(): string {
    return this.keycloakService.getUsername();
  }

  getUserInfo(): any {
    return this.keycloakService.loadUserProfile();
  }
}