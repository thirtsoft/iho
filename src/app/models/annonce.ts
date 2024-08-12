import { Address } from "./address";
import { Metier } from "./metier";
import { Utilisateur } from "./utilisateur";

export class Annonce {
    id: number
    reference: string;
    libelle: string;
    lieuPoste: string;
    salaire: string;
    emailPoste: string;
    time: string;
    anneeExperience: string;
    typeContrat: string;
    selected: boolean;
    description: string;
    status: string;
    createdDate: Date;
    dateCloture: Date;

    metier: Metier;
    address: Address;
    utilisateur: Utilisateur;
}
