const renderCheckoutResponse = (res, transaction, details) => {
    res.status(201).json({
        message: 'Compra realizada con éxito.',
        transaction,
        details,
    });
};

const renderErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({ message });
};

module.exports = {
    renderCheckoutResponse,
    renderErrorResponse
};
