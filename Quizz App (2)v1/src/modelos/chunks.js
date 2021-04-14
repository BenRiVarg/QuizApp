'use strict'

const mongoose=require('mongoose');
const Schema= mongoose.Schema;




var modeloChunk = Schema ({
    files_id: {type:String}
});



module.exports =
 mongoose.model('uploads.chunks',modeloChunk);