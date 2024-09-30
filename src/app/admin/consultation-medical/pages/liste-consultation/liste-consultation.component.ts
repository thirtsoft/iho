import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorageService } from 'src/app/admin/pages/services/local-storage.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { EncodateLogo } from 'src/app/admin/core/interface/encodage-logo';
pdfMake!.vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';
import { HospitalisationService } from 'src/app/admin/hospitalisation/service/hospitalisation.service';
import { HospitalisationSearch } from 'src/app/admin/hospitalisation/models/hospitalisation-search';
import { ListeHospitalisation } from 'src/app/admin/hospitalisation/models/liste-hospitalisation';
import { ConsultationMedicalListe } from '../../models/consultation-medical-liste';
import { ConsultationService } from '../../service/consultation.service';


@Component({
  selector: 'app-liste-consultation',
  templateUrl: './liste-consultation.component.html',
  styleUrls: ['./liste-consultation.component.css']
})
export class ListeConsultationComponent implements OnInit {

  consultationMedicalList: ConsultationMedicalListe[] = [];
  errorMessage: string;
  modalRef: BsModalRef;
  consultationId: any; name : any;

  searchFormGroup = new FormGroup({
    etat: new FormControl(),
    codePatient: new FormControl(),
    dateDebut: new FormControl(),
    dateFin: new FormControl()
  });

  filterValues?: any;

  seachValue?: boolean;

  constructor(public consultationService: ConsultationService,
              private localStorage: LocalStorageService,
              private router: Router,
              private modalService: BsModalService
  ) { 
  }

  ngOnInit(): void {
    this.getConsultationMedicals();
  }

  get etat() { return this.searchFormGroup.get('etat'); }
  get codePatient() { return this.searchFormGroup.get('codePatient'); }
  get dateDebut() { return this.searchFormGroup.get('dateDebut'); }
  get dateFin() { return this.searchFormGroup.get('dateFin'); }

  getConsultationMedicals() {
    this.consultationService.getAllConsultationMedicals()
      .subscribe(res => {
        this.consultationMedicalList = res;
        this.seachValue = false;
        console.log(this.consultationMedicalList);
        $(function () {
          $("table").DataTable();
        });
    },
    error => this.errorMessage = <any>error);
  }

  ajouterConsultation() {
    this.router.navigate(['/admin/consultations/create']);
  }

  rechercherConsultation() {
    this.filterValues = {
      statusHospitalisation: this.etat.value,
      code: this.codePatient.value,
      from: this.dateDebut.value,
      to: this.dateFin.value
    }
    this.consultationService.getConsultationMedicalsByCritère(this.filterValues)
      .subscribe(res => {
        this.consultationMedicalList = res;
        this.seachValue = true;
        $(function () {
          $("table").DataTable();
        });
    },
    error => this.errorMessage = <any>error);
  }

  rafraichirHospitalisation() {
    this.ngOnInit();
  }


  editerConsultation(consultationId: number) {
    this.router.navigate(['/admin/consultations/edit', consultationId]);
  }

  voirDetailsConsultation(consultationId: number) {
    console.log("consultation id", consultationId);
    this.router.navigate(['/admin/consultations/details', consultationId]);
  }


  deleteModal(template: TemplateRef<any>, consultation) {
    this.consultationId = consultation.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteConsultation(consultationId: number){
    this.consultationService.deleteConsultationMedical(consultationId).subscribe(
      {
        next: () =>{
      //    this.toastr.success('success', `Suppression du patient effectué avec succès`);
          window.location.reload();
        },
        error: (error) =>{
          /*
           this.toastr.error('error', ` Erreur lors de la suppression du patient,
          Veuillez reessayer ulterieurement`);*/
        }
      }
    )
  }

  decline() {
    this.modalRef.hide();
  }

  ouvrirHospitalisation() {
    if(!this.seachValue) {
  //    pdfMake.createPdf(this.getDocumentHospitalisation()).open();
    }else {
  //   pdfMake.createPdf(this.getDocumentHospitalisation()).open();
    }
  }




}

