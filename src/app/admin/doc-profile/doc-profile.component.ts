import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../pages/services/utilisateur.service';
import { LocalStorageService } from '../pages/services/local-storage.service';
import { Utilisateur } from '../pages/models/utilisateur';


@Component({
  selector: 'app-doc-profile',
  templateUrl: './doc-profile.component.html',
  styleUrls: ['./doc-profile.component.css'],
})
export class DocProfileComponent implements OnInit {
  
  userId: number | null | undefined;
  utilisateur: Utilisateur = {};
  
  constructor(private Router: Router,
    private userService: UtilisateurService,
    private localStorage: LocalStorageService,
  ) {
    this.userId = this.localStorage.getItem('id');
  }

  changePass = false;
  personalDetails = true;
  
  ngOnInit(): void {
    if (this.userId) {
      this.getUtilisateurProfil(this.userId);
    }
  }

  getUtilisateurProfil(userId: number) {
    this.userService.getUtilisateurProfil(userId).subscribe({
      next: (data) => {
        this.utilisateur = data;
      },
      error: error => {
        
      }
    })
  }

  about() {
    this.changePass = false;
    this.personalDetails = true;
    document.getElementById('about').classList.add('active');
    document.getElementById('pass').classList.remove('active');
  }
  pass() {
    this.changePass = true;
    this.personalDetails = false;
    document.getElementById('about').classList.remove('active');
    document.getElementById('pass').classList.add('active');
  }

  submit() {
    this.Router.navigateByUrl('/admin/doc-profile');
  }
}
