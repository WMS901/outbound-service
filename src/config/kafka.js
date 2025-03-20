const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "outbound-service",
  brokers: ["my-cluster-kafka-bootstrap.kafka.svc.cluster.local:9092"],
});

const consumer = kafka.consumer({ groupId: "outbound-group" });

const run = async () => {
  console.log("🔵 Kafka Consumer 시작");

  try {
    await consumer.connect();
    console.log("✅ Kafka Consumer 연결 성공");

    await consumer.subscribe({ topic: "inventory-updated", fromBeginning: true });
    console.log("📡 Kafka Topic 구독 성공: inventory-updated");

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`✅ Kafka 메시지 수신: ${message.value.toString()}`);
      },
    });
  } catch (error) {
    console.error("❌ Kafka Consumer 오류 발생:", error);
  }
};

run();
