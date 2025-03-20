const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "outbound-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "outbound-group" });

module.exports = { kafka, consumer };
