import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email } from '../models/email';
import { Newsletter } from '../models/newsletter';
import { Ouvrier } from '../models/ouvrier';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  public apiServerUrl = environment.apiBaseUrl;

  choixmenu : string  = 'A';
  dataForm:  FormGroup;

  constructor(private http: HttpClient) {
  }

  /*************************** Email ********************/
  public getEmailsOrderByIdDesc(): Observable<Email[]> {
    return this.http.get<Email[]>(`${this.apiServerUrl}/emails/searchAllEmailsOrderByIdDesc`);
  }

  public getEmailById(emailId: number): Observable<Email> {
    return this.http.get<Email>(`${this.apiServerUrl}/emails/findById/${emailId}`);
  } 

  public senEmailToManager(mail: Email): Observable<Email> {
    return this.http.post<Email>(`${this.apiServerUrl}/emails/sendMailToManager`, mail);
  }

  public responseToEmailByManager(mail: Email): Observable<Email> {
    return this.http.post<Email>(`${this.apiServerUrl}/emails/responseMailToCustomer`, mail);
  }

  public senEmailToRecruteur(userDTO: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.apiServerUrl}/emails/sendToRecruteur`, userDTO);
  }

  public sendToChauffeur(chauffDTO: Ouvrier): Observable<Ouvrier> {
    return this.http.post<Ouvrier>(`${this.apiServerUrl}/emails/sendToChauffeur`, chauffDTO);
  }

  public senEmailToVisitor(visitorDto: Newsletter): Observable<Newsletter> {
    return this.http.post<Newsletter>(`${this.apiServerUrl}/emails/sendToNewsletter`, visitorDto);
  }

  public senEmailAllToVisitor(visitorDto: Newsletter[]): Observable<Newsletter[]> {
    return this.http.post<Newsletter[]>(`${this.apiServerUrl}/emails/sendMailToAllCustomers`, visitorDto);
  }

  public deleteEmail(emailId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/emails/delete/${emailId}`);
  }
}
