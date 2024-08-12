import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategorieMedicament } from '../../models/categorie-medicament';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferentielService } from '../../service/referentiel.service';

@Component({
  selector: 'app-categorie-medicament',
  templateUrl: './categorie-medicament.component.html',
  styleUrls: ['./categorie-medicament.component.css']
})
export class CategorieMedicamentComponent implements OnInit {

  products = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  categoriesMedicamenets: CategorieMedicament[] = [];

  categorieMedicamentId: number;

  categoryMedicamentFormGroup!: FormGroup;

  constructor(
    private modalService: BsModalService,
    private referentielService: ReferentielService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategorieMedicaments();
    this.initializeForm(null);
  }

  initializeForm(categorieMedicament: CategorieMedicament | null){
    this.categoryMedicamentFormGroup =  this._formBuilder.group({
      id: [categorieMedicament?.id ? categorieMedicament.id : ''],
      code: [categorieMedicament?.code ? categorieMedicament.code: '', Validators.required],
      libelle: [categorieMedicament?.libelle ? categorieMedicament.libelle : '', Validators.required],
    });
  }


  getCategorieMedicaments() {
    this.referentielService.getAllCategoriesMedicaments().subscribe(
      (data: any[]) => {
        this.categoriesMedicamenets = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload = this.categoryMedicamentFormGroup.value;
      this.referentielService.createCategorieMedicament(payload).subscribe({ 
        next: (data) =>{
          console.log('payload after : ',  data);
          if(data.statut === 'OK') {
            window.alert('categorieMedicament créer avec succès')
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

  editModal(template: TemplateRef<any>, categorieMedicament) {
    console.log("categorieMedicament edit", categorieMedicament);
    this.initializeForm(categorieMedicament);
    this.categorieMedicamentId = categorieMedicament.id;
    console.log("categorieMedicament edit", this.categorieMedicamentId);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editer() {
    const payload = this.categoryMedicamentFormGroup.value;
      this.referentielService.updateCategorieMedicament(this.categorieMedicamentId, payload).subscribe({ 
        next: (data) =>{
          console.log('payload after : ',  data);
          if(data.statut === 'OK') {
            window.alert('Patient updated avec succès')
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

  deleteModal(template: TemplateRef<any>, categorieMedicament) {
    this.categorieMedicamentId = categorieMedicament.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteCategorieMedicament() {
    this.categoriesMedicamenets = this.categoriesMedicamenets.filter((a) => a.id !== this.id);
    this.referentielService.deleteCategorieMedicament(this.categorieMedicamentId).subscribe((data: any[]) => {
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
