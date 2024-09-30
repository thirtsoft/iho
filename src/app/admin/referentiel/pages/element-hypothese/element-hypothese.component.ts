import { Component, OnInit, TemplateRef } from '@angular/core';
import { ElementHypothese } from '../../models/element-hypothese';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferentielService } from '../../service/referentiel.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-element-hypothese',
  templateUrl: './element-hypothese.component.html',
  styleUrls: ['./element-hypothese.component.css']
})
export class ElementHypotheseComponent implements OnInit {

  modalRef: BsModalRef;
  errorMessage: string;

  elementHypotheses: ElementHypothese[] = [];

  elementHypotheseId: number;

  elementHypotheseFormGroup!: FormGroup;


  constructor(
    private modalService: BsModalService,
    private referentielService: ReferentielService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getElementHypotheses();
    this.initializeForm(null);
  }

  getElementHypotheses() {
    this.referentielService.getAllElementHypotheses().subscribe(
      (data: any[]) => {
        this.elementHypotheses = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  initializeForm(elementHypothese: ElementHypothese | null){
    this.elementHypotheseFormGroup =  this._formBuilder.group({
      id: [elementHypothese?.id ? elementHypothese.id : ''],
      libelle: [elementHypothese?.libelle ? elementHypothese.libelle : '', Validators.required],
      sousElementHypotheseDs: [elementHypothese?.sousElementHypotheseDs ? elementHypothese?.sousElementHypotheseDs : ''],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload = this.elementHypotheseFormGroup.value;
      this.referentielService.createElementHypothese(payload).subscribe({ 
        next: (data) =>{
          console.log('payload after : ',  data);
          if(data.statut === 'OK') {
            window.alert('element hypothèse créer avec succès')
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

  editModal(template: TemplateRef<any>, elementHypothese) {
    this.initializeForm(elementHypothese);
    this.elementHypotheseId = elementHypothese.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editer() {
    const payload = this.elementHypotheseFormGroup.value;
    this.referentielService.updateElementHypothese(this.elementHypotheseId, payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('element hypothès updated avec succès')
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

  deleteModal(template: TemplateRef<any>, elementHypothese) {
    this.elementHypotheseId = elementHypothese.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteElementHypothese() {
    this.elementHypotheses = this.elementHypotheses.filter((a) => a.id !== this.elementHypotheseId);
    this.referentielService.deleteElementHypothese(this.elementHypotheseId).subscribe((data: any[]) => {
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
