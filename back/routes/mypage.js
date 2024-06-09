const express = require("express");
const router = express.Router();
const { modifyUser, deleteUser } = require("../controllers/user");
const { verifyToken } = require("../middlewares");

router.patch('/', verifyToken, modifyUser);
router.delete('/admin', verifyToken, deleteUser);

module.exports = router;

