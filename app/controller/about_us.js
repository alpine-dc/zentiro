require("dotenv").config();

const db = require("../../models");

class About {
    static aboutUsPage(req, res) {
        db.about_us
            .findAll({ raw: true })
            .then((data) => {
                res.render('app/about-us/index', {
                    results: data,
                    layout: false,
                })
            })
            .catch((err) => {
                req.flash('msg_error', err.message || 'Some error occurred while find About Us');
                res.redirect('/about-us');
            });
    }
}

module.exports = About;