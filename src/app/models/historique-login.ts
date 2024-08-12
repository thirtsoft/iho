import { Utilisateur } from "./utilisateur";

export class HistoriqueLogin {
    id: number
    action: string;
    createdDate: Date;

    utilisateur: Utilisateur;

}
