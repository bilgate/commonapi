// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../config');
const apiStatsMiddleware = require('./middles/morgenmid')
const { apiLimiter } = require('./middles/ratelimit');
const apiStatisticsMiddleware = require('./middles/statistics');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件捕获异常
app.use((req, res, next) => {
    try {
        // 执行其他中间件和路由
        next();
    } catch (error) {
        // 如果有错误发生，将其传递给错误处理中间件
        next(error);
    }
});

// 将统计中间件应用于所有路由
app.use(apiStatisticsMiddleware);

app.use(apiStatsMiddleware);

// 应用接口调用限流中间件
app.use('/api', apiLimiter);

app.use('/api/', (res, req, next) => {
    req.send("service is running.");
    req.end;
});

app.use(bodyParser.json());

// 使用 cors 中间件，并根据环境选择不同配置
app.use(cors({
    origin: config[process.env.NODE_ENV].api.baseUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));


// ... 其他中间件和路由 ...


// 错误处理中间件
app.use((err, req, res, next) => {
    // 记录错误
    console.error(err.stack);

    // 返回适当的错误响应给客户端
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
