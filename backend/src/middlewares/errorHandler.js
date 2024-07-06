"use strict";

/**
 * Middleware para el manejo de errores.
 * @function errorHandler
 */
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
};
