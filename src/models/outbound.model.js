const mongoose = require('mongoose');

const outboundSchema = new mongoose.Schema({
  outboundId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  supplier: { type: String },
  location: { type: String },
  confirmed: { type: Boolean, default: false },
}, { timestamps: true });

const OutboundItem = mongoose.model('OutboundItem', outboundSchema);

module.exports = OutboundItem;
