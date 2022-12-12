require("dotenv").config();

const db = require("../../models");
const category = db.category;
const product_image = db.product_image;
const product = db.product;

class Category {
    static categoryPage(req, res) {
        db.category
            .findAll({
                order: [['name', 'ASC']],
                raw: true
            })
            .then((data) => {
                res.render('app/category/index', {
                    results: data,
                    layout: false,
                });
            })
            .catch((err) => {
                req.flash('msg_error', err.message || 'Some error occurred while find All Categories');
                res.redirect('/category');
            });
    }

    static async categoryDetails(req, res) {
        const cat = await db.category.findOne({
            where: {
                permalink: req.params.permalink
            }, raw: true
        });
        db.product.findAll({
            where: {
                category_id: cat.id
            }, raw: true
        })
        .then((data) => {
            const title = `Zentiro - ${cat.name}`
            res.render('app/category/details', {
                headTitle: title,
                category: cat,
                results: data,
                layout: false,
            });
        })
        .catch((err) => {
            req.flash('msg_error', err.message || `Some error occurred while find Category ${req.params.category}`);
            res.redirect('/about-us');
        });
    }

    static async findOne(req, res) {
        try {
            const data = await category.findOne({
                where: {
                    permalink: req.params.category
                },
                raw: true,
            });
            const finalProducts = [];
            if (!data) {
                res.status(200).send({ status: 'Success', message: `Category ${req.params.category} not found!` });
            } else {
                const dataProduct = await product.findAll({
                    where: {
                        category_id: data.id,
                    }, raw: true
                });
                if (dataProduct.length == 0) {
                    res.status(200).send({ status: 'Success', message: `Product with Category ${req.params.category} not found!` });
                } else {
                    for (const x of dataProduct) {
                        const img = await product_image.findAll({
                            where: {
                                product_id: x.id,
                            }, raw: true
                        });
                        x.category_name = data.name;
                        const temp = {
                            ...x,
                            image: img
                        }
                        finalProducts.push(temp);
                    }
                    res.status(200).send({ status: 'Success', data: finalProducts });
                }
            }
        }
        catch (error) {
            res.status(400).send({ status: 'Error', message: error.message });
        }
    }

    static async findAll(req, res) {
        try {
            const data = await category.findAll({
                where: {
                    status: true
                },
                raw: true,
            });
            if (data.length == 0) {
                res.status(200).send({ status: 'Success', message: 'Data category not found!' });
            } else {
                // const result = [];
                // for (const x of data) {
                //     const image = await product_image.findOne({
                //         where: {
                //             category_id: x.id,
                //         },
                //         raw: true
                //     });
                //     const temp = {
                //         ...x,
                //         image
                //     }
                //     result.push(temp);
                    res.status(200).send({ status: 'Success', data: data });
                }
            // }
        }
        catch (error) {
            res.status(400).send({ status: 'Error', message: error.message });
        }
    }
}

module.exports = Category;