import { Patient } from "../../patient/model/patient";
import { PieceJointe } from "../../referentiel/models/piece-jointe";
import { Examen } from "./examen";

export interface ExamenComplementaire {

    id?: number;

    circuitPatientId?: number;

    indexPatient?: string;

    matricule?: string;

    biologie?: string;

    biologieFileName?: string;

    immunologie?: string;

    immunologieFileName?: string;

    imagerie?: string;

    imagerieFileName?: string;

    anatomopathologie?: string;

    anatomopathologieFileName?: string;

    patientDetailDs?: Patient;

    examenDs?: Examen[];

    createdDate?: Date;

    nomCompletAgent?: string;

    piecesJointesDsList?: PieceJointe[];
    

}
