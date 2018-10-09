'use strict';
var dataTables = require('mongoose-datatables');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var messageSchema = new Schema({
    message_room: {
        type: Schema.ObjectId,
        ref: 'MessageRoom'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: 'Message required'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    modified_date: {
        type: Date
    }
})
messageSchema.plugin(dataTables);
mongoose.model('Message', messageSchema);