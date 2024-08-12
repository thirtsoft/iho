import { TypeAnnonce } from "./type-annonce";

export class Tarif {
    id: number;
    reference: string;
    montantTarif: number;
    description: string;

    typeAnnonce: TypeAnnonce;

}
