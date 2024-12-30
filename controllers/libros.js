// controllers/libros.js
const { response } = require('express');
const { Sequelize, Op } = require('sequelize');
// Models
const Libro = require('../models/libro');

//Obtener todos los libros
const getLibros = async (req, res = response) => {
    try {
        const libros = await Libro.findAll();
        // Ordenar libros alfabéticamente por título
        libros.sort((a, b) => a.titulo.localeCompare(b.titulo));
        res.json({
            ok: true,
            libros,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};


// Obtener estadisticas de libros
const getEstadisticasLibros = async (req, res = response) => {
    try {
        // Obtener las estadísticas mediante consultas SQL
        const estadisticas = await Libro.findOne({
            attributes: [
                // Subconsulta para obtener la cantidad_total
                [
                    Sequelize.literal('(SELECT SUM("Libro"."cantidad_total") FROM "libros" AS "Libro")'),
                    'total_libros'
                ],
                // Sumar la cantidad total de libros prestados, mora y reparación
                [
                    Sequelize.literal('(SELECT SUM("Libro"."cantidad_prestados" + "Libro"."cantidad_mora" + "Libro"."cantidad_reparacion") FROM "libros" AS "Libro")'),
                    'total_libros_prestados_mora_reparacion'
                ],
                // Sumar la cantidad total de libros prestados
                [Sequelize.fn('SUM', Sequelize.literal('"Libro"."cantidad_prestados"')), 'prestados'],
                // Sumar la cantidad total de libros en mora
                [Sequelize.fn('SUM', Sequelize.literal('"Libro"."cantidad_mora"')), 'mora'],
                // Sumar la cantidad total de libros en reparación
                [Sequelize.fn('SUM', Sequelize.literal('"Libro"."cantidad_reparacion"')), 'reparacion'],
            ],
        });

        res.json({
            ok: true,
            estadisticas,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
};

module.exports = {
    getLibros,
    getEstadisticasLibros,
};