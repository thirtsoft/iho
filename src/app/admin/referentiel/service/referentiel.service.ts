import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategorieMedicament } from '../models/categorie-medicament';
import { ResponseMessage } from '../models/response-message';
import { Medicament } from '../models/medicament';
import { Chambre } from '../models/chambre';
import { Lit } from '../models/lit';
import { GroupeSanguin } from '../models/groupe-sanguin';
import { ServicesPartenaire } from '../models/services-partenaire';
import { TrancheAge } from '../models/tranche-age';

@Injectable({
  providedIn: 'root'
})
export class ReferentielService {

  baseUrl_1 = environment.apiBaseUrl;
  referentiel = this.baseUrl_1 + '/referentiel';

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getAllCategoriesMedicaments(): Observable<CategorieMedicament[]> {
    console.log('getAllCategoriesMedic', this.http);
    console.log('referentiel', this.referentiel);
    return this.http.get<CategorieMedicament[]>(`${this.referentiel}/categorymedicament/list`, this.httpOptions);
  }

  getCategorieMedicament(id: number): Observable<CategorieMedicament> {
    return this.http.get<CategorieMedicament>(`${this.referentiel}/categorymedicament/${id}`);
  }

  createCategorieMedicament(info: CategorieMedicament) {
    return this.http.post<ResponseMessage>(`${this.referentiel}/categorymedicament/save`, info);
  }

  updateCategorieMedicament(id: number, value: CategorieMedicament) {
    return this.http.put<ResponseMessage>(`${this.referentiel}/categorymedicament/edit/${id}`, value);
  }

  deleteCategorieMedicament(id?: number): Observable<any> {
    return this.http.delete(`${this.referentiel}/categorymedicament/delete/${id}`);
  }

  /**************** Médicament  ****************/

  getAllMedicaments(): Observable<Medicament[]> {
    return this.http.get<Medicament[]>(`${this.referentiel}/medicament/list`);
  }

  getAllMedicamentsOrderDesc(): Observable<Medicament[]> {
    return this.http.get<Medicament[]>(`${this.referentiel}/medicament/list`);
  }

  getMedicament(id: number): Observable<Medicament> {
    return this.http.get<Medicament>(`${this.referentiel}/medicament/${id}`);
  }

  createMedicament(info: Medicament) {
    return this.http.post<ResponseMessage>(`${this.referentiel}/medicament/save`, info);
  }

  updateMedicament(id: number, value: Medicament) {
    return this.http.put<ResponseMessage>(`${this.referentiel}/medicament/edit/${id}`, value);
  }

  deleteMedicament(id?: number): Observable<any> {
    return this.http.delete(`${this.referentiel}/medicament/delete/${id}`);
  }

  /**************** Chambre  ****************/

  getAllChambres(): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(`${this.referentiel}/chambre/list`);
  }

  getChambre(id: number): Observable<Chambre> {
    return this.http.get<Chambre>(`${this.referentiel}/chambre/${id}`);
  }

  createChambre(info: Chambre) {
    return this.http.post<ResponseMessage>(`${this.referentiel}/chambre/save`, info);
  }

  updateChambre(id: number, value: Chambre) {
    return this.http.put<ResponseMessage>(`${this.referentiel}/chambre/edit/${id}`, value);
  }

  deleteChambre(id?: number): Observable<any> {
    return this.http.delete(`${this.referentiel}/chambre/delete/${id}`);
  }

  /**************** Lit  ****************/

  getAllLits(): Observable<Lit[]> {
    return this.http.get<Lit[]>(`${this.referentiel}/lit/list`);
  }

  getLit(id: number): Observable<Lit> {
    return this.http.get<Lit>(`${this.referentiel}/lit/${id}`);
  }

  createLit(info: Lit) {
    return this.http.post<ResponseMessage>(`${this.referentiel}/lit/save`, info);
  }

  updateLit(id: number, value: Lit) {
    return this.http.put<ResponseMessage>(`${this.referentiel}/lit/edit/${id}`, value);
  }

  deleteLit(id?: number): Observable<any> {
    return this.http.delete(`${this.referentiel}/lit/delete/${id}`);
  }

  getAllLitByChambre(chambreId: number): Observable<Lit[]> {
    return this.http.get<Lit[]>(`${this.referentiel}/lit/by-chambre/${chambreId}`);
  }

  /**************** GroupeSanguin  ****************/

  getAllGroupeSanguins(): Observable<GroupeSanguin[]> {
    return this.http.get<GroupeSanguin[]>(`${this.referentiel}/groupesanguin/list`);
  }

  getGroupeSanguin(id: number): Observable<GroupeSanguin> {
    return this.http.get<GroupeSanguin>(`${this.referentiel}/groupesanguin/${id}`);
  }

  createGroupeSanguin(info: Lit) {
    return this.http.post<ResponseMessage>(`${this.referentiel}/groupesanguin/save`, info);
  }

  updateGroupeSanguin(id: number, value: GroupeSanguin) {
    return this.http.put<ResponseMessage>(`${this.referentiel}/groupesanguin/edit/${id}`, value);
  }

  deleteGroupeSanguin(id?: number): Observable<any> {
    return this.http.delete(`${this.referentiel}/groupesanguin/delete/${id}`);
  }

  /**************** ServicePartenaire  ****************/

  getAllServicePartenaires(): Observable<ServicesPartenaire[]> {
    return this.http.get<ServicesPartenaire[]>(`${this.referentiel}/servicepartenaire/list`);
  }

  getServicePartenaire(id: number): Observable<ServicesPartenaire> {
    return this.http.get<ServicesPartenaire>(`${this.referentiel}/servicepartenaire/${id}`);
  }

  createServicePartenaire(info: ServicesPartenaire) {
    return this.http.post<ResponseMessage>(`${this.referentiel}/servicepartenaire/save`, info);
  }

  updateServicePartenaire(id: number, value: ServicesPartenaire) {
    return this.http.put<ResponseMessage>(`${this.referentiel}/servicepartenaire/edit/${id}`, value);
  }

  deleteServicePartenaire(id?: number): Observable<any> {
    return this.http.delete(`${this.referentiel}/servicepartenaire/delete/${id}`);
  }

  /**************** TrancheAge  ****************/

  getAllTrancheAges(): Observable<TrancheAge[]> {
    return this.http.get<TrancheAge[]>(`${this.referentiel}/trancheage/list`);
  }

  getTrancheAge(id: number): Observable<TrancheAge> {
    return this.http.get<TrancheAge>(`${this.referentiel}/trancheage/${id}`);
  }

  createTrancheAge(info: TrancheAge) {
    return this.http.post<ResponseMessage>(`${this.referentiel}/trancheage/save`, info);
  }

  updateTrancheAge(id: number, value: TrancheAge) {
    return this.http.put<ResponseMessage>(`${this.referentiel}/trancheage/edit/${id}`, value);
  }

  deleteTrancheAge(id?: number): Observable<any> {
    return this.http.delete(`${this.referentiel}/trancheage/delete/${id}`);
  }
}
