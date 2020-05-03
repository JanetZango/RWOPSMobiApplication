import { Injectable } from '@angular/core';

import { environment } from '../../app/environments/environment';

export let apiUrl = environment.apiUrl;
export let buildVersion = environment.buildVesion;

@Injectable()
export class ConfigService {

  private _apiUrl = apiUrl;

  private _buildVersion = buildVersion;

  constructor() {}

  get apiUrl(): string {
    return this._apiUrl;
  }

  get buildVersion(): string {
    return this._buildVersion;
  }
}
