// models/asignacion.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

// Models
const Estudiante = require('./estudiante');
const Profesor = require('./profesor');
const Libro = require('./libro');

const Asignacion = sequelize.define('Asignacion', {
    fecha_asignacion: {
        type: DataTypes.DATE,
        allowNull: true, // puede ser nulo
    },
    fecha_entrega: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    libro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    estudiante_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // puede ser nulo
    },
    profesor_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // puede ser nulo
    },

}, {
    tableName: 'asignaciones', // Ajusta el nombre de la tabla aquí
});

// Define la asociación con Estudiante
Asignacion.belongsTo(Estudiante, { foreignKey: 'estudiante_id' });

// Define la asociación con Profesor
Asignacion.belongsTo(Profesor, { foreignKey: 'profesor_id' });

// Define la asociación con Libro
Asignacion.belongsTo(Libro, { foreignKey: 'libro_id' });

module.exports = Asignacion;