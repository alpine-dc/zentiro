require("dotenv").config();

const db = require("../../models");
const term_condition = db.term_condition;

class TnC {
    static async findAll(req, res) {
        try {
            const data = await term_condition.findAll({
                where: {
                    status: 'active'
                },
                raw: true,
            });
            
            if (data.length == 0) {
                res.status(200).send({ status: 'Success', message: 'Term and Condition not found!' });
            } else {
                res.status(200).send({ status: 'Success', data: data });
            }
        }
        catch (error) {
            res.status(400).send({ status: 'Error', message: error.message });
        }
    }
}

module.exports = TnC;