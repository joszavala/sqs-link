const Router = require('koa-router');
const _ = new Router();
const base = require('../controllers/baseController');

_.prefix('/base');
_.get('/start', base.getQueue);
_.get('/stop', base.stopQueue);
_.get('/', base.findAll);
// _.get('/:id', base.findOneById);
// _.post('/', base.create);
// _.patch('/:id', base.update)
// _.delete('/:id', base.destroy);

module.exports = _;