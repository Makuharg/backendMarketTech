const detailModel = require('../models/getDetailModel');
const responseView = require('../views/getDetailView');

const getDetails = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { rows } = await detailModel.getUserDetails(user_id);
        responseView.successResponse(res, rows);
    } catch (error) {
        responseView.errorResponse(res, error);
    }
};

module.exports = { getDetails };