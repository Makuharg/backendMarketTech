const detailModel = require('../models/getDetailModel');
const responseView = require('../views/getDetailView');

const getDetails = async (req, res) => {
    try {
        const { transaction_id } = req.params;
        const { rows } = await detailModel.getUserDetails(transaction_id);
        responseView.successResponse(res, rows);
    } catch (error) {
        responseView.errorResponse(res, error);
    }
};

module.exports = { getDetails };