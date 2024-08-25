import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HospitalisationService } from '../../service/hospitalisation.service';
import { LocalStorageService } from 'src/app/admin/pages/services/local-storage.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HospitalisationSearch } from '../../models/hospitalisation-search';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { EncodateLogo } from 'src/app/admin/core/interface/encodage-logo';
pdfMake!.vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';
import { ListeHospitalisation } from '../../models/liste-hospitalisation';

@Component({
  selector: 'app-hospitalisations',
  templateUrl: './hospitalisations.component.html',
  styleUrls: ['./hospitalisations.component.css']
})
export class HospitalisationsComponent implements OnInit {

  hostpitalisationList: ListeHospitalisation[] = [];
  errorMessage: string;
  modalRef: BsModalRef;
  id: any; name : any;

  searchFormGroup = new FormGroup({
    etat: new FormControl(),
    codePatient: new FormControl(),
    dateDebut: new FormControl(),
    dateFin: new FormControl()
  });

  filterValues?: HospitalisationSearch;

  seachValue?: boolean;

  constructor(public hospitalisationService: HospitalisationService,
              private localStorage: LocalStorageService,
              private router: Router,
              private modalService: BsModalService
  ) { 
  }

  ngOnInit(): void {
    this.getHospitalisations();
  }

  get etat() { return this.searchFormGroup.get('etat'); }
  get codePatient() { return this.searchFormGroup.get('codePatient'); }
  get dateDebut() { return this.searchFormGroup.get('dateDebut'); }
  get dateFin() { return this.searchFormGroup.get('dateFin'); }

  getHospitalisations() {
    this.hospitalisationService.getAllHospitalisations()
      .subscribe(res => {
        this.hostpitalisationList = res;
        this.seachValue = false;
        console.log(this.hostpitalisationList);
        $(function () {
          $("table").DataTable();
        });
    },
    error => this.errorMessage = <any>error);
  }

  ajouterHospitalisation() {
    this.router.navigate(['/admin/hospitalisations/create']);
  }

  rechercherHospitalisation() {
    this.filterValues = {
      statusHospitalisation: this.etat.value,
      code: this.codePatient.value,
      from: this.dateDebut.value,
      to: this.dateFin.value
    }
    this.hospitalisationService.getHospitalisationsByCritère(this.filterValues)
      .subscribe(res => {
        this.hostpitalisationList = res;
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


  editerHostpitalisation(patientId: number) {
    this.router.navigate(['/admin/hospitalisations/edit', patientId]);
  }

  voirDetailHostpitalisation(patientId: number) {
    this.router.navigate(['/admin/hospitalisations/details', patientId]);
  }


  deleteModal(template: TemplateRef<any>, hostpitalisation) {
    this.id = hostpitalisation.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-sm modal-dialog-centered',
    });
  }

  deleteHostpitalisation(hostpitalisationId: number){
    this.hospitalisationService.deleteHospitalisation(hostpitalisationId).subscribe(
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
      pdfMake.createPdf(this.getDocumentHospitalisation()).open();
    }else {
     pdfMake.createPdf(this.getDocumentHospitalisation()).open();
    }
  }

  getDocumentHospitalisation(): any {
    return {
      width: ['*'],
      content: [
        {
          text: 'Fait à Dakar le ' + moment(new Date()).format('DD/MM/YYYY'),
          fontSize: 12,
          alignment: 'right',
          bold: true,
        },

        {
          width: '*',
          columns: [

            [
              {
                image: EncodateLogo.image,
                width: 90,
                heigth: 90,
                alignment: 'left',
              },
              {
                text: 'Centre Hospitalier National',
                fontSize: 12,
                alignment: 'left',
                bold: true,
              },
              {
                text: 'Dalal Jamm',
                fontSize: 12,
                alignment: 'left',
                bold: true,
                margin: [20, 0, 0, 0],
              },
              {
                text: '---------------------------------',
                fontSize: 10,
                alignment: 'left',
                bold: true,
              },
              {
                text: 'Clinique médicale',
                fontSize: 12,
                alignment: 'left',
              },
              {
                text: 'Chef de service',
                fontSize: 12,
                alignment: 'left',
                bold: true,
              },
              {
                text: 'Pr Souhaibou NDONGO',
                fontSize: 12,
                alignment: 'left',
                bold: true,
              },
              {
                text: 'Interniste - Rhumatologue',
                fontSize: 12,
              },
              {
                text: '----------------',
                fontSize: 10,
                bold: true,
              },
              {
                text: 'Adjoints',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Dr Biram Codou FALL',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Médecin - Interniste',
                fontSize: 12,
              },
              {
                text: 'Dr Bamba DIAW',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Rhumatologue',
                fontSize: 12,
              },
              {
                text: 'Dr Aichetou Fall EWBECK',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Médecin - Interniste',
                fontSize: 12,
              },
              {
                text: 'Dr Sokhna Diop NIANG',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Gastro-entérologue',
                fontSize: 12,
              },
              {
                text: 'Dr Aly SALANE',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Médecin - Généraliste',
                fontSize: 12,
              },

              {
                text: '-------------------',
                fontSize: 10,
              },
              {
                text: 'Surveillante',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Mme Aminata SY TRAORE',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Infirmière d\'état',
                fontSize: 12,
              },
              {
                text: '------------------',
                fontSize: 10,
                bold: true
              },

              {
                text: 'Sécrétaire médicale',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Mme Aminata NDIAYE LY',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Tel: +221 33 839 85 85',
                fontSize: 12,
              },
              {
                text: '-----------------',
                fontSize: 10,
                bold: true
              },

              {
                text: 'Internes/DES',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Infirmiers',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Aide-infirmiers',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Personnel de soutien',
                fontSize: 12,
                bold: true,
              },
              {
                text: '--------------',
                fontSize: 10,
                bold: true,
              },
              {
                text: 'Hospitalisation conventionnelle',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Hospitalisation de jour',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Consultations spécialisées',
                fontSize: 12,
                bold: true,
              },

              {
                text: ' - Médecine interne',
                fontSize: 12,
              },
              {
                text: ' - Maladies systémiques',
                fontSize: 12,
              },
              {
                text: ' - Rhumatologie',
                fontSize: 12,
              },
              {
                text: ' - Hépato-gastro-entérologie',
                fontSize: 12,
              },
              {
                text: ' - Douleur',
                fontSize: 12,
              },
              {
                text: 'Education thérapeutique',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Explorations',
                fontSize: 12,
                bold: true,
              },
              {
                text: ' - Endoscopie digestive',
                fontSize: 12,
              },
              {
                text: ' - Echographie rhumatologique',
                fontSize: 12,
              },
              {
                text: ' - Ostéodensitométrie',
                fontSize: 12,
              },
              {
                text: 'Formation & Recherche Clinique',
                fontSize: 12,
                bold: true,
              },

            ],
          ]
        },

        {
          text: '-----------------------------------------------------------------------------------------------------------------------------------------------------------',
        },

        {
          text: 'Ancien parcours du golf-Guédiawaye-golf sud',
          fontSize: 8,
          alignment: 'center',
        },
        {
          text: 'Tel: +221 33 839 85 85',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'Fax: +221 33 837 56 58',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'BP: 19D01',
          fontSize: 6,
          alignment: 'center',
        },

        
        {
          text: 'RAPPORT DES HOSPITALISATIONS',
          fontSize: 20,
          alignment: 'center',
          bold: true,
          margin: [0, 100, 0, 0]
        },

        //

        {
          fillColor: '#009efb',
          opacity: 1,
          layout: 'noBorders',
          table: {
            widths: ["*"],
            body: [
              [[
                {
                  text: ' ', alignment: 'left',
                  fontSize: 12,
                  bold: true,
                  margin: [3, 0, 0, 0],
                  color: 'white'
                },
              
                ]
              ],
            ]
          }
        },
        {
          layout: 'headerLineOnly',
          fontSize: 12,
          table: {
            widths: [65, 75,130, 130, 65],
            headerRows: 1,
            body: [
                [ 
                  {
                    text: 'Admission',
                    alignment: 'left',
                    fontSize: 12,
                  }, 
                  {
                    text: 'Numéro',
                    alignment: 'left',
                    fontSize: 12,
                  }, 
                  {
                    text: 'Patient',
                    alignment: 'left',
                    fontSize: 12,
                  },
                  {
                    text: 'Médecin',
                    alignment: 'left',
                    fontSize: 12,
                  },
                  {
                    text: 'Etat',
                    alignment: 'left',
                    fontSize: 12,
                  },
              ],
              ...this.hostpitalisationList?.map(o => ([(moment(o?.dateAjout)!.format('DD/MM/YYYY')), o!.numeroHospitalisation, o?.nomCompletPatient, o?.nomCompletMedecin, o?.status]))!,
   
                
            ]

            
          }

        },

      ],


      styles: {
        header: {
          fontSize: 12,
          bold: true,
          margin: [0, 20, 0, 12],
          decoration: 'underline'
        },
        name: {
          fontSize: 12,
          bold: true
        },
        total: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        ligne: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 12],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          alignment: 'center'
        },

      }
    };

  }

  /*
  getDocumentHospitalisation02(): any {
    return {
      width: ['*'],
      content: [
        {
          text: 'Fait à Dakar le ' + moment(new Date()).format('DD/MM/YYYY'),
          fontSize: 12,
          alignment: 'right',
          bold: true,
        },

        {
          width: '*',
          columns: [

            [
              {
                image: EncodateLogo.image,
                width: 90,
                heigth: 90,
                alignment: 'left',
              },
              {
                text: 'Centre Hospitalier National',
                fontSize: 12,
                alignment: 'left',
                bold: true,
              },
              {
                text: 'Dalal Jamm',
                fontSize: 12,
                alignment: 'left',
                bold: true,
                margin: [20, 0, 0, 0],
              },
              {
                text: '---------------------------------',
                fontSize: 10,
                alignment: 'left',
                bold: true,
              },
              {
                text: 'Clinique médicale',
                fontSize: 12,
                alignment: 'left',
              },
              {
                text: 'Chef de service',
                fontSize: 12,
                alignment: 'left',
                bold: true,
              },
              {
                text: 'Pr Souhaibou NDONGO',
                fontSize: 12,
                alignment: 'left',
                bold: true,
              },
              {
                text: 'Interniste - Rhumatologue',
                fontSize: 12,
              },
              {
                text: '----------------',
                fontSize: 10,
                bold: true,
              },
              {
                text: 'Adjoints',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Dr Biram Codou FALL',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Médecin - Interniste',
                fontSize: 12,
              },
              {
                text: 'Dr Bamba DIAW',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Rhumatologue',
                fontSize: 12,
              },
              {
                text: 'Dr Aichetou Fall EWBECK',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Médecin - Interniste',
                fontSize: 12,
              },
              {
                text: 'Dr Sokhna Diop NIANG',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Gastro-entérologue',
                fontSize: 12,
              },
              {
                text: 'Dr Aly SALANE',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Médecin - Généraliste',
                fontSize: 12,
              },

              {
                text: '-------------------',
                fontSize: 10,
              },
              {
                text: 'Surveillante',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Mme Aminata SY TRAORE',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Infirmière d\'état',
                fontSize: 12,
              },
              {
                text: '------------------',
                fontSize: 10,
                bold: true
              },

              {
                text: 'Sécrétaire médicale',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Mme Aminata NDIAYE LY',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Tel: +221 33 839 85 85',
                fontSize: 12,
              },
              {
                text: '-----------------',
                fontSize: 10,
                bold: true
              },

              {
                text: 'Internes/DES',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Infirmiers',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Aide-infirmiers',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Personnel de soutien',
                fontSize: 12,
                bold: true,
              },
              {
                text: '--------------',
                fontSize: 10,
                bold: true,
              },
              {
                text: 'Hospitalisation conventionnelle',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Hospitalisation de jour',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Consultations spécialisées',
                fontSize: 12,
                bold: true,
              },

              {
                text: ' - Médecine interne',
                fontSize: 12,
              },
              {
                text: ' - Maladies systémiques',
                fontSize: 12,
              },
              {
                text: ' - Rhumatologie',
                fontSize: 12,
              },
              {
                text: ' - Hépato-gastro-entérologie',
                fontSize: 12,
              },
              {
                text: ' - Douleur',
                fontSize: 12,
              },
              {
                text: 'Education thérapeutique',
                fontSize: 12,
                bold: true,
              },
              {
                text: 'Explorations',
                fontSize: 12,
                bold: true,
              },
              {
                text: ' - Endoscopie digestive',
                fontSize: 12,
              },
              {
                text: ' - Echographie rhumatologique',
                fontSize: 12,
              },
              {
                text: ' - Ostéodensitométrie',
                fontSize: 12,
              },
              {
                text: 'Formation & Recherche Clinique',
                fontSize: 12,
                bold: true,
              },

            ],
            [
              {
                fillColor: '#009efb',
                layout: 'noBorders',
                margin: [0, 80, 0, 0],
                alignment: 'left',
                table: {
                  widths: ["*"],
                  headerRows: 0,
                  body: [
                    [[
                      {
                        text: 'Etat civil', alignment: 'left',
                        fontSize: 16,
                        bold: true,
                        margin: [0, 0, 0, 0],
                        color: 'white'
                      },
      
                    ]
                    ],
                  ]
                }
              },
              {
                layout: 'noBorders',
                table: {
                  widths: ["*"],
                  body: [
                    [[
                      {
                        text: `Civilité : ${this.patient?.civilite}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
      
                      {
                        text: `Prénom : ${this.patient?.prenom}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Nom : ${this.patient?.nom}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: 'Date naissance : ' + moment(this.patient?.dateNaissance).format('DD/MM/YYYY'),
                        fontSize: 12,
                        alignment: 'left',
                        margin: [0, 3, 0, 3],
                      },
                      {
                        text: `Age : ${this.patient?.age}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Sexe : ${this.patient?.sexe}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Profession : ${this.patient?.profession}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Nationalité : ${this.patient?.nationalite}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Adresse : ${this.patient?.address}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Téléphone : ${this.patient?.numeroTelephone}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Accompagnant : ${this.patient?.personneConfianceDs?.prenom} - ${this.patient?.personneConfianceDs?.nom}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Téléphone accompagnant : ${this.patient?.personneConfianceDs?.telephone}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Diagnostic principal : ${this.patient?.diagnosticDs?.diagnostic_principal}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Diagnostic associé : ${this.patient?.diagnosticDs?.diagnostic_associe}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Race : ${this.patient?.race}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Ethnie : ${this.patient?.ethnie}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Consanguinité : ${this.patient?.consanguinite}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Origine : ${this.patient?.origine}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      
                      {
                        text: `Niveau socio-économique : ${this.patient?.niveauSocialEconomique}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Régime alimentaire : ${this.patient?.regimeAlimentaire}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                      {
                        text: `Prototype : ${this.patient?.prototype}`,
                        margin: [0, 3, 0, 3],
                        fontSize: 12,
                      },
                     
      
                    ]
                    ],
                  ]
                }
              },
            ]
          ]
        },

        {
          text: '-----------------------------------------------------------------------------------------------------------------------------------------------------------',
        },

        {
          text: 'Ancien parcours du golf-Guédiawaye-golf sud',
          fontSize: 8,
          alignment: 'center',
        },
        {
          text: 'Tel: +221 33 839 85 85',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'Fax: +221 33 837 56 58',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'BP: 19D01',
          fontSize: 6,
          alignment: 'center',
        },

        
        {
          text: 'COMPTE RENDU D’HOSPITALISATION',
          fontSize: 22,
          alignment: 'center',
          bold: true,
          margin: [0, 100, 0, 0]
        },

        {
          text: 'Date création : ' + moment(this.ficheHospitalisation.createDate).format('DD/MM/YYYY'),
          fontSize: 12,
          bold: true,
          alignment: 'center',
          margin: [30, 12, 30, 12],
        },

        {
          fillColor: '#009efb',
          opacity: 1,
          layout: 'noBorders',
          table: {
            widths: ["*"],
            headerRows: 0,
            body: [
              [[
                {
                  text: 'Histoire de la maladie', alignment: 'left',
                  fontSize: 12,
                  bold: true,
                  margin: [3, 0, 0, 0],
                  color: 'white'
                },

              ]
              ],
            ]
          }
        },
        {
          layout: 'noBorders',
          table: {
            widths: ["*"],
            body: [
              [[

                {
                  text: 'Date création : ' + moment(this.ficheHospitalisation.createDate).format('DD/MM/YYYY'),
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
                {
                  text: `Motif d'hospitalisation : ${this.ficheHospitalisation?.observationCliniqueDs?.motifsHospitalisation}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
                {
                  text: `Histoire de la maladie : ${this.ficheHospitalisation?.observationCliniqueDs?.histoireMaladie}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },

              ]
              ],
            ]
          }
        },
        //
        {
          fillColor: '#009efb',
          opacity: 1,
          layout: 'noBorders',
          table: {
            widths: ["*"],
            headerRows: 0,
            body: [
              [[
                {
                  text: 'Antécédents et Terrains', alignment: 'left',
                  fontSize: 12,
                  bold: true,
                  margin: [3, 0, 0, 0],
                  color: 'white'
                },

              ]
              ],
            ]
          }
        },

        {
          layout: 'noBorders',
          table: {
            widths: ["*"],
            body: [
              [[
                {
                  text: `Antécédents médicaux : ${this.ficheHospitalisation?.observationCliniqueDs?.antecedentDs?.antecedentsMedicaux}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
                {
                  text: `Antécédents chirurgicaux : ${this.ficheHospitalisation?.observationCliniqueDs?.antecedentDs?.antecedentsChirurgicaux}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
                {
                  text: `Antécédents gynécologiques : ${this.ficheHospitalisation?.observationCliniqueDs?.antecedentDs?.antecedentsGynecologiques}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
                {
                  text: `Antécédents familiaux ascendants : ${this.ficheHospitalisation?.observationCliniqueDs?.antecedentDs?.antecedentsFamilialsAscendant}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
                {
                  text: `Antécédents familiaux collatéraux : ${this.ficheHospitalisation?.observationCliniqueDs?.antecedentDs?.antecedentsFamilialsCollateral}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
                {
                  text: `Antécédents familiaux descendants : ${this.ficheHospitalisation?.observationCliniqueDs?.antecedentDs?.antecedentsFamilialsDescendant}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
                {
                  text: `Mode de vie : ${this.ficheHospitalisation?.observationCliniqueDs?.antecedentDs?.modeVies}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },

              ]
              ],
            ]
          }
        },

        {
          fillColor: '#009efb',
          opacity: 1,
          layout: 'noBorders',
          table: {
            widths: ["*"],
            headerRows: 0,
            body: [
              [[
                {
                  text: 'Examen physique', alignment: 'left',
                  fontSize: 12,
                  bold: true,
                  margin: [3, 0, 0, 0],
                  color: 'white'
                },

              ]
              ],
            ]
          }
        },

        {
          opacity: 1,
          layout: 'noBorders',
          table: {
            widths: ["*"],
            body: [
              [[
                {
                  text: 'Constantes', alignment: 'left',
                  fontSize: 12,
                  bold: true,
                  margin: [3, 0, 0, 0],
                },

                ]
              ],
            ]
          }
        },

        {
          layout: 'noBorders',
          table: {
            widths: ["*",'*','*','*'],
            body: [
              [
                [
                  {
                    text: `FC (bpm) : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.frequenceC}`,
                    margin: [0, 3, 0, 3],
                    fontSize: 12,
                  },

                  {
                    text: `FR (cpm) : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.frequenceR}`,
                    margin: [0, 3, 0, 3],
                    fontSize: 12,
                  },

                  {
                    text: `PAD (mmHg) : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.pressionArterielD}`,
                    margin: [0, 3, 0, 3],
                    fontSize: 12,
                  },

                  {
                    text: `Tour hanche (cm) : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.tourHanche}`,
                    margin: [0, 3, 0, 3],
                    fontSize: 12,
                  },
                
                ],
                [
                                   
                  {
                    text: `PAS (mmHg) : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.pressionArterielS}`,
                    margin: [0, 3, 0, 3],
                    fontSize: 12,
                  },

                  {
                    text: `Poids (kg) : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.poids}`,
                    margin: [0, 3, 0, 3],
                    fontSize: 12,
                  }, 

                  {
                    text: `SO2 (%) : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.saturationOxygene}`,
                    margin: [0, 3, 0, 3],
                    fontSize: 12,
                  },

            
                ],
                [
                  
                  {
                    text: `Température (°C) : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.temperature}`,
                    margin: [0, 3, 0, 3],
                    fontSize: 12,
                  },
                 
                 
                  {
                    text: `Taille (m) : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.taille}`,
                    margin: [0, 3, 0, 3],
                    fontSize: 12,
                  },

                  {
                    text: `Tour de Taille (cm) : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.tourTaille}`,
                    margin: [0, 3, 0, 3],
                    fontSize: 12,
                  },
  
                 
                ],
                [
                  {
                    text: `Glycémie (g/L) : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.glycemie}`,
                    margin: [0, 3, 0, 3],
                    fontSize: 12,
                  },
                  {
                    text: `IMC (kg/m²) : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.imc}`,
                    margin: [0, 3, 0, 3],
                    fontSize: 12,
                  },
                  {
                    text: `Diurese (L/j) : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.diurese}`,
                    margin: [0, 3, 0, 3],
                    fontSize: 12,
                  },
                 
                 
                ]
              ],
            ]
          }
        },

    

        {
          fillColor: '#009efb',
          opacity: 1,
          layout: 'noBorders',
          table: {
            widths: ["*"],
            body: [
              [[
                {
                  text: 'Examen', alignment: 'left',
                  fontSize: 12,
                  bold: true,
                  margin: [3, 0, 0, 0],
                  color: 'white'
                },

                ]
              ],
            ]
          }
        },

        {
          layout: 'noBorders',
          table: {
            widths: ["*"],
            body: [
              [[
                
                {
                  text: `Examen général : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.examenGeneral}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
                {
                  text: `Examen des appareils : ${this.ficheHospitalisation?.observationCliniqueDs?.examenPhysiqueDs?.examenAppareil}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },


              ]
              ],
            ]
          }
        },

        {
          fillColor: '#009efb',
          opacity: 1,
          layout: 'noBorders',
          table: {
            widths: ["*"],
            body: [
              [[
                {
                  text: 'Examens complémentaires ', alignment: 'left',
                  fontSize: 12,
                  bold: true,
                  margin: [3, 0, 0, 0],
                  color: 'white'
                },

                ]
              ],
            ]
          }
        },

        {
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [[
                
                {
                  text: `Biologie : ${this.ficheHospitalisation?.examenComplementaireDs?.biologie}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
                {
                  text: `Immunolgie : ${this.ficheHospitalisation?.examenComplementaireDs?.immunologie}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
                {
                  text: `Imagerie : ${this.ficheHospitalisation?.examenComplementaireDs?.imagerie}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
                {
                  text: `Anatomopathologie : ${this.ficheHospitalisation?.examenComplementaireDs?.anatomopathologie}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },

              ]
              ],
            ]
          }
        },

        {
          fillColor: '#009efb',
          opacity: 1,
          layout: 'noBorders',
          table: {
            widths: ["*"],
            body: [
              [[
                {
                  text: 'Traitement ', alignment: 'left',
                  fontSize: 12,
                  bold: true,
                  margin: [3, 0, 0, 0],
                  color: 'white'
                },
              
                ]
              ],
            ]
          }
        },

        {
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [[
                
                {
                  text: `Protocole utilisé : ${this.ficheHospitalisation?.traitementMedicalDs?.protocole}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },

              ]
              ],
            ]
          }
        },

        {
          fillColor: '#009efb',
          opacity: 1,
          margin:[0,8,0,0],
          layout: 'noBorders',
          table: {
            widths: ["*"],
            headerRows: 0,
            body: [
              [[
                {
                  text: 'Ordonnance', alignment: 'left',
                  fontSize: 12,
                  bold: true,
                  margin: [3, 0, 0, 0],
                  color:'white'
                },

                ]
              ],
            ]
          }
        },

        {
          layout: 'headerLineOnly',
          fontSize: 12,
          table: {
            widths: [170, 60, 70, 70, 70],
            headerRows: 1,
            body: [
                [ 
                  {
                    text: 'Medicaments',
                    alignment: 'left',
                    fontSize: 12,
                  }, 
                  {
                    text: 'Psologie',
                    alignment: 'left',
                    fontSize: 12,
                  },
                  {
                    text: 'Nbre prise',
                    alignment: 'left',
                    fontSize: 12,
                  },
                  {
                    text: 'Voie',
                    alignment: 'left',
                    fontSize: 12,
                  },
                  {
                    text: 'Est administré',
                    alignment: 'left',
                    fontSize: 12,
                  },
              ],
          //    ...this.ficheHospitalisation?.traitementMedicalDs?.traitementMedicalItemDs?.map(o => ([o!.medicamentDs?.libelle, o?.psologie, o?.nbrePrise, o?.administrePar, o?.est_administre])) ? 
                
            ]

            
          }

        },

        //
        {
          fillColor: '#009efb',
          opacity: 1,
          margin:[0,8,0,0],
          layout: 'noBorders',
          table: {
            widths: ["*"],
            headerRows: 0,
            body: [
              [[
                {
                  text: 'Discussion ', 
                  alignment: 'left',
                  fontSize: 12,
                  bold: true,
                  margin: [3, 0, 0, 0],
                  color:'white'
                },

                ]
              ],
            ]
          }
        },

        {
          layout: 'noBorders',
          table: {
            widths: ["*"],
            body: [
              [[
   
                {
                  text: `Médecin : ${this.ficheHospitalisation?.discussionDs?.nomCompletAgent}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
                {
                  text: `Résumé : ${this.ficheHospitalisation?.discussionDs?.resume}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
              ]
              ],
            ]
          }
        },

        {
          fillColor: '#009efb',
          opacity: 1,
          margin:[0,8,0,0],
          layout: 'noBorders',
          table: {
            widths: ["*"],
            headerRows: 0,
            body: [
              [[
                {
                  text: 'Synthese ', alignment: 'left',
                  fontSize: 12,
                  bold: true,
                  margin: [3, 0, 0, 0],
                  color:'white'
                },

                ]
              ],
            ]
          }
        },

        {
          layout: 'noBorders',
          table: {
            widths: ["*"],
            body: [
              [[
   
                {
                  text: `Médecin : ${this.ficheHospitalisation?.syntheseDs?.nomCompletAgent}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
                {
                  text: `Résumé : ${this.ficheHospitalisation?.syntheseDs?.observation}`,
                  margin: [0, 3, 0, 3],
                  fontSize: 12,
                },
              ]
              ],
            ]
          }
        },

      ],


      styles: {
        header: {
          fontSize: 12,
          bold: true,
          margin: [0, 20, 0, 12],
          decoration: 'underline'
        },
        name: {
          fontSize: 12,
          bold: true
        },
        total: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        ligne: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 12],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          alignment: 'center'
        },

      }
    };

  }
  
  */

}
