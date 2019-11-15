const Router = require('koa-router');
const _ = new Router();
const queueManage = require('../controllers/queueManageController');

_.prefix('/queueManage');
_.get('/start', queueManage.getQueue);
_.get('/stop', queueManage.stopQueue);
_.post('/sendMessage', queueManage.sendQueueMessage);
// _.get('/:id', base.findOneById);
// _.post('/', base.create);
// _.patch('/:id', base.update)
// _.delete('/:id', base.destroy);

module.exports = _;