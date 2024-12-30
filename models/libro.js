// models/libro.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Libro = sequelize.define('Libro', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cantidad_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad_prestados: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad_reparacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad_mora: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    editorial: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'libros', // Ajusta el nombre de la tabla aquí
});

module.exports = Libro;