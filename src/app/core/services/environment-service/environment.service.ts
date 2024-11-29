import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private static readonly ERROR_MESSAGE_FORMAT =
    "Environment variable '{variableName}' is not defined";

  validateEnvironmentVariable(variable: any, variableName: string): void {
    if (variable === undefined || variable === null) {
      throw new Error(
        EnvironmentService.ERROR_MESSAGE_FORMAT.replace(
          '{variableName}',
          variableName,
        ),
      );
    }
  }

  get isProduction(): boolean {
    this.validateEnvironmentVariable(environment.production, 'production');
    return environment.production;
  }

  get galleryApiUrl(): string {
    this.validateEnvironmentVariable(
      environment.galleryApiUrl,
      'galleryApiUrl',
    );
    return environment.galleryApiUrl;
  }
}
