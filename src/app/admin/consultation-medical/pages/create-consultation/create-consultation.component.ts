import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CircuitPatient } from 'src/app/admin/dossier-medical/models/circuit-patient';
import { CircuitPatientService } from 'src/app/admin/dossier-medical/service/circuit-patient.service';
import { Discussion } from 'src/app/admin/hospitalisation/models/discussion';
import { ExamenComplementaire } from 'src/app/admin/hospitalisation/models/examen-complementaire';
import { Hospitalisation } from 'src/app/admin/hospitalisation/models/hospitalisation';
import { ObservationClinique } from 'src/app/admin/hospitalisation/models/observation-clinique';
import { Synthese } from 'src/app/admin/hospitalisation/models/synthese';
import { TraitementMedical } from 'src/app/admin/hospitalisation/models/traitement-medical';
import { HospitalisationService } from 'src/app/admin/hospitalisation/service/hospitalisation.service';
import { Utilisateur } from 'src/app/admin/pages/models/utilisateur';
import { LocalStorageService } from 'src/app/admin/pages/services/local-storage.service';
import { Patient } from 'src/app/admin/patient/model/patient';
import { PatientService } from 'src/app/admin/patient/service/patient.service';
import { Chambre } from 'src/app/admin/referentiel/models/chambre';
import { ElementExamenDermatologique } from 'src/app/admin/referentiel/models/element-examen-dermatologique';
import { ElementHypothese } from 'src/app/admin/referentiel/models/element-hypothese';
import { ElementPlainte } from 'src/app/admin/referentiel/models/element-plainte';
import { ElementRechercheNotion } from 'src/app/admin/referentiel/models/element-recherche-notion';
import { ElementTerrain } from 'src/app/admin/referentiel/models/element-terrain';
import { Lit } from 'src/app/admin/referentiel/models/lit';
import { Medicament } from 'src/app/admin/referentiel/models/medicament';
import { ServicesPartenaire } from 'src/app/admin/referentiel/models/services-partenaire';
import { SousElementDermatoseInf } from 'src/app/admin/referentiel/models/sous-element-dermatose-inf';
import { SousElementHypothese } from 'src/app/admin/referentiel/models/sous-element-hypothese';
import { ReferentielService } from 'src/app/admin/referentiel/service/referentiel.service';
import { ConsultationMedical } from '../../models/consultation-medical';
import { BilanParaclinique } from '../../models/bilan-para-clinique';
import { ConstancePhysique } from '../../models/constance-physique';
import { ExamenAppareil } from '../../models/examen-appareil';
import { ResumeSyndromique } from '../../models/resume-syndromique';
import { ConsultationService } from '../../service/consultation.service';
import { ConsultationMedicalDetails } from '../../models/consultation-medical-details';


@Component({
  selector: 'app-create-consultation',
  templateUrl: './create-consultation.component.html',
  styleUrls: ['./create-consultation.component.css']
})
export class CreateConsultationComponent implements OnInit {

  elementRecherceNotions: ElementRechercheNotion[]=[];
  selectedElementRecherceNotions: ElementRechercheNotion[]=[];
  elementPlaintes: ElementPlainte[]=[];
  selectedElementPlaintes: ElementPlainte[]=[];
  elementTerrains: ElementTerrain[]=[];
  selectedElementTerrains: ElementTerrain[]=[];
  elementExamenDermatologiques: ElementExamenDermatologique[]=[];
  selectedElementExamenDermatologiques: ElementExamenDermatologique[]=[];
  elementHypotheses: ElementHypothese[]=[];
  selectedElementHypotheses: ElementHypothese[]=[];
  sousElementHypotheses: SousElementHypothese[]=[];
  selectedSousElementHypotheses: SousElementHypothese[]=[];
  sousElementDermatoseInfs: SousElementDermatoseInf[]=[];
  selectedSousElementDermatoseInfs: SousElementDermatoseInf[]=[];

  consultationMedical: any;
  editConsultationMedical: ConsultationMedical;
  bilanParaClinique: BilanParaclinique = {};
  constancePhysique: ConstancePhysique = {};
  examenAppareil: ExamenAppareil = {};
  resumeSyndromique: ResumeSyndromique = {};
  elementHypothese?: ElementHypothese;

  paramId: any = 0;

  code?: string;

  userId: number;

  utilisateur: Utilisateur;

  matricule?: string;

  consultationMedicalId?: number;

  patient?: Patient;

  patientList?: Patient [];

  patientFormGroup: FormGroup;

  constancePhysiqueFormGroup!: FormGroup;
  bilanParaCliniqueFormGroup!: FormGroup;
  examenAppareilFormGroup!: FormGroup;
  resumeSyndromiqueFormGroup!: FormGroup;  

  currentStep: number = 0;

  endStep: boolean = false;

  isCheckedElementHypothese: boolean = false;
  isCheckedSousElementHypothese: boolean = false;
  isCheckedSousElementHypotheseInf: boolean = false;

  constructor(private consultationService: ConsultationService,
    private patientService: PatientService,
    private referentielService: ReferentielService,
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
    this.consultationMedicalId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.paramId = this.activatedRoute.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
  //  this.formateJS();
    this.initPatientFormGroup();
    this.initConstancePhysiqueFormGroup();
    this.initBilanParacliniqueFormGroup();
    this.initExamenAppareilFormGroup();
    this.initResumeSyndromiqueFormGroup();
    this.getPatients();
    this.getElementRechercheNotions();
    this.getElementPlaintes();
    this.getElementTerrains();
    this.getElementExamenDermatologiques();
    this.getElementHypotheses();
  //  this.getServicePartenaires();
    if (this.paramId && this.paramId > 0) {
      this.getConsultationMedical(this.paramId);
    }
  }
  

  getElementHypotheses() {
    this.referentielService.getAllElementHypotheses().subscribe({
      next: (data) => {
        this.elementHypotheses = data;
        console.log("Element hypothèses", this.elementHypotheses);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onSelectedEltHypothese(event, eltHypothese: ElementHypothese) {
    if (event.target.checked) {
      this.isCheckedElementHypothese = true;
      if (this.selectedElementHypotheses.includes(eltHypothese)) {
        this.selectedElementHypotheses = this.selectedElementHypotheses.filter((item) => item !== eltHypothese);
      } else {
        this.selectedElementHypotheses.push(eltHypothese);
        /*
        if(this.selectedSousElementHypotheses.length === 0 || !this.isCheckedSousElementHypothese) {
          this.selectedElementHypotheses.forEach(eltHypothese => {
            eltHypothese.sousElementHypotheseDs = [];
          })
        }*/

      }
    }else {
      this.selectedElementHypotheses = [];
    }
    
    console.log("Element hypothese", this.selectedElementHypotheses);
  }

  onSelectedSousEltHypothese(event, eltSousHypo: SousElementHypothese) {
    if (event.target.checked) {
      this.isCheckedSousElementHypothese = true;     
      if (this.selectedSousElementHypotheses.includes(eltSousHypo)) {
        this.selectedSousElementHypotheses = this.selectedSousElementHypotheses.filter((item) => item !== eltSousHypo);
      } else {
        this.selectedSousElementHypotheses.push(eltSousHypo);
        /*
        if (this.selectedSousElementDermatoseInfs.length === 0 || !this.isCheckedSousElementHypotheseInf) {
          this.selectedSousElementHypotheses.forEach(eltSousHypo => {
            eltSousHypo.sousElementDermatoseInfDs = [];
          })
        }*/
      }
    }else {
      this.selectedSousElementHypotheses = [];
    }
   
    console.log("Sous Element hypothese", this.selectedSousElementHypotheses);
  }

  onSelectedSousEltHypotheseInf(event, eltSousHypoInf: SousElementDermatoseInf) {
    if (event.target.checked) {
      this.isCheckedSousElementHypotheseInf = true;     
      if (this.selectedSousElementDermatoseInfs.includes(eltSousHypoInf)) {
        this.selectedSousElementDermatoseInfs = this.selectedSousElementDermatoseInfs.filter((item) => item !== eltSousHypoInf);
      } else {
        this.selectedSousElementDermatoseInfs.push(eltSousHypoInf);
      }
    }else {
      this.selectedSousElementDermatoseInfs = [];
    }
   
    console.log("Sous Element hypothese", this.selectedSousElementDermatoseInfs);
  }
  
  getElementExamenDermatologiques() {
    this.referentielService.getAllElementExamenDermatologiques().subscribe({
      next: (data) => {
        this.elementExamenDermatologiques = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onSelectedEltDermatologique(eltExamn: ElementExamenDermatologique) {
    if (this.selectedElementExamenDermatologiques.includes(eltExamn)) {
      this.selectedElementExamenDermatologiques = this.selectedElementExamenDermatologiques.filter((item) => item !== eltExamn);
    } else {
      this.selectedElementExamenDermatologiques.push(eltExamn);
    }
    console.log(this.selectedElementExamenDermatologiques);
  }

  getElementRechercheNotions() {
    this.referentielService.getAllElementRechercheNotions().subscribe({
      next: (data) => {
        this.elementRecherceNotions = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onSelectedEltRecherche(eletRecheche: ElementRechercheNotion) {
    if (this.selectedElementRecherceNotions.includes(eletRecheche)) {
      this.selectedElementRecherceNotions = this.selectedElementRecherceNotions.filter((item) => item !== eletRecheche);
    } else {
      this.selectedElementRecherceNotions.push(eletRecheche);
    }
    console.log(this.selectedElementRecherceNotions);
  }

  getElementPlaintes() {
    this.referentielService.getAllElementPlaintes().subscribe({
      next: (data) => {
        this.elementPlaintes = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onSelectedEltPlainte(eltPlainte: ElementPlainte) {
    if (this.selectedElementPlaintes.includes(eltPlainte)) {
      this.selectedElementPlaintes = this.selectedElementPlaintes.filter((item) => item !== eltPlainte);
    } else {
      this.selectedElementPlaintes.push(eltPlainte);
    }
    console.log(this.selectedElementPlaintes);
  }

  getElementTerrains() {
    this.referentielService.getAllElementTerrains().subscribe({
      next: (data) => {
        this.elementTerrains = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onSelectedEltTerrain(eltTerrain: ElementTerrain) {
    if (this.selectedElementTerrains.includes(eltTerrain)) {
      this.selectedElementTerrains = this.selectedElementTerrains.filter((item) => item !== eltTerrain);
    } else {
      this.selectedElementTerrains.push(eltTerrain);
    }
    console.log(this.selectedElementTerrains);
  }

  initPatientFormGroup() {
    this.patientFormGroup = this._formBuilder.group({
      code: ['', Validators.required],
    });
  }

  initConstancePhysiqueFormGroup() {
    this.constancePhysiqueFormGroup = this._formBuilder.group({
      poids: [''],
      temperature: [''],
      tensionArterielS: [''],
      tensionArterielD: [''],
      frequenceR: [''],
      poul: [''],
      taille: [''],
      imc: [''],
      frequenceC: [''],
      autreConstances: ['']
    });
  }


  initBilanParacliniqueFormGroup() {
    this.bilanParaCliniqueFormGroup = this._formBuilder.group({
      biologie: [],
      biochimie: ['']
    });
  }

  initExamenAppareilFormGroup() {
    this.examenAppareilFormGroup = this._formBuilder.group({
      examenApp: ['']
    });
  }

  initResumeSyndromiqueFormGroup() {
    this.resumeSyndromiqueFormGroup = this._formBuilder.group({
      id: [],
      resume: ['', Validators.required],
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

  getPatients() {
    this.patientService.getAllPatientsOrderDesc().subscribe({
      next: (data) => {
        this.patientList = data;
        console.log("Patient", this.patientList);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  changerIndexPatient(event: any) {
    this.code = this.getStringValue(event);
    console.log(this.code);
    this.getPatientByIndex(this.code);
  }

  getConsultationMedical(consultationId: number) {
    this.consultationService.getConsultationMedicalById(consultationId).subscribe({
      next: (data) => {
        this.editConsultationMedical = data;
        if (this.editConsultationMedical != null) {
          this.constancePhysiqueFormGroup = this._formBuilder.group({
            id: [this.editConsultationMedical.constancePhysiqueDs?.id],
            poids: [this.editConsultationMedical.constancePhysiqueDs?.poids, Validators.required],
            frequenceC: [this.editConsultationMedical.constancePhysiqueDs?.frequenceC, Validators.required],
            frequenceR: [this.editConsultationMedical.constancePhysiqueDs?.frequenceR, Validators.required],
            tensionArterielD: [this.editConsultationMedical.constancePhysiqueDs?.tensionArterielD, Validators.required],
            tensionArterielS: [this.editConsultationMedical.constancePhysiqueDs?.tensionArterielS, Validators.required],
            temperature: [this.editConsultationMedical.constancePhysiqueDs?.temperature, Validators.required],
            taille: [this.editConsultationMedical.constancePhysiqueDs?.taille, Validators.required],
            imc: [this.editConsultationMedical.constancePhysiqueDs?.imc, Validators.required],
            poul: [this.editConsultationMedical.constancePhysiqueDs?.poul, Validators.required],
            autreConstances: [this.editConsultationMedical.constancePhysiqueDs?.autreConstances, Validators.required],
          });
          this.bilanParaCliniqueFormGroup = this._formBuilder.group({
            id: [this.editConsultationMedical.bilanParacliniqueDs?.id],
            biologie: [this.editConsultationMedical.bilanParacliniqueDs?.biologie],
            biochimie: [this.editConsultationMedical.bilanParacliniqueDs?.biochimie]
          });
          this.examenAppareilFormGroup = this._formBuilder.group({
            id: [this.editConsultationMedical.examenAppareilDs?.id],
            examenApp: [this.editConsultationMedical.examenAppareilDs?.examenApp]
          });
          this.resumeSyndromiqueFormGroup = this._formBuilder.group({
            id: [this.editConsultationMedical.resumeSyndromiqueDs?.id],
            resume: [this.editConsultationMedical.resumeSyndromiqueDs?.resume]
          });
         
        }     
      }

    }
  )    
  }

  //
  valuesMontantIMC() {
    this.constancePhysiqueFormGroup?.get('poids')!.valueChanges.subscribe((res: any) => {
      this.calculerIMC()
    })
    this.constancePhysiqueFormGroup?.get('taille')!.valueChanges.subscribe((res: any) => {
      this.calculerIMC()
    })
  }

  calculerIMC() {
    const poids = Number(this.constancePhysiqueFormGroup?.get('poids')?.value);
    const taille = Number(this.constancePhysiqueFormGroup?.get('taille')?.value);
    const imc: any = Number(poids / (taille * taille));
    this.constancePhysiqueFormGroup?.get('imc')!.setValue(imc, { onlySelf: true, emitEvent: true });
  }

  saveConsultation() { 
    // save Consultation
    if (this.selectedSousElementHypotheses.length===0 || !this.isCheckedSousElementHypothese) {
      this.selectedElementHypotheses.forEach(elt => {
        elt.sousElementHypotheseDs = [];
        if (this.selectedSousElementDermatoseInfs.length === 0 || !this.isCheckedSousElementHypotheseInf) {
          elt.sousElementHypotheseDs.forEach(sousElt => {
            sousElt.sousElementDermatoseInfDs = [];
          }) 
        }
      })
    }else {
      this.selectedElementHypotheses.forEach(hypothese => {
        hypothese.sousElementHypotheseDs = this.selectedSousElementHypotheses;
        hypothese.sousElementHypotheseDs.forEach(sousElt => {
          sousElt.sousElementDermatoseInfDs = this.selectedSousElementDermatoseInfs
        })
      })
    }
    if (this.selectedSousElementDermatoseInfs.length===0 || !this.isCheckedSousElementHypotheseInf) {
      this.selectedSousElementHypotheses.forEach(elt => {
        elt.sousElementDermatoseInfDs = [];
      })
    }else {
      this.selectedSousElementHypotheses.forEach(hypothese => {
        hypothese.sousElementDermatoseInfDs = this.selectedSousElementDermatoseInfs;
      })
    }
    const consultationData: any = {
      code: this.code,
      createdBy: this.userId,
      elementExamenDermatologiques: this.selectedElementExamenDermatologiques,
      elementHypotheses: this.selectedElementHypotheses,
      elementRechercheNotions: this.selectedElementRecherceNotions,
      elementPlaintes: this.selectedElementPlaintes,
      elementTerrains: this.selectedElementTerrains,
      constancePhysiqueDs: this.constancePhysiqueFormGroup.getRawValue(),
      bilanParacliniqueDs: this.bilanParaCliniqueFormGroup.getRawValue(),
      examenAppareilDs: this.examenAppareilFormGroup.getRawValue(),
      resumeSyndromiqueDs: this.resumeSyndromiqueFormGroup.getRawValue(),
    };
    console.log("ConsultationMedical", consultationData);
    console.log("Elements hypothèses", consultationData.elementHypotheses);
    this.consultationService.createConsultationMedical(consultationData).subscribe(
      {
        next: (response) => {
          if (response.statut === 'OK') {
            window.alert("consultationMedical créee avec succès");
            console.log("consultationMedical result", response);
            this.router.navigate(['/admin/consultations']);
          } else if (response.statut === 'FAILED') {
            window.alert("Erreur lors de la création de la consultation");
            console.log("consultationMedical result", response);
          }
         
        },
        error: (error) => {
          window.alert("Consultation non enregistré");
       //    this.toastr.warning('hospitalisation patient !', 'Erreur lors de la l\'enregistrement de');
        }
      }
    );    
  }

  saveConsultation01() { 
    if (this.paramId != null && this.paramId != undefined) {
      this.editConsultationMedical!.constancePhysiqueDs = this.constancePhysiqueFormGroup?.getRawValue();
      this.editConsultationMedical!.bilanParacliniqueDs = this.bilanParaCliniqueFormGroup?.getRawValue();
      this.editConsultationMedical!.examenAppareilDs = this.examenAppareilFormGroup.getRawValue();
      this.editConsultationMedical!.resumeSyndromiqueDs = this.resumeSyndromiqueFormGroup.getRawValue();
      this.editConsultationMedical!.elementExamenDermatologiques = this.selectedElementExamenDermatologiques;
      if (this.selectedSousElementHypotheses.length<0) {
        for (let i = 0; i < this.selectedElementHypotheses.length; i++) {
          this.editConsultationMedical!.elementHypotheses = this.selectedElementHypotheses;
          this.editConsultationMedical!.elementHypotheses[i].sousElementHypotheseDs = [];
        }
      }
      this.editConsultationMedical!.elementRechercheNotions = this.selectedElementRecherceNotions;
      this.editConsultationMedical!.elementPlaintes = this.selectedElementPlaintes;
      this.editConsultationMedical!.elementTerrains = this.selectedElementTerrains;
      this.editConsultationMedical!.code = this.code;
      console.log("Consultation", this.editConsultationMedical);
      this.consultationService.updateConsultationMedical(this.paramId, this.editConsultationMedical).subscribe(
        {
          next: (response) => {
            const body = new FormData();
            window.alert("Hospitalisation a été modifiée avec succès");
          },
          error: (error) => {
        //    this.toastr.warning('hospitalisation patient !', 'Erreur lors de la l\'enregistrement de');
          }
        }
      );
    }else {
      // save Consultation
      if (this.selectedSousElementHypotheses.length===0) {
        for (let i = 0; i < this.selectedElementHypotheses.length; i++) {
          this.selectedElementHypotheses = this.selectedElementHypotheses;
          this.selectedElementHypotheses[i].sousElementHypotheseDs = [];
        }
      }
      console.log("Length DermatoInf", this.selectedSousElementDermatoseInfs.length);
      if (this.selectedSousElementDermatoseInfs.length===0) {
        for (let j = 0; j <this.selectedSousElementHypotheses.length; j++) {
          this.selectedSousElementHypotheses[j].sousElementDermatoseInfDs = [];
        }
      }
      const consultationData: any = {
        code: this.code,
        createdBy: this.userId,
        elementExamenDermatologiques: this.elementExamenDermatologiques,
        elementHypotheses: this.selectedElementHypotheses,
        elementRechercheNotions: this.elementRecherceNotions,
        elementPlaintes: this.elementPlaintes,
        elementTerrains: this.elementTerrains,
        constancePhysiqueDs: this.constancePhysiqueFormGroup.getRawValue(),
        bilanParacliniqueDs: this.bilanParaCliniqueFormGroup.getRawValue(),
        examenAppareilDs: this.examenAppareilFormGroup.getRawValue(),
        resumeSyndromiqueDs: this.resumeSyndromiqueFormGroup.getRawValue(),
      };
      
     
      console.log("ConsultationMedical", consultationData);
      this.consultationService.createConsultationMedical(consultationData).subscribe(
        {
          next: (response) => {
            window.alert("consultationMedical créee avec succès");
            console.log("consultationMedical result", response);
            this.router.navigate(['/admin/consultations']);
           
          },
          error: (error) => {
            window.alert("Consultation non enregistré");
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
  

  /*
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
  }*/

  private getValue(event: any) {
    if (event instanceof Event) return +(event.target as HTMLSelectElement).value;
    else return +event;
  }

  private getStringValue(event: any) {
    if (event instanceof Event) return (event.target as HTMLSelectElement).value;
    else return event;
  }

}
