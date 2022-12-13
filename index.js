require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3089;
const IP = process.env.IP || 'localhost';
const cors = require("cors");
const bodyParser = require('body-parser');
const logger = require("morgan");
const expbs = require("express-handlebars");
const path = require('path');
const flash = require("express-flash");
const db = require('./models');
const apiRouter = require('./app/routes/index'),
  adminRouter = require("./cms/routes/admin"),
  bannerRouter = require("./cms/routes/banner"),
  dashboardRouter = require("./cms/routes/index"),
  categoryRouter = require("./cms/routes/category"),
  productRouter = require("./cms/routes/product"),
  aboutUsRouter = require("./cms/routes/about_us"),
  faqRouter = require("./cms/routes/faq"),
  tncRouter = require("./cms/routes/term_condition"),
  contactUsRouter = require("./cms/routes/contact_us");
const { notFound, errorHandler } = require('./app/middlewares/error');
const cron = require("node-cron");
const CronService = require("./app/services/scheduler");
var http = require("http");
var https = require("https");
const PORT_HTTPS = process.env.PORT_HTTPS || 8443;


// app.use(express.static(path.resolve(__dirname, 'Public')));
app.use(express.static('Public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
      secret: 'keyboard cat',
    })
);

app.use(cors());
app.use(logger('dev'));
app.use(flash());
app.use(session({ secret: 'secretpass123456' }));
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.set('views', path.join(__dirname, '/views'));
// app.set('views', path.join(__dirname, 'cms/views'));

app.engine(
  "handlebars",
  expbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "/views/layout"),
    helpers: require("./cms/helpers/handlebars-helpers"),
    // extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

//set view engine
app.set('view engine', 'handlebars');

app.get('/session', (req, res) => {
  res.send(req.session);
});

// app.get('/', (req, res) => {
//   res.redirect('/cms/login');
// });

app.get('/cms', (req, res) => {
  res.redirect('/cms/login');
});

app.use('/cms', [
  dashboardRouter,
  adminRouter,
  bannerRouter,
  categoryRouter,
  aboutUsRouter,
  faqRouter,
  tncRouter,
  productRouter,
  contactUsRouter
]);

// API
app.use('/', [
  apiRouter,
]);
// app.use(notFound)
// app.use(errorHandler)

app.get("*", (req, res) => {
    res.render('app/404/index', {
      layout: false,
  });
});

app.listen(PORT, () => {
console.log(`PORT IS ALIVE AND IT LISTEN TO PORT http://localhost:${PORT}`);
});

var httpServer = http.createServer(app);
// httpServer.listen(PORT);

var server = httpServer.listen(PORT);
server.keepAliveTimeout = 60 * 1000 * 60 * 10;
server.headersTimeout = 65 * 1000 * 60 * 10;

if (process.env.use_https == "true") {
  var privateKey = fs.readFileSync(process.env.privateKey_https, "utf8");
  var certificate = fs.readFileSync(process.env.certificate_https, "utf8");
  var credentials = { key: privateKey, cert: certificate };
  var httpsServer = https.createServer(credentials, app);
  // httpsServer.listen(PORT_HTTPS);

  var server2 = httpsServer.listen(PORT_HTTPS);
  server2.keepAliveTimeout = 60 * 1000 * 60 * 10;
  server2.headersTimeout = 65 * 1000 * 60 * 10;
}

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
});

// Sync database
db.sequelize.sync({ alter: true });

cron.schedule("0 0 * * *", function () {
  CronService.bestSeller();
});

module.exports = app;