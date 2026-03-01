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

## Integración de `work` con `main` para despliegue

Para mostrar claramente que los cambios de la rama de trabajo quedaron listos para desplegarse en `main`, usa este flujo:

```bash
# 1) Actualizar referencias
git fetch --all --prune

# 2) Revisar estado de ambas ramas
git checkout work
git status
git log --oneline --decorate -n 5

git checkout main
git status
git log --oneline --decorate -n 5

# 3) Integrar cambios de work en main (fast-forward o merge)
git merge --no-ff work

# 4) Validar build y lint antes de despliegue
npm run lint
npm run build

# 5) Publicar rama main al remoto
git push origin main
```

Si `main` no existe localmente, créala desde remoto con:

```bash
git checkout -b main origin/main
```

Si no hay remoto configurado (como en este entorno local), la integración puede verificarse localmente con `git log --graph --oneline --decorate` y realizar el push en el entorno con acceso al repositorio remoto.

## Verificación rápida: `SublevelConfig` con `name`

Si aparece el error de TypeScript `Property 'name' does not exist on type 'SublevelConfig'`, valida que **ambos** archivos `LevelScreen.tsx` tengan `name: string` dentro de la interfaz `SublevelConfig`:

- `src/screens/LevelScreen.tsx`
- `academia-cuatro-reinos/src/screens/LevelScreen.tsx`

Comandos útiles para comprobarlo:

```bash
rg -n "interface SublevelConfig|name: string" src/screens/LevelScreen.tsx academia-cuatro-reinos/src/screens/LevelScreen.tsx
```

En PowerShell (sin `rg`):

```powershell
Select-String -Path src/screens/LevelScreen.tsx, academia-cuatro-reinos/src/screens/LevelScreen.tsx -Pattern "interface SublevelConfig|name: string"
```

Después valida compilación en ambos proyectos:

```powershell
pnpm run build
Set-Location .\academia-cuatro-reinos
pnpm run build
Set-Location ..
```
