import { Antecedent } from "./antecedent";
import { ExamenPhysique } from "./examen-physique";

export interface ObservationClinique {

    id?: number;

    numeroObservation?: string;

    histoireMaladie?: string;

    motifsHospitalisation?: string;
    
    antecedentDs?: Antecedent;

    examenPhysiqueDs?: ExamenPhysique;

    circuitPatientId?: number;

    createdDate: Date;

    nomCompletAgent?: string;

}
