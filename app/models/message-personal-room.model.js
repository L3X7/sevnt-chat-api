'use strict';
var dataTables = require('mongoose-datatables');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var messagePersonalRoomSchema = new Schema({
    user_one: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    user_two: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    status: {
        type: Boolean,
        required: 'Status required'
    },
    created_date: {
        type: Date,
        default: Date.now,
        required: 'Created date required'
    },
    modified_date: {
        type: Date
    }
})
messagePersonalRoomSchema.plugin(dataTables);
mongoose.model('MessagePersonalRoom', messagePersonalRoomSchema);