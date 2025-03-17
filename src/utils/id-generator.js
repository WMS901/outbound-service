function generateOutboundId() {
    const now = new Date();
    const dateCode = now.toISOString().slice(0, 10).replace(/-/g, "");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `OUT-${dateCode}-${randomNum}`;
  }
  
  module.exports = { generateOutboundId };