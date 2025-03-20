const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "outbound-service",
  brokers: ["my-cluster-kafka-bootstrap.kafka.svc.cluster.local:9092"],
});

const consumer = kafka.consumer({ groupId: "outbound-group" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "inventory-updated", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`✅ Received message from Kafka: ${message.value.toString()}`);
    },
  });
};

run().catch(console.error);