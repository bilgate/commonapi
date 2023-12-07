const path = require('path');
const winston = require('winston');

// 定义日志文件路径
const logFilePath = path.join(__dirname, '../../api_calls.log');

// 初始化接口调用次数为0
let apiCallsCount = 0;
const apiCallsByRoute = {};

// 创建Winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: logFilePath }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

// 创建统计中间件
const apiStatisticsMiddleware = (req, res, next) => {
  // 增加总调用次数
  apiCallsCount++;

  // 增加单个接口调用次数
  const route = req.path;
  apiCallsByRoute[route] = (apiCallsByRoute[route] || 0) + 1;

  // 在这里你可以执行其他中间件逻辑

  next();
};

// 定时任务：在凌晨3点半时重置计数并写入日志文件
const resetAndLogTask = () => {
  const now = new Date();
  const resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 3, 0, 0);

  // 计算距离下一次重置的时间间隔
  const timeUntilReset = resetTime.getTime() - now.getTime();

  // 设置定时器，在凌晨3点半时执行任务
  setTimeout(() => {
    // 将统计信息写入日志文件
    logger.info('API Calls Summary', {
      timestamp: new Date().toISOString(),
      totalCalls: apiCallsCount,
      callsByRoute: apiCallsByRoute,
    });

    // 重置计数和单个接口调用次数
    apiCallsCount = 0;
    Object.keys(apiCallsByRoute).forEach((route) => {
      apiCallsByRoute[route] = 0;
    });

    // 递归调用，以便明天同一时间执行任务
    resetAndLogTask();
  }, timeUntilReset);
};

// 启动定时任务
resetAndLogTask();

module.exports = apiStatisticsMiddleware;
