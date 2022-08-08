const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Log = new Schema({
  info: {
    type: Object,
  },
}, {
  timestamps: true,
});

module.exports = model('log', Log, 'log');
