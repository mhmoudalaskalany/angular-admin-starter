import { SharedProperties } from "../shared-properties/shared-properties";

export interface ArchiveInvoice extends SharedProperties {
    id?: string;
    companyName: string;
    invoiceNumber: string;
    fileId: string;
    fileUrl?: string;
    archiveImage?: any[];
}
