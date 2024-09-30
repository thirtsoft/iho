import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Action } from '../models/action';
import { Observable } from 'rxjs';
import { Profil } from '../models/profil';
import { Utilisateur } from '../models/utilisateur';
import { ResponseMessage } from '../../referentiel/models/response-message';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  baseUrl_1 = environment.apiBaseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private http: HttpClient) { }

  getAllActions(): Observable<Action[]> {
    return this.http.get<Action[]>(`${this.baseUrl_1}/action/list`);
  }

  getActions(userId: number): Observable<Action[]>{
    return this.http.get<Action[]>(`${this.baseUrl_1 }/action/users/${userId}/actions`, this.httpOptions);
  }

  getAllActionsOrderDesc(): Observable<Action[]> {
    return this.http.get<Action[]>(`${this.baseUrl_1}/action/list`);
  }

  getActionById(id: number): Observable<Action> {
    return this.http.get<Action>(`${this.baseUrl_1}/action/byid/${id}`);
  }

  createAction(info: Action): Observable<Action> {
    return this.http.post<Action>(`${this.baseUrl_1}/action/save`, info);
  }

  updateAction(id: number, value: Action): Observable<Action> {
    return this.http.put<Action> (`${this.baseUrl_1}/action/edit/${id}`, value);
  }

  deleteAction(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/action/delete/${id}`);
  }

  /************* Profil  ***** */
  getAllProfils(): Observable<Profil[]> {
    return this.http.get<Profil[]>(`${this.baseUrl_1}/profil/list`);
  }

  getProfilById(id: number): Observable<Profil> {
    return this.http.get<Profil>(`${this.baseUrl_1}/profil/${id}`);
  }

  createProfil(info: Action) {
    return this.http.post(`${this.baseUrl_1}/profil/save`, info);
  }

  updateProfil(id: number, value: Profil): Observable<Profil> {
    return this.http.put<Profil> (`${this.baseUrl_1}/profil/edit/${id}`, value);
  }

  deleteProfil(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/profil/delete/${id}`);
  }

  /************* Utilisateur - Agent  ***** */
  getAllUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl_1}/utilisateur/list`);
  }

  getAllMedecins(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl_1}/utilisateur/medecins`);
  }

  getUtilisateurProfil(userId: number): Observable<Utilisateur>{
    return this.http.get<Utilisateur>(this.baseUrl_1 + `/utilisateur/monprofil/${userId}`,this.httpOptions);
  }

  createAgent(info: Utilisateur) {
    return this.http.post(`${this.baseUrl_1}/utilisateur/save`, info);
  }

  saveAgent(info: Utilisateur) {
    return this.http.post<ResponseMessage>(`${this.baseUrl_1}/utilisateur/saveagent`, info);
  }

  editAgent(info: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseUrl_1}/utilisateur/save`, info);
  }

  updateUtilisateur(id: number, value: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur> (`${this.baseUrl_1}/utilisateur/edit/${id}`, value);
  }

  deleteUtilisateur(email?: string): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/utilisateur/delete/${email}`);
  }

  activatedAccount(matricule?: string): Observable<any> {
    return this.http.get(`${this.baseUrl_1}/utilisateur/activated/${matricule}`);
  }

  deactivatedAccount(matricule?: string): Observable<any> {
    return this.http.get(`${this.baseUrl_1}/utilisateur/deactivated/${matricule}`);
  }

}
