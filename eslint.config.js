import antfu from '@antfu/eslint-config';
import perfectionist from 'eslint-plugin-perfectionist';

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
      ...perfectionistRules,

      'antfu/no-top-level-await': ['off'],

      'import/order': 'off',
      'no-console': ['warn'],

      'node/no-process-env': ['error'],
      'node/prefer-global/process': ['off'],

      'perfectionist/sort-imports': [
        'error',
        {

          customGroups: {
            value: {
              'css-modules': ['\\.(c|s[ac]|le)ss$'],
            },
          },
          groups: [
            'type',
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'css-modules',
            'unknown',
          ],
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-modules': 'off', // Вимкнули сортування функцій/компонентів у корені модуля

      // 'perfectionist/sort-variable-declarations': [
      //   'error',
      //   {
      //     order: 'asc',
      //     partitionByNewLine: false,
      //     type: 'natural',
      //   },
      // ], // Вимкнули сортування оголошень (const/let/var)
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
