import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Patient } from 'src/app/admin/patient/model/patient';
import { PatientService } from 'src/app/admin/patient/service/patient.service';
import { CommonServiceService } from 'src/app/common-service.service';
import { CircuitPatientService } from '../../service/circuit-patient.service';
import { LocalStorageService } from 'src/app/admin/pages/services/local-storage.service';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/admin/pages/models/utilisateur';

@Component({
  selector: 'app-dossiers-medicals',
  templateUrl: './dossiers-medicals.component.html',
  styleUrls: ['./dossiers-medicals.component.css']
})
export class DossiersMedicalsComponent implements OnInit {

  patientsList: Patient[] = [];
  errorMessage: string;
  modalRef: BsModalRef;
  patient?: Patient;

  patientId: number;

  patientCode!: string;

  today= new Date();

  userId?: number;

  matricule?: string;

  title = "Ajouter un patient";


//  circuitPatient : CircuitPatient = {};
  circuitPatientFormGroup? : FormGroup;


  utilisateur: Utilisateur;

  numberOfPatient?: number;

  id: any; name : any;

  constructor(public commonService: CommonServiceService,
              private patientService: PatientService,
              private circuitService: CircuitPatientService,
              private localStorage: LocalStorageService,
              private router: Router,
              private _formBuilder: FormBuilder,
              private modalService: BsModalService
  ) { 
  }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.patientService.getAllPatients()
      .subscribe(res => {
        this.patientsList = res;
        $(function () {
          $("table").DataTable();
        });
      },
      error => this.errorMessage = <any>error);
  }


  voirDetailPatient(patientId: number) {
    this.router.navigate(['/admin/dossiers-medicals/details', patientId]);
  }

  decline() {
    this.modalRef.hide();
  }

}
