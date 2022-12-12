require("dotenv").config();

const db = require("../../models");

class Home {
    static async homePage(req, res) {
        const banner = await db.banner.findAll({
            where: {
                status: true,
            }, raw: true
        });
        await db.best_seller.findAll({ raw: true })
        .then((data) => {
            res.render('app/home/index', {
                results: data,
                banners: banner,
                layout: false,
            });
        })
        .catch((err) => {
            console.log(err)
            req.flash('msg_error', err.message || `Some error occurred while find Category ${req.params.category}`);
            res.redirect('/');
        });
        // const 
        // res.render('app/home/index', {
        //     layout: false,
        //   });
    }
}

module.exports = Home;