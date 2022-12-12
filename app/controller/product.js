require("dotenv").config();

const db = require("../../models");
const product = db.product;
const category = db.category;
const product_image = db.product_image;

class Product {
    static productPage(req, res) {
        db.product
            .findAll({
                raw: true
            })
            .then((data) => {
                res.render('app/product/index', {
                    results: data,
                    layout: false,
                });
            })
            .catch((err) => {
                req.flash('msg_error', err.message || 'Some error occurred while find All Categories');
                res.redirect('/products');
            });
    }

    static async productDetails(req, res) {
        db.product.findOne({
            where: {
                permalink: req.params.permalink,
            }, raw: true
        })
        .then(async (data) => {
            const addViews = data.views + 1;
            await db.product.update({
                views: addViews,
                updated_by: 'view product',
                updatedAt: new Date(),
            },{
                where: {
                    id: data.id
                }
            })
            const cat = await db.category.findOne({
                where: {
                    id: data.category_id
                }, raw: true
            });
            const title = `Zentiro - ${cat.name} ${data.title}`
            res.render('app/product/details', {
                headTitle: title,
                results: data,
                layout: false,
            });
        })
        .catch((err) => {
            req.flash('msg_error', err.message || `Some error occurred while find Category ${req.params.category}`);
            res.redirect('/products');
        });
    }

    static async findByCategory(req, res) {

    }
    static async findOne(req, res) {
        try {
            const data = await product.findOne({
                where: {
                    permalink: req.params.permalink
                },
                raw: true,
            });
            
            if (!data) {
                res.status(200).send({ status: 'Success', message: `Product ${req.params.permalink} not found!` });
            } else {
                res.status(200).send({ status: 'Success', data: data });
            }
        }
        catch (error) {
            res.status(400).send({ status: 'Error', message: error.message });
        }
    }

    static async findAll(req, res) {
        try {
            const data = await product.findAll({
                where: {
                    status: 1
                },
                raw: true,
            });
            const result = [];
            if (data.length == 0) {
                res.status(200).send({ status: 'Success', message: 'Data product not found!' });
            } else {
                for (const x of data) {
                    const image = await product_image.findAll({
                        where: {
                            product_id: x.id,
                        },
                        raw: true
                    });
                    const cat = await category.findOne({
                        where: {
                            id: x.category_id
                        },
                        raw: true
                    });
                    const temp = {
                        ...x,
                        cat,
                        image
                    }
                    result.push(temp);
                }
                res.status(200).send({ status: 'Success', data: result });
            }
        }
        catch (error) {
            res.status(400).send({ status: 'Error', message: error.message });
        }
    }
}

module.exports = Product;