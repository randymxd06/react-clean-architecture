import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Product } from '../../domain/entities/Product';
import type { CreateProductRequest, UpdateProductRequest } from '../dto/ProductDto';
import { createProductUseCases } from '../../infrastructure';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
  getProductById: (id: number) => Promise<Product | null>;
  createProduct: (product: CreateProductRequest) => Promise<void>;
  updateProduct: (id: number, product: Omit<UpdateProductRequest, 'id'>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize dependencies with useMemo to prevent recreation
  const useCases = useMemo(() => {
    // 🏭 Dependency injection from infrastructure layer
    return createProductUseCases();
  }, []);

  const getProducts = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await useCases.getProducts.execute();
      setProducts(productsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [useCases.getProducts]);

  const getProductById = useCallback(async (id: number): Promise<Product | null> => {
    try {
      setError(null);
      return await useCases.getProductById.execute(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    }
  }, [useCases.getProductById]);

  const createProduct = useCallback(async (product: CreateProductRequest): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const newProduct = await useCases.createProduct.execute(product);
      setProducts(prev => [...prev, newProduct]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [useCases.createProduct]);

  const updateProduct = useCallback(async (id: number, product: Omit<UpdateProductRequest, 'id'>): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const updatedProduct = await useCases.updateProduct.execute(id, product);
      setProducts(prev =>
        prev.map(p => p.id === id ? updatedProduct : p)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [useCases.updateProduct]);

  const deleteProduct = useCallback(async (id: number): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await useCases.deleteProduct.execute(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [useCases.deleteProduct]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return {
    products,
    loading,
    error,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};