import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospitalisation } from '../models/hospitalisation';
import { ObservationClinique } from '../models/observation-clinique';
import { ExamenComplementaire } from '../models/examen-complementaire';
import { TraitementMedical } from '../models/traitement-medical';
import { Synthese } from '../models/synthese';
import { Discussion } from '../models/discussion';
import TransferePayload from '../models/transfere-payload';

@Injectable({
  providedIn: 'root'
})
export class HospitalisationService {

  baseUrl_1 = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


  /**************** hospitalisation ****/

  getAllHospitalisations(): Observable<Hospitalisation[]> {
    return this.http.get<Hospitalisation[]>(`${this.baseUrl_1}/hospitalisation/list`);
  }

  getAllHospitalisationsOrderDesc(): Observable<Hospitalisation[]> {
    return this.http.get<Hospitalisation[]>(`${this.baseUrl_1}/hospitalisation/list`);
  }

  getHospitalisationsByPatientCode(code?: string): Observable<Hospitalisation[]> {
    return this.http.get<Hospitalisation[]>(`${this.baseUrl_1}/hospitalisation/detail/patient/${code}`);
  }

  getHospitalisationById(id: number): Observable<Hospitalisation> {
    return this.http.get<Hospitalisation>(`${this.baseUrl_1}/hospitalisation/${id}`);
  }

  createHospitalisation(info: Hospitalisation): Observable<Hospitalisation> {
    return this.http.post<Hospitalisation>(`${this.baseUrl_1}/hospitalisation/save`, info);
  }

  updateHospitalisation(id?: number, value?: Hospitalisation) {
    return this.http.put<number>(`${this.baseUrl_1}/hospitalisation/edit/${id}`, value);
  }

  deleteHospitalisation(id?: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/hospitalisation/delete/${id}`);
  }

  uploadBiologicFile(examId: number, formData: FormData) {
    return this.http.put<boolean>(`${this.baseUrl_1}/hospitalisation/exam-complementaire/${examId}/add-hospitalisation-biologic-file`, formData);    
  }

  uploadImmunologieFile(examId: number, formData: FormData) {
    return this.http.put<boolean>(`${this.baseUrl_1}/hospitalisation/exam-complementaire/${examId}/add-hospitalisation-immunologic-file`, formData);    
  }

  uploadImagerieFile(examId: number, formData: FormData) {
    return this.http.put<boolean>(`${this.baseUrl_1}/hospitalisation/exam-complementaire/${examId}/add-hospitalisation-imager-file`, formData);    
  }

  uploadAnatomologieFile(examId: number, formData: FormData) {
    return this.http.put<boolean>(`${this.baseUrl_1}/hospitalisation/exam-complementaire/${examId}/add-hospitalisation-hematologic-file`, formData);    
  }

  transfererHospitalisation(hospitalisationId?: number, value?: TransferePayload) {
    return this.http.put<boolean>(`${this.baseUrl_1}/hospitalisation/transferer/${hospitalisationId}`, value);
  }

  cloturerHospitalisation(id: number, libelle: string): Observable<boolean> {
    const coupletDto = { id: id, libelle: libelle };
    return this.http.post<boolean>(this.baseUrl_1 + '/hospitalisation', coupletDto);
  }

 
  /**************** Observation clinique ****/

  getAllObservationCliniques(): Observable<ObservationClinique[]> {
    return this.http.get<ObservationClinique[]>(`${this.baseUrl_1}/observationclinique/list`);
  }

  getAllObservationCliniqueByPatients(code?: string): Observable<ObservationClinique[]> {
    return this.http.get<ObservationClinique[]>(`${this.baseUrl_1}/observationclinique/by-patient/${code}`);
  }

  getObservationCliniqueById(id: number): Observable<ObservationClinique> {
    return this.http.get<ObservationClinique>(`${this.baseUrl_1}/observationclinique/${id}`);
  }

  getObservationCliniqueByPatient(codePatient: string): Observable<ObservationClinique> {
    return this.http.get<ObservationClinique>(`${this.baseUrl_1}/observationclinique/patient/${codePatient}`);
  }

  createObservationClinique(info: ObservationClinique): Observable<ObservationClinique> {
    return this.http.post<ObservationClinique>(`${this.baseUrl_1}/observationclinique/save`, info);
  }

  updateObservationClinique(id?: number, value?: ObservationClinique): Observable<ObservationClinique> {
    return this.http.put<ObservationClinique>(`${this.baseUrl_1}/observationclinique/edit/${id}`, value);
  }

  deleteObservationClinique(id?: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/observationclinique/delete/${id}`);
  }

  /**************** ExamenComplementaire ****/

  getAllExamenComplementaires(): Observable<ExamenComplementaire[]> {
    return this.http.get<ExamenComplementaire[]>(`${this.baseUrl_1}/examencomplementaire/list`);
  }

  getAllExamenComplementaireByPatients(code?: string): Observable<ExamenComplementaire[]> {
    return this.http.get<ExamenComplementaire[]>(`${this.baseUrl_1}/examencomplementaire/by-patient/${code}`);
  }

  getAllExamenComplementairesOrderDesc(): Observable<ExamenComplementaire[]> {
    return this.http.get<ExamenComplementaire[]>(`${this.baseUrl_1}/examencomplementaire/list`);
  }

  getExamenComplementaireById(id: number): Observable<ExamenComplementaire> {
    return this.http.get<ExamenComplementaire>(`${this.baseUrl_1}/examencomplementaire/${id}`);
  }

  createExamenComplementaire(info: ExamenComplementaire): Observable<ExamenComplementaire> {
    return this.http.post<ExamenComplementaire>(`${this.baseUrl_1}/examencomplementaire/save`, info);
  }

  updateExamenComplementaire(id?: number, value?: ExamenComplementaire): Observable<ExamenComplementaire> {
    return this.http.put<ExamenComplementaire>(`${this.baseUrl_1}/examencomplementaire/edit/${id}`, value);
  }

  deleteExamenComplementaire(id?: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/examencomplementaire/delete/${id}`);
  }

  /**************** Traitement ****/

  getAllTraitementMedicals(): Observable<TraitementMedical[]> {
    return this.http.get<TraitementMedical[]>(`${this.baseUrl_1}/traitementmedical/list`);
  }

  getAllTraitementMedicalsByPatient(code?: string): Observable<TraitementMedical[]> {
    return this.http.get<TraitementMedical[]>(`${this.baseUrl_1}/traitementmedical/by-patient/${code}`);
  }

  getTraitementMedicalById(id: number): Observable<TraitementMedical> {
    return this.http.get<TraitementMedical>(`${this.baseUrl_1}/traitementmedical/${id}`);
  }

  createTraitementMedical(info: TraitementMedical): Observable<TraitementMedical> {
    return this.http.post<TraitementMedical>(`${this.baseUrl_1}/traitementmedical/save`, info);
  }

  updateTraitementMedical(id?: number, value?: TraitementMedical): Observable<TraitementMedical> {
    return this.http.put<TraitementMedical>(`${this.baseUrl_1}/traitementmedical/edit/${id}`, value);
  }

  deleteTraitementMedical(id?: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/traitementmedical/delete/${id}`);
  }

  uploadProtocoleTraitementFile(medicalTraitId: number, formData: FormData) {
    return this.http.put<boolean>(`${this.baseUrl_1}/hospitalisation/protocol/${medicalTraitId}/add-protocol-file`, formData);    
  }

  /**************** Synthese ****/

  getAllSyntheses(): Observable<Synthese[]> {
    return this.http.get<Synthese[]>(`${this.baseUrl_1}/synthese/list`);
  }

  getAllSynthesesByPatient(code?: string): Observable<Synthese[]> {
    return this.http.get<Synthese[]>(`${this.baseUrl_1}/synthese/by-patient/${code}`);
  }

  getAllSynthesesOrderDesc(): Observable<Synthese[]> {
    return this.http.get<Synthese[]>(`${this.baseUrl_1}/synthese/list`);
  }

  getSyntheseById(id: number): Observable<Synthese> {
    return this.http.get<Synthese>(`${this.baseUrl_1}/synthese/${id}`);
  }

  createSynthese(info: Synthese): Observable<Synthese> {
    return this.http.post<Synthese>(`${this.baseUrl_1}/synthese/save`, info);
  }

  updateSynthese(id?: number, value?: Synthese): Observable<Synthese> {
    return this.http.put<Synthese>(`${this.baseUrl_1}/synthese/edit/${id}`, value);
  }

  deleteSynthese(id?: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/synthese/delete/${id}`);
  }


   /**************** Discussion ****/

   getAllDiscussions(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.baseUrl_1}/discussion/list`);
  }

  getAllDiscussionsByPatients(code?: string): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.baseUrl_1}/discussion/by-patient/${code}`);
  }

  getDiscussionById(id: number): Observable<Discussion> {
    return this.http.get<Discussion>(`${this.baseUrl_1}/discussion/${id}`);
  }

  createDiscussion(info: Discussion): Observable<Discussion> {
    return this.http.post<Discussion>(`${this.baseUrl_1}/discussion/save`, info);
  }

  updateDiscussion(id?: number, value?: Discussion): Observable<Discussion> {
    return this.http.put<Discussion>(`${this.baseUrl_1}/discussion/edit/${id}`, value);
  }

  deleteDiscussion(id?: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/discussion/delete/${id}`);
  }
}
