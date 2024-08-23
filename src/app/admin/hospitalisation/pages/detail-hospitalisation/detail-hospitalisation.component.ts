import { Component, OnInit, TemplateRef } from '@angular/core';
import { DetailHospitalisation } from '../../models/detail-hospitalisation';
import { HospitalisationService } from '../../service/hospitalisation.service';
import { LocalStorageService } from 'src/app/admin/pages/services/local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CloturerHospitalisationComponent } from '../../components/cloturer-hospitalisation/cloturer-hospitalisation.component';
import { TransfereHospitalisationComponent } from '../../components/transfere-hospitalisation/transfere-hospitalisation.component';
import TransferePayload from '../../models/transfere-payload';
import { ServicesPartenaire } from 'src/app/admin/referentiel/models/services-partenaire';
import { ReferentielService } from 'src/app/admin/referentiel/service/referentiel.service';

@Component({
  selector: 'app-detail-hospitalisation',
  templateUrl: './detail-hospitalisation.component.html',
  styleUrls: ['./detail-hospitalisation.component.css']
})
export class DetailHospitalisationComponent implements OnInit {

  hospitalisation: DetailHospitalisation;
  modalRef: BsModalRef;
  paramId: any = 0;

  userId: number;

  hospitalisationId?: number;

  transfereFormGroup: FormGroup;
  clotureFormGroup: FormGroup;
  servicePartenaires: ServicesPartenaire[];
  motifsCloture: string[] = ["Guéri", "Décès"];

  constructor(private hospitalisationService: HospitalisationService,
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
    this.hospitalisationId = Number(this.activatedRoute.snapshot.paramMap.get['id']);
    this.paramId = this.activatedRoute.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    this.getServicePartenaires();
    if (this.paramId && this.paramId > 0) {
      this.getHospitalisation(this.paramId);
    }
  }

  getHospitalisation(hospitalisationId: number) {
    this.hospitalisationService.getHospitalisationById(hospitalisationId).subscribe({
      next: (data) => {
        this.hospitalisation = data;
        console.log(this.hospitalisation);
      }
    });    
  }

  getServicePartenaires(){
    this.referentielService.getAllServicePartenaires().subscribe({
      next: (data) => {
        this.servicePartenaires = data;
      },
      error: (error) => {console.log(error)},
    })
  }

  editerHostpitalisation(hospitalisationId: number) {
    this.router.navigate(['/admin/hospitalisations/edit', hospitalisationId]);
  }

  save() {

  }

  decline() {
  }

  initializeForm(data: TransferePayload | null){
    this.transfereFormGroup =  this._formBuilder.group({
      serviceId: [data?.serviceId ? data.serviceId: '', Validators.required],
      motif: [data?.motif ? data.motif : '', Validators.required],
    });
  }

  transfererHospitalisationModal(template: TemplateRef<any>, any) {
    this.initializeForm(null);
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  transfer() {
    const values = this.transfereFormGroup.value;
    const payload: TransferePayload = {
      serviceId: values.serviceId,
      motif: values.motif
    };
    console.log("Transfere", payload);
    this.hospitalisationService.transfererHospitalisation().subscribe({
      next: (data) => {
        if (data === true) {
          this.getHospitalisation(this.paramId);
        }
      },
      error: (error) => {console.log(error)},
    })
  }

  cloturerrHospitalisationModal(template: TemplateRef<any>, any) {
    this.clotureFormGroup =  this._formBuilder.group({
      motif: ['', Validators.required],
    });
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  cloturer() {
    const payload = this.clotureFormGroup.get('motif').value;
    console.log("Clorer", payload);
    return;
    if (this.paramId && payload === null) {
      window.alert("Le motif de la cloture est est obligatoire");
    } else {
      this.hospitalisationService.cloturerHospitalisation(this.paramId, payload).subscribe({
        next: (response) => {
          if (response === true) {
            this.getHospitalisation(this.paramId)
          }
        },
        error: (error) => {
          console.log("Error");
        }
      });
    }
  }

  transfererHospitalisationDialog() {
    const modelRef = this.ngbModalService.open(TransfereHospitalisationComponent, { size: 'lg'});
    modelRef.componentInstance.hospitalisationId = this.hospitalisation?.id;
    modelRef.componentInstance.numeroHospitalisation = this.hospitalisation?.numeroHospitalisation;
    modelRef.componentInstance.patient = this.hospitalisation.nomCompletPatient;
    modelRef.result.then(data => {
      if (data === 'success') {
        this.getHospitalisation(this.paramId);
      }
    })
  }

  cloturerHospitalisationDialog() {
    const modelRef = this.ngbModalService.open(CloturerHospitalisationComponent, { size: 'lg'});
    modelRef.componentInstance.hospitalisationId = this.hospitalisation?.id;
    modelRef.result.then(data => {
      if (data === 'success') {
        this.getHospitalisation(this.paramId);
      }
    })
  }

  goToListeHospitalisations() {
    this.router.navigate(['/admin/hospitalisations']);
  }

}
