const express = require("express");
const router = express.Router();
const { getReport, writeReport } = require("../controllers/community");
const reviewRouter = require("./review");
const { verifyToken } = require("../middlewares");

router.post("/report", verifyToken, writeReport);
router.get("/report", verifyToken, getReport);

router.use("/review", reviewRouter);

module.exports = router;
