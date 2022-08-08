// eslint-disable-next-line import/no-import-module-exports
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Log = new Schema({
  info: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = model('log', Log, 'log');
