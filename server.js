const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const outboundRoutes = require('./src/routes/outbound.routes');
require('./src/service/kafka.consumer.service');

const app = express();
const PORT = process.env.SERVER_PORT;
const mongoURI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_AUTH_DB}`;

app.use(cors({
  origin: ['https://d35bvw568gyud1.cloudfront.net', 'https://solcloud.store'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.get('/actuator/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.use('/api/outbound', outboundRoutes);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB Connection Failed:', err));
