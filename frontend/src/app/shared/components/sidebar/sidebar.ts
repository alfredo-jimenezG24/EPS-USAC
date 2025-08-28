import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
  roles: string[];
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠', roles: [] },
    { path: '/equipos', label: 'Equipos', icon: '🔧', roles: ['ADMIN', 'TECNICO'] },
    { path: '/mantenimientos', label: 'Mantenimientos', icon: '⚙️', roles: ['ADMIN', 'TECNICO'] },
    { path: '/tickets', label: 'Tickets', icon: '🎫', roles: ['ADMIN', 'TECNICO', 'PROVEEDOR'] },
    { path: '/contratos', label: 'Contratos', icon: '📄', roles: ['ADMIN'] },
    { path: '/reportes', label: 'Reportes', icon: '📊', roles: ['ADMIN', 'CONSULTA'] },
    { path: '/alertas', label: 'Alertas', icon: '🚨', roles: ['ADMIN', 'TECNICO'] }
  ];

  visibleMenuItems: MenuItem[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.filterMenuItemsByRole();
  }

  private filterMenuItemsByRole(): void {
    if (!this.authService.isLoggedIn()) {
      this.visibleMenuItems = [];
      return;
    }

    this.visibleMenuItems = this.menuItems.filter(item => {
      if (item.roles.length === 0) return true; // Dashboard visible for all
      return item.roles.some(role => this.authService.hasRole(role));
    });
  }
}
