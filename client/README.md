# Client application for My Favorite Places

A small React + TypeScript frontend built with Vite. It communicates with the
`/api` endpoints exposed by the server running in the sibling `server/` folder.

## Development

1. make sure you have **Node 20+** installed – the Vite scaffolding requires it
2. start the backend (from the workspace root):
   ```bash
   cd server
   npm install            # if you haven't already
   npm run dev            # starts Express on port 3000
   ```
3. open a new terminal and run the frontend:
   ```bash
   cd client
   npm install            # install dependencies
   npm run dev            # starts Vite on port 5173
   ```

Vite is configured to proxy `/api` to `http://localhost:3000` so you can use
relative URLs in the code.

## Features implemented

- register / log in users
- list all saved addresses for the current account
- add a new address by providing a search word, a name and an optional
  description

### Further improvements

You can extend the UI with search‑by‑radius, editing/deleting addresses, map
integration, offline support, etc. This is just a minimal starting point.

---

Feel free to keep or toss the contents of the original Vite template README;
it's been replaced by the above information.import reactDom from 'eslint-plugin-react-dom'

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

```
