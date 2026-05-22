const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateSubtasksAI = async ({
  taskTitle,
  description,
  deadline,
}) => {

  try {

    const prompt = `
You are a productivity assistant.

Break the following task into 3 to 7 actionable subtasks.

Rules:
- Start each subtask with a verb
- Keep them practical
- Keep them concise
- Return ONLY a JSON array

Task: ${taskTitle}
Description: ${description}
Deadline: ${deadline}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

   return JSON.parse(response.text());

  } catch (error) {

    console.log("Gemini failed. Using fallback subtasks.");

    return [
      `Plan ${taskTitle}`,
      `Research requirements for ${taskTitle}`,
      `Implement core functionality`,
      `Test and debug ${taskTitle}`,
      `Finalize and review implementation`
    ];
  }
};

module.exports = {
  generateSubtasksAI,
};