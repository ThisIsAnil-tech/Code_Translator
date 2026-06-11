import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Option 1: Fast and good for code (Recommended)
//const MODEL_NAME = "gemini-2.0-flash";

// Option 2: Latest stable
//const MODEL_NAME = "models/gemini-2.0-flash-001";

// Option 3: If you need more power (slower but better)
//const MODEL_NAME = "models/gemini-2.5-pro";

// Use Gemma - completely free with much higher limits
const MODEL_NAME = "gemma-4-26b-a4b-it";  // ← Changed from gemini-2.0-flash

const generateContent = async (prompt) => {
  try {
    console.log("🤖 Sending request to Gemma...");
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    console.log("✅ Gemma response received");
    return response.text;
  } catch (error) {
    console.error("Gemma API Error:", error.message);
    throw new Error(`AI service failed: ${error.message}`);
  }
};

export { ai, MODEL_NAME, generateContent };