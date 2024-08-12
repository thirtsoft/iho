import { ProfilResponse } from "./profil-response";

export interface SignInResponse {
    id: number;
    matricule: string;
    nom: string;
    prenom: string;
    access_token: string;
    email: string;
    typeUtilisateur: string;
    profilReponse: ProfilResponse;
}
