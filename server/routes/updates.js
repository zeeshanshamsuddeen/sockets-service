const express = require('express');

const { updateConnectedUsers } = require('../core/connections');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('req.body: ', req.body);
    const { update } = req.body;
    const { shop, serviceId, sessionId } = req.headers;
    update.shop = shop;
    update.sessionId = sessionId;
    const contextObject = { shop, serviceId, sessionId };
    updateConnectedUsers(contextObject, update);
    res.json({ success: true });
  } catch (error) {
    console.log('error: ', error);
  }
});

module.exports = router;
