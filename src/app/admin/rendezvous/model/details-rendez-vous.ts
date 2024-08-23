import { Utilisateur } from "../../pages/models/utilisateur";
import { DetailsPatient } from "../../patient/model/details-patient";

export interface DetailsRendezVous {
    id?: number;

    libelle?: string;

    patientId?: number;

    nomCompletPatient?: string;

    patient?: DetailsPatient;

    medecinId?: number;

    nomCompletMedecin?: string;

    utilisateurDs?: Utilisateur;

    dateRendezVous?: Date;

    heure?: string;

    libelleEtat?: string;

    createdBy?: number;

    nomCompletAgent?: string;

    createDate?: Date;

    etat?: number;

}
