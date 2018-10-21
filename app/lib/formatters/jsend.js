'use strict';
/**
 * JSON formatter.
 * @public
 * @function formatJSON
 * @param    {Object} req  the request object
 * @param    {Object} res  the response object
 * @param    {Object} body response body
 * @returns  {String}
 */
function formatJSend(req, res, body) {
    function formatError(res, body) {
        const isClientError = res.statusCode >= 400 && res.statusCode < 500;
        if (isClientError) {
            return {
                status: 'error',
                message: body.message,
                code: res.statusCode
            };
        } else {
            const message =
                body.name === 'ValidationError' || 'BulkWriteErrorr'
                    ? body.message
                    : 'Internal Server Error';
            const inDebugMode = process.env.APPLICATION_ENV === 'development';

            return {
                status: 'error',
                message: message,
                code: res.statusCode,
                data: inDebugMode ? body.stack : undefined
            };
        }
    }

    function formatSuccess(res, body) {
        if (body.data && body.pagination) {
            return {
                status: 'success',
                data: body.data,
                pagination: body.pagination
            };
        }

        return {
            status: 'success',
            data: body
        };
    }

    let response;
    if (body instanceof Error) {
        response = formatError(res, body);
    } else {
        response = formatSuccess(res, body);
    }

    response = JSON.stringify(response);
    res.header('Content-Length', Buffer.byteLength(response));
    res.header('Content-Type', 'application/json');

    return response;
}

module.exports = formatJSend;
