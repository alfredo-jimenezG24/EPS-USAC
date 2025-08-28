import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { KeycloakService } from 'keycloak-angular';

describe('AuthService', () => {
  let service: AuthService;
  let keycloakServiceSpy: jasmine.SpyObj<KeycloakService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('KeycloakService', [
      'login',
      'logout',
      'isLoggedIn',
      'getUserRoles',
      'isUserInRole',
      'getUsername',
      'loadUserProfile'
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: KeycloakService, useValue: spy }
      ]
    });
    
    service = TestBed.inject(AuthService);
    keycloakServiceSpy = TestBed.inject(KeycloakService) as jasmine.SpyObj<KeycloakService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if user is logged in', () => {
    keycloakServiceSpy.isLoggedIn.and.returnValue(true);
    expect(service.isLoggedIn()).toBe(true);
    expect(keycloakServiceSpy.isLoggedIn).toHaveBeenCalled();
  });

  it('should get user roles', () => {
    const mockRoles = ['ADMIN', 'TECNICO'];
    keycloakServiceSpy.getUserRoles.and.returnValue(mockRoles);
    expect(service.getUserRoles()).toEqual(mockRoles);
    expect(keycloakServiceSpy.getUserRoles).toHaveBeenCalled();
  });

  it('should check if user has role', () => {
    keycloakServiceSpy.isUserInRole.and.returnValue(true);
    expect(service.hasRole('ADMIN')).toBe(true);
    expect(keycloakServiceSpy.isUserInRole).toHaveBeenCalledWith('ADMIN');
  });
});