const transactionModel = require('../models/getTransactionModel');
const responseView = require('../views/getResponseView');

const getTransactions = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { rows } = await transactionModel.getUserTransactions(user_id);
        responseView.successResponse(res, rows);
    } catch (error) {
        responseView.errorResponse(res, error);
    }
};

module.exports = { getTransactions };
