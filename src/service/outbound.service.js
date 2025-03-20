const OutboundRepository = require('../repository/outbound.repository');
const { generateOutboundId } = require('../utils/id-generator');

async function createOutboundItem(data) {
  try {
    console.log("📌 [Service] createOutboundItem 호출됨, 받은 데이터:", data);

    const outboundId = generateOutboundId();
    const newItem = { ...data, outboundId };

    console.log("📌 [Service] 생성된 출고 데이터:", newItem);

    const savedItem = await OutboundRepository.createOutboundItem(newItem);

    console.log("✅ [Service] MongoDB 저장 완료:", savedItem);
    return savedItem;
  } catch (error) {
    console.error("❌ [Service] 출고 데이터 저장 중 오류 발생:", error);
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
