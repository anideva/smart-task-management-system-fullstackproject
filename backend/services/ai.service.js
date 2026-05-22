const axios = require("axios");

const generateSubtasksAI = async ({
  taskTitle,
  description,
  deadline,
}) => {

  try {

    const prompt = `
Break the following task into 5 actionable subtasks.

Task: ${taskTitle}
Description: ${description}
Deadline: ${deadline}

Return only a JSON array.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
       model: "mistralai/mistral-7b-instruct:free",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const text =
      response.data.choices[0].message.content;

    return JSON.parse(text);

  } catch (error) {

   console.log(error.response?.data || error.message);
  console.log("OpenRouter failed. Using fallback.");

    return [
      `Plan ${taskTitle}`,
      `Research requirements for ${taskTitle}`,
      `Implement core functionality`,
      `Test and debug ${taskTitle}`,
      `Finalize and review implementation`,
    ];
  }
};

module.exports = {
  generateSubtasksAI,
};