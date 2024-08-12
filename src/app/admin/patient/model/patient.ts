import { Diagnostic } from "./diagnostic";
import { PersonneConfiance } from "./personne-confiance";

export interface Patient {
    id?: number;
    code?: string;
    index?: string;
    prenom?: string;
    nom?: string;
    sexe?: string;
    civilite?: string;
    address?: string;
    dateNaissance: Date;
    age?: number;
    numeroTelephone?: string;
    profession?: string;
    situationMatrimonial?: string;
    photo?: string;
    race?: string;
    ethnie?: string;
    origine?: string;
    nationalite?: string;
    originePere?: string;
    origineMere?: string;
    prototype?: string;
    consanguinite?: string;
    niveauSocialEconomique?: string;
    regimeAlimentaire?: Date;
    dateAdmission?: Date;
    isCircuitGenerated?: number;
    personneConfianceDs?: PersonneConfiance;
    est_accompagne?: boolean;
    diagnosticDs?: Diagnostic;
    telephone?: string;
    createdDate?: Date;
    nombre_passage?: number;

}
