const { Sequelize } = require('sequelize');
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

const dbConnection = async () => {
    try {
        await pool.connect();
        console.log('Conexión con la base de datos exitosa');
    } catch (error) {
        console.error('Error al conectarse con la base de datos:', error.message);
    }
};


module.exports = {
    dbConnection,
    sequelize
};