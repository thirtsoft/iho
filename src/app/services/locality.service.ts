import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Locality } from '../models/locality';

@Injectable({
  providedIn: 'root'
})
export class LocalityService {

  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getLocaliteDTOs(): Observable<Locality[]> {
    return this.http.get<Locality[]>(`${this.apiServerUrl}/addresses/all`);
  }

  public getLocaliteDTOOrderByIdDesc(): Observable<Locality[]> {
    return this.http.get<Locality[]>(`${this.apiServerUrl}/addresses/searchAddressOrderByIdDesc`);
  }

  public getLocalityDTOById(locId: number): Observable<Locality> {
    return this.http.get<Locality>(`${this.apiServerUrl}/addresses/findById/${locId}`);
  }

  public addLocalityDTO(localityDTO: Locality): Observable<Locality> {
    return this.http.post<Locality>(`${this.apiServerUrl}/addresses/create`, localityDTO);
  }

  public updateLocalityDTO(locId: number, localityDTO: Locality): Observable<Locality> {
    return this.http.put<Locality>(`${this.apiServerUrl}/addresses/update/${locId}`, localityDTO);
  }

  public deleteLocalityDTO(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/addresses/delete/${noteId}`);
  }
}
