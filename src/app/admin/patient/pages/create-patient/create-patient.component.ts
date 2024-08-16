import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../../model/patient';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Utilisateur } from 'src/app/models/utilisateur';
import { CircuitPatient } from 'src/app/admin/dossier-medical/models/circuit-patient';
import { PatientService } from '../../service/patient.service';
import { CircuitPatientService } from 'src/app/admin/dossier-medical/service/circuit-patient.service';
import { LocalStorageService } from 'src/app/admin/pages/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  patientFormGroup!: FormGroup;

  errorMessage: string;
  modalRef: BsModalRef;
  patient?: Patient;

  patientId: number;

  patientCode!: string;

  civilites?: string[] = ["M.", "Mme"];

  situationMatrimoniaux?: string[] = ["Mariée", "Divorcée", "Célibataire", "Veuve"];

  typeSexe?: string[] = ["Homme", "Femme"];

  accompagnants = ['Oui','Non']

  today= new Date();

  userId?: number;

  matricule?: string;

  title = "Création d'un patient";

  estAccompagne: boolean = false;

  circuitPatient : CircuitPatient = {};
  circuitPatientFormGroup? : FormGroup;


  utilisateur: Utilisateur;

  numberOfPatient?: number;


  constructor(
    private patientService: PatientService,
    private circuitService: CircuitPatientService,
    private localStorage: LocalStorageService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private modalService: BsModalService,
    private route: ActivatedRoute,
) {
  this.userId = this.localStorage.getItem('id');
  this.matricule = this.localStorage.getItem('matricule');
  this.patientId = this.route.snapshot.params['id'];
  console.log(this.patientId);
}

  ngOnInit(): void {
    this.initializeForm(null);
    this.valuesBirthDayChange();
    if (this.patientId !== null) {
      this.getPatientById(this.patientId);
      this.title = 'Modification d\'un patient';
    }
  }

  getPatientById(patientId: number) {
    this.patientService.getPatientById(patientId).subscribe({ 
      next: (data) =>{
        this.patient = data;
        console.log(this.patient);
        this.initializeForm(this.patient);
      }
    });
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
      age: [patient?.age ? patient.age : 0],
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

  ajouterPatient() {
    const payload = this.patientFormGroup.value;
    console.log('payload');
    if (this.patientId === null || this.patientId === undefined) {
      this.patientService.createPatient(payload).subscribe({ 
        next: (data) =>{
          console.log('payload after : ',  data);
          if(data.statut === 'OK') {
            window.alert('Patient créer avec succès');
            this.router.navigate(['/admin/patients']);
          //  this.toastService.success('succès', 'Les informations du patient ont été enregistrées avec succès !!! ');
          }else if(data.statut === 'FAILED') {
        //    this.toastService.error('error', 'Erreur lors de la création : ' + data.message);
          }
        },
        error: (data) => {
          console.log('error', 'Erreur lors de la création : ' + data.error);
        //  this.toastService.error('error', 'Erreur lors de la création : ' + data.error);
      }
      });
    }else {
      this.patientService.updatePatientByAdministration(this.patientId, payload).subscribe({
        next: data => {
          window.alert('Patient updated avec succès');
          this.router.navigate(['/admin/patients']);
        //  this.toastService.success('success', 'Les informations du patient ont été mise à jour avec succès,');
        },
        error: error => {
          console.log(error);
      //    this.toastService.error('error', ` Erreur lors de la mise à jour des informations du patient, Veuillez reessayer ulterieurement`);
        }
      });
    }
  }


}
