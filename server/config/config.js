require('dotenv').config()

module.exports = {
    development: {
       username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_NAME,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        dialect:'postgres',
    },
    test: {
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_NAME,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        dialect:'postgres',
    },
    production: {
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_NAME,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        dialect:'postgres',
    }
};


// username: 'postgres',
// password: 'dexter12345',
// database: 'telegram.personal_data_bot',
// host: 'localhost',
// port: parseInt('5111'),
// dialect:'postgres',
