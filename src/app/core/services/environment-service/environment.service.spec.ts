import { TestBed } from '@angular/core/testing';
import { EnvironmentService } from './environment.service';
import { environment } from '@env/environment';

describe('EnvironmentService', () => {
  let service: EnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvironmentService],
    });
    service = TestBed.inject(EnvironmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('galleryApiUrl', () => {
    beforeEach(() => {
      environment.galleryApiUrl = 'https://mock-api.example.com/gallery';
    });
    it('should return the correct galleryApiUrl value', () => {
      expect(service.galleryApiUrl).toEqual(
        'https://mock-api.example.com/gallery',
      );
    });
  });

  describe('ensureDefined', () => {
    it('should throw an error when variable is undefined', () => {
      expect(() =>
        service.validateEnvironmentVariable(undefined, 'TEST_VAR'),
      ).toThrowError("Environment variable 'TEST_VAR' is not defined");
    });

    it('should throw an error when variable is null', () => {
      expect(() =>
        service.validateEnvironmentVariable(null, 'TEST_VAR'),
      ).toThrowError("Environment variable 'TEST_VAR' is not defined");
    });

    it('should not throw an error when variable is defined', () => {
      expect(() =>
        service.validateEnvironmentVariable('defined', 'TEST_VAR'),
      ).not.toThrow();
      expect(() =>
        service.validateEnvironmentVariable(0, 'TEST_VAR'),
      ).not.toThrow();
      expect(() =>
        service.validateEnvironmentVariable(false, 'TEST_VAR'),
      ).not.toThrow();
      expect(() =>
        service.validateEnvironmentVariable([], 'TEST_VAR'),
      ).not.toThrow();
    });
  });

  describe('isProduction', () => {
    it('should return true when production is defined as true', () => {
      environment.production = true;
      expect(service.isProduction).toBeTrue();
    });
    it('should return false when production is defined as false', () => {
      environment.production = false;
      expect(service.isProduction).toBeFalse();
    });
    it('should throw an error when production is undefined or null', () => {
      environment.production = undefined!;
      expect(() => service.isProduction).toThrowError(
        "Environment variable 'production' is not defined",
      );
    });
  });
});
