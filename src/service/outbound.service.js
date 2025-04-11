const OutboundRepository = require('../repository/outbound.repository');
const { generateOutboundId } = require('../utils/id-generator');
const { sendShipmentConfirmedMessage } = require('./kafka.producer.service');

async function createOutboundItem(data) {
  try {
    const outboundId = generateOutboundId();
    const newItem = { ...data, outboundId };
    const savedItem = await OutboundRepository.createOutboundItem(newItem);
    return savedItem;
  } catch (error) {
    throw error;
  }
}

async function getAllOutboundItems() {
  return await OutboundRepository.getAllOutboundItems();
}

async function getOutboundItemByOutboundId(outboundId) {
  return await OutboundRepository.getOutboundItemByOutboundId(outboundId);
}

async function updateOutboundItem(outboundId, updateData) {
  const updated = await OutboundRepository.updateOutboundItem(outboundId, updateData);

  if (updateData.confirmed === true && updated.modifiedCount === 1) {
    const outbound = await OutboundRepository.getOutboundItemByOutboundId(outboundId);

    const payload = {
      event: "shipment_confirmed",
      product_id: outbound.product_id,
      quantity: outbound.quantity,
      warehouse_id: outbound.warehouse_id,
      confirmed_at: new Date().toISOString()
    };

    await sendShipmentConfirmedMessage(payload);
  }

  return updated;
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
