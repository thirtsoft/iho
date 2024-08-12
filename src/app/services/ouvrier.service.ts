import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ouvrier } from '../models/ouvrier';

@Injectable({
  providedIn: 'root'
})
export class OuvrierService {

  public apiServerUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';
  dataForm:  FormGroup;

  constructor(private http: HttpClient) {
  }

  /*************************** Ouvrier ********************/
  public getOuvriers(): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/all`);
  }

  public getOuvrierOrderByIdDesc(): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/searchChauffeurOrderByIdDesc`);
  }

  public getOuvrierById(chauffId: number): Observable<Ouvrier> {
    return this.http.get<Ouvrier>(`${this.apiServerUrl}/ouvriers/findById/${chauffId}`);
  }

  public addOuvrier(ouvrier: Ouvrier): Observable<Ouvrier> {
    return this.http.post<Ouvrier>(`${this.apiServerUrl}/ouvriers/create`, ouvrier);
  }

  public addOuvrierWithFiles(formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', `${this.apiServerUrl}/ouvriers/createWithFiles`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);

  }

  public updateOuvrier(chauffId: number, ouvrier: Ouvrier): Observable<Ouvrier> {
    return this.http.put<Ouvrier>(`${this.apiServerUrl}/ouvriers/update/${chauffId}`, ouvrier);
  }

  public deleteOuvrier(chauffId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/ouvriers/delete/${chauffId}`);
  }

  public getListOuvrierByPageable(page: number, size: number): Observable<Ouvrier[]> {
    const searchUrl = (this.apiServerUrl+"/ouvriers/searchChauffeurByPageables?page="+page+"&size="+size);
    return this.http.get<Ouvrier[]>(searchUrl);
  }

  public getListOuvrierBySelectedIsTrue(): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/searchChauffeurBySelectedIsTrue`);
  }

  public getListOuvrierByKeyword(keyword: string): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/searchChauffeurByKeyword?keyword=`+keyword);
  }

  public getListOuvrierByDisponibility(disponility: string): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/searchChauffeurByDisponibilite?disponible=`+disponility);
  }

  public getListOuvrierByKeywordPageable(mc: string, page: number, size: number): Observable<Ouvrier[]> {
    const searchUrl = (this.apiServerUrl+"/ouvriers/searchChauffeurByDisponibityByPageables?id="+mc+"&page="+page+"&size="+size);
    return this.http.get<Ouvrier[]>(searchUrl);
  }

  public getListOuvrierByPermisPageable(permisId: number, page: number, size: number): Observable<Ouvrier[]> {
    const searchUrl = (this.apiServerUrl+"/ouvriers/searchChauffeurByPermisPageables?id="+permisId+"&page="+page+"&size="+size);
    return this.http.get<Ouvrier[]>(searchUrl);
  }

  public getListOuvrierByLocalityPageable(locId: number, page: number, size: number): Observable<Ouvrier[]> {
    const searchUrl = (this.apiServerUrl+"/ouvriers/searchChauffeurByLocalityPageables?id="+locId+"&page="+page+"&size="+size);
    return this.http.get<Ouvrier[]>(searchUrl);
  }

  public getListOuvrierByPermis(pId: number): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/searchouvriersByPermis/${pId}`);
  }

  public uploadPhotoOuvrier(filePhoto: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', filePhoto);
    const req = new HttpRequest('POST', `${this.apiServerUrl}/ouvriers/uploadChauffeurPhoto/${id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);

  }

  public getPhotoChauffeur() {
    return this.http.get(`${this.apiServerUrl}/ouvriers/photoChauffeur`);
  }

  public uploadCvOuvrier(fileCV: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', fileCV);
    const req = new HttpRequest('POST', `${this.apiServerUrl}/ouvriers/uploadChauffeurCv/${id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);

  }

  public getCvChauffeur() {
    return this.http.get(`${this.apiServerUrl}/ouvriers/cvChauffeur`);
  }

  public countNumberOfouvriers(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/ouvriers/NumbersOfouvriers`);
  }

  public getAllouvriersByPageables(page,size): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/allouvriers?page=${page}&size=${size}`).pipe(
      map(
        response => response
      )
    )
  }

  public getouvriersByAddressId(id,page,size): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(`${this.apiServerUrl}/ouvriers/address?id=${id}&page=${page}&size=${size}`).pipe(
      map(
        response => response
      )
    )
  }

  public getouvriersByKey(word,page,size): Observable<Ouvrier[]> {
    return this.http.get<Ouvrier[]>(this.apiServerUrl+"/ouvriers/chauffeurkey?disponibility="+word+"&page="+page+"&size="+size).pipe(
      map(
        response => response
      )
    )
  }

  public getouvriersLength(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/ouvriers/OuvrierSize`).pipe(
      map(
        response => response
      )
    )
  }

  public getouvriersLengthByAddressId(id): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/ouvriers/ctaddressIdSize?id=${id}`).pipe(
      map(
        response => response
      )
    )
  }

  public getouvriersLengthByKey(word): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/ouvriers/keySize?disponibility=${word}`).pipe(
      map(
        response => response
      )
    )
  }

  public addChauffeurWithPhotoAndCvFileInFolder(formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', `${this.apiServerUrl}/ouvriers/createWithFilesInFolder/`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  public uploadPhotoOfChauffeurInFolder(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${this.apiServerUrl}/ouvriers/uploadChauffeurPhotoInFolder/${id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public getPhotoChauffeurInContext() {
    return this.http.get(`${this.apiServerUrl}/ouvriers/photoChauffeurInFolder`);
  }

  public uploadCvOfChauffeurInFolder(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${this.apiServerUrl}/ouvriers/uploadChauffeurCvInFolder/${id}`, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  public getCvOfChauffeurFromContext() {
    return this.http.get(`${this.apiServerUrl}/ouvriers/cvChauffeurInFolder`);
  }

  public downloadCvOfChauffeurFromFolder(file: File, id: number): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.apiServerUrl+'/ouvriers/downloadCvFile/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }


}
