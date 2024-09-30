import { Component, OnInit, TemplateRef } from '@angular/core';
import { ElementPlainte } from '../../models/element-plainte';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReferentielService } from '../../service/referentiel.service';

@Component({
  selector: 'app-element-plainte',
  templateUrl: './element-plainte.component.html',
  styleUrls: ['./element-plainte.component.css']
})
export class ElementPlainteComponent implements OnInit {

  modalRef: BsModalRef;
  errorMessage: string;

  elementPlaintes: ElementPlainte[] = [];
  elementPlainteId: number;
  elementPlainteFormGroup!: FormGroup;

  constructor(
    private modalService: BsModalService,
    private referentielService: ReferentielService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getElementPlaintes();
    this.initializeForm(null);
  }

  getElementPlaintes() {
    this.referentielService.getAllElementPlaintes().subscribe(
      (data: any[]) => {
        this.elementPlaintes = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  initializeForm(elementPlainte: ElementPlainte | null){
    this.elementPlainteFormGroup =  this._formBuilder.group({
      id: [elementPlainte?.id ? elementPlainte.id : ''],
      libelle: [elementPlainte?.libelle ? elementPlainte.libelle : '', Validators.required],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload = this.elementPlainteFormGroup.value;
      this.referentielService.createElementPlainte(payload).subscribe({ 
        next: (data) =>{
          console.log('payload after : ',  data);
          if(data.statut === 'OK') {
            window.alert('element plaintes créer avec succès')
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

  editModal(template: TemplateRef<any>, elementPlainte) {
    this.initializeForm(elementPlainte);
    this.elementPlainteId = elementPlainte.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editer() {
    const payload = this.elementPlainteFormGroup.value;
    this.referentielService.updateElementPlainte(this.elementPlainteId, payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('element plainte updated avec succès')
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

  deleteModal(template: TemplateRef<any>, elementPlainte) {
    this.elementPlainteId = elementPlainte.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteElementPlainte() {
    this.elementPlaintes = this.elementPlaintes.filter((a) => a.id !== this.elementPlainteId);
    this.referentielService.deleteElementPlainte(this.elementPlainteId).subscribe((data: any[]) => {
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
