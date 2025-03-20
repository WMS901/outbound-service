const OutboundItem = require('../models/outbound.model');

async function createOutboundItem(data) {
  try {
    console.log("📌 [Repository] MongoDB 저장 시작, 데이터:", data);

    const newItem = new OutboundModel({
      ...data,
      confirmed: false,  // 출고 확정 여부 기본값 설정
    });

    const savedItem = await newItem.save();

    console.log("✅ [Repository] MongoDB 저장 성공:", savedItem);
    return savedItem;
  } catch (error) {
    console.error("❌ [Repository] MongoDB 저장 실패:", error);
    throw error;
  }
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
