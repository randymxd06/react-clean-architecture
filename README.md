# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

```text
src/
├── App.tsx
├── index.css
├── main.tsx
├── vite-env.d.ts
├── features/
│   └── products/
│       ├── domain/
│       │   ├── entities/
│       │   │   └── Product.ts
│       │   ├── repositories/
│       │   │   └── ProductRepository.ts
│       │   └── usecases/
│       │       ├── CreateProduct.ts
│       │       ├── DeleteProduct.ts
│       │       ├── GetProductById.ts
│       │       ├── GetProducts.ts
│       │       └── UpdateProduct.ts
│       ├── infrastructure/
│       │   ├── index.ts
│       │   └── repositories/
│       │       ├── ProductRepositoryImpl.ts
│       │       └── ProductRepositoryMock.ts
│       └── presentation/
│           ├── components/
│           │   ├── ModernProductCard.tsx
│           │   └── ModernProductForm.tsx
│           ├── dto/
│           │   └── ProductDto.ts
│           ├── hooks/
│           │   └── useProducts.ts
│           └── pages/
│               └── ProductsPage.tsx
└── shared/
    ├── infrastructure/
    │   ├── AxiosClient.ts
    │   ├── HttpClient.ts
    │   └── config/
    │       └── app.config.ts
    └── presentation/
        ├── components/
        │   ├── Navigation.tsx
        │   └── ui/
        │       ├── button.tsx
        │       ├── card.tsx
        │       ├── index.tsx
        │       ├── input.tsx
        │       └── label.tsx
        ├── layouts/
        │   └── RootLayout.tsx
        ├── lib/
        │   └── utils.ts
        └── router/
            └── index.tsx
```
