# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Vercel deploy troubleshooting (Windows)

If Vercel CLI says a duplicated path does not exist (for example ending in `...\academia-cuatro-reinos\academia-cuatro-reinos`), the project is linked with a Root Directory and you are running commands from inside that same folder.

Use this safe flow from repository root (`C:\Users\gabri\Downloads\academia-cuatro-reinos`):

```powershell
# 1) Go to repo root (NOT inside academia-cuatro-reinos subfolder)
cd C:\Users\gabri\Downloads\academia-cuatro-reinos

# 2) Link / pull config if needed
npx vercel login
npx vercel link
npx vercel pull --yes --environment=production

# 3) Validate subapp build
cd .\academia-cuatro-reinos
npm install
npm run build

# 4) Return to repo root and deploy
cd ..
npx vercel --prod --yes
```

This project also includes `academia-cuatro-reinos/vercel.json` to force stable defaults (`npm install`, `npm run build`, `dist`) and avoid `npm ci` lockfile errors in environments where `package-lock.json` is not present in that subfolder.
