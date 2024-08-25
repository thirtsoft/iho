import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { CommonServiceService } from 'src/app/common-service.service';
import { Location } from '@angular/common';
import { Hospitalisation } from '../../models/hospitalisation';
import { ObservationClinique } from '../../models/observation-clinique';
import { ExamenComplementaire } from '../../models/examen-complementaire';
import { TraitementMedical } from '../../models/traitement-medical';
import { Medicament } from 'src/app/admin/referentiel/models/medicament';
import { Discussion } from '../../models/discussion';
import { Synthese } from '../../models/synthese';
import { CircuitPatient } from 'src/app/admin/dossier-medical/models/circuit-patient';
import { Patient } from 'src/app/admin/patient/model/patient';
import { HospitalisationService } from '../../service/hospitalisation.service';
import { PatientService } from 'src/app/admin/patient/service/patient.service';
import { CircuitPatientService } from 'src/app/admin/dossier-medical/service/circuit-patient.service';
import { LocalStorageService } from 'src/app/admin/pages/services/local-storage.service';
import { ReferentielService } from 'src/app/admin/referentiel/service/referentiel.service';
import { Chambre } from 'src/app/admin/referentiel/models/chambre';
import { Lit } from 'src/app/admin/referentiel/models/lit';
import { ServicesPartenaire } from 'src/app/admin/referentiel/models/services-partenaire';
import { Utilisateur } from 'src/app/admin/pages/models/utilisateur';

enum HospitalisationFileType {
  BIOLOGIE = 1,
  IMMUNOLOGIE = 2,
  IMAGERIE = 3,
  ANATOLOGIE = 4,
}

@Component({
  selector: 'app-create-hospitalisation',
  templateUrl: './create-hospitalisation.component.html',
  styleUrls: ['./create-hospitalisation.component.css']
})
export class CreateHospitalisationComponent implements OnInit {

  
  hospitalisation: Hospitalisation;

  editHospitalisation: Hospitalisation;

  observationClinique: ObservationClinique;

  examenComplementaire: ExamenComplementaire = {};

  traitement!: TraitementMedical;
  medicaments: Medicament[] = [];
  filteredMedicaments:  Medicament[] = [];

  discussion: Discussion = {};

  synthese: Synthese = {};

  circuit: CircuitPatient = {};

  paramId: any = 0;

  codePatient?: string;

  userId: number;

  utilisateur: Utilisateur;

  matricule?: string;

  hospitalisationId?: number;

  patient?: Patient;

  patientList?: Patient [];

  chambres: Chambre[];

  chambreId: number;

  lits: Lit[];

  litId: number;

  estTransferer: number;

  servicePartenaires: ServicesPartenaire[];

  servicePartenaireId: number;

  libellesMotifs: string[] = [];
  maladiesAntecedents: string[] = [];
  chirurgiesAntecedent: string[] = [];
  gynecologiquesAntecedent: string[] = [];
  familialsAntecedentAscendant: string[] = [];
  familialsAntecedentCollateral: string[] = [];
  familialsAntecedentDescendant: string[] = [];
  examensGenerals: string[] = [];
  examensAppareils: string[] = [];
  listModeVies: string[] = [];

  patientFormGroup: FormGroup;

  observationCliniqueFormGroup!: FormGroup;

  examenComplementaireFormGroup!: FormGroup;

  traitementFormGroup!: FormGroup;

  discussionFormGroup!: FormGroup;

  syntheseFormGroup!: FormGroup;  

  protocoleFile!: File;
  protocoleFilename!: string;

  biologieFile!: File;
  biologieFilename!: string;

  immunologieFile!: File;
  immunologieFilename!: string;

  imagerieFile!: File;
  imagerieFilename!: string;

  anatomopathologieFile!: File;
  anatomopathologieFilename!: string;

  currentStep: number = 0;

  endStep: boolean = false;

  constructor(private hospitalisationService: HospitalisationService,
    private patientService: PatientService,
    private referentielService: ReferentielService,
    private circuitService: CircuitPatientService,
    private localStorage: LocalStorageService,
  //  private toastr: ToastrService,
    public _formBuilder: FormBuilder,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
  //  public dialog: MatDialog,
    public location: Location,
  ) {
    this.userId = this.localStorage.getItem('id');
    this.hospitalisationId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.paramId = this.activatedRoute.snapshot.paramMap.get('id');
  //  this.codePatient = this.localStorage.getItem('codePatient');
  }


  ngOnInit(): void {
    this.formateJS();
    this.initpatientFormGroup();
    this.initObservationCliniqueFormGroup();
    this.initExamenComplementaireFormGroup();
    this.initTraitementFormGroup();
    this.initDiscussionFormGroup();
    this.initSyntheseFormGroup();
   /*
    if (this.codePatient != null) {
      this.getPatientByIndex(this.codePatient);
      this.getCircuitByPatient(this.codePatient);
    }*/
    this.getMedicaments();
    this.getPatients();
    this.getChambres();
  //  this.getServicePartenaires();
    if (this.paramId && this.paramId > 0) {
      this.getHospitalisation(this.paramId);
    }
  }

  initpatientFormGroup() {
    this.patientFormGroup = this._formBuilder.group({
      code: ['', Validators.required],
    });
  }

  initObservationCliniqueFormGroup() {
    this.observationCliniqueFormGroup = this._formBuilder.group({
      histoireMaladie: [''],
      motifsHospitalisation: [''],
      antecedentDs: this._formBuilder.group({
        antecedentsMedicaux: [''],
        antecedentsChirurgicaux: [''],
        antecedentsGynecologiques: [''],
        antecedentsFamilialsAscendant: [''],
        antecedentsFamilialsCollateral: [''],
        antecedentsFamilialsDescendant: [''],
        modeVies: [''],
      }),
      examenPhysiqueDs: this._formBuilder.group({
        examenGeneral: [],
        examenAppareil: [],
        pressionArterielS: [],
        pressionArterielD: [],
        temperature: [],
        frequenceC: [],
        frequenceR: [],
        saturationOxygene: [],
        diurese: [],
        poids: [],
        taille: [],
        imc: [],
        tourTaille: [],
        tourHanche: [],
        glycemie: [],
      }),
    });
  }

  initExamenComplementaireFormGroup() {
    this.examenComplementaireFormGroup = this._formBuilder.group({
      biologie: [],
      biologieFileName: [''],
      immunologie: [''],
      immunologieFileName: [''],
      imagerie: [''],
      imagerieFileName: [''],
      anatomopathologie: [''],
      anatomopathologieFileName: [''],
    });
  }

  initTraitementFormGroup() {
    this.traitementFormGroup = this._formBuilder.group({
      protocole: [''],
      protocoleFileName: [''],
      traitementMedicalItemDs: this._formBuilder.array([
        this.newTraitementMedicalItem()
      ])
    });
  }

  initDiscussionFormGroup() {
    this.discussionFormGroup = this._formBuilder.group({
      id: [],
      resume: ['', Validators.required],
    });
  }

  initSyntheseFormGroup() {
    this.syntheseFormGroup = this._formBuilder.group({
      id: [],
      observation: ['', Validators.required],
    });
  }

  getPatientByIndex(code: string) {
    this.patientService.getPatientByIndex(code).subscribe(
      {
        next: (response) => {
          this.patient = response;
        }
      }
    );
  }

  getCircuitByPatient(code?: string) {
    this.circuitService.getCircuitPatientByPatient(code).subscribe(
      {
        next: (response) => {
          this.circuit = response;
        }
      }
    );
  }

  getPatients() {
    this.patientService.getAllPatientsOrderDesc().subscribe({
      next: (data) => {
        this.patientList = data;
        console.log(this.patientList);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  changerIndexPatient(event: any) {
    this.codePatient = this.getStringValue(event);
    console.log(this.codePatient);
  }

  getChambres() {
    this.referentielService.getAllChambres().subscribe({
      next: (data) => {
        this.chambres = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  chargerLits(event: any) {
    this.chambreId = this.getValue(event);
    this.getLitsByChambre(this.chambreId)
  }

  getLitsByChambre(chambreId: number){
    this.referentielService.getAllLitByChambre(chambreId).subscribe({
      next: (data) => {
        this.lits = data;
      },
      error: (error) => {console.log(error)},
    })
  }

  changerLits(event: any) {
    this.litId = this.getValue(event);
  }

  changerTransfere(event: any) {
    this.estTransferer = this.getValue(event);
    if (this.estTransferer === 1) {
      this.getServicePartenaires();
    }else {
      this.servicePartenaireId = 1;
    }
  }

  getServicePartenaires(){
    this.referentielService.getAllServicePartenaires().subscribe({
      next: (data) => {
        this.servicePartenaires = data;
      },
      error: (error) => {console.log(error)},
    })
  }

  changerServicePartenaire(event: any) {
    this.servicePartenaireId = this.getValue(event);
  }

  getMedicaments() {
    this.referentielService.getAllMedicamentsOrderDesc().subscribe({
      next: (data) => {
        this.medicaments = data;
        this.filteredMedicaments = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getHospitalisation(hospitalisationId: number) {
    this.hospitalisationService.getHospitalisationById(hospitalisationId).subscribe({
      next: (data) => {
        this.editHospitalisation = data;
        if (this.editHospitalisation != null) {
          this.observationCliniqueFormGroup = this._formBuilder.group({
            id: [this.editHospitalisation.observationCliniqueDs?.id],
            histoireMaladie: [this.editHospitalisation.observationCliniqueDs?.histoireMaladie, Validators.required],
            motifsHospitalisation: [this.editHospitalisation.observationCliniqueDs?.motifsHospitalisation, Validators.required],
            antecedentDs: this._formBuilder.group({
              id: [this.editHospitalisation.observationCliniqueDs?.antecedentDs?.id],
              antecedentsMedicaux: [this.editHospitalisation.observationCliniqueDs?.antecedentDs?.antecedentsMedicaux],
              antecedentsChirurgicaux: [this.editHospitalisation.observationCliniqueDs?.antecedentDs?.antecedentsChirurgicaux],
              antecedentsGynecologiques: [this.editHospitalisation.observationCliniqueDs?.antecedentDs?.antecedentsGynecologiques],
              antecedentsFamilialsAscendant: [this.editHospitalisation.observationCliniqueDs?.antecedentDs?.antecedentsFamilialsAscendant],
              antecedentsFamilialsCollateral: [this.editHospitalisation.observationCliniqueDs?.antecedentDs?.antecedentsFamilialsCollateral],
              antecedentsFamilialsDescendant: [this.editHospitalisation.observationCliniqueDs?.antecedentDs?.antecedentsFamilialsDescendant],
              modeVies: [this.editHospitalisation.observationCliniqueDs?.antecedentDs?.modeVies],
            }),
            examenPhysiqueDs: this._formBuilder.group({
              id: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.id],
              examenGeneral: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.examenGeneral],
              examenAppareil: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.examenAppareil],
              pressionArterielS: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.pressionArterielS],
              pressionArterielD: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.pressionArterielD],
              temperature: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.temperature],
              frequenceC: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.frequenceC],
              frequenceR: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.frequenceR],
              saturationOxygene: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.saturationOxygene],
              diurese: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.diurese],
              poids: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.poids],
              imc: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.imc],
              tourTaille: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.tourTaille],
              taille: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.taille],
              tourHanche: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.tourHanche],
              glycemie: [this.editHospitalisation.observationCliniqueDs?.examenPhysiqueDs?.glycemie],
            }),
          });
          this.examenComplementaireFormGroup = this._formBuilder.group({
            id: [this.editHospitalisation.examenComplementaireDs?.id],
            biologie: [this.editHospitalisation.examenComplementaireDs?.biologie],
            biologieFileName: [this.editHospitalisation.examenComplementaireDs?.biologieFileName],
            immunologie: [this.editHospitalisation.examenComplementaireDs?.immunologie],
            immunologieFileName: [this.editHospitalisation.examenComplementaireDs?.immunologieFileName],
            imagerie: [this.editHospitalisation.examenComplementaireDs?.imagerie],
            imagerieFileName: [this.editHospitalisation.examenComplementaireDs?.imagerieFileName],
            anatomopathologie: [this.editHospitalisation.examenComplementaireDs?.anatomopathologie],
            anatomopathologieFileName: [this.editHospitalisation.examenComplementaireDs?.anatomopathologieFileName],
          });
          this.traitementFormGroup = this._formBuilder.group({
            id: [this.editHospitalisation.traitementMedicalDs?.id],
            protocole: [this.editHospitalisation.traitementMedicalDs?.protocole],
            protocoleFileName: [this.editHospitalisation.traitementMedicalDs?.protocoleFileName],
            traitementMedicalItemDs: this._formBuilder.array([])
          });
          for (let i = 0; i < this.editHospitalisation.traitementMedicalDs!.traitementMedicalItemDs!.length; i++) {
            (this.traitementFormGroup.get('traitementMedicalItemDs') as FormArray).push(
              this._formBuilder.group({
                id: [this.editHospitalisation.traitementMedicalDs!.traitementMedicalItemDs![i].id],
                medicamendId: [this.editHospitalisation.traitementMedicalDs!.traitementMedicalItemDs![i].medicamendId],
                psologie: [this.editHospitalisation.traitementMedicalDs!.traitementMedicalItemDs![i].psologie],
                nbrePrise: [this.editHospitalisation.traitementMedicalDs!.traitementMedicalItemDs![i].nbrePrise],
                administrePar: [this.editHospitalisation.traitementMedicalDs?.traitementMedicalItemDs![i].administrePar],
                est_administre: [this.editHospitalisation.traitementMedicalDs!.traitementMedicalItemDs![i].est_administre],
              })
            )
          }
          this.discussionFormGroup = this._formBuilder.group({
            id: [this.editHospitalisation.discussionDs?.id],
            resume: [this.editHospitalisation.discussionDs?.resume],
          });
          this.syntheseFormGroup = this._formBuilder.group({
            id: [this.editHospitalisation.syntheseDs?.id],
            observation: [this.editHospitalisation.syntheseDs?.observation]
          });
          this.editHospitalisation?.chambreId && this.chargerLits(this.editHospitalisation.chambreId);
        }     
      }

    }
  )    
  }

  //
  valuesMontantIMC() {
    this.observationCliniqueFormGroup?.get('examenPhysiqueDs')?.get('poids')!.valueChanges.subscribe((res: any) => {
      this.calculerIMC()
    })
    this.observationCliniqueFormGroup?.get('examenPhysiqueDs')?.get('taille')!.valueChanges.subscribe((res: any) => {
      this.calculerIMC()
    })
  }

  calculerIMC() {
    const poids = Number(this.observationCliniqueFormGroup?.get('examenPhysiqueDs')?.get('poids')?.value);
    const taille = Number(this.observationCliniqueFormGroup?.get('examenPhysiqueDs')?.get('taille')?.value);
    const imc: any = Number(poids / (taille * taille));
    this.observationCliniqueFormGroup?.get('examenPhysiqueDs')?.get('imc')!.setValue(imc, { onlySelf: true, emitEvent: true });
  }

  onRemoveFile(event: any, type: HospitalisationFileType) {
    switch (type) {
      case 1: type == HospitalisationFileType.BIOLOGIE;
        this.biologieFilename = '';
        this.biologieFile = null;
      break;
      case 2: type == HospitalisationFileType.IMMUNOLOGIE;
        this.immunologieFilename = '';
        this.immunologieFile = null;
      break;
      case 3: type == HospitalisationFileType.IMAGERIE;
        this.imagerieFilename = '';
        this.imagerieFile = null;
      break;
      case 4: type == HospitalisationFileType.ANATOLOGIE;
        this.anatomopathologieFilename = '';
        this.anatomopathologieFile = null;
      break;
    }
   
  }
  //Examen physique

  onBiologieFileSelected(event: any) {
    this.biologieFile = event.target.files[0];
    this.examenComplementaireFormGroup.get('biologieFileName')?.setValue(this.biologieFile.name);
  }

  uploadBiologicFile(hospitalisationId: number, formData: FormData) {
    this.hospitalisationService.uploadBiologicFile(hospitalisationId, formData).subscribe({
      next: data => {},
      error: error => {console.log(error)},
    });
  }

  onImmunologieFileSelected(event: any) {
    this.immunologieFile = event.target.files[0];
    this.immunologieFilename = this.immunologieFile.name;
    this.examenComplementaireFormGroup.get('immunologieFileName')?.setValue(this.immunologieFile.name);
  }

  uploadImmunologieFile(hospitalisationId: number, formData: FormData) {
    this.hospitalisationService.uploadImmunologieFile(hospitalisationId, formData).subscribe({
      next: data => {},
      error: error => {console.log(error)},
    });
  }

  onImagerieFileSelected(event: any) {
    this.imagerieFile = event.target.files[0];
    this.imagerieFilename = this.imagerieFile.name;
    this.examenComplementaireFormGroup.get('imagerieFileName')?.setValue(this.imagerieFile.name);
  }

  uploadImagerieFile(hospitalisationId: number, formData: FormData) {
    this.hospitalisationService.uploadImagerieFile(hospitalisationId, formData).subscribe({
      next: data => {},
      error: error => {console.log(error)},
    });
  }


  onAnatomopathologieFileSelected(event: any) {
    this.anatomopathologieFile = event.target.files[0];
    this.examenComplementaireFormGroup.get('anatomopathologieFileName')?.setValue(this.anatomopathologieFile.name);
  }

  uploadAnatomologieFile(hospitalisationId: number, formData: FormData) {
    this.hospitalisationService.uploadAnatomologieFile(hospitalisationId, formData).subscribe({
      next: data => {},
      error: error => {console.log(error)},
    });
  }

  // Traitement Items

  traitementMedicalItemDs(): FormArray {
    return this.traitementFormGroup.get('traitementMedicalItemDs') as FormArray;
  }

  newTraitementMedicalItem(): FormGroup {
    return this._formBuilder.group({
      medicamendId: ['', Validators.required],
      psologie: ['', Validators.required],
      nbrePrise: ['', Validators.required],
      administrePar: ['', Validators.required],
      est_administre: [Validators.required]
    })
  }

  onAddTraitementMedicalItem() {
    console.log("New traitement", this.newTraitementMedicalItem().value);
    this.traitementMedicalItemDs().push(this.newTraitementMedicalItem());
  }

  removeTraitementMedicalItem(traitemenetItemIndex: number) {
    this.traitementMedicalItemDs().removeAt(traitemenetItemIndex);
  }

  onProtocoleFileSelected(event: any) {
    this.protocoleFile = event.target.files[0];
    this.traitementFormGroup.get('protocoleFileName')?.setValue(this.protocoleFile.name);
  }

  uploadProtocoleFile(traitementId: number, formData: FormData) {
    this.hospitalisationService.uploadProtocoleTraitementFile(traitementId, formData).subscribe({
      next: data => {},
      error: error => {console.log(error)},
    });
  }

  saveHospitalisation() { 
    if (this.paramId) {
      this.editHospitalisation.observationCliniqueDs = this.observationCliniqueFormGroup.getRawValue();
      this.editHospitalisation.examenComplementaireDs = this.examenComplementaireFormGroup.getRawValue();
      this.editHospitalisation.traitementMedicalDs = this.traitementFormGroup.getRawValue();
      this.editHospitalisation.discussionDs = this.discussionFormGroup.getRawValue();
      this.editHospitalisation.syntheseDs = this.syntheseFormGroup.getRawValue();
      this.editHospitalisation.code = this.codePatient;
      this.editHospitalisation.chambreId = this.chambreId;
      this.editHospitalisation.litId = this.litId;
      this.editHospitalisation.litId = this.litId;
      console.log("Hospitalisation", this.editHospitalisation);
      this.hospitalisationService.updateHospitalisation(this.paramId, this.editHospitalisation).subscribe(
        {
          next: (response) => {
            const body = new FormData();
            if(this.biologieFile) {
              body.append('biologic', this.biologieFile)
              this.uploadBiologicFile(Number(response), body);
            };
            if(this.immunologieFile) {
              body.append('immunologic', this.immunologieFile)
              this.uploadImmunologieFile(Number(response), body);
            };
            if(this.imagerieFile) {
              body.append('imager', this.imagerieFile)
              this.uploadImagerieFile(Number(response), body);
            };
            if(this.anatomopathologieFile) {
              body.append('hematologic', this.anatomopathologieFile)
              this.uploadAnatomologieFile(Number(response), body);
            };
            if (this.protocoleFile) {
              body.append('protocol', this.protocoleFile);
              this.uploadProtocoleFile(Number(response), body);
            }
            window.alert("Hospitalisation a été modifiée avec succès");
            /*
            this.toastr.success('succès !', 'L\'hospitalisation a été modifiée avec succès !!');
            this.router.navigate(['/home/circuit/details/', this.circuit.id])
          
            */
          },
          error: (error) => {
        //    this.toastr.warning('hospitalisation patient !', 'Erreur lors de la l\'enregistrement de');
          }
        }
      );
    }else {
      // save Hospitalisation
      const hostpitalisationData: any = {
        code: this.codePatient,
        createdBy: this.userId,
        chambreId: this.chambreId,
        litId: this.litId,
        servicePartenaireId: this.servicePartenaireId,
        est_Transfer: this.estTransferer,
        observationCliniqueDs: {
          histoireMaladie: this.observationCliniqueFormGroup.getRawValue().histoireMaladie,
          motifsHospitalisation: this.observationCliniqueFormGroup.getRawValue().motifsHospitalisation,
          antecedentDs: this.observationCliniqueFormGroup.get('antecedentDs').value,
          examenPhysiqueDs: this.observationCliniqueFormGroup.get('examenPhysiqueDs').value,
        },
        examenComplementaireDs: this.examenComplementaireFormGroup.getRawValue(),
        traitementMedicalDs: this.traitementFormGroup.getRawValue(),
        discussionDs: this.discussionFormGroup.getRawValue(),
        syntheseDs: this.syntheseFormGroup.getRawValue(),
      };
      console.log("Hospitalisation", hostpitalisationData);
      this.hospitalisationService.createHospitalisation(hostpitalisationData).subscribe(
        {
          next: (response) => {
            window.alert("Hospitalisation créee avec succès");
            console.log("Hospitalisation result", response);
            this.router.navigate(['/admin/hospitalisations'])
            /*
            this.toastr.success('succès !', 'L\'hospitalisation a été crée avec succès !!');
            this.router.navigate(['/home/circuit/details/', this.circuit.id])
            */
            const body = new FormData();
            if(this.biologieFile) {
              body.append('biologic', this.biologieFile)
              this.uploadBiologicFile(Number(response), body);
            };
            if(this.immunologieFile) {
              body.append('immunologic', this.immunologieFile)
              this.uploadImmunologieFile(Number(response), body);
            };
            if(this.imagerieFile) {
              body.append('imager', this.imagerieFile)
              this.uploadImagerieFile(Number(response), body);
            };
            if(this.anatomopathologieFile) {
              body.append('hematologic', this.anatomopathologieFile)
              this.uploadAnatomologieFile(Number(response), body);
            };
            if (this.protocoleFile) {
              body.append('protocol', this.protocoleFile);
              this.uploadProtocoleFile(Number(response), body);
            }
          },
          error: (error) => {
            window.alert(error);
        //    this.toastr.warning('hospitalisation patient !', 'Erreur lors de la l\'enregistrement de');
          }
        }
      );
    }
        
  }

  goBack() {
    this.location.back();
  }   
    
  cancel() {
  //  this.location.back()
  }
  

  
  public formateJS() {
    const circles = document.querySelectorAll(".circle");
    const progressBar : any = document.querySelector(".indicator");
    const buttons = document.querySelectorAll("button");
    console.log(circles.length);
    this.currentStep = 1;
    const updateSteps = (e) => {
      this.currentStep = e.target.id === "next" ? ++this.currentStep : --this.currentStep;
      circles.forEach((circle, index) => {
        circle.classList[`${index < this.currentStep ? "add" : "remove"}`]("active");
      });
      progressBar.style.width = `${((this.currentStep - 1) / (circles.length - 1)) * 100}%`;
      if (this.currentStep === circles.length) {
       // buttons[1].disabled = true;
        this.endStep = true;
        console.log(buttons[1]);
      } else if (this.currentStep === 1) {
        buttons[0].disabled = true;
        this.endStep = false;
      } else {
        buttons.forEach((button) => (button.disabled = false));
      }
    };
    buttons.forEach((button) => {
      button.addEventListener("click", updateSteps);
    });
  }

  private getValue(event: any) {
    if (event instanceof Event) return +(event.target as HTMLSelectElement).value;
    else return +event;
  }

  private getStringValue(event: any) {
    if (event instanceof Event) return (event.target as HTMLSelectElement).value;
    else return event;
  }
}
