import type { Product } from '../../domain/entities/Product';
import type { ProductRepository } from '../../domain/repositories/ProductRepository';

// Mock data
const mockProducts: Product[] = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        description: "Latest Apple smartphone with advanced features",
        price: 999.99,
        category: "Electronics",
        imageUrl: "https://via.placeholder.com/300x200?text=iPhone+15+Pro",
        stock: 25,
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        description: "High-performance Android smartphone",
        price: 899.99,
        category: "Electronics",
        imageUrl: "https://via.placeholder.com/300x200?text=Galaxy+S24",
        stock: 18,
        isActive: true,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
    },
    {
        id: 3,
        name: "MacBook Pro M3",
        description: "Professional laptop for developers and creators",
        price: 1999.99,
        category: "Computers",
        imageUrl: "https://via.placeholder.com/300x200?text=MacBook+Pro",
        stock: 12,
        isActive: true,
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01')
    },
    {
        id: 4,
        name: "Sony WH-1000XM5",
        description: "Premium noise-canceling headphones",
        price: 399.99,
        category: "Audio",
        imageUrl: "https://via.placeholder.com/300x200?text=Sony+Headphones",
        stock: 8,
        isActive: false,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-02-15')
    }
];

export class ProductRepositoryMock implements ProductRepository {
    private products: Product[] = [...mockProducts];
    private nextId: number = 5;

    private delay(ms: number = 500): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getAll(): Promise<Product[]> {
        await this.delay();
        return [...this.products];
    }

    async getById(id: number): Promise<Product | null> {
        await this.delay();
        const product = this.products.find(p => p.id === id);
        return product || null;
    }

    async create(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): Promise<Product> {
        await this.delay();

        const newProduct: Product = {
            id: this.nextId++,
            ...productData,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.products.push(newProduct);
        return newProduct;
    }

    async update(id: number, productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> {
        await this.delay();

        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }

        const updatedProduct: Product = {
            ...this.products[index],
            ...productData,
            updatedAt: new Date()
        };

        this.products[index] = updatedProduct;
        return updatedProduct;
    }

    async delete(id: number): Promise<void> {
        await this.delay();

        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }

        this.products.splice(index, 1);
    }

    async getByCategory(category: string): Promise<Product[]> {
        await this.delay();
        return this.products.filter(p =>
            p.category.toLowerCase().includes(category.toLowerCase())
        );
    }
}