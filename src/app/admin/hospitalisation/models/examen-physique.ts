export interface ExamenPhysique {

    id?: number;

    numeroExamenPhysique?: string;

    examenGeneral?: string;

    examenAppareil?: string;

    pressionArterielS?: number;

    pressionArterielD?: number;

    temperature?: number;

    frequenceC?: number;

    frequenceR?: number;

    saturationOxygene?: number;

    diurese?: number;

    poids?: number;

    taille?: number;

    imc?: number;

    tourTaille?: number;

    tourHanche?: number;

    glycemie?: number

    createDate?: Date;

    nomCompletAgent?: string;
}
