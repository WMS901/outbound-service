const OutboundItem = require('../models/outbound.model');

async function createOutboundItem(data) {
  return await OutboundItem.create(data);
}

async function getAllOutboundItems() {
  return await OutboundItem.find({ confirmed: false }).sort({ createdAt: -1 });
}

async function getOutboundItemByOutboundId(outboundId) {
  return await OutboundItem.findOne({ outboundId });
}

async function updateOutboundItem(outboundId, updateData) {
  return await OutboundItem.findOneAndUpdate({ outboundId }, updateData, { new: true });
}

async function deleteOutboundItem(outboundId) {
  return await OutboundItem.findOneAndDelete({ outboundId });
}

module.exports = {
  createOutboundItem,
  getAllOutboundItems,
  getOutboundItemByOutboundId,
  updateOutboundItem,
  deleteOutboundItem
};
