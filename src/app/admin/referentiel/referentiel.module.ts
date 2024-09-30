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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ElementExamenDermatologiqueComponent } from './pages/element-examen-dermatologique/element-examen-dermatologique.component';
import { ElementHypotheseComponent } from './pages/element-hypothese/element-hypothese.component';
import { ElementPlainteComponent } from './pages/element-plainte/element-plainte.component';
import { ElementTerrainComponent } from './pages/element-terrain/element-terrain.component';
import { ElementRehercheNotionComponent } from './pages/element-reherche-notion/element-reherche-notion.component';


@NgModule({
  declarations: [
    ReferentielsComponent,
    CategorieMedicamentComponent,
    MedicamentComponent,
    LitComponent,
    ChambreComponent,
    GroupeSanguinComponent,
    TrancheAgeComponent,
    ServicesPartenaireComponent,
    ElementExamenDermatologiqueComponent,
    ElementHypotheseComponent,
    ElementPlainteComponent,
    ElementTerrainComponent,
    ElementRehercheNotionComponent
  ],
  imports: [
    CommonModule,
    ReferentielRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ReferentielModule { }
