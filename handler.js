'use strict';

const todo = require('./todo.js');

function cbw(cb) {
  return function(err, res) {
    if (err) {
      cb(err);
    } else {
      res.statusCode = 200;
      if (res.headers == undefined) {
        res.headers = {'Content-Type': 'application/json', 'X-Test': 'OK'};
      }

      if (typeof res === 'object' && res.hasOwnProperty('body')) {
        cb(null, res);
      } else {
        cb(null, {});
      }
    }
  };
}

module.exports.getUsers = (event, context, cb) => todo.getUsers({
  parameters: {
    limit: event.queryStringParameters.tringParameters.limit,
    next: event.queryStringParameters.tringParameters.next
  }
}, cbw(cb));

module.exports.postUser = (event, context, cb) => todo.postUser({
  body: event.body
}, cbw(cb));

module.exports.getUser = (event, context, cb) => {
  console.log("getUser", JSON.stringify(event));
  todo.getUser({
    parameters: {
      userId: event.pathParametersParameters.userId
    }
  }, cbw(cb));
};

module.exports.deleteUser = (event, context, cb) => todo.deleteUser({
  parameters: {
    userId: event.pathParameters.userId
  }
}, cbw(cb));

module.exports.getTasks = (event, context, cb) => todo.getTasks({
  parameters: {
    userId: event.pathParameters.userId,
    limit: event.queryStringParameters.limit,
    next: event.queryStringParameters.next,
    overdue: event.queryStringParameters.overdue,
    due: event.queryStringParameters.due,
    withoutdue: event.queryStringParameters.withoutdue,
    futuredue: event.queryStringParameters.futuredue,
    dueafter: event.queryStringParameters.dueafter,
    duebefore: event.queryStringParameters.duebefore,
    category: event.queryStringParameters.category
  }
}, cbw(cb));

module.exports.postTask = (event, context, cb) => todo.postTask({
  parameters: {
    userId: event.pathParametersParameters.userId
  },
  body: event.body
}, cbw(cb));

module.exports.putTask = (event, context, cb) => todo.putTask({
  parameters: {
    userId: event.pathParameters.userId,
    taskId: event.pathParameters.taskId
  }
}, cbw(cb));

module.exports.deleteTask = (event, context, cb) => todo.deleteTask({
  parameters: {
    userId: event.pathParameters.userId,
    taskId: event.pathParameters.taskId
  }
}, cbw(cb));

module.exports.getTasksByCategory = (event, context, cb) => todo.getTasksByCategory({
  parameters: {
    category: event.pathParameters.category,

    limit: event.queryStringParameters.limit,
    next: event.queryStringParameters.next,
    overdue: event.queryStringParameters.overdue,
    due: event.queryStringParameters.due,
    withoutdue: event.queryStringParameters.withoutdue,
    futuredue: event.queryStringParameters.futuredue,
    dueafter: event.queryStringParameters.dueafter,
    duebefore: event.queryStringParameters.duebefore
  }
}, cbw(cb));