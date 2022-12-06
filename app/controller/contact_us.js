require("dotenv").config();

const db = require("../../models");

class Contact {
    static contactUsPage(req, res) {
        res.render('app/contact-us/index', {
            layout: false,
        });
    }

    static create(req, res) {
        console.log(req.body)
        db.contact_us.create({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
            status: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .then((result) => {
            req.flash('msg_info', `Submit message Success`);
            res.render('app/contact-us/thank', {
                layout: false,
            })
        })
        .catch((err) => {
            req.flash('msg_error', `Failed to Submit message!`);
            res.redirect('/contac-us');
        });
    }
}

module.exports = Contact;