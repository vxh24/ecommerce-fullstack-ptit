const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const {
  createEnquiryController,
  updateEnquiryController,
  deleteEnquiryController,
  getAEnquiryController,
  getAllEnquiriesController,
} = require("../controllers/enquiryController");

const router = express.Router();

router.post("/", authMiddleware, createEnquiryController);
router.get("/", authMiddleware, isAdmin, getAllEnquiriesController);
router.put("/:id", authMiddleware, isAdmin, updateEnquiryController);
router.get("/:id", authMiddleware, isAdmin, getAEnquiryController);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiryController);

module.exports = router;
