import { Link, useLocation } from 'react-router-dom';
import { Package } from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'Products', href: '/products', icon: Package },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                React Clean Architecture
              </span>
            </Link>

            <div className="flex space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-500">
              Clean Architecture Demo
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}