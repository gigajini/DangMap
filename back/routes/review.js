const express = require("express");
const router = express.Router();
const { writeReview, getReview } = require("../controllers/review");
const { verifyToken } = require("../middlewares");

router.post("/", verifyToken, writeReview);
router.get("/", verifyToken, getReview);

module.exports = router;
