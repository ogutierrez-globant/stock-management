export interface ProductDTO {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    sku: string;
}
export interface ProductQuery {
    category?: string;
    price_lt?: number;
    price_gt?: number;
    page?: number;
    limit?: number;
}
