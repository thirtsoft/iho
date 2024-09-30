import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Chambre } from '../../models/chambre';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferentielService } from '../../service/referentiel.service';
import { ElementExamenDermatologique } from '../../models/element-examen-dermatologique';

@Component({
  selector: 'app-element-examen-dermatologique',
  templateUrl: './element-examen-dermatologique.component.html',
  styleUrls: ['./element-examen-dermatologique.component.css']
})
export class ElementExamenDermatologiqueComponent implements OnInit {

  modalRef: BsModalRef;
  errorMessage: string;

  elementExamenDermatologiques: ElementExamenDermatologique[] = [];

  eltExamId: number;

  elementExamenDermatologiqueFormGroup!: FormGroup;


  constructor(
    private modalService: BsModalService,
    private referentielService: ReferentielService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getElementExamenDermatologiques();
    this.initializeForm(null);
  }

  getElementExamenDermatologiques() {
    this.referentielService.getAllElementExamenDermatologiques().subscribe(
      (data: any[]) => {
        this.elementExamenDermatologiques = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  initializeForm(eltExamenDermat: ElementExamenDermatologique | null){
    this.elementExamenDermatologiqueFormGroup =  this._formBuilder.group({
      id: [eltExamenDermat?.id ? eltExamenDermat.id : ''],
      libelle: [eltExamenDermat?.libelle ? eltExamenDermat.libelle : '', Validators.required],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload = this.elementExamenDermatologiqueFormGroup.value;
      this.referentielService.createElementExamenDermatologique(payload).subscribe({ 
        next: (data) =>{
          console.log('payload after : ',  data);
          if(data.statut === 'OK') {
            window.alert('element examen créer avec succès')
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

  editModal(template: TemplateRef<any>, eletExamen) {
    this.initializeForm(eletExamen);
    this.eltExamId = eletExamen.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editer() {
    const payload = this.elementExamenDermatologiqueFormGroup.value;
    this.referentielService.updateElementExamenDermatologique(this.eltExamId, payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('elemtn examen updated avec succès')
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

  deleteModal(template: TemplateRef<any>, chambre) {
    this.eltExamId = chambre.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteElementExamenDermatologique() {
    this.elementExamenDermatologiques = this.elementExamenDermatologiques.filter((a) => a.id !== this.eltExamId);
    this.referentielService.deleteElementExamenDermatologique(this.eltExamId).subscribe((data: any[]) => {
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

