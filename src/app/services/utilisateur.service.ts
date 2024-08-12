import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  public apiServerUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';
  dataForm:  FormGroup;
  formData:  FormGroup;
  listData: Utilisateur;


  constructor(private http: HttpClient) {
  }
  
  /*********************** Utilisateur ********************/

  public getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiServerUrl}/utilisateurs/all`);
  }

  public getAllUtilisateursOrderByIdDesc(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiServerUrl}/utilisateurs/searchAllUtilisateurOrderByIdDesc`);
  }

  public getAllNewsUtilisateursOrderByIdDesc(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.apiServerUrl}/utilisateurs/searchAllNewsRecruteursOrderByIdDesc`);
  }

  public getUtilisateurById(userId: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiServerUrl}/utilisateurs/findById/${userId}`);
  }

  public addUtilisateur(Utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.apiServerUrl}/utilisateurs/create`, Utilisateur);
  }

  public updateUtilisateur(utilisateurId: number, Utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiServerUrl}/utilisateurs/update/${utilisateurId}`, Utilisateur);
  }

  public activatedUser(id: number, isActive: boolean): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"isActive":isActive};
    return this.http.patch(`${this.apiServerUrl}/utilisateurs/activatedUser/`+id+'?isActive='+data.isActive, {headers: headers});
  }

  public getUserAvatar(id: number){
    return this.http.get(`${this.apiServerUrl}/utilisateurs/avatar/`+ id);
  }

  public uploadPhotoUtilisateur(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.apiServerUrl+'/utilisateurs/uploadUserPhoto/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public deleteUtilisateur(utilisateurId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/utilisateurs/delete/${utilisateurId}`);
  }

}
