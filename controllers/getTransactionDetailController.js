const TransactionModel = require('../models/getTransactionDetailModel');
const TransactionDetailView = require('../views/getResponseView');

const getTransactionDetails = async (req, res) => {
    const { user_id } = req.params; // ID del usuario

    try {
        const transactionDetails = await TransactionModel.getTransactionDetails(user_id);
        return TransactionDetailView.successResponse(res, transactionDetails.rows);
    } catch (error) {
        console.error(error);
        return TransactionDetailView.errorResponse(res);
    }
};

module.exports = { getTransactionDetails };
