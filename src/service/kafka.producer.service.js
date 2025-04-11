const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "outbound-service",
  brokers: [process.env.SPRING_KAFKA_BOOTSTRAP_SERVERS],
});

const producer = kafka.producer();

const sendShipmentConfirmedMessage = async (payload) => {
  await producer.connect();
  await producer.send({
    topic: "shipment.confirmed",
    messages: [
      { value: JSON.stringify(payload) }
    ]
  });
  await producer.disconnect();
};

module.exports = { sendShipmentConfirmedMessage };
