import { Edit2, Trash2, Eye } from 'lucide-react';
import type { Product } from '../../domain/entities/Product';
import { cn } from '../../../../shared/presentation/lib/utils';
import { Button } from '../../../../shared/presentation/components/ui/button';
import { Card, CardContent } from '../../../../shared/presentation/components/ui/card';

interface ModernProductCardProps {
  readonly product: Product;
  readonly onEdit: (product: Product) => void;
  readonly onDelete: (id: number) => void;
  readonly onView?: (id: number) => void;
}

export function ModernProductCard({
  product,
  onEdit,
  onDelete,
  onView
}: ModernProductCardProps) {
  return (
    <Card className="group relative overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Product Image */}
      <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
            product.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          )}>
            {product.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex space-x-1">
            {onView && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onView(product.id)}
                className="p-2 bg-white/90 hover:bg-white shadow-sm"
                title="View details"
              >
                <Eye className="w-4 h-4 text-gray-600" />
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit(product)}
              className="p-2 bg-white/90 hover:bg-white shadow-sm"
              title="Edit product"
            >
              <Edit2 className="w-4 h-4 text-gray-600" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(product.id)}
              className="p-2 bg-white/90 hover:bg-white shadow-sm"
              title="Delete product"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
            {product.category}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">
              Stock: {product.stock}
            </span>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(product)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(product.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}