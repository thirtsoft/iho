import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import * as $ from 'jquery';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from '../pages/services/utilisateur.service';
import { Utilisateur } from '../pages/models/utilisateur';
import { Profil } from '../pages/models/profil';
import { ProfilageService } from '../profil/service/profilage.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {

  users = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  utilisateurs: Utilisateur[] = [];

  utilisateurId: number;

  utilisateursFormGroup!: FormGroup;

  profils: Profil[]=[];


  constructor(
    private modalService: BsModalService,
    private utilisateurService: UtilisateurService,
    private profilageService: ProfilageService,
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getAgents();
    this.getProfils();
    this.initializeForm(null);
  }

  getAgents() {
    this.utilisateurService.getAllUtilisateurs().subscribe(
      (data: any[]) => {
        this.utilisateurs = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  getProfils() {
    this.profilageService.getAllProfils().subscribe(
      (data: any[]) => {
        this.profils = data;
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  initializeForm(utilisateur: Utilisateur | null){
    this.utilisateursFormGroup =  this._formBuilder.group({
      id: [utilisateur?.id ? utilisateur.id : ''],
      nom: [utilisateur?.nom ? utilisateur.nom: '', Validators.required],
      prenom: [utilisateur?.prenom ? utilisateur.prenom: '', Validators.required],
      email: [utilisateur?.email ? utilisateur.email : '', Validators.required],
      telephone: [utilisateur?.telephone ? utilisateur.telephone : '', Validators.required],
      profileId: [utilisateur?.profilDs.id ? utilisateur?.profilDs.id :'', Validators.required],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload: Utilisateur = {
      id: this.utilisateursFormGroup.get("id").value,
      nom: this.utilisateursFormGroup.get("nom").value,
      prenom: this.utilisateursFormGroup.get("prenom").value,
      email: this.utilisateursFormGroup.get("email").value,
      telephone: this.utilisateursFormGroup.get("telephone").value,
      profilDs: this.profils.filter(r => r.id == this.utilisateursFormGroup.get("profileId").value)[0]
    }
    this.utilisateurService.saveAgent(payload).subscribe({ 
      next: (data) =>{
        if(data.statut === 'OK') {
          window.alert("User create succeeded");
       //   this.notifier.notify('success', 'Le compte de l\'agent a été crée avec succès.')
        }else if(data.statut === 'FAILED') {
          window.alert("User not create");
       //   this.notifier.notify('error', 'Erreur lors de la création : ' + data.message); 
        }
        this.modalRef.hide();
        this.ngOnInit();
      },
      error: (data) => {
      //  this.notifier.notify('error', 'Erreur lors de la création : ' + data.error); 
      }
    });
  }

  editModal(template: TemplateRef<any>, utilisateur) {
    this.initializeForm(utilisateur);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editer() {
    const payload: Utilisateur = {
      id: this.utilisateursFormGroup.get("id").value,
      nom: this.utilisateursFormGroup.get("nom").value,
      prenom: this.utilisateursFormGroup.get("prenom").value,
      email: this.utilisateursFormGroup.get("email").value,
      telephone: this.utilisateursFormGroup.get("telephone").value,
      profilDs: this.profils.filter(r => r.id == this.utilisateursFormGroup.get("profileId").value)[0]
    }
    this.utilisateurService.updateUtilisateur(this.utilisateurId, payload).subscribe({ 
      next: (data) =>{
        if(data != null) {
      //    this.notifier.notify('success', 'Le compte de l\'agent a été modifié avec succès.')
        }else if(data === null) {
      //  this.notifier.notify('error', 'Erreur lors de la modification du compte de l\'agent.')
      }
      this.modalRef.hide();
      this.ngOnInit();
      },
          
      error: (data) => {
    //    this.notifier.notify('error', 'Erreur lors de la création : ' + data.error);       
    }
    });
  }

  deleteModal(template: TemplateRef<any>, utilisateur) {
    this.id = utilisateur.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteAgent() {
    this.utilisateurs = this.utilisateurs.filter((a) => a.id !== this.id);
    this.utilisateurService.deleteUtilisateur(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.ngOnInit();
    });
  }

  decline() {
    this.modalRef.hide();
  }

  btnColor() {
    document.getElementById('btn-yes').style.backgroundColor = '#00d0f1';
    document.getElementById('btn-yes').style.border = '1px solid #00d0f1';
    document.getElementById('btn-yes').style.color = '#fff';

    document.getElementById('btn-no').style.backgroundColor = '#fff';
    document.getElementById('btn-no').style.border = '1px solid #fff';
    document.getElementById('btn-no').style.color = '#000';
  }

  btnColorNo() {
    document.getElementById('btn-no').style.backgroundColor = '#00d0f1';
    document.getElementById('btn-no').style.border = '1px solid #00d0f1';
    document.getElementById('btn-no').style.color = '#fff';

    document.getElementById('btn-yes').style.backgroundColor = '#fff';
    document.getElementById('btn-yes').style.border = '1px solid #fff';
    document.getElementById('btn-yes').style.color = '#000';
  }

}
  /* doctorsList: any = [];
  errorMessage: string;

  constructor(public commonService: CommonServiceService) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.commonService.getDoctors().subscribe(
      (res) => {
        this.doctorsList = res;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  } */
