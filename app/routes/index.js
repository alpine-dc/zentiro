const express = require('express');
const router = express.Router();
const home = require('../controller/home');
const banner = require('../controller/banner');
const category = require('../controller/category');
const about = require('../controller/about_us');
const contact = require('../controller/contact_us');
const faq = require('../controller/faq');
const product = require('../controller/product');
const tnc = require('../controller/term_condition');

// Home
// const ValidationMiddleware = require('../middlewares/auth.validation.middleware');

// GET home page
router.get('/', home.homePage);

//  About Us
router.get('/about-us', about.aboutUsPage);

// Contact Us
router.get('/contact-us', contact.contactUsPage);
router.post('/contact-us', contact.create);

// Category
router.get('/category', category.categoryPage);
router.get('/category/:permalink', category.categoryDetails);

// Faq
router.get('/faq', faq.findAll);

// Product
router.get('/products', product.productPage);
router.get('/product/:permalink', product.productDetails);

//  TnC
router.get('/term-conditions', tnc.findAll);

module.exports = router;
