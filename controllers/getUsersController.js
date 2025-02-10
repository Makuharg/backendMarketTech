const userModel = require('../models/getUsersModel');
const responseView = require('../views/getResponseView');

const getUsers = async (req, res) => {
    try {
        const { rows } = await userModel.getAllUsers();
        responseView.successResponse(res, rows);
    } catch (error) {
        responseView.errorResponse(res, error);
    }
};

module.exports = { getUsers };
