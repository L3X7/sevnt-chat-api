'use strict';
var dataTables = require('mongoose-datatables');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var messageRoomSchema = new Schema({
    created_date: {
        type: Date,
        default: Date.now
    },
    state: {
        type: Boolean,
        default: true
    }
});
messageRoomSchema.plugin(dataTables);
mongoose.model('MessageRoom', messageRoomSchema);
