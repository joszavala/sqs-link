const Consumer = require('sqs-priority-consumer');
const AWS = require ('aws-sdk');
const https = require('https');

AWS.config.update({
    region: 'us-east-2',
    accessKeyId: 'AKIAJLXMEW37MJ3YP4QQ',
    secretAccessKey: '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',
    httpOptions: {
      agent: new https.Agent({
        rejectUnauthorized: false,
      })
    }
});

const consumer = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/653859118541/MyQueue',
  handleMessage: (message, done) => {
    console.log(message);
    done();
  },
  region: 'us-east-2',
  sqs: new AWS.SQS()
});

const getQueue = async (ctx) => {
  consumer.start();

  ctx.body =
}

const stopQueue = async => {
  console.log('lel');
  consumer.stop();
}


const findAll = async (ctx) => {
  const idvs = 'lol';

  ctx.body = idvs;
};

const findOneById = async (ctx) => {
  // const idData = ctx.params.id;

  // utils.validateObjectId(ctx, idData, ObjectID);
  // utils.hasObjectData(ctx, await IdvModel.findById(idData));
};

const create = async (ctx) => {
  // let dvData = ctx.request.body;
  // dvData._id = utils.getId(ObjectID);

  // const newDV = new IdvModel(dvData);

  // utils.hasObjectData(ctx, await newDV.save());
};

const update = async (ctx) => {
  // const { id } = ctx.params;
  // const updateData = ctx.request.body;
  // const updatedDV = await IdvModel.findByIdAndUpdate(id, updateData);
  // console.log(updatedDV);
  // utils.hasObjectData(ctx, updatedDV, 'Data cannot be updated');
};

const destroy = async (ctx) => {
  // console.log('in');
  // const { id } = ctx.params;
  // const deletedDV = await IdvModel.findByIdAndDelete(id);
  // utils.hasObjectData(ctx, deletedDV, 'Data not found');
};

const _qManage = {
  getQueue,
  stopQueue,
  findAll
};



module.exports = _qManage;