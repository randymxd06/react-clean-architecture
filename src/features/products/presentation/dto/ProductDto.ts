export interface CreateProductRequest {
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
    stock: number;
}

export interface UpdateProductRequest {
    id: number;
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    imageUrl?: string;
    stock?: number;
    isActive?: boolean;
}