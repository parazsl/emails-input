const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'emails-input.js',
    library: 'emailsInput',
    environment: {
      arrowFunction: false,
    },
  },
};
