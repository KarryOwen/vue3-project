import js from '@eslint/js'
import pluginVue, { rules } from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  {
    rules: {
      'vue/multi-word-component-names': 0,
    }
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
]
