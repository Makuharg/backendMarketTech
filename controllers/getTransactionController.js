const TransactionModel = require('../models/getTransactionModel');
const TransactionView = require('../views/getResponseView');

const getTransaction = async (req, res) => {
    const { transaction_id } = req.params; // ID de la transacción
    const user_id = req.user.id; // ID del usuario autenticado

    try {
        const transactionDetails = await TransactionModel.getTransactionDetails(transaction_id, user_id);

        if (transactionDetails.rows.length === 0) {
            return TransactionView.notFound(res);
        }

        return TransactionView.successResponse(res, transactionDetails.rows[0]);
    } catch (error) {
        console.error(error);
        return TransactionView.errorResponse(res);
    }
};

module.exports = { getTransaction };
