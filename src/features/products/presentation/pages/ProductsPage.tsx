import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ModernProductCard } from '../components/ModernProductCard';
import { ModernProductForm } from '../components/ModernProductForm';
import type { Product } from '../../domain/entities/Product';
import type { CreateProductRequest, UpdateProductRequest } from '../dto/ProductDto';
import { Button } from '../../../../shared/presentation/components/ui/button';

type ViewMode = 'list' | 'create' | 'edit';

export function ProductsPage() {
    const {
        products,
        loading,
        error,
        createProduct,
        updateProduct,
        deleteProduct,
    } = useProducts();

    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleCreateProduct = async (productData: CreateProductRequest) => {
        await createProduct(productData);
        setViewMode('list');
    };

    const handleUpdateProduct = async (productData: UpdateProductRequest) => {
        if (selectedProduct) {
            await updateProduct(selectedProduct.id, productData);
            setViewMode('list');
            setSelectedProduct(null);
        }
    };

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setViewMode('edit');
    };

    const handleDeleteProduct = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
        }
    };

    const handleCancel = () => {
        setViewMode('list');
        setSelectedProduct(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage your product inventory with Clean Architecture
                    </p>
                </div>
                <Button
                    onClick={() => setViewMode('create')}
                    disabled={loading}
                    className="inline-flex items-center"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                </Button>
            </div>

            {/* Error State */}
            {error && (
                <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                    <div className="flex">
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading && products.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-sm text-gray-600">Loading products...</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Empty State */}
                    {products.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="mx-auto h-24 w-24 text-gray-400">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Get started by creating your first product.
                            </p>
                            <div className="mt-6">
                                <Button
                                    onClick={() => setViewMode('create')}
                                    className="inline-flex items-center"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Product
                                </Button>
                            </div>
                        </div>
                    ) : (
                        /* Products Grid */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map(product => (
                                <ModernProductCard
                                    key={product.id}
                                    product={product}
                                    onEdit={handleEditProduct}
                                    onDelete={handleDeleteProduct}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Modals */}
            {viewMode === 'create' && (
                <ModernProductForm
                    onSubmit={handleCreateProduct}
                    onCancel={handleCancel}
                    loading={loading}
                />
            )}

            {viewMode === 'edit' && selectedProduct && (
                <ModernProductForm
                    product={selectedProduct}
                    onSubmit={handleCreateProduct}
                    onUpdate={handleUpdateProduct}
                    onCancel={handleCancel}
                    loading={loading}
                />
            )}
        </div>
    );
}