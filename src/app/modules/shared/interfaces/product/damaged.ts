import { SharedProperties } from "../shared-properties/shared-properties";
import { Product } from "./product";

export interface DamagedProduct extends SharedProperties, DamagedProductBase {
    product: Product;
}

export interface DamagedProductBase {
    id?: string;
    totalDamageProduct: number;
    reasonOfDamage: string;
    productId: string;
}