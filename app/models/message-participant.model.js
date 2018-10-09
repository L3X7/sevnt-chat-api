'use strict';
var dataTables = require('mongoose-datatables');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var messageParticipantSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    message_room: {
        type: Schema.ObjectId,
        ref: 'MessageRoom'
    },
    created_date: {
        type: Date,
        default: Date.now,
    }
});
messageParticipantSchema.plugin(dataTables);
mongoose.model('MessageParticipant', messageParticipantSchema);
