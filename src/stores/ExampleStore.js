var ExampleDispatcher = require('ExampleDispatcher');
var EventEmitter = require('events').EventEmitter;
var ExampleConstants = require('ExampleConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _appState = {
  data: []
};

function generateRandom() {
  return (Math.random() * Date.now() | 0).toString(36);
}

function createRow(content) {
  _appState.data.push({
    id: generateRandom(),
    content: content,
    metadata: [
      generateRandom(),
      generateRandom(),
      generateRandom(),
      generateRandom(),
      generateRandom(),
      generateRandom(),
      generateRandom(),
      generateRandom(),
      generateRandom()
    ]
  });
}

var ExampleStore = merge(EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAppState: function () {
    return _appState;
  },

  dispatcherIndex: ExampleDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
      case ExampleConstants.CREATE_ROW: {
        createRow(action.content);
        ExampleStore.emitChange();
        break;
      }
    }

    return true; // return promise
  })
});

module.exports = ExampleStore;