require("dotenv").config();

const db = require("../../models");
const banner = db.banner;

class Banner {
    static async findAll(req, res) {
        try {
            const data = await banner.findAll({
                where: {
                    status: 'active'
                },
                raw: true,
            });
            
            if (data.length == 0) {
                res.status(200).send({ status: 'Success', message: 'Data banner not found!' });
            } else {
                res.status(200).send({ status: 'Success', data: data });
            }
        }
        catch (error) {
            res.status(400).send({ status: 'Error', message: error.message });
        }
    }
}

module.exports = Banner;