import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SignInResponse } from '../models/sign-in-response';
import { Observable } from 'rxjs';
import { SignInRequest } from '../models/sign-in-request';
import { FirstSignInRequest } from '../models/first-sign-in-request';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiServer = environment.apiBaseUrl;
  private adminUrl = '/api/v1/auth';
  private loginUrl = environment.apiLogin;

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) {
  }

  signIn(signInRequest: SignInRequest): Observable<SignInResponse>{
    return this.httpClient.post<SignInResponse>(this.loginUrl + '/authenticate', signInRequest)
  }


  getFirstSigninUser(token?: string): Observable<any> {
    return this.httpClient.get(this.apiServer +`/utilisateur/activation/${token}`);
  }

  
  firstSignIn(firstSignInReq: FirstSignInRequest,isIfAdmin: boolean){
    let url = this.loginUrl + '/activation';
    if(!isIfAdmin){
      url = this.adminUrl + `/users/activation`;
   }
  }

  getUser(userId: number): Observable<Utilisateur>{
    return this.httpClient.get<Utilisateur>(this.apiServer + `/utilisateur/${userId}`,this.httpOptions);
  }


  getListUtilisateurs(): Observable<Utilisateur[]>{
    return this.httpClient.get<Utilisateur[]>(this.apiServer  + `/utilisateur/list`);
  }

}
