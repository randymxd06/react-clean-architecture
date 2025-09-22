import type { Product } from '../entities/Product';
import type { ProductRepository } from '../repositories/ProductRepository';

export class GetProducts {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<Product[]> {
    return await this.productRepository.getAll();
  }
}