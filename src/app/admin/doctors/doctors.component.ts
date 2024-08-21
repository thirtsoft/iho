import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import * as $ from 'jquery';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from '../pages/services/utilisateur.service';
import { Utilisateur } from '../pages/models/utilisateur';

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


  constructor(
    private commonService: CommonServiceService,
    private modalService: BsModalService,
    private utilisateurService: UtilisateurService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAgents();
    this.initializeForm(null);
  }

  getAgents() {
    this.utilisateurService.getAllUtilisateurs().subscribe(
      (data: any[]) => {
        this.utilisateurs = data;
        console.log(this.utilisateurs);
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  initializeForm(utilisateur: Utilisateur | null){
    this.utilisateursFormGroup =  this._formBuilder.group({
      id: [utilisateur?.id ? utilisateur.id : ''],
      nom: [utilisateur?.nom ? utilisateur.nom: '', Validators.required],
      email: [utilisateur?.email ? utilisateur.email : '', Validators.required],
      telephone: [utilisateur?.telephone ? utilisateur.telephone : '', Validators.required],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload = this.utilisateursFormGroup.value;
      this.utilisateurService.createAgent(payload).subscribe({ 
        next: (data) =>{
          console.log('payload after : ',  data);
          if(data === 'OK') {
            window.alert('chambre créer avec succès')
          //  this.toastService.success('succès', 'Les informations du patient ont été enregistrées avec succès !!! ');
          }else if(data === 'FAILED') {
        //    this.toastService.error('error', 'Erreur lors de la création : ' + data.message);
          }
          this.modalRef.hide();
          this.ngOnInit();
        },
        error: (data) => {
          console.log('error', 'Erreur lors de la création : ' + data.error);
        //  this.toastService.error('error', 'Erreur lors de la création : ' + data.error);  
      }
      });
  }

  editModal(template: TemplateRef<any>, chambre) {
    this.initializeForm(chambre);
    this.utilisateurId = chambre.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editer() {
    const payload = this.utilisateursFormGroup.value;
    this.utilisateurService.updateUtilisateur(this.utilisateurId, payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data != null) {
          window.alert('chambre updated avec succès')
         //  this.toastService.success('succès', 'Les informations du patient ont été enregistrées avec succès !!! ');
        }else if(data === null) {
        //    this.toastService.error('error', 'Erreur lors de la création : ' + data.message);
      }
      this.modalRef.hide();
      this.ngOnInit();
      },
          
      error: (data) => {
        console.log('error', 'Erreur lors de la création : ' + data.error);
      //  this.toastService.error('error', 'Erreur lors de la création : ' + data.error);        
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

