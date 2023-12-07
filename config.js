// config/config.js

module.exports = {
    development: {
        database: {
            host: '127.0.0.1',
            user: 'root',
            password: 'diandian',
            database: 'mysql'
        },
        api: {
            baseUrl: 'http://localhost:3000'
        },
        swaggerOptions:{
            definition: {
                openapi: '3.0.0',
                info: {
                    title: '扁平大陆智能平台',
                    version: '1.0.0',
                    description: 'API description',
                },
            },
            apis: ['./src/routers/*.js'], // Path to your API routes
        }
    },
    test: {
        database: {
            host: 'your_test_db_host',
            user: 'your_test_db_user',
            password: 'your_test_db_password',
            database: 'your_test_database'
        },
        api: {
            baseUrl: 'http://test-server:3000'
        },
        swaggerOptions:{
            definition: {
                openapi: '3.0.0',
                info: {
                    title: '扁平大陆智能平台',
                    version: '1.0.0',
                    description: 'API description',
                },
            },
            apis: ['./src/routers/*.js'], // Path to your API routes
        }
    },
    production: {
        database: {
            host: 'your_prod_db_host',
            user: 'your_prod_db_user',
            password: 'your_prod_db_password',
            database: 'your_prod_database'
        },
        api: {
            baseUrl: 'https://api.yourdomain.com'
        },
        swaggerOptions:{
            definition: {
                openapi: '3.0.0',
                info: {
                    title: '扁平大陆智能平台',
                    version: '1.0.0',
                    description: 'API description',
                },
            },
            apis: ['./src/routers/*.js'], // Path to your API routes
        }
    }
};
