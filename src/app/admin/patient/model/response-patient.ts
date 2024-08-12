import { Patient } from "./patient";

export interface ResponsePatient {
    statut?: string;
    message: string;
    patientMinDs?: Patient;
}
