import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferentielRoutingModule } from './referentiel-routing.module';
import { ReferentielsComponent } from './referentiels.component';
import { CategorieMedicamentComponent } from './pages/categorie-medicament/categorie-medicament.component';
import { MedicamentComponent } from './pages/medicament/medicament.component';
import { LitComponent } from './pages/lit/lit.component';
import { ChambreComponent } from './pages/chambre/chambre.component';
import { GroupeSanguinComponent } from './pages/groupe-sanguin/groupe-sanguin.component';
import { TrancheAgeComponent } from './pages/tranche-age/tranche-age.component';
import { ServicesPartenaireComponent } from './pages/services-partenaire/services-partenaire.component';


@NgModule({
  declarations: [
    ReferentielsComponent,
    CategorieMedicamentComponent,
    MedicamentComponent,
    LitComponent,
    ChambreComponent,
    GroupeSanguinComponent,
    TrancheAgeComponent,
    ServicesPartenaireComponent
  ],
  imports: [
    CommonModule,
    ReferentielRoutingModule
  ]
})
export class ReferentielModule { }
