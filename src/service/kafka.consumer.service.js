const { consumer } = require("./kafka");
const { createOutboundItem } = require("../service/outbound.service"); // 직접 서비스 호출

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "inventory-updated", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const data = JSON.parse(message.value.toString());
        console.log("📦 출고 데이터 수신:", data);

        // ✅ 출고 데이터 생성 (서비스 직접 호출)
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
