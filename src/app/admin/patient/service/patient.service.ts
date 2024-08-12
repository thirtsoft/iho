import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../model/patient';
import { Observable } from 'rxjs';
import { ResponsePatient } from '../model/response-patient';
import { map } from 'rxjs/operators';
import { Diagnostic } from '../model/diagnostic';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseUrl_1 = environment.apiBaseUrl;
  
  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl_1}/patient/list`);
  }

  getAllPatientOrderByFirstName(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl_1}/patient/list/order`);
  }

  getAllPatientsOrderDesc(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl_1}/patient/list`);
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl_1}/patient/${id}`);
  }

  getPatientByIndex(index: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl_1}/patient/detail/${index}`);
  }

  createPatient(info: Patient) : Observable<ResponsePatient> {
    return this.http.post<ResponsePatient>(`${this.baseUrl_1}/patient/save`, info);
  }

  createDossierPatient(info: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.baseUrl_1}/patient/generated-dossier-patient`, info);
  }

  updatePatient(id: number, value: Patient): Observable<Patient> {
    return this.http.put<Patient> (`${this.baseUrl_1}/patient/edit/${id}`, value);
  }

  updatePatientByAdministration(id: number, value: Patient): Observable<Patient> {
    return this.http.put<Patient> (`${this.baseUrl_1}/patient/edit/by-administration/${id}`, value);
  }

  deletePatient(id: number) {
    return this.http.delete(`${this.baseUrl_1}/patient/delete/${id}`);
  }

  exporterPdfPatient(): Observable<Blob>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', responseType : 'blob'});
    return this.http.get<Blob>(`${this.baseUrl_1}/patient/export-pdf`,  { headers : headers,responseType: 'blob' as 'json'});
  }

  exporterExcelPatient(): Observable<Blob> {
    return this.http
      .get(`${this.baseUrl_1}/patient/export-csv`, {
        observe: 'response',
        responseType: 'blob',
      })
      .pipe(map((response:any) => response.body!));
  }

  createDiagnostic(info: Diagnostic): Observable<Diagnostic> {
    return this.http.post<Diagnostic>(`${this.baseUrl_1}/diagnostic/save`, info);
  }

  getNumberOfPatient() {
    return this.http.get<number>(`${this.baseUrl_1}/patient/count-number-patient`);
  }

  getNumberPassageOfPatient(code: string) {
    return this.http.get<number>(`${this.baseUrl_1}/patient/count-number-passage-patient/${code}`);
  }

  getNumberConsultationMedicalByPatient(code: string) {
    return this.http.get<number>(`${this.baseUrl_1}/patient/number-consultation-patient/${code}`);
  }

  getNumberHospitalisationByPatient(code: string) {
    return this.http.get<number>(`${this.baseUrl_1}/patient/number-hospitalisation-patient/${code}`);
  }
}
