const renderReviewResponse = (res, review, message) => {
    res.status(201).json({
        message,
        review
    });
};

const renderReviewsList = (res, reviews) => {
    res.status(200).json({
        message: 'Reseñas obtenidas con éxito.',
        reviews
    });
};

const renderErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({ message });
};

module.exports = {
    renderReviewResponse,
    renderReviewsList,
    renderErrorResponse
};
