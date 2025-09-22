import type { Product } from '../entities/Product';
import type { ProductRepository } from '../repositories/ProductRepository';

export class GetProductById {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: number): Promise<Product | null> {
    return await this.productRepository.getById(id);
  }
}