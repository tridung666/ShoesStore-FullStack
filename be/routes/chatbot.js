const express = require("express");
const router = express.Router();
const { handleChatRequest } = require("../controllers/chatbotController");

router.post("/", handleChatRequest);

module.exports = router;
