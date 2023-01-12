import { SharedProperties } from "../shared-properties/shared-properties";

export interface Category extends Lookup, Partial<SharedProperties> {
    description: string;
    code: string;
    parentId?: any;
}

export interface Currency extends Lookup, Partial<SharedProperties> {
    description: string;
    code: string;
    symbol: string;
    country: string;
}

export interface PaymentType extends Lookup, Partial<SharedProperties> {
    description: string;
    code: string;
}

export interface Measure extends Lookup, Partial<SharedProperties> {
    description: string;
    code: string;
}

export interface Warehouse extends Lookup, Partial<SharedProperties> {
    description: string;
    code: string;
}

export interface Shop extends Lookup, Partial<SharedProperties> {
    description: string;
    code: string;
}

export interface Role extends Lookup, Partial<SharedProperties> { }

export interface Shop extends Lookup, Partial<SharedProperties> { }

export interface Permission extends Lookup, Partial<SharedProperties> {
    code: string;
}

export interface User extends Partial<SharedProperties> {
    roleIds?: string[];
    name: string;
    userName: string;
    email: string;
    password: string,
    phone: string,
    address: string,
    country: string;
    userImage: any[];
    imageUrl: string;
}

export interface Supplier extends Lookup, Partial<SharedProperties> {
    contactPersons: contactPerson[];
    email: string;
    phone: string;
    address: string;
}

export interface Customer extends Lookup, Partial<SharedProperties> {
    name: string;
    email: string;
    phone: string;
    billingAddress: string;
    points: string;
}

export interface Lookup {
    id: string | null;
    nameEn: string;
    nameAr: string;
}

interface contactPerson extends SharedProperties {
    id: string;
    supplierId: string;
    nameEn: string;
    nameAr: string;
    positionEn: string;
    positionAr: string;
    number: string;
    times: string;
}
