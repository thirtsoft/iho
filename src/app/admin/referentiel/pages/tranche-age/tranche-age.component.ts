import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TrancheAge } from '../../models/tranche-age';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferentielService } from '../../service/referentiel.service';

@Component({
  selector: 'app-tranche-age',
  templateUrl: './tranche-age.component.html',
  styleUrls: ['./tranche-age.component.css']
})
export class TrancheAgeComponent implements OnInit {

  products = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  trancheAges: TrancheAge[] = [];

  trancheAgeId: number;

  trancheAgeFormGroup!: FormGroup;

  constructor(
    private modalService: BsModalService,
    private referentielService: ReferentielService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getTrancheAges();
    this.initializeForm(null);
  }

  getTrancheAges() {
    this.referentielService.getAllTrancheAges().subscribe(
      (data: any[]) => {
        this.trancheAges = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  initializeForm(trancheAge: TrancheAge | null){
    this.trancheAgeFormGroup =  this._formBuilder.group({
      id: [trancheAge?.id ? trancheAge.id : ''],
      code: [trancheAge?.code ? trancheAge?.code: '', Validators.required],
      libelle: [trancheAge?.libelle ? trancheAge.libelle : '', Validators.required],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload = this.trancheAgeFormGroup.value;
    this.referentielService.createTrancheAge(payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('trancheAge créer avec succès')
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

  editModal(template: TemplateRef<any>, trancheAge) {
    this.initializeForm(trancheAge);
    this.trancheAgeId = trancheAge.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editer() {
    const payload = this.trancheAgeFormGroup.value;
    this.referentielService.updateTrancheAge(this.trancheAgeId, payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('trancheAge updated avec succès')
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


  deleteModal(template: TemplateRef<any>, trancheAge) {
    this.id = trancheAge.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }


  deleteTrancheAge() {
    this.trancheAges = this.trancheAges.filter((a) => a.id !== this.id);
    this.referentielService.deleteTrancheAge(this.id).subscribe((data: any[]) => {
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
