import { Component, OnInit, TemplateRef } from '@angular/core';
import { Patient } from '../../model/patient';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from 'src/app/models/utilisateur';
import { CommonServiceService } from 'src/app/common-service.service';
import { PatientService } from '../../service/patient.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/admin/pages/services/local-storage.service';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css']
})
export class ListPatientComponent implements OnInit {

  patientsList: Patient[] = [];
  errorMessage: string;
  modalRef: BsModalRef;
  patient?: Patient;

  patientId: number;

  patientCode!: string;

  patientFormGroup!: FormGroup;

  civilites?: string[] = ["M.", "Mme"];

  situationMatrimoniaux?: string[] = ["Mariée", "Divorcée", "Célibataire", "Veuve"];

  typeSexe?: string[] = ["Homme", "Femme"];

  accompagnants = ['Oui','Non']

  today= new Date();

  userId?: number;

  matricule?: string;

  title = "Ajouter un patient";

  estAccompagne: boolean = false;

//  circuitPatient : CircuitPatient = {};
  circuitPatientFormGroup? : FormGroup;


  utilisateur: Utilisateur;

  numberOfPatient?: number;

  constructor(public commonService: CommonServiceService,
              private patientService: PatientService,
       //       private circuitService: CircuitPatientService,
              private localStorage: LocalStorageService,
              private router: Router,
              private _formBuilder: FormBuilder,
              private modalService: BsModalService
  ) { 
    this.userId = this.localStorage.getItem('id');
    this.matricule = this.localStorage.getItem('matricule');
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
    this.initializeForm(null);
    this.valuesBirthDayChange();
  }

  initializeForm(patient: Patient | null){
    this.patientFormGroup =  this._formBuilder.group({
      id: [patient?.id ? patient.id : ''],
      code: [patient?.code ? patient.code: '', Validators.required],
      prenom: [patient?.prenom ? patient.prenom : '', Validators.required],
      nom: [patient?.nom ? patient.nom : '', Validators.required],
      sexe: [patient?.sexe ? patient.sexe : '', Validators.required],
      civilite: [patient?.civilite ? patient.civilite : '', Validators.required],
      address: [patient?.address ? patient.address : ''],
      dateNaissance: [new Date(patient?.dateNaissance!)],
      age: [0],
      numeroTelephone: [patient?.numeroTelephone, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]],
      profession: [patient?.profession ? patient.profession : ''],
      situationMatrimonial: [patient?.situationMatrimonial ? patient.situationMatrimonial : '', Validators.required],
      est_accompagne: [patient?.est_accompagne ? patient?.est_accompagne : ''],
      nationalite: [patient?.nationalite ? patient?.nationalite : ''],
      personneConfianceDs: this._formBuilder.group({
        prenom: [patient?.personneConfianceDs?.prenom],
        nom: [patient?.personneConfianceDs?.nom],
        telephone: [patient?.personneConfianceDs?.telephone],
        email: [patient?.personneConfianceDs?.email],
      }),
    });
  }

  calculateAgeOfPatient() {
    if (this.patientFormGroup.controls['dateNaissance'].value != 0) {
      const dateNaissance = this.patientFormGroup.get('dateNaissance')!.value;
      var timeDiff = Math.abs(Date.now() - new Date(dateNaissance).getTime());
      const age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      this.patientFormGroup.get('age')!.setValue(age);
    }
  }

  valuesBirthDayChange() {
    this.patientFormGroup.get('dateNaissance')!.valueChanges.subscribe((res:any)=>{
      this.calculateAgeOfPatient()
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  save() {
    const payload = this.patientFormGroup.value;
    if (this.patientId === null) {
      this.patientService.createPatient(payload).subscribe({ 
        next: (data) =>{
          console.log('payload after : ',  data);
          if(data.statut === 'OK') {
            window.alert('Patient créer avec succès')
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
    }else {
      this.patientService.updatePatientByAdministration(this.patientId, payload).subscribe({
        next: data => {
          window.alert('Patient updated avec succès')
        //  this.toastService.success('success', 'Les informations du patient ont été mise à jour avec succès,');
        },
        error: error => {
          console.log(error);
      //    this.toastService.error('error', ` Erreur lors de la mise à jour des informations du patient, Veuillez reessayer ulterieurement`);
        }
      });
    }
    this.modalRef.hide();
    this.ngOnInit();
   

   // this.modalRef.hide();
  }

  id: any; name : any;

  editModal(template: TemplateRef<any>, patient) {
    console.log("Patient edit", patient);
    this.patientId = patient.id;
    this.initializeForm(patient);
    this.valuesBirthDayChange();
    this.modalRef = this.modalService.show(template, {
      class: 'modal-lg modal-dialog-centered',
    });
  }

  deleteModal(template: TemplateRef<any>, patient) {
    this.id = patient.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  exporterPdf() {
    this.patientService.exporterPdfPatient()
    .subscribe(
      (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);
        var a         = document.createElement('a');
        a.href        = fileURL; 
        a.target      = '_blank';
        a.download    = 'List-Patient.pdf';
        document.body.appendChild(a);
        a.click();
    //    this.toastr.success('avec succès!', 'L\'export du pdf est fait !');
      },  
    );

  }


  exporterExcel(): void {
    this.patientService
      .exporterExcelPatient()
      .subscribe(response => this.downloadExportPatientsFile(response));
    //  this.toastr.success('avec succès!', 'L\'export excel est fait !');
  }

  private downloadExportPatientsFile(response: Blob): void {
    const blob = new Blob([response], { type: 'application/octet-stream' });
   // saveAs(blob, 'liste_patient.csv');
  }

  /*
  exporterHospitalisationToExcel() {
    this.circuitService.exporterHospitalisationPatientToExcel().subscribe({
      next: (response)=> {
        this.downloadExportHospitalisationsFile(response);
      }
    })
  }

  private downloadExportHospitalisationsFile(response: Blob): void {
    const blob = new Blob([response], { type: 'application/octet-stream' });
    saveAs(blob, 'liste_hospitalisation_patient.csv');
  }

  exporterDossierMedicToExcel() {
    this.circuitService.exporterDossierMedicalPatientToExcel().subscribe({
      next: (response)=> {
        this.downloadExportedDossierMedicalFile(response);
      }
    })
  }

  private downloadExportedDossierMedicalFile(response: Blob): void {
    const blob = new Blob([response], { type: 'application/octet-stream' });
    saveAs(blob, 'liste_des_patients.csv');
  }

  generatedCircuitPatient(item: Patient) {
    this.circuitPatientFormGroup =  this._formBuilder.group({
      code: [item?.code ? item.code: '', Validators.required],
      matricule: [this.matricule ? this.matricule : '', Validators.required],
    //  createdBy: [this.userId, Validators.required]
    });
    const payload = this.circuitPatientFormGroup.value;
    if (payload != null) {
      this.circuitService.createCircuitPatient(payload).subscribe({
        next: data => {
          this.toastr.success('success', 'Le circuit de ce patient a été généré avec succès.');
          this.router.navigate(['/home/circuit/details/', data.id]);
        },
        error: error => {
          this.toastr.error('error', 'Erreur lors de la génération du circuit, Veuillez reessayer ulterieurement');
        }
      });
    } else {
      this.toastr.error('error', 'Impossible de généré un circuit sans donné , Veuillez reessayer ulterieurement');
    }
  }
    */

  openDetailPatientDialog(item: Patient) {
    this.router.navigate(['/home/circuit/details/patient/', item.code]);
  }

  deletePatient(patientId: number){
    this.patientService.deletePatient(patientId).subscribe(
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

}
