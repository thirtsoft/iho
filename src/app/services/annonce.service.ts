import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Annonce } from '../models/annonce';
import { TokenStorageService } from './auht/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  apiServerUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';
  formData:  FormGroup;

  id;
  currentUser: any = {};

  constructor(private http: HttpClient,
              private tokenService: TokenStorageService
  ) {
  }

  /**************************** Annonce ******************/
  public getAnnonces(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/all`);
  }

  public getAnnonceOrderByIdDesc(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/searchAnnonceOrderByIdDesc`);
  }

  public getAnnonceById(annonceId: number): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.apiServerUrl}/annonces/findById/${annonceId}`);
  }

  public getAnnonceByReference(reference: string): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.apiServerUrl}/annonces/searchbyReference/${reference}`);
  }

  public getAnnonceByCustomerId(userId: number): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.apiServerUrl}/annonces/findAnnonceByCustomerId/${userId}`);
  }

  public addAnnonce(annonce: Annonce): Observable<Annonce> {
    return this.http.post<Annonce>(`${this.apiServerUrl}/annonces/create`, annonce);
  }

  public addAnnonceWithUser(annonce: Annonce, id: number): Observable<Annonce> {
    return this.http.post<Annonce>(`${this.apiServerUrl}/annonces/createAnnonceWithUser?id=${id}`, annonce);
  }

  public updateAnnonce(annonceId: number, annonce: Annonce): Observable<Annonce> {
    return this.http.put<Annonce>(`${this.apiServerUrl}/annonces/update/${annonceId}`, annonce);
  }

  public updateStatusOfAnnonce(id: number, status: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    let data = {"status":status};
    const urlUpdateStatus = (this.apiServerUrl+"/annonces/updateStatusOfAnnonce/"+id+"?status="+data.status);
    return this.http.patch<any>(urlUpdateStatus, {headers: headers});

  }

  public deleteAnnonce(annonceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/annonces/delete/${annonceId}`);
  }

  public getListAnnonceByPageable(page: number, size: number): Observable<Annonce[]> {
    const searchUrl = (this.apiServerUrl+"/annonces/searchAnnonceByPageables?page="+page+"&size="+size);
    return this.http.get<Annonce[]>(searchUrl);
  }

  public getListAnnonceBySelectedIsTrue(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/searchAnnonceBySelectedIsTrue`);
  }

  public getListAnnonceByKeyword(reference: string): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/searchAnnonceByKeyword?reference=`+reference);
  }

  public getListAnnonceByLibeele(libelle: string): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/searchAnnonceByLibelle?libelle=`+libelle);
  }

  public get5LatestAnnonceByOrderByIdDesc(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/search5LatestAnnonceByIdDesc`);
  }

  public get6LatestAnnonceByStatusValidatedOrderByIdDesc(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/search6ValidateLatestAnnonceByIdDesc`);
  }

  public getAnnonceByStatusPending(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/searchAnnonceByStatusPending`);
  }

  public getAnnonceByStatusValidated(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/searchAnnonceByStatusValide`);
  }

  public getAnnonceByStatusRejeted(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/searchAnnonceByStatusRejet`);
  }

  public getListAnnonceByPermis(pId: number): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/searchAnnoncesByPermis/${pId}`);
  }

  public getAnnonceByUserIdOrderDesc(userId: number): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/searchAnnonceByCustomerIdOrderByIdDesc/${userId}`);
  }

  public getListAnnonceByPermisPageable(permisId: number, page: number, size: number): Observable<Annonce[]> {
    const searchUrl = (this.apiServerUrl+"/annonces/searchAnnonceByPermisPageables?id="+permisId+"&page="+page+"&size="+size);
    return this.http.get<Annonce[]>(searchUrl);
  }

  public getUserId() {
    const user = this.tokenService.getUser();
    this.id = user.id
  }

  public getAllAnnoncesDtos(page,size): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/allAnnonces?page=${page}&size=${size}`).pipe(
      map(
        response => response
      )
    )
  }

  public getAllAnnoncesByPermisId(id,page,size): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiServerUrl}/annonces/permis?id=${id}&page=${page}&size=${size}`).pipe(
      map(
        response => response
      )
    )
  }

  public getAllAnnoncesByKey(word,page,size): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.apiServerUrl+"/annonces/annoncekey?libelle="+word+"&page="+page+"&size="+size).pipe(
      map(
        response => response
      )
    )
  }

  public getAnnonceLength(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/annonces/annonceSize`).pipe(
      map(
        response => response
      )
    )
  }

  public getAnnoncesLengthByPermsId(id): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/annonces/ctpermisIdSize?id=${id}`).pipe(
      map(
        response => response
      )
    )
  }

  public getAnnoncesLengthByKey(word): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/annonces/keySize?libelle=${word}`).pipe(
      map(
        response => response
      )
    )
  }

}
