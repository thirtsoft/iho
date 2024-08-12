import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChambreComponent } from './pages/chambre/chambre.component';
import { LitComponent } from './pages/lit/lit.component';
import { ServicesPartenaireComponent } from './pages/services-partenaire/services-partenaire.component';
import { TrancheAgeComponent } from './pages/tranche-age/tranche-age.component';
import { MedicamentComponent } from './pages/medicament/medicament.component';
import { CategorieMedicamentComponent } from './pages/categorie-medicament/categorie-medicament.component';
import { GroupeSanguinComponent } from './pages/groupe-sanguin/groupe-sanguin.component';

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
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferentielRoutingModule { }
