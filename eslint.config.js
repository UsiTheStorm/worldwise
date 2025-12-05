import antfu from '@antfu/eslint-config';
import perfectionist from 'eslint-plugin-perfectionist';

// Витягуємо лише правила з конфігурації Perfectionist
const perfectionistRules = perfectionist.configs['recommended-natural'].rules;

export default antfu(
  {
    formatters: true,
    react: true,
    stylistic: {
      indent: 2,
      quotes: 'single',
      semi: true,
    },
    type: 'app',

    typescript: false,
  },

  {
    rules: {
      // 1. Розгортаємо всі правила Perfectionist першими.
      // Це замінює необхідність підключати об'єкт plugins
      ...perfectionistRules,

      'antfu/no-top-level-await': ['off'],
      // 2. Вимикаємо конфліктуючі правила Antfu
      'import/order': 'off',

      
      'no-console': ['warn'],
      'node/no-process-env': ['error'],
      'node/prefer-global/process': ['off'],
      'react/jsx-one-expression-per-line': 'off',

      'sort-imports': 'off',
      'style/jsx-curly-brace-presence': [
        'error',
        { children: 'never', props: 'never' },
      ],
      'style/jsx-one-expression-per-line': 'off',
    },
  },
);
