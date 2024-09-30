import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ElementTerrain } from '../../models/element-terrain';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferentielService } from '../../service/referentiel.service';

@Component({
  selector: 'app-element-terrain',
  templateUrl: './element-terrain.component.html',
  styleUrls: ['./element-terrain.component.css']
})
export class ElementTerrainComponent implements OnInit {

  modalRef: BsModalRef;
  errorMessage: string;

  elementTerrains: ElementTerrain[] = [];
  elementTerrainId: number;
  elementTerrainFormGroup!: FormGroup;

  constructor(
    private modalService: BsModalService,
    private referentielService: ReferentielService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getElementTerrains();
    this.initializeForm(null);
  }

  getElementTerrains() {
    this.referentielService.getAllElementTerrains().subscribe(
      (data: any[]) => {
        this.elementTerrains = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  initializeForm(elementTerrain: ElementTerrain | null){
    this.elementTerrainFormGroup =  this._formBuilder.group({
      id: [elementTerrain?.id ? elementTerrain.id : ''],
      libelle: [elementTerrain?.libelle ? elementTerrain.libelle : '', Validators.required],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload = this.elementTerrainFormGroup.value;
      this.referentielService.createElementTerrain(payload).subscribe({ 
        next: (data) =>{
          console.log('payload after : ',  data);
          if(data.statut === 'OK') {
            window.alert('element terrain créer avec succès')
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

  editModal(template: TemplateRef<any>, elementTerrain) {
    this.initializeForm(elementTerrain);
    this.elementTerrainId = elementTerrain.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editer() {
    const payload = this.elementTerrainFormGroup.value;
    this.referentielService.updateElementTerrain(this.elementTerrainId, payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('element terrain updated avec succès')
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

  deleteModal(template: TemplateRef<any>, elementTerrain) {
    this.elementTerrainId = elementTerrain.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteElementTerrain() {
    this.elementTerrains = this.elementTerrains.filter((a) => a.id !== this.elementTerrainId);
    this.referentielService.deleteElementPlainte(this.elementTerrainId).subscribe((data: any[]) => {
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
