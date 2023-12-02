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
        }
    }
};
