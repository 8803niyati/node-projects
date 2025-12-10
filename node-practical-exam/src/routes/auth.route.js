const router = require("express").Router();
const { regUser, loginUser } = require("../controller/auth.controller");

router.post("/register", regUser);
router.post("/login", loginUser);

module.exports = router;
