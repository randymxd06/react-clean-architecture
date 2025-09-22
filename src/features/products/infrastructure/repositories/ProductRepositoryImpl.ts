import type { Product } from '../../domain/entities/Product';
import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import type { HttpClient } from '../../../../shared/infrastructure/HttpClient';

export class ProductRepositoryImpl implements ProductRepository {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getAll(): Promise<Product[]> {
    return await this.httpClient.get<Product[]>('/products');
  }

  async getById(id: number): Promise<Product | null> {
    try {
      return await this.httpClient.get<Product>(`/products/${id}`);
    } catch {
      return null;
    }
  }

  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): Promise<Product> {
    return await this.httpClient.post<Product>('/products', product);
  }

  async update(id: number, product: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> {
    return await this.httpClient.put<Product>(`/products/${id}`, product);
  }

  async delete(id: number): Promise<void> {
    await this.httpClient.delete<void>(`/products/${id}`);
  }

  async getByCategory(category: string): Promise<Product[]> {
    return await this.httpClient.get<Product[]>(`/products?category=${category}`);
  }
}