const rateLimit = require('express-rate-limit');

// 配置接口调用限制，这里限制每个IP每分钟最多发起 100 次请求
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});

// 记录接口调用次数的中间件
const apiStatsMiddleware = (req, res, next) => {
  // 在这里你可以将接口调用次数记录到数据库或其他存储中
  // 这里简单地打印到控制台作为示例
  console.log(`API call from IP ${req.ip}`);

  next();
};

module.exports = { apiLimiter };
