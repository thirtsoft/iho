import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CircuitPatient } from '../models/circuit-patient';
import { DetailCircuitPatient } from '../models/detail-circuit-patient';
import { CircuitByPatient } from '../models/circuit-by-patient';

@Injectable({
  providedIn: 'root'
})
export class CircuitPatientService {

  baseUrl_1 = environment.apiBaseUrl;

  constructor(private http: HttpClient,
           //   private refresh: RefreshDataService
  ) { }


  /**************** Circuit médical ****/

  getAllCircuitPatients(): Observable<CircuitPatient[]> {
    return this.http.get<CircuitPatient[]>(`${this.baseUrl_1}/circuitpatient/list`);
  }

  getAllCircuitsByPatients(code?: string): Observable<DetailCircuitPatient[]> {
    return this.http.get<DetailCircuitPatient[]>(`${this.baseUrl_1}/circuitpatient/by-patient/${code}`);
  }

  getCircuitPatientById(id: number): Observable<DetailCircuitPatient> {
    return this.http.get<DetailCircuitPatient>(`${this.baseUrl_1}/circuitpatient/${id}`);
  }

  getCircuitPatientByPatient(codePatient?: string): Observable<CircuitByPatient> {
    return this.http.get<CircuitByPatient>(`${this.baseUrl_1}/circuitpatient/patient/${codePatient}`);
  }

  createCircuitPatient(info: CircuitPatient): Observable<CircuitPatient> {
    return this.http.post<CircuitPatient>(`${this.baseUrl_1}/circuitpatient/save`, info);
  }

  updateCircuitPatient(id?: number, value?: CircuitPatient): Observable<CircuitPatient> {
    return this.http.put<CircuitPatient>(`${this.baseUrl_1}/circuitpatient/edit/${id}`, value);
  }

  deleteCircuitPatient(id?: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/circuitpatient/delete/${id}`);
  }
}
