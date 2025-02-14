import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { CommonServiceService } from '../../common-service.service';
import { LocalStorageService } from '../pages/services/local-storage.service';
import { Utilisateur } from '../pages/models/utilisateur';
import { UtilisateurService } from '../pages/services/utilisateur.service';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  page = 'Dashboard';
  showDropdown = true;
  public bellCollapsed = true;
  public userCollapsed = true;

  userId: number | null | undefined;
  utilisateur: Utilisateur = {};
  
  constructor(
    @Inject(DOCUMENT) private document,
    public router: Router,
    private commonService: CommonServiceService,
    private localStorage: LocalStorageService,
    private userService: UtilisateurService,
  ) {
    this.userId = this.localStorage.getItem('id');
  }
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

  ngAfterViewInit() {
    this.loadDynmicallyScript('assets/admin/js/script.js');
  }
  loadDynmicallyScript(js) {
    var script = document.createElement('script');
    script.src = js;
    script.async = false;
    document.head.appendChild(script);
    script.onload = () => this.doSomethingWhenScriptIsLoaded();
  }

  doSomethingWhenScriptIsLoaded() {}
  change(name) {
    this.page = name;
    this.commonService.nextmessage('admin');
  }

  main() {
    this.commonService.nextmessage('main');
  }
  clickLogout() {
    window.location.href = '/home';
  }
  bell() {
    this.bellCollapsed = !this.bellCollapsed;
    if (!this.userCollapsed) {
      this.userCollapsed = true;
    }
  }
  user() {
    this.userCollapsed = !this.userCollapsed;
    if (!this.bellCollapsed) {
      this.bellCollapsed = true;
    }
  }

  goToProfil() {
    this.router.navigate(['/admin/doc-profile', this.userId]);
  }

  logout() {
    this.localStorage.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
