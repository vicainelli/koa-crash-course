const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

// Replace With DB
const things = ['My Family', 'Programming', 'Build Apps'];

// Json Preddier Middleware
app.use(json());
// BodyParser Middleware
app.use(bodyParser());

// Simple Middleware
// app.use(async ctx => ctx.body = {msg: 'Hello World'});

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

// Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

// List of things
async function index(ctx) {
  await ctx.render('index', {
    title: 'Things I Love',
    things: things
  });
}

// SHow Add Page
async function showAdd(ctx) {
  await ctx.render('add');
}
// Add Thing
async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect('/');
}


router.get('/test', ctx => (ctx.body = 'Hello Test'));

// Router Middleware
app.use(router.routes()).use(router.allowedMethods());


app.listen(3000, () => console.log('Server Started'));