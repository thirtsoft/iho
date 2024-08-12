import { Ouvrier } from "./ouvrier";
import { Utilisateur } from "./utilisateur";

export class Rating {
    id: number;
    nbreEtoile: number;
    observation: string;
    createdDate: Date;

    ouvrier: Ouvrier;

    utilisateur: Utilisateur;

}
