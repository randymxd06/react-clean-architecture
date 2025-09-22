import type { Product } from '../entities/Product';
import type { ProductRepository } from '../repositories/ProductRepository';

export class UpdateProduct {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: number, productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> {
    return await this.productRepository.update(id, productData);
  }
}