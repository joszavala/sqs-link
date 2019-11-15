const Consumer = require('sqs-priority-consumer');
const AWS = require ('aws-sdk');
const https = require('https');

const objectMessages = {};
const sentMessagesQueue = {};
const queueUrl = 'https://sqs.us-east-2.amazonaws.com/653859118541/MyQueue';

/*
** -------------------- Configure the auth for AWS --------------------
** The httpOptions are configured to allow connections without a cert, 
** to avoid SELF SIGNED CERT Error. 
** ---------------------------------------------------------------------
*/
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

/*
** Creation of the variable that contains the SQS object.
*/
const sqs = new AWS.SQS();

/*
** --------------------- Creation of the Consumer  ---------------------
** queurUrl: accept a string or an array of urls.
** handleMessage: Returns the messages contained in the queue.
** done: terminates the read of the queue and eliminate the messages.
** ---------------------------------------------------------------------
*/
const consumer = Consumer.create({
  queueUrl,
  handleMessage: (message, done) => {
    getMessage(message);
    console.log(message);
    done();
  },
  sqs
});

const getQueue = async (ctx) => {
  consumer.start();
  ctx.body = objectMessages;
}

const stopQueue = async (ctx) => {
  consumer.stop();
  ctx.body = JSON.stringify(objectMessages);
}

const sendQueueMessage = async (ctx) => {
  const paramsToSend = generatePayload(ctx.request.body);
  
  try {    
    const request = await sqs.sendMessage(paramsToSend).promise();
    const responseBody = {
      messageId: request.MessageId,
      MessageAttributes: paramsToSend.MessageAttributes,
      MessageBody: paramsToSend.MessageBody
    };

    sentMessagesQueue[responseBody.messageId] = responseBody;
    ctx.body = JSON.stringify(responseBody);
    
    console.log(sentMessagesQueue);

  } catch (e) {
    // TODO: Implement Log.
    console.log('Error', e);
  }
}

const generatePayload = (params) => {
  const { MessageAttributes, MessageBody } = params;

  const payload = {
    DelaySeconds: 2,
    MessageAttributes,
    MessageBody,
    QueueUrl: queueUrl
  };

  return payload;
}

const saveMessageId = (messageId) => {
  for (let messageIdIn of sentMessagesQueue) {
    if (messageIdIn !== messageId) {
      sentMessagesQueue.push(messageId);
      return true;
    }

    return false;
  }
}

const getMessage = (message) => {  
  console.log('getMessage==>', message);
  const messageResponse = message.Body;
  const messageId = message.MessageId;
  objectMessages[messageId] = JSON.parse(messageResponse);
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
  findAll,
  sendQueueMessage
};



module.exports = _qManage;