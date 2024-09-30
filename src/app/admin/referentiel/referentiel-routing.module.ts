import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChambreComponent } from './pages/chambre/chambre.component';
import { LitComponent } from './pages/lit/lit.component';
import { ServicesPartenaireComponent } from './pages/services-partenaire/services-partenaire.component';
import { TrancheAgeComponent } from './pages/tranche-age/tranche-age.component';
import { MedicamentComponent } from './pages/medicament/medicament.component';
import { CategorieMedicamentComponent } from './pages/categorie-medicament/categorie-medicament.component';
import { GroupeSanguinComponent } from './pages/groupe-sanguin/groupe-sanguin.component';
import { ElementExamenDermatologiqueComponent } from './pages/element-examen-dermatologique/element-examen-dermatologique.component';
import { ElementHypotheseComponent } from './pages/element-hypothese/element-hypothese.component';
import { ElementPlainteComponent } from './pages/element-plainte/element-plainte.component';
import { ElementRehercheNotionComponent } from './pages/element-reherche-notion/element-reherche-notion.component';
import { ElementTerrainComponent } from './pages/element-terrain/element-terrain.component';

const routes: Routes = [
  {
		path : 'chambres',
		component : ChambreComponent
	},
  {
		path : 'lits',
		component : LitComponent
	},
  {
		path : 'services',
		component : ServicesPartenaireComponent
	},
  {
		path : 'tranche-ages',
		component : TrancheAgeComponent
	},
  {
		path : 'medicaments',
		component : MedicamentComponent
	},
  {
		path : 'categories-medicaments',
		component : CategorieMedicamentComponent
	},
	{
		path : 'groupe-sanguins',
		component: GroupeSanguinComponent
	},
	{
		path : 'element-examen-dermatologique',
		component: ElementExamenDermatologiqueComponent
	},
	{
		path : 'element-hypothese',
		component: ElementHypotheseComponent
	},
	{
		path : 'element-plainte',
		component: ElementPlainteComponent
	},
	{
		path : 'element-recherche-notion',
		component: ElementRehercheNotionComponent
	},
	{
		path : 'element-terrain',
		component: ElementTerrainComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferentielRoutingModule { }
