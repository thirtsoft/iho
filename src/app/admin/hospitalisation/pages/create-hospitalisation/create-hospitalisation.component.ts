import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { CommonServiceService } from 'src/app/common-service.service';

// @ts-ignore 
//import  { Hospitalisation } from './globalpayments-3ds/globalpayments-3ds.esm.js';

enum EntrepriseFileType {
  CNI = 1,
  RCCM 
}

@Component({
  selector: 'app-create-hospitalisation',
  templateUrl: './create-hospitalisation.component.html',
  styleUrls: ['./create-hospitalisation.component.css']
})
export class CreateHospitalisationComponent implements OnInit {

  promoteurId: number | undefined;
  userId: any;

  today = new Date();

  typeCompta = ['Système Minimal de Trésorerie','Système Normal']

  nineaObservable!: Observable<String>;

  irccObservable!: Observable<String>;

  idEnterpriseToEdit: any;

  addOnBlur = true;

  addOnBlurFini = true;


//  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  produits: string[] = [];
  filteredFormeJuridiques: any = [];
  formeJuridiques: any [];
  selectedSearchValues: any[] = [];

  groupeSecteurs: any;

  secteurActivites?: any;

  departements: any;

  communes: any;

  arrondissements: any;

  qualites: any;

  niveauEducations: any;

  quartiers: any;


  dateCurrentYear = new Date().getFullYear() - 1;


  entrepriseId: number;

  createButton = 'Créer'

  pointFocalFormGroup: FormGroup;

  isPromoteur: boolean = false;

  isOnEdit: boolean = false;

  role: string;

  formeJuriqueNondefinie = 3;
  isNonDefinie = 0;

  loading: boolean = false;

  selected = "1";

  dataQualite;

  libellesSexe: string[] = ['Homme', 'Femme'];
  identificationFormGroup: FormGroup;
  demandeId: number;
  pmId: number;
  produit: string;
  initializedForm: boolean;
  isPointFocalFormInitialized: boolean;
  cniFilename: string;
  rccmFilename: string;
  cniFile: File;
  rccmFile: File;


  constructor(
    private _formBuilder: FormBuilder, 
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.idEnterpriseToEdit = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.demandeId = Number(this.activatedRoute.snapshot.paramMap.get('demandeId'));
  }

  ngOnInit(): void {
    this.formateJS();
    
  }


  private getValue(event: any) {
    if (event instanceof Event) return +(event.target as HTMLSelectElement).value;
    else return +event;
  }

  changeFormeJuridique(event: any){
    const valeur = event.value;
    if (valeur === this.formeJuriqueNondefinie) {
      this.isNonDefinie=1;
    }else{
      this.isNonDefinie=0;
    }
  }

  chargerSecteurActivite(event: any) {
    let groupe = this.getValue(event);
    this.getSecteurActivitesByGroupeActivite(groupe)
  }

  getSecteurActivitesByGroupeActivite(groupeActiviteId: number){
  }

  chargerCommunes(event: any) {
    let departement = this.getValue(event)
    this.getCommunesByDpartement(departement)
  }

  getCommunesByDpartement(departementId: number){
  }

  chargerArrondissements(event: any) {
    let commune = this.getValue(event)
    this.getArrondissementByCommunes(commune)
  }

  getArrondissementByCommunes(communeId: number){
  }
  
  changerQuartiers(event: any) {
    let arrond = this.getValue(event);
    this.getQuartiersByArrondissement(arrond)
  }

  getQuartiersByArrondissement(arrondissementId: number){

  }

  add(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.produit === '') return
    if(!this.produits)
          this.produits = [];
    this.produits.push(this.produit.trim());
    this.produit = '';
  }

  remove(produit: string): void {
    const index = this.produits.indexOf(produit);
    if (index >= 0) {
      this.produits.splice(index, 1);
    }
  }


  private getDemande(demandeId: number) {
  }
  
  initEntrepriseIdentificationFormGroup(pme: any|null) {
    this.identificationFormGroup = this._formBuilder.group({
      denomination: [pme?.denomination ?? '', Validators.required],
      rccm: [pme?.rccm ?? '', Validators.required],
      ifu: [pme?.ifu ?? '', Validators.required],
      sigle: [pme?.sigle ?? '', Validators.required],
      formeJuridique: [pme?.formeJuridiqueDTO?.id ?? '', Validators.required],
      dateCreation: [ pme?.dateCreation ? this.formatDate(new Date(pme?.dateCreation)) : '', Validators.required],
      domaineActiviteId: [pme?.domaineActiviteId ?? '', Validators.required], 
      secteurActiviteId: [pme?.secteurActiviteId ?? '', Validators.required],
      effectif: [pme?.effectif ?? '', Validators.required], 
      capitalSocial: [pme?.capitalSocial ?? ''],
      typeComptabilite: [pme?.typeComptabilite ?? '', Validators.required],
      departementId: [pme?.departementId ?? '', Validators.required], 
      communeId: [pme?.communeId ?? '', Validators.required],
      arrondissementId: [pme?.arrondissementId ?? '', Validators.required], 
      quartierId: [pme?.quartierId ?? '', Validators.required],
      email: [pme?.email ?? '', Validators.required], 
      adresse: [pme?.adresse ?? '', Validators.required],
      boitePostale: [pme?.boitePostale ?? ''],
      complementId: [pme?.complementId ?? ''], 
      site: [pme?.site ?? ''],
      tenuComptRegulier: [pme?.tenuComptRegulier ?? '', Validators.required]   ,
      id: [pme?.id ?? ''],
      dirigePar: [pme?.dirigePar ?? '0']
      });
      this.initializedForm = true;
    }

  initPointFocalFormGroup(pointFocal: any | null) {
    const id = pointFocal?.id;
    const nom = pointFocal?.nom;
    const prenom = pointFocal?.prenom;
    const sexe = pointFocal?.sexe;
    const email = pointFocal?.email;
    const telephone = pointFocal?.telephone;
    const qualite = pointFocal?.qualite;
    const entrepriseId = pointFocal?.entrepriseId;
    const dateNaissance = pointFocal?.dateNaissance;
    const niveauEducation = pointFocal?.niveauEducation;
    this.pointFocalFormGroup = this._formBuilder.group({
      id: [id ? id : null],
      entrepriseId: [entrepriseId ? entrepriseId : '', Validators.required],
      nom: [nom ? nom : '', Validators.required],
      prenom: [prenom ? prenom : '', Validators.required],
      sexe: [sexe ? sexe : '', Validators.required],
      email: [email ? email : '', Validators.required],
      telephone: [telephone ? telephone : '', Validators.required],
      qualite: [qualite ? qualite : '', Validators.required],
      dateNaissance: [dateNaissance ? this.formatDate(new Date(dateNaissance)) : '', Validators.required],
      niveauEducation: [niveauEducation ? niveauEducation : ''],
    });
    this.isPointFocalFormInitialized = true;
  }

  private fillPointFocal(promoteur: any) {
    this.pointFocalFormGroup.get('id').setValue(null);
    this.pointFocalFormGroup.get('nom').setValue(promoteur?.nom);
    this.pointFocalFormGroup.get('prenom').setValue(promoteur?.prenom);
    this.pointFocalFormGroup.get('sexe').setValue(promoteur?.sexe);
    this.pointFocalFormGroup.get('email').setValue(promoteur?.email);
    this.pointFocalFormGroup.get('qualite').setValue(promoteur?.qualite);
    this.pointFocalFormGroup.get('telephone').setValue(promoteur?.telephone); 
    this.pointFocalFormGroup.get('dateNaissance').setValue(new Date (promoteur?.dateNaissance));
    this.pointFocalFormGroup.get('niveauEducation').setValue(promoteur?.niveauEducation);
  }
  
  isPointFocalPromoteur(event: any) {
    if (event.target.checked) {
      this.initPointFocal();
      this.isPromoteur = true;
      
    }
    else {
      this.initPointFocalFormGroup(null);
    }
  }

  initPointFocal() {
    
  }  


  getEntrepriseByDemande(entrepriseId: number) {
  
  }
  
  getEntrepriseById(entrepriseId: number) {

  }
  
  changeEntreprise(event: any){
    this.getEntrepriseByDemande(event.value);
  }


  saveIdentification(){
    
   
  }
  

  saveDemandeDirigeant() {
   
   
  }

  onFileSelected(event: any, type: EntrepriseFileType) {
    const file: File = event.target.files[0];
    if (type === EntrepriseFileType.CNI) {
      this.cniFilename = file.name;
      this.cniFile = file;
    }
    else if (type === EntrepriseFileType.RCCM) {
      this.rccmFilename = file.name;
      this.rccmFile = file;
    }
  }
  
  onRemoveFile(event: any, type: EntrepriseFileType) {
    if (type === EntrepriseFileType.CNI) {
      this.cniFilename = '';
      this.cniFile = null;
    }
    else if (type === EntrepriseFileType.RCCM) {
      this.rccmFilename = '';
      this.rccmFile = null;
    }
  }

  private formatDate(date: Date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;
    return [date.getFullYear(), month, day].join('-')
  }

    
   
    
  cancel() {
  //  this.location.back()
  }
  

  currentStep: number;
  public formateJS() {
    const circles = document.querySelectorAll(".circle");
    const progressBar : any = document.querySelector(".indicator");
    const buttons = document.querySelectorAll("button");
    this.currentStep = 1;
    const updateSteps = (e) => {
      this.currentStep = e.target.id === "next" ? ++this.currentStep : --this.currentStep;
      circles.forEach((circle, index) => {
        circle.classList[`${index < this.currentStep ? "add" : "remove"}`]("active");
      });
      progressBar.style.width = `${((this.currentStep - 1) / (circles.length - 1)) * 100}%`;
      if (this.currentStep === circles.length) {
        buttons[1].disabled = true;
      } else if (this.currentStep === 1) {
        buttons[0].disabled = true;
      } else {
        buttons.forEach((button) => (button.disabled = false));
      }
    };
    buttons.forEach((button) => {
      button.addEventListener("click", updateSteps);
    });
  }
}
