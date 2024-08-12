import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Medicament } from '../../models/medicament';
import { CategorieMedicament } from '../../models/categorie-medicament';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferentielService } from '../../service/referentiel.service';

@Component({
  selector: 'app-medicament',
  templateUrl: './medicament.component.html',
  styleUrls: ['./medicament.component.css']
})
export class MedicamentComponent implements OnInit {

  products = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  medicaments: Medicament[] = [];

  categoryMedicaments: CategorieMedicament[] = [];

  medicamentId: number;

  medicamentFormGroup!: FormGroup;


  constructor(
    private modalService: BsModalService,
    private referentielService: ReferentielService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMedicaments();
    this.getCategoriesMedicaments();
    this.initializeForm(null);
  }

  getMedicaments() {
    this.referentielService.getAllMedicaments().subscribe(
      (data: any[]) => {
        this.medicaments = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  getCategoriesMedicaments() {
    this.referentielService.getAllCategoriesMedicaments().subscribe(
      (data: any[]) => {
        this.categoryMedicaments = data;
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  initializeForm(medicament: Medicament | null){
    this.medicamentFormGroup =  this._formBuilder.group({
      id: [medicament?.id ? medicament.id : ''],
      code: [medicament?.code ? medicament.code: '', Validators.required],
      libelle: [medicament?.libelle ? medicament.libelle : '', Validators.required],
      categoryMedicamentId: [medicament?.categoryMedicamentDs.id ? medicament.categoryMedicamentDs.id : '', Validators.required],
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload: Medicament = {
      id: this.medicamentFormGroup.get("id").value,
      code: this.medicamentFormGroup.get("code").value,
      libelle: this.medicamentFormGroup.get("libelle").value,
      categoryMedicamentDs: this.categoryMedicaments.filter(r => r.id == this.medicamentFormGroup.get("categoryMedicamentId").value)[0]
    }
    this.referentielService.createMedicament(payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('medicament créer avec succès')
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

  editModal(template: TemplateRef<any>, medicament) {
    this.initializeForm(medicament);
    this.medicamentId = medicament.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editer() {
    const payload: Medicament = {
      id: this.medicamentFormGroup.get("id").value,
      code: this.medicamentFormGroup.get("code").value,
      libelle: this.medicamentFormGroup.get("libelle").value,
      categoryMedicamentDs: this.categoryMedicaments.filter(r => r.id == this.medicamentFormGroup.get("categoryMedicamentId").value)[0]
    }
    console.log('payload updated : ',  payload);
    this.referentielService.updateMedicament(this.medicamentId, payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('medicament updated avec succès')
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


  deleteModal(template: TemplateRef<any>, medicament) {
    this.id = medicament.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteMedicament() {
    this.medicaments = this.medicaments.filter((a) => a.id !== this.id);
    this.referentielService.deleteMedicament(this.id).subscribe((data: any[]) => {
      this.modalRef.hide();
      this.getMedicaments();
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
