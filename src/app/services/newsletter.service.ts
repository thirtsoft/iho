import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Newsletter } from '../models/newsletter';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  public apiServerUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';
  dataForm:  FormGroup;

  constructor(private http: HttpClient) {
  }

  /*************************** Newsletter ********************/
  public getNewsletters(): Observable<Newsletter[]> {
    return this.http.get<Newsletter[]>(`${this.apiServerUrl}/newsleters/all`);
  }

  public getNewslettersOrderByIdDesc(): Observable<Newsletter[]> {
    return this.http.get<Newsletter[]>(`${this.apiServerUrl}/newsleters/searchNewsleterOrderByIdDesc`);
  }

  public getNewsletterById(idNewsleter: number): Observable<Newsletter> {
    return this.http.get<Newsletter>(`${this.apiServerUrl}/newsleters/findById/${idNewsleter}`);
  }

  public addNewsletter(news: Newsletter): Observable<Newsletter> {
    return this.http.post<Newsletter>(`${this.apiServerUrl}/newsleters/create`, news);
  }

  public updateNewsletter(idNewsleter: number, news: Newsletter): Observable<Newsletter> {
    return this.http.put<Newsletter>(`${this.apiServerUrl}/newsleters/update/${idNewsleter}`, news);
  }

  public deleteNewsletter(idNewsleter: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/newsleters/delete/${idNewsleter}`);
  }

  public countNumberOfNewsletters(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/newsleters/NumbersOfNewsleters`);
  }

}
