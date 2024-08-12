import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeAnnonce } from '../models/type-annonce';

@Injectable({
  providedIn: 'root'
})
export class TypeAnnonceService {

  public apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getTypeTypeAnnonces(): Observable<TypeAnnonce[]> {
    return this.http.get<TypeAnnonce[]>(`${this.apiServerUrl}/typeAnnonces/all`);
  }

  public getTypeTypeAnnonceOrderByIdDesc(): Observable<TypeAnnonce[]> {
    return this.http.get<TypeAnnonce[]>(`${this.apiServerUrl}/typeAnnonces/searchAllTypeAnnoncesOrderByIdDesc`);
  }

  public getTypeAnnonceById(chauffId: number): Observable<TypeAnnonce> {
    return this.http.get<TypeAnnonce>(`${this.apiServerUrl}/typeAnnonces/findById/${chauffId}`);
  }

  public addTypeAnnonces(typeAnnonce: TypeAnnonce): Observable<TypeAnnonce> {
    return this.http.post<TypeAnnonce>(`${this.apiServerUrl}/typeAnnonces/create`, typeAnnonce);
  }

  public updateTypeAnnonces(typeAnId: number, typeAnnonce: TypeAnnonce): Observable<TypeAnnonce> {
    return this.http.put<TypeAnnonce>(`${this.apiServerUrl}/typeAnnonces/update/${typeAnId}`, typeAnnonce);
  }

  public deleteTypeAnnonces(tarifId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/typeAnnonces/delete/${tarifId}`);
  }

}
