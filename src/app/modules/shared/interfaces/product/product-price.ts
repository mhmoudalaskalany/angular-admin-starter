export interface ProductPrice {
    productPriceId?:                    string;
    productId:                          string;
    isBasicPriceDetails?:               boolean;
    isDeliveryPriceDetails?:            boolean;
    isLoadingAndUnloadingPriceDetails?: boolean;
    isProfitRatioDetails?:              boolean;
    istPricePosSystem?:                 boolean;

    isPriceOnlineSystem?:               boolean;
    productPrice:                       ProductPrice;
}

export interface ProductPrice {
    totalUnitPrice:                   number;
    basicPriceDetails?:               BasicPriceDetails;
    deliveryPriceDetails?:            PriceDetails;
    loadingAndUnloadingPriceDetails?: PriceDetails;
    productProfitRatioDetails?:       ProductProfitRatioDetails;
    productPricePosSystem?:           ProductPriceSystem;

    productPriceOnlineSystem?:        ProductPriceSystem;
}

interface BasicPriceDetails {
    quantity:  number;
    netAmount: number;
    discount:  number;
    vat:       number;
    vatAmount: number;
    subAmount: number;
    unitPrice: number;
    amount:    number; // to be removed
}

interface PriceDetails {
    delivery?:            number;
    unitPrice:            number;
    vat:                  number;
    vatAmount:            number;
    subAmount:            number;
    loadingAndUnloading?: number;
}

interface ProductPriceSystem {
    vatPercentage:  number;
    vatAmount:      number;
    deservedAmount: number;
}

interface ProductProfitRatioDetails {
    profitRatioPercentage: number;
    subAmount:             number;
    netAmount:             number;
}
