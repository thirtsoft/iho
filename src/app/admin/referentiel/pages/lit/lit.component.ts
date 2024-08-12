import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Lit } from '../../models/lit';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chambre } from '../../models/chambre';
import { ReferentielService } from '../../service/referentiel.service';

@Component({
  selector: 'app-lit',
  templateUrl: './lit.component.html',
  styleUrls: ['./lit.component.css']
})
export class LitComponent implements OnInit {

  products = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  lits: Lit[] = [];

  litId: number;

  litFormGroup!: FormGroup;

  chambres: Chambre[] = [];

  constructor(
    private modalService: BsModalService,
    private referentielService: ReferentielService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getLits();
    this.getChambres();
    this.initializeForm(null);
  }

  getLits() {
    this.referentielService.getAllLits().subscribe(
      (data: any[]) => {
        this.lits = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  getChambres() {
    this.referentielService.getAllChambres().subscribe(
      (data: any[]) => {
        this.chambres = data;
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  initializeForm(lit: Lit | null){
    this.litFormGroup =  this._formBuilder.group({
      id: [lit?.id ? lit.id : ''],
      numero: [lit?.numero ? lit.numero: '', Validators.required],
      chambreId: [lit?.chambreDs.id ? lit.chambreDs.id : '', Validators.required],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload: Lit = {
      id: this.litFormGroup.get("id").value,
      numero: this.litFormGroup.get("numero").value,
      chambreDs: this.chambres.filter(r => r.id == this.litFormGroup.get("chambreId").value)[0]
    }
    this.referentielService.createLit(payload).subscribe({ 
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

  editModal(template: TemplateRef<any>, lit) {
    this.initializeForm(lit);
    this.litId = lit.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editer() {
    const payload: Lit = {
      id: this.litFormGroup.get("id").value,
      numero: this.litFormGroup.get("numero").value,
      chambreDs: this.chambres.filter(r => r.id == this.litFormGroup.get("chambreId").value)[0]
    }
    this.referentielService.updateLit(this.litId, payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('lit updated avec succès')
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

  deleteModal(template: TemplateRef<any>, lit) {
    this.id = lit.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteLit() {
    this.lits = this.lits.filter((a) => a.id !== this.id);
    this.referentielService.deleteLit(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getLits();
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
