module.exports = {
  env: {
      node: true, // Habilitar variables globales de Node.js
      es2021: true, // Usar características de ES2021
  },
  extends: [
      'airbnb-base', // Usar las reglas de Airbnb
      'plugin:node/recommended', // Reglas recomendadas para Node.js
      'plugin:import/recommended', // Reglas recomendadas para imports
      'plugin:promise/recommended', // Reglas recomendadas para promesas
  ],
  parserOptions: {
      ecmaVersion: 'latest', // Usar la última versión de ECMAScript
      sourceType: 'module', // Usar módulos de ES6
  },
  rules: {
      // Reglas personalizadas
      'no-console': 'off', // Permitir el uso de console.log
      'import/no-unresolved': 'off', // Desactivar la verificación de imports no resueltos
      'node/no-missing-require': 'off', // Desactivar la verificación de requires no resueltos
      'node/no-unsupported-features/es-syntax': 'off', // Permitir características de ES no soportadas
      'no-unused-vars': 'warn', // Advertir sobre variables no utilizadas
      'no-underscore-dangle': 'off', // Permitir el uso de guiones bajos (_) en nombres de variables
      'consistent-return': 'off', // No forzar retornos consistentes en funciones
      'promise/always-return': 'off', // No forzar siempre retornar en promesas
      'promise/catch-or-return': 'off', // No forzar siempre usar catch en promesas
      'import/extensions': ['error', 'ignorePackages'], // Ignorar extensiones en imports
  },
  settings: {
      'import/resolver': {
          node: {
              extensions: ['.js'], // Extensiones de archivos que ESLint debe resolver
          },
      },
  },
};
