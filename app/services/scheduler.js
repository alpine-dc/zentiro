require("dotenv").config();

const db = require("../../models");

class Scheduler {
    static async bestSeller() {
        try {
            console.log('running scheduler');
            const data = await db.product.findAll({
                order: [['views', 'DESC']],
                limit: 12,
                raw: true
            });
            const bestSell = await db.best_seller.findAll({ raw: true })
            if (bestSell.length == 0) {
                for (const x of data) {
                    await db.best_seller.create({
                        title: x.title,
                        description: x.description,
                        category_id: x.category_id,
                        permalink: x.permalink,
                        price: x.price,
                        image: x.image,
                        views: x.views,
                        status: x.status,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
                }
            } else {
                await db.best_seller.destroy({ truncate: true });
                for (const x of data) {
                    await db.best_seller.create({
                        title: x.title,
                        description: x.description,
                        category_id: x.category_id,
                        permalink: x.permalink,
                        price: x.price,
                        image: x.image,
                        views: x.views,
                        status: x.status,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
                }
            }
        } catch (error) {
            console.log('scheduler error: ', error);
        }
    }
}

module.exports = Scheduler;