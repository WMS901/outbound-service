const OutboundRepository = require('../repository/outbound.repository');
const { generateOutboundId } = require('../utils/id-generator');

async function createOutboundItem(data) {
  const outboundId = generateOutboundId();
  const newItem = { ...data, outboundId };
  return await OutboundRepository.createOutboundItem(newItem);
}

async function getAllOutboundItems() {
  return await OutboundRepository.getAllOutboundItems();
}

async function getOutboundItemByOutboundId(outboundId) {
  return await OutboundRepository.getOutboundItemByOutboundId(outboundId);
}

async function updateOutboundItem(outboundId, updateData) {
  return await OutboundRepository.updateOutboundItem(outboundId, updateData);
}

async function deleteOutboundItem(outboundId) {
  return await OutboundRepository.deleteOutboundItem(outboundId);
}

module.exports = {
  createOutboundItem,
  getAllOutboundItems,
  getOutboundItemByOutboundId,
  updateOutboundItem,
  deleteOutboundItem
};
