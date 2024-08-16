import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Action } from 'src/app/admin/pages/models/action';
import { Profil } from 'src/app/admin/pages/models/profil';
import { ProfilageService } from '../../service/profilage.service';

@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.component.html',
  styleUrls: ['./list-profil.component.css']
})
export class ListProfilComponent implements OnInit {

  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  listProfils: Profil[] = [];

  profilId: number;

  profilFormGroup!: FormGroup;

  actions: Action[] = [];

  profil: Profil = {};

  constructor(
    private modalService: BsModalService,
    private profilageService: ProfilageService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getProfils();
    this.getActions();
    this.initializeForm(null);
  }

  

  getProfils() {
    this.profilageService.getAllProfils().subscribe(
      (data: any[]) => {
        this.listProfils = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  getActions() {
    this.profilageService.getAllActions().subscribe(
      (data: any[]) => {
        this.actions = data;
      },
      (error) => (this.errorMessage = <any>error)
    );
  }


  initializeForm(profil: Profil|null) {
    this.profilFormGroup =  this._formBuilder.group({
      id: [profil?.id ?? ''],
      code: [profil?.libelle ?? '', Validators.required],
      libelle: [profil?.libelle ?? '', Validators.required],
      actionListDs: [profil?.actionListDs?.map(a => a.id) ?? [], Validators.required],
  //    actionListDs: [profil?.actionListDs? profil.actionListDs: '', Validators.required]
    });
  }

  getProfil(profilId: number) {
    this.profilageService.getProfil(profilId).subscribe(
      {
        next: (response) =>{
         this.profil = response;
         this.initializeForm(response);
         document.getElementById("open-modal").click()
        },
        error: (error) =>{
          console.log(error)
        }
      }
    );
  }

 /*  initializeForm(profil: Profil | null){
    this.profilFormGroup =  this._formBuilder.group({
      id: [profil?.id ? profil.id : ''],
      code: [profil?.code ? profil.code: '', Validators.required],
      libelle: [profil?.libelle ? profil.libelle: '', Validators.required],
      actionListDs: [profil?.actionListDs? profil.actionListDs: '', Validators.required]
    });
  } */

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    /*
    const payload: Profil = {
      id: this.profilFormGroup.get("id").value,
      code: this.profilFormGroup.get("numero").value,
      actionListDs: this.actions.map(r => r.id == this.profilFormGroup.get("actionId").value)[0]
    }*/
    const payload = this.profilFormGroup.value;
    console.log(payload);
    this.profilageService.createProfil(payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('Lit créer avec succès')
         //  this.toastService.success('succès', 'Les informations du patient ont été enregistrées avec succès !!! ');
        }else if(data.statut === 'FAILED') {
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

  editModal(template: TemplateRef<any>, profil) {
    console.log('edit modal', profil);
    this.profilId = profil.id;

    this.profilFormGroup =  this._formBuilder.group({
      id: [profil?.id ?? ''],
      code: [profil?.code ?? '', Validators.required],
      libelle: [profil?.libelle ?? '', Validators.required],
      actionListDs: [profil?.actionListDs?.map(a => a.id) ?? [], Validators.required],
    });
    /*
    if (this.profil.id != null) {
      this.getProfil(this.profilId);
    }*/
    
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  actionCompare(a1: Action, a2: Action) {
    return a1 && a2 ? a1.id==a2.id : a1===a2;
  }

  editer() {
    /*
    const payload: Lit = {
      id: this.litFormGroup.get("id").value,
      numero: this.litFormGroup.get("numero").value,
      chambreDs: this.chambres.filter(r => r.id == this.litFormGroup.get("chambreId").value)[0]
    }*/
    const payload = this.profilFormGroup.value;
    this.profilageService.updateProfil(this.profilId, payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
      this.modalRef.hide();
      this.ngOnInit();
      },
          
      error: (data) => {
        console.log('error', 'Erreur lors de la création : ' + data.error);
      //  this.toastService.error('error', 'Erreur lors de la création : ' + data.error);        
    }
    });
  }

  deleteModal(template: TemplateRef<any>, profil) {
    this.id = profil.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteProfil() {
    this.listProfils = this.listProfils.filter((a) => a.id !== this.id);
    this.profilageService.deleteProfil(this.id).subscribe((data: any[]) => {
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
