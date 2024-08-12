import { Newsletter } from "./newsletter";
import { Ouvrier } from "./ouvrier";
import { Utilisateur } from "./utilisateur";

export class Email {
    id: number;
    customerName: string;
    recipient: string;
    subject: string;
    message: string;
    createDate: Date;

    utilisateur: Utilisateur;
    ouvrier: Ouvrier;
    newsletter: Newsletter;
}
