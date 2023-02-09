import { Lookup } from "../lookups/lookups";
import { SharedProperties } from "../shared-properties/shared-properties";



export interface CategoryDto extends Lookup, Partial<SharedProperties> {
    code: string;
}

export interface AddCategoryDto extends Lookup, Partial<SharedProperties> {
    code: string;
}


export interface UpdateCategoryDto extends Lookup, Partial<SharedProperties> {
    code: string;
}

