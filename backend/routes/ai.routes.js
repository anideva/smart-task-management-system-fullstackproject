const express = require("express");
const { generateSubtasks } = require("../controllers/ai.controller");

const router = express.Router();

router.post("/generate-subtasks", generateSubtasks);

module.exports = router;