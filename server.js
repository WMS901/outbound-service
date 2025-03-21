require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const outboundRoutes = require('./src/routes/outbound.routes');
require('./src/service/kafka.consumer.service');

const app = express();
const PORT = `${process.env.SERVER_PORT}`;
const mongoURI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_AUTH_DB}`;

// ✅ CORS 설정 추가
const allowedOrigins = [
  "https://d35bvw568gyud1.cloudfront.net", // ✅ CloudFront 도메인
  "https://api.sol-wms.store",             // ✅ Kong API Gateway
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS 정책에 의해 차단됨"));
    }
  },
  credentials: true, // ✅ 인증 관련 요청 허용
  allowedHeaders: ["Authorization", "Content-Type"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());

app.use('/api/outbound', outboundRoutes);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB Connection Failed:', err));
