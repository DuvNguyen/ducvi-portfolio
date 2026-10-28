import nextConfig from 'eslint-config-next'

const config = [
  {
    ignores: ['node_modules/**', '.next/**', 'index.js', 'docs/**'],
  },
  ...nextConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@next/next/no-img-element': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },
]

export default config
