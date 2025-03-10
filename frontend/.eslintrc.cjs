module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2023,
        sourceType: 'module',
    },
    extends: [
        '@nuxtjs/eslint-config-typescript',
        'plugin:nuxt/recommended',
        'plugin:vue/vue3-recommended',
        'prettier',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
        'vue/component-api-style': ['error', ['script-setup', 'composition']], // using Composition API
        'vue/no-reserved-component-names': 'error',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
        'import/no-unresolved': 'off',
        'no-undef': 'off',
        'vue/require-default-prop': 'off',
        'vue/attribute-hyphenation': ['error', 'always'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_' },
        ],
        'vue/script-setup-uses-vars': 'error',
    },
}
