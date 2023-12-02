const morgan = require('morgan');

// 创建一个自定义的token，用于记录接口调用的信息
morgan.token('apiLog', (req, res) => {
  return JSON.stringify({
    method: req.method,
    url: req.url,
    status: res.statusCode,
    responseTime: `${res.get('X-Response-Time')}ms`,
  });
});

// 创建统计中间件
const apiStatsMiddleware = morgan(':apiLog', {
  // You can customize the format and options according to your needs
});

module.exports = apiStatsMiddleware;
