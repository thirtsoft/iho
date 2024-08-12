import { CategorieMedicament } from "./categorie-medicament";

export interface Medicament {
    id?: number;
    code?: string;
    libelle?: string;
    categoryMedicamentDs?: CategorieMedicament;
}
