import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tarif } from '../models/tarif';

@Injectable({
  providedIn: 'root'
})
export class TarifService {

  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getTarifss(): Observable<Tarif[]> {
    return this.http.get<Tarif[]>(`${this.apiServerUrl}/tarifs/all`);
  }

  public getTarifsById(chauffId: number): Observable<Tarif> {
    return this.http.get<Tarif>(`${this.apiServerUrl}/tarifs/findById/${chauffId}`);
  }

  public addTarifs(Tarif: Tarif): Observable<Tarif> {
    return this.http.post<Tarif>(`${this.apiServerUrl}/tarifs/create`, Tarif);
  }

  public updateTarifs(tarifId: number, Tarif: Tarif): Observable<Tarif> {
    return this.http.put<Tarif>(`${this.apiServerUrl}/tarifs/update/${tarifId}`, Tarif);
  }

  public deleteTarifs(tarifId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tarifs/delete/${tarifId}`);
  }

  public getListTarifsByPageable(page: number, size: number): Observable<Tarif[]> {
    const searchUrl = (this.apiServerUrl+"/tarifs/searchChauffeurByPageables?page="+page+"&size="+size);
    return this.http.get<Tarif[]>(searchUrl);
  }

  public getListTarifsByKeyword(keyword: string): Observable<Tarif[]> {
    return this.http.get<Tarif[]>(`${this.apiServerUrl}/tarifs/searchTarifByKeyword?reference=`+keyword);
  }

  public getListTarifsByAnnoncePageable(annonceId: number, page: number, size: number): Observable<Tarif[]> {
    const searchUrl = (this.apiServerUrl+"/tarifs/searchTarifByAnnoncePageables?id="+annonceId+"&page="+page+"&size="+size);
    console.log("Search Url---", searchUrl);
    return this.http.get<Tarif[]>(searchUrl);
  }

  public getListTarifsByAnnonce(pId: number): Observable<Tarif[]> {
    return this.http.get<Tarif[]>(`${this.apiServerUrl}/tarifs/searchTarifsByAnnonce/${pId}`);
  }

}
