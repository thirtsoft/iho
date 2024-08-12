import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServicesPartenaire } from '../../models/services-partenaire';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferentielService } from '../../service/referentiel.service';

@Component({
  selector: 'app-services-partenaire',
  templateUrl: './services-partenaire.component.html',
  styleUrls: ['./services-partenaire.component.css']
})
export class ServicesPartenaireComponent implements OnInit {

  products = [];
  modalRef: BsModalRef;
  errorMessage: string;
  name;
  id;
  key;

  servicePartenaires: ServicesPartenaire[] = [];

  servicePartenaireId: number;

  servicePartenaireFormGroup!: FormGroup;

  constructor(
    private modalService: BsModalService,
    private referentielService: ReferentielService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getServicePartenaires();
    this.initializeForm(null);
  }

  getServicePartenaires() {
    this.referentielService.getAllServicePartenaires().subscribe(
      (data: any[]) => {
        this.servicePartenaires = data;
        $(function () {
          $('table').DataTable();
        });
      },
      (error) => (this.errorMessage = <any>error)
    );
  }

  initializeForm(servicePartenaire: ServicesPartenaire | null){
    this.servicePartenaireFormGroup =  this._formBuilder.group({
      id: [servicePartenaire?.id ? servicePartenaire.id : ''],
      code: [servicePartenaire?.code ? servicePartenaire.code: '', Validators.required],
      libelle: [servicePartenaire?.libelle ? servicePartenaire.libelle: '', Validators.required],
      description: [servicePartenaire?.description ? servicePartenaire.description : '', Validators.required],
    });
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload = this.servicePartenaireFormGroup.value;
    this.referentielService.createServicePartenaire(payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('servicePartenaire créer avec succès')
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

  editModal(template: TemplateRef<any>, servicePartenaire) {
    this.initializeForm(servicePartenaire);
    this.servicePartenaireId = servicePartenaire.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  editer() {
    const payload = this.servicePartenaireFormGroup.value;
    this.referentielService.updateServicePartenaire(this.servicePartenaireId, payload).subscribe({ 
      next: (data) =>{
        console.log('payload after : ',  data);
        if(data.statut === 'OK') {
          window.alert('servicePartenaire updated avec succès')
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

  deleteModal(template: TemplateRef<any>, servicePartenaire) {
    this.id = servicePartenaire.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteServicePartenaire() {
    this.servicePartenaires = this.servicePartenaires.filter((a) => a.id !== this.id);
    this.referentielService.deleteServicePartenaire(this.id).subscribe((data: any[]) => {
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
