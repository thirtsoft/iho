import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorageService } from 'src/app/admin/pages/services/local-storage.service';
import { ReferentielService } from 'src/app/admin/referentiel/service/referentiel.service';
import { ConsultationMedicalDetails } from '../../models/consultation-medical-details';
import { ConsultationService } from '../../service/consultation.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-details-consultation',
  templateUrl: './details-consultation.component.html',
  styleUrls: ['./details-consultation.component.css']
})
export class DetailsConsultationComponent implements OnInit {

  consultationMedicalDetails: ConsultationMedicalDetails;
  modalRef: BsModalRef;
  paramId: any = 0;
  userId: number;
  consultationId?: number;


  constructor(private consultationService: ConsultationService,
    private referentielService: ReferentielService,
    private localStorage: LocalStorageService,
  //  private toastr: ToastrService,
    public _formBuilder: FormBuilder,
    private ngbModalService: NgbModal,
    private modalService: BsModalService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public location: Location,
  ) {
    this.userId = this.localStorage.getItem('id');
    this.consultationId = Number(this.activatedRoute.snapshot.paramMap.get['id']);
    this.paramId = this.activatedRoute.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    if (this.paramId && this.paramId > 0) {
      this.getConsultationMedical(this.paramId);
    }
  }

  getConsultationMedical(consultationId: number) {
    this.consultationService.getConsultationMedicalDetails(consultationId).subscribe({
      next: (data) => {
        this.consultationMedicalDetails = data;
        console.log("Consultation details", this.consultationMedicalDetails);
      }
    });    
  }

  editerConsultation(hospitalisationId: number) {
    this.router.navigate(['/admin/consultation/edit', hospitalisationId]);
  }

  goToListeConsultations() {
    this.router.navigate(['/admin/consultations']);
  }

  decline() {
  }


}