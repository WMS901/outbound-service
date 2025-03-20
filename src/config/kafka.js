const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "outbound-service",
  brokers: ["my-cluster-kafka-bootstrap.kafka.svc.cluster.local:9092"],
});

const consumer = kafka.consumer({ groupId: "outbound-group" });

module.exports = { consumer }; // ✅ 여기서만 export
