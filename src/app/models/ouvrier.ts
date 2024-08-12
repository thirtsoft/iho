import { Locality } from "./locality";
import { Metier } from "./metier";

export class Ouvrier {
    id: number;
    reference: string;
    firstName: string;
    lastName: string;
    sexe: string;
    addressActuel: string;
    email: string;
    phoneOuvrier: string;
    nbreAnneeExperience: string;
    mobilite: string;
    pretentionSalaire: string;
    disponibity: string;
    selected: boolean;
    cvOuvrier: string;
    photoOuvrier: string;
    createdDate: Date;

    metier: Metier;
    
    locality: Locality;
}
