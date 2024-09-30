import { SousElementHypothese } from "./sous-element-hypothese";

export interface ElementHypothese {
    id?: number;
    libelle?: string;
    sousElementHypotheseDs: SousElementHypothese[];
}
