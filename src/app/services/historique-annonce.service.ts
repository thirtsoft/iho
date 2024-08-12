import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HistoriqueAnnonce } from '../models/historique-annonce';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueAnnonceService {

  public apiServerUrl = environment.apiBaseUrl;

  //public apiServerUrl = "https://server-chauffeur.herokuapp.com/sen-historiqueAnnonces/v1";

  constructor(private http: HttpClient) {
  }

  /*************************** HistoriqueAnnonce ********************/
  public getHistoriqueAnnonces(): Observable<HistoriqueAnnonce[]> {
    return this.http.get<HistoriqueAnnonce[]>(`${this.apiServerUrl}/historiqueAnnonces/all`);
  }

  public getHistoriqueAnnoncesOrderByIdDesc(): Observable<HistoriqueAnnonce[]> {
    return this.http.get<HistoriqueAnnonce[]>(`${this.apiServerUrl}/historiqueAnnonces/searchHistoriqueAnnonceByIdDesc`);
  }

  public getHistoriqueAnnonceById(idHistoriqueAnnonce: number): Observable<HistoriqueAnnonce> {
    return this.http.get<HistoriqueAnnonce>(`${this.apiServerUrl}/historiqueAnnonces/findById/${idHistoriqueAnnonce}`);
  }

  public addHistoriqueAnnonce(HistoriqueAnnonce: HistoriqueAnnonce): Observable<HistoriqueAnnonce> {
    return this.http.post<HistoriqueAnnonce>(`${this.apiServerUrl}/historiqueAnnonces/create`, HistoriqueAnnonce);
  }

  public updateHistoriqueAnnonce(idHistoriqueAnnonce: number, HistoriqueAnnonce: HistoriqueAnnonce): Observable<HistoriqueAnnonce> {
    return this.http.put<HistoriqueAnnonce>(`${this.apiServerUrl}/historiqueAnnonces/update/${idHistoriqueAnnonce}`, HistoriqueAnnonce);
  }

  public deleteHistoriqueAnnonce(idHistoriqueAnnonce: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/historiqueAnnonces/delete/${idHistoriqueAnnonce}`);
  }

  public countNumberOfhistoriqueAnnonces(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/historiqueAnnonces/NumbersOfhistoriqueAnnonces`);
  }

}
