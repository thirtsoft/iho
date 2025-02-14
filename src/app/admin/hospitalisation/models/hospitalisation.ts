import { Patient } from "../../patient/model/patient";
import { PieceJointe } from "../../referentiel/models/piece-jointe";
import { Discussion } from "./discussion";
import { ExamenComplementaire } from "./examen-complementaire";
import { ObservationClinique } from "./observation-clinique";
import { Synthese } from "./synthese";
import { TraitementMedical } from "./traitement-medical";

export interface Hospitalisation {

    id?: number;

    numeroHospitalisation?: string;

    code?: string;

    matricule?: string;

    resume?: string;
    
    observationCliniqueDs?: ObservationClinique;

    examenComplementaireDs?: ExamenComplementaire;

    traitementMedicalDs?: TraitementMedical;

    discussionDs?: Discussion;

    syntheseDs?: Synthese;

    nomCompletPatient?: string;

    nomCompletMedecin?: string;

    createdByUser?: string;

    createdBy?: number;

    createDate?: Date;

    piecesJointesDs?: PieceJointe[];

    patientDetailDs?: Patient;

    chambreId?: number;

    litId?: number;

    est_Transfer?: number;

    status?: string;

    dateAjout?: Date;

}
