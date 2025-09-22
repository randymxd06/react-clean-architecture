import { ProductsPage } from './features/products/presentation/pages/ProductsPage';
import './shared/presentation/styles/shared.css';
import './features/products/presentation/styles/products.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>React Clean Architecture Demo</h1>
        <nav>
          <ul>
            <li><a href="#products">Products</a></li>
            <li><a href="#users">Users</a></li>
            <li><a href="#auth">Auth</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <ProductsPage />
      </main>
    </div>
  );
}

export default App;
