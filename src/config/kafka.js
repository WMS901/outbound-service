const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "outbound-service",
  brokers: [process.env.SPRING_KAFKA_BOOTSTRAP_SERVERS],
});

const consumer = kafka.consumer({ groupId: "outbound-group" });

module.exports = { consumer };
