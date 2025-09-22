import type { Product } from '../entities/Product';
import type { ProductRepository } from '../repositories/ProductRepository';

export class CreateProduct {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): Promise<Product> {
    return await this.productRepository.create(productData);
  }
}