const TransactionModel = require('../models/getTransactionDetailModel');
const TransactionDetailView = require('../views/getResponseView');

const getTransactionDetails = async (req, res) => {
    const { transaction_id } = req.params; // ID de la transacción
    const user_id = req.user.id;

    try {
        const transactionDetails = await TransactionModel.getTransactionDetails(transaction_id, user_id);
        return TransactionDetailView.successResponse(res, transactionDetails.rows);
    } catch (error) {
        console.error(error);
        return TransactionDetailView.errorResponse(res);
    }
};


module.exports = { getTransactionDetails };
