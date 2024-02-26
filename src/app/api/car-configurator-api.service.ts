import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModelOptions, CarModel } from '@types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarConfiguratorApiService {
  private http: HttpClient = inject(HttpClient);

  public getAllModels(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>('/models');
  }

  public getModelOptions(modelId: string): Observable<ModelOptions> {
    return this.http.get<ModelOptions>(`/options/${modelId}`);
  }
}
