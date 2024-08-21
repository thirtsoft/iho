import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl_1 = environment.apiBaseUrl;
  
  constructor(private http: HttpClient) { }

  getNumberOfPatient() {
    return this.http.get<number>(`${this.baseUrl_1}/patient/count-number-patient`);
  }

  getNombreHospitalisationHomme() {
    return this.http.get<number>(`${this.baseUrl_1}/hospitalisation/nombrehomme`);
  }

  getNombreHospitalisationFemme() {
    return this.http.get<number>(`${this.baseUrl_1}/hospitalisation/nombrefemme`);
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
