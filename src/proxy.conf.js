const proxyConfig = [{
  context: ['/api'],
  target: 'https://localhost:8080/api',
  secure: false,
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite: {
    "^/api": ""
  }
}]

module.exports = proxyConfig;
