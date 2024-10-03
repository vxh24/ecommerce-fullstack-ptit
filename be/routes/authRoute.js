const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteAUser,
  updateAUser,
} = require("../controller/userController");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteAUser);
router.put("/:id", updateAUser);

module.exports = router;
