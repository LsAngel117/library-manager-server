// controllers/asignaciones.js
const { response } = require('express');

const moment = require('moment');

// Models
const Asignacion = require('../models/asignacion');
const Estudiante = require('../models/estudiante');
const Profesor = require('../models/profesor');
const Libro = require('../models/libro');

//Obtener todas las asignaciones
const getAsignaciones = async (req, res = response) => {
    try {
        const asignaciones = await Asignacion.findAll({
            include: [
                { model: Estudiante, attributes: ['nombre', 'apellido', 'documento', 'img'] }, // Ajusta los atributos que quieres mostrar de Estudiante
                { model: Profesor, attributes: ['nombre', 'apellido', 'documento', 'img'] }, // Ajusta los atributos que quieres mostrar de Profesor
                { model: Libro, attributes: ['titulo'] }
            ],
            order: [['fecha_entrega', 'ASC']] // Ordena por fecha de entrega de forma ascendente
        });

        // Formatear las fechas antes de enviar la respuesta
        const asignacionesFormateadas = asignaciones.map(asignacion => ({
            ...asignacion.toJSON(),
            fecha_entrega: moment(asignacion.fecha_entrega).format('YYYY-MM-DD'),
            fecha_asignacion: asignacion.fecha_asignacion ? moment(asignacion.fecha_asignacion).format('YYYY-MM-DD HH:mm:ss') : null,
        }));

        res.json({
            ok: true,
            // Filtra las asignaciones que no no tienen el estado Entregado
            asignaciones: asignacionesFormateadas.filter(asignacion => asignacion.estado !== 'Entregado')
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

//Hacer una nueva asignación
const crearAsignacion = async (req, res = response) => {
    const { body } = req;
    try {
        const asignacion = await Asignacion.create(body);
        res.json({
            ok: true,
            asignacion
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

// Cambiar el estado de una asignación
const cambiarEstadoAsignacion = async (req, res = response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const asignacion = await Asignacion.findByPk(id);
        if (!asignacion) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una asignación con el id ' + id
            });
        }

        await asignacion.update(body);

        res.json({
            ok: true,
            asignacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

module.exports = {
    getAsignaciones,
    crearAsignacion,
    cambiarEstadoAsignacion,
};