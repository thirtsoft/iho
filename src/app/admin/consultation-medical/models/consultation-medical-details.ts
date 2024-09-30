import { ElementExamenDermatologique } from "../../referentiel/models/element-examen-dermatologique";
import { ElementHypothese } from "../../referentiel/models/element-hypothese";
import { ElementPlainte } from "../../referentiel/models/element-plainte";
import { ElementRechercheNotion } from "../../referentiel/models/element-recherche-notion";
import { ElementTerrain } from "../../referentiel/models/element-terrain";
import { BilanParaclinique } from "./bilan-para-clinique";
import { ConstancePhysique } from "./constance-physique";
import { ExamenAppareil } from "./examen-appareil";
import { ResumeSyndromique } from "./resume-syndromique";

export interface ConsultationMedicalDetails {

    id?: number;

    numeroConsultation?: string;

    nomCompletPatient?: string;

    civilitePatient?: string;

    situationMatrimonial?: string;

    telephone?: string;

    indexPatient?: string;

    nomCompletAgent?: string;

    dateConsultation?: Date;

    constancePhysiqueDs?: ConstancePhysique;

    typePatient?: number;

    patientHospitalise?: string;

    elementRechercheNotions?: ElementRechercheNotion[];

    elementPlaintes?: ElementPlainte[];

    elementTerrains?: ElementTerrain[];

    elementExamenDermatologiques?: ElementExamenDermatologique[];

    examenAppareilDs?: ExamenAppareil;

    resumeSyndromiqueDs?: ResumeSyndromique;

    bilanParacliniqueDs?: BilanParaclinique;

    elementHypotheses?: ElementHypothese;

}