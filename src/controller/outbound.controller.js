const OutboundService = require('../service/outbound.service');

class OutboundController {
  async createOutboundItem(req, res) {
    try {
      const newItem = await OutboundService.createOutboundItem(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllOutboundItems(req, res) {
    try {
      const items = await OutboundService.getAllOutboundItems();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getOutboundItemByOutboundId(req, res) {
    try {
      const item = await OutboundService.getOutboundItemByOutboundId(req.params.outboundId);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateOutboundItem(req, res) {
    try {
      const updatedItem = await OutboundService.updateOutboundItem(req.params.outboundId, req.body);
      if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteOutboundItem(req, res) {
    try {
      const deletedItem = await OutboundService.deleteOutboundItem(req.params.outboundId);
      if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
      res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OutboundController;