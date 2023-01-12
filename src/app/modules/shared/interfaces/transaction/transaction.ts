import { Currency, Customer, PaymentType } from "../lookups/lookups";
import { Product } from "../product/product";

export interface Transaction {
    id?:                   string;
    invoiceNo?:            string;
    transactionStatus?:    string;
    commonCharge:         number;
    discount:             number;
    discountAmount:       number;
    tax:                  number;
    taxAmount:            number;
    subTotal:             number;
    grandTotal:           number;
    paidAmount:           number;
    dueAmount:            number;
    changedAmount:        number;
    customerId:           string;
    currencyId:           string;
    paymentTypeId:        string;
    transactionDetails:   TransactionDetail[];
    transactionHistories: TransactionHistory[];
    createdDate?:         string;
    customer?:            Customer;
    currency?:            Currency
}

export interface TransactionDetail {
    id:            string;
    quantity:      number;
    sellPrice:     number;
    totalAmount:   number;
    transactionId: string;
    productId:     string;
    product?:      Product;
}

export interface TransactionHistory {
    id:            string;
    modeOfPayment: string;
    amount:        number;
    referenceNo:   string;
    transactionId: string;
    paymentType?:  PaymentType
}
