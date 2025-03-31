const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "outbound-service",
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: "outbound-group" });

module.exports = { consumer };
