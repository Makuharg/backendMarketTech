const TransactionModel = require('../models/getTransactionModel');
const TransactionView = require('../views/getResponseView');

const getUserTransactions = async (req, res) => {
    const { user_id } = req.params;
    const { total_price } = req.body;

    try {
        const userTransactions = await TransactionModel.getTransactions(user_id, total_price);

        return TransactionView.successResponse(res, userTransactions.rows);
    } catch (error) {
        console.error(error);
        return TransactionView.errorResponse(res);
    }
};

module.exports = { getUserTransactions };
