'use strict';
var dataTables = require('mongoose-datatables');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    var messageDetailSchema = new Schema({
        message_header: {
            type: Schema.ObjectId,
            ref: 'MessageHeader'
        },
        created_date: {
            type: Date,
            default: Date.now,
        },
        modified_date: {
            type: Date
        },
        message: {
            type: String,
            required: 'Message required'
        }
    });
messageDetailSchema.plugin(dataTables);
mongoose.model('MessageDetail', messageDetailSchema);
