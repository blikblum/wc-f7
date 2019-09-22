module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: ['IOS >= 10', 'Safari >= 10', 'Chrome >= 60', 'Firefox >= 57'],
        },
      },
    ],
  ],
  plugins: [
    // "@babel/plugin-transform-runtime",
    '@babel/plugin-syntax-dynamic-import',
  ],
}
