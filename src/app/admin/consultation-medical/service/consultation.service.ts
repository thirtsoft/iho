import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConsultationMedical } from '../models/consultation-medical';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../../referentiel/models/response-message';
import { ConsultationMedicalListe } from '../models/consultation-medical-liste';
import { ConsultationMedicalDetails } from '../models/consultation-medical-details';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  baseUrl_1 = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


  /**************** Consultation ****/

  getAllConsultationMedicals(): Observable<ConsultationMedicalListe[]> {
    return this.http.get<ConsultationMedicalListe[]>(`${this.baseUrl_1}/consultation/list`);
  }

  getConsultationMedicalsByCritère(search: ConsultationMedical): Observable<ConsultationMedicalListe[]> {
    return this.http.post<ConsultationMedicalListe[]>(`${this.baseUrl_1}/consultation/searchBy`, search);
  }

  getAllConsultationMedicalsOrderDesc(): Observable<ConsultationMedical[]> {
    return this.http.get<ConsultationMedical[]>(`${this.baseUrl_1}/consultation/list`);
  }

  getConsultationMedicalsByPatientCode(code?: string): Observable<ConsultationMedical[]> {
    return this.http.get<ConsultationMedical[]>(`${this.baseUrl_1}/consultation/detail/patient/${code}`);
  }

  getConsultationMedicalById(id: number): Observable<ConsultationMedical> {
    return this.http.get<ConsultationMedical>(`${this.baseUrl_1}/consultation/${id}`);
  }

  getConsultationMedicalDetails(id: number): Observable<ConsultationMedicalDetails> {
    return this.http.get<ConsultationMedicalDetails>(`${this.baseUrl_1}/consultation/${id}`);
  }

  createConsultationMedical(info: ConsultationMedical) {
    return this.http.post<ResponseMessage>(`${this.baseUrl_1}/consultation/save`, info);
  }

  updateConsultationMedical(id?: number, value?: ConsultationMedical) {
    return this.http.put<ResponseMessage>(`${this.baseUrl_1}/consultation/edit/${id}`, value);
  }

  deleteConsultationMedical(id?: number) {
    return this.http.delete<ResponseMessage>(`${this.baseUrl_1}/consultation/delete/${id}`);
  }


}