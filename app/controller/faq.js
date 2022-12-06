require("dotenv").config();

const db = require("../../models");
const faq = db.faq;

class Faq {
    static async findAll(req, res) {
        try {
            const data = await faq.findAll({
                where: {
                    status: 'active'
                },
                raw: true,
            });
            
            if (data.length == 0) {
                res.status(200).send({ status: 'Success', message: 'Faq not found!' });
            } else {
                res.status(200).send({ status: 'Success', data: data });
            }
        }
        catch (error) {
            res.status(400).send({ status: 'Error', message: error.message });
        }
    }
}

module.exports = Faq;