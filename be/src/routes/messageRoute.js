const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  sendMessageController,
  getMessages,
} = require("../controllers/messageController");

const router = express.Router();

router.get("/:id", authMiddleware, getMessages);
router.post("/send/:id", authMiddleware, sendMessageController);

module.exports = router;
