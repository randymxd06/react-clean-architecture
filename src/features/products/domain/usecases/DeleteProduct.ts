import type { ProductRepository } from '../repositories/ProductRepository';

export class DeleteProduct {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}