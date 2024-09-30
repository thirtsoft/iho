import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ElementRechercheNotion } from '../../models/element-recherche-notion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferentielService } from '../../service/referentiel.service';

@Component({
  selector: 'app-element-reherche-notion',
  templateUrl: './element-reherche-notion.component.html',
  styleUrls: ['./element-reherche-notion.component.css']
})
export class ElementRehercheNotionComponent implements OnInit {

  modalRef: BsModalRef;
  errorMessage: string;

  elementRechercheNotions: ElementRechercheNotion[] = [];
  elementRechercheNotionId: number;
  elementRechercheNotionFormGroup!: FormGroup;

  constructor(
    private modalService: BsModalService,
    private referentielService: ReferentielService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getElementRechercheNotions();
    this.initializeForm(null);
  }

  getElementRechercheNotions() {
    this.referentielService.getAllElementRechercheNotions().subscribe(
      (data: any[]) => {
        this.elementRechercheNotions = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  initializeForm(elRechercheNotion: ElementRechercheNotion | null){
    this.elementRechercheNotionFormGroup =  this._formBuilder.group({
      id: [elRechercheNotion?.id ? elRechercheNotion.id : ''],
      libelle: [ elRechercheNotion?.libelle ? elRechercheNotion.libelle : '', Validators.required],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload = this.elementRechercheNotionFormGroup.value;
      this.referentielService.createElementRechercheNotion(payload).subscribe({ 
        next: (data) =>{
          console.log('payload after : ',  data);
          if(data.statut === 'OK') {
            window.alert('element recherche créer avec succès')
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

  editModal(template: TemplateRef<any>, eltRechercheNotion) {
    this.initializeForm(eltRechercheNotion);
    this.elementRechercheNotionId = eltRechercheNotion.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editer() {
    const payload = this.elementRechercheNotionFormGroup.value;
    this.referentielService.updateElementRechercheNotion(this.elementRechercheNotionId, payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('element recherche updated avec succès')
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

  deleteModal(template: TemplateRef<any>, eltRechercheNotion) {
    this.elementRechercheNotionId = eltRechercheNotion.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteEltRechercheNotion() {
    this.elementRechercheNotions = this.elementRechercheNotions.filter((a) => a.id !== this.elementRechercheNotionId);
    this.referentielService.deleteElementRechercheNotion(this.elementRechercheNotionId).subscribe((data: any[]) => {
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

