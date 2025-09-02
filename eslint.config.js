// .eslintrc.js
import antfu from '@antfu/eslint-config';

export default antfu({
  // Тип проекту: 'app' для звичайного веб/віте-проекту
  type: 'app',
  react: true,

  // TypeScript вимикаємо, бо у нас JS
  typescript: false,

  // Форматери включаємо, бо класно мати uniform code style
  formatters: true,

  stylistic: {
    indent: 2, // відступи у 2 пробіли
    semi: true, // ставимо крапку з комою після кожного виразу
    quotes: 'single', // одинарні лапки
  },
}, {
  rules: {
    'no-console': ['warn'], // попередження при console.log()
    'antfu/no-top-level-await': ['off'], // можна юзати top-level await
    'node/prefer-global/process': ['off'], // не обов'язково використовувати глобальний process
    'node/no-process-env': ['error'], // заборона використовувати process.env напряму
    // 'perfectionist/sort-imports': ['error', { tsconfigRootDir: '.' }], // сортування імпортів
    // "unicorn/filename-case": ["error", { case: "kebabCase", ignore: ["README.md"] }], // файли у kebab-case
    'react/jsx-one-expression-per-line': 'off',
    'style/jsx-one-expression-per-line': 'off',
    'style/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
  },
});
