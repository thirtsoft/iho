import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { SignInResponse } from '../models/sign-in-response';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  role: any;
  actions: any;
  code: any;
  token: any;
  
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  afterLoginSuccessful(response: SignInResponse, urlNavigation: string) {
    this.localStorage.setItem('token', response.access_token);
    this.localStorage.setItem('id', response.id);
    this.localStorage.setItem('matricule', response.matricule);
    this.localStorage.setItem('email', response.email);
    this.localStorage.setItem('name', response.nom);
    this.localStorage.setItem('typeUtilisateur', response.typeUtilisateur);
    this.token = response.access_token;
    this.role = response.profilReponse.code;
    this.localStorage.setItem('role', response.profilReponse.code);
    this.localStorage.setItem('permissions', JSON.stringify(response.profilReponse.actionListResponses));
    if (this.role) {
      this.router.navigateByUrl('/admin');
      return;
    }
    this.router.navigate([urlNavigation]);
  }
}
