import { GetProducts } from '../domain/usecases/GetProducts';
import { GetProductById } from '../domain/usecases/GetProductById';
import { CreateProduct } from '../domain/usecases/CreateProduct';
import { UpdateProduct } from '../domain/usecases/UpdateProduct';
import { DeleteProduct } from '../domain/usecases/DeleteProduct';
import { ProductRepositoryMock } from './repositories/ProductRepositoryMock';
import { ProductRepositoryImpl } from './repositories/ProductRepositoryImpl';
import { AxiosClient } from '../../../shared/infrastructure/AxiosClient';
import { APP_CONFIG } from '../../../shared/infrastructure/config/app.config';

// 🏭 Factory para crear el repository según configuración
const createProductRepository = () => {
    return APP_CONFIG.USE_MOCK_DATA
        ? new ProductRepositoryMock()
        : new ProductRepositoryImpl(new AxiosClient(APP_CONFIG.API_BASE_URL));
};

// 🎯 Container de casos de uso - Dependency Injection
export const createProductUseCases = () => {
    const productRepository = createProductRepository();

    return {
        getProducts: new GetProducts(productRepository),
        getProductById: new GetProductById(productRepository),
        createProduct: new CreateProduct(productRepository),
        updateProduct: new UpdateProduct(productRepository),
        deleteProduct: new DeleteProduct(productRepository),
    };
};

// 🔄 Export para facilitar el switch manual si es necesario
export { ProductRepositoryMock, ProductRepositoryImpl };