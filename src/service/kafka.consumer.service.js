const { consumer } = require("../config/kafka");
const { createOutboundItem } = require("../service/outbound.service");

const run = async () => {
  console.log("✅ Kafka Consumer 시작됨");
  await consumer.connect();
  await consumer.subscribe({ topic: "inventory-updated", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const data = JSON.parse(message.value.toString());
        console.log("📦 출고 데이터 수신:", data);

        // 🛠️ 디버깅 로그 추가
        console.log("🛠️ MongoDB 저장 요청 시작");

        const outboundItem = await createOutboundItem({
          name: data.name,
          category: data.category,
          quantity: data.reservedQuantity,
          price: data.price,
          supplier: data.supplier,
          location: data.location
        });

        console.log("✅ 출고 데이터 저장 완료:", outboundItem);
      } catch (error) {
        console.error("🚨 Kafka 메시지 처리 중 오류 발생:", error);
      }
    },
  });
};

run().catch(console.error);
