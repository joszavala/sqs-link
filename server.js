const Koa = require('koa');

const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const koaRes = require('koa-res');
const koaCors = require('@koa/cors');
const koaHelmet = require('koa-helmet');

const queueManageRoute = require('./app/routes/queueManageRoutes');

const nestedRoutes = [queueManageRoute];

const port = process.env.PORT || 5000;


const app = new Koa();

app.use(koaHelmet());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

const options = {
  origin: '*',
  allowedMethods: 'OPTIONS, PATCH'
};

app.use(koaCors());
app.use(logger());
app.use(bodyParser());
app.use(convert(koaRes()));

for (let router of nestedRoutes) {
  router.prefix('/api/v1');
  app.use(router.routes(), 
          router.allowedMethods()
         );
}


app.listen(port);