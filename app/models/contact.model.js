'use strict';
var dataTables = require('mongoose-datatables');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var contactSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    contact_user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
contactSchema.plugin(dataTables);
mongoose.model('Contact', contactSchema);