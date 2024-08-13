import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Action } from '../../pages/models/action';
import { Observable } from 'rxjs';
import { Profil } from '../../pages/models/profil';
import { ResponseMessage } from '../../referentiel/models/response-message';

@Injectable({
  providedIn: 'root'
})
export class ProfilageService {

  baseUrl_1 = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllActions(): Observable<Action[]> {
    return this.http.get<Action[]>(`${this.baseUrl_1}/action/list`);
  }

  getAction(id: number): Observable<Action> {
    return this.http.get<Action>(`${this.baseUrl_1}/action/${id}`);
  }

  createAction(info: Action) {
    return this.http.post<void>(`${this.baseUrl_1}/action/save`, info);
  }

  updateAction(id: number, value: Action) {
    return this.http.put<void>(`${this.baseUrl_1}/action/edit/${id}`, value);
  }

  deleteAction(id?: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/action/delete/${id}`);
  }

  /**************   Profil *****************/

  getAllProfils(): Observable<Profil[]> {
    return this.http.get<Profil[]>(`${this.baseUrl_1}/profil/list`);
  }

  getProfil(id: number): Observable<Profil> {
    return this.http.get<Profil>(`${this.baseUrl_1}/profil/${id}`);
  }

  createProfil(info: Profil) {
    return this.http.post<ResponseMessage>(`${this.baseUrl_1}/profil/save`, info);
  }

  updateProfil(id: number, value: Profil): Observable<Profil> {
    return this.http.put<Profil>(`${this.baseUrl_1}/profil/edit/${id}`, value);
  }

  deleteProfil(id?: number): Observable<any> {
    return this.http.delete(`${this.baseUrl_1}/profil/delete/${id}`);
  }
}
