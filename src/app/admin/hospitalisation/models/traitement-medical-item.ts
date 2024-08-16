import { Medicament } from "../../referentiel/models/medicament";

export interface TraitementMedicalItem {

    id?: number;

    medicamendId?: number;

    psologie?: string;

    nbrePrise?: string;

    administrePar?: string;

    est_administre?: number;

    createdDate?: Date;

    datePrescription?: Date;

    medicamentDs?: Medicament;
}
