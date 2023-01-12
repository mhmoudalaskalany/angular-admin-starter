import { SharedProperties } from "../shared-properties/shared-properties";
import { ProductPrice } from "./product-price";

export interface Product extends SharedProperties {
    id: string;
    code: string;
    nameEn: string;
    nameAr: string;
    unitPrice: number;
    sellPrice: number;
    quantity: number;
    measureValue: number;
    note: string;
    stockKeepingUnit: string;
    manufactureDate: string;
    expirationDate: string;
    barcode: string;
    barcodeId?: string;
    barcodeImageUrl?: string;
    imageUrl: string;
    fileId: string;
    categoryId: string;
    warehouseId: string;
    supplierId: string;
    unitsOfMeasureId: string;
    cartQuantity: number;
    oldUnitPrice: number;
    oldSellPrice: number;
    updateQntType: string;
    updateQntNote: string;
    isUpdateQuantity: boolean;
    addNewQuantity: number;
    productImage?: any;
    productPriceId?: string;
    productPricingLevel?: string;
    productPrice?: ProductPrice;
}
