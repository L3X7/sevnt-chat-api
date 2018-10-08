'use strict';
var dataTables = require('mongoose-datatables');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var messageHeaderSchema = new Schema({
    user_initial: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    user_final: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created_date: {
        type: Date,
        default: Date.now
    },

});
messageHeaderSchema.plugin(dataTables);
mongoose.model('MessageHeader', messageHeaderSchema);
