const { generateSubtasksAI } = require("../services/ai.service");

const generateSubtasks = async (req, res) => {
  try {

    const { taskTitle, description, deadline } = req.body;

    const subtasks = await generateSubtasksAI({
      taskTitle,
      description,
      deadline,
    });

    res.status(200).json(subtasks);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to generate subtasks",
    });

  }
};

module.exports = {
  generateSubtasks,
};