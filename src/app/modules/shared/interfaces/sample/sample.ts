import { Lookup } from '../lookups/lookups';
import { SharedProperties } from '../shared-properties/shared-properties';

export interface SampleDto extends Lookup, Partial<SharedProperties> {
  code: string;
}

export interface AddSampleDto extends Lookup, Partial<SharedProperties> {
  code: string;
}

export interface UpdateSampleDto extends Lookup, Partial<SharedProperties> {
  code: string;
}
