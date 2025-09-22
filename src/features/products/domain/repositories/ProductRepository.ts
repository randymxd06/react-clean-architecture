import type { Product } from '../entities/Product';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
  create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): Promise<Product>;
  update(id: number, product: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product>;
  delete(id: number): Promise<void>;
  getByCategory(category: string): Promise<Product[]>;
}