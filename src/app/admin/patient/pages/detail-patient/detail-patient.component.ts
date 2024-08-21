import { Component, OnInit, TemplateRef } from '@angular/core';
import { Patient } from '../../model/patient';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PatientService } from '../../service/patient.service';
import { LocalStorageService } from 'src/app/admin/pages/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detail-patient',
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.css']
})
export class DetailPatientComponent implements OnInit {

  errorMessage: string;
  modalRef: BsModalRef;
  patientDetails?: Patient;

  patientId: number;

  patientCode!: string;

  today= new Date();

  userId?: number;

  title = "Ajouter un patient";


  numberOfPatient?: number;

  id: any; name : any;

  constructor(
              private patientService: PatientService,
       //       private circuitService: CircuitPatientService,
              private localStorage: LocalStorageService,
              private router: Router,
              private _formBuilder: FormBuilder,
              private modalService: BsModalService,
              private activatedRouter: ActivatedRoute,
  ) { 
    this.patientId = this.activatedRouter.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.patientId) {
      this.getDetailsPatient(this.patientId);
    }
  }

  getDetailsPatient(patientId: number) {
    this.patientService.getPatientById(patientId)
      .subscribe(res => {
        this.patientDetails = res;
        console.log(res);
      },
      error => this.errorMessage = <any>error);
  }

  ajouterPatient() {
    this.router.navigate(['/admin/patients/create']);
  }

  editerPatient(patientId: number) {
    this.router.navigate(['/admin/patients/edit', patientId]);
  }

  voirDetailPatient(patientId: number) {
    this.router.navigate(['/admin/patients/details', patientId]);
  }


  deleteModal(template: TemplateRef<any>, patient) {
    this.id = patient.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }


  openDetailPatientDialog(item: Patient) {
    this.router.navigate(['/home/circuit/details/patient/', item.code]);
  }


  countNumberOfPatient(){
    this.patientService.getNumberOfPatient().subscribe(
      {
        next: (data) =>{
          this.numberOfPatient = data;
        },
        error: (error) =>{
          console.log(error);
        }
      }
    )
  }

  decline() {
    this.modalRef.hide();
  }

  images = [
    {
      path: 'assets/img/features/feature-01.jpg',
    },
    {
      path: 'assets/img/features/feature-02.jpg',
    },
    {
      path: 'assets/img/features/feature-03.jpg',
    },
    {
      path: 'assets/img/features/feature-04.jpg',
    },
  ];

  addFav() {}

}
