import { TransactionType } from '../types/transaction-type.enum';
export declare class Transfer {
    id: string;
    productId: string;
    sourceStoreId: string;
    targetStoreId: string;
    quantity: number;
    timestamp: Date;
    type: TransactionType;
}
