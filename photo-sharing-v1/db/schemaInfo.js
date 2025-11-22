const mongoose = require("mongoose");

const schemaInfoSchema = new mongoose.Schema({
  _id: String,
  __v: Number,
  load_date_time: Date,
});

const SchemaInfo = mongoose.model("SchemaInfo", schemaInfoSchema);

module.exports = SchemaInfo;

