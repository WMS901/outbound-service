const express = require('express');
const router = express.Router();
const OutboundController = require('../controller/outbound.controller');

const outboundController = new OutboundController();

router.post('/', outboundController.createOutboundItem);
router.get('/', outboundController.getAllOutboundItems);
router.get('/:outboundId', outboundController.getOutboundItemByOutboundId);
router.put('/:outboundId', outboundController.updateOutboundItem);
router.delete('/:outboundId', outboundController.deleteOutboundItem);

module.exports = router;
