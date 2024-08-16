import { PieceJointe } from "../../referentiel/models/piece-jointe";
import { TraitementMedicalItem } from "./traitement-medical-item";

export interface TraitementMedical {

    id?: number;

    circuitPatientId?: number;

    createdBy?: number;

    protocole?: string;

    protocoleFileName?: string;

    traitementMedicalItemDs?: TraitementMedicalItem[];

    createdDate?: Date;

    nomCompletAgent?: string;

    piecesJointesDs: PieceJointe[];
}
