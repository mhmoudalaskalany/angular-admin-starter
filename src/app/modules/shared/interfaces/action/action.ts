import { Lookup, SharedProperties } from "../shared/shared";


export interface ActionDto extends Lookup, Partial<SharedProperties> {
    code: string;
}


export interface AddActionDto extends Lookup, Partial<SharedProperties> {
    code: string;
}

export interface UpdateActionDto extends Lookup, Partial<SharedProperties> {
    code: string;
}