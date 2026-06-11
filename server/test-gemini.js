import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// CHANGE THIS LINE - Use Gemma instead of Gemini
const MODEL_NAME = "gemma-4-26b-a4b-it";  // ← Changed from gemini-2.0-flash

const testGemini = async () => {
  try {
    console.log("Testing Gemma API (free model)...");
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: "Say 'Hello, Code Translator is working!' in one sentence.",
    });
    console.log("✅ Success!");
    console.log("Response:", response.text);
  } catch (error) {
    console.error("❌ Failed:", error.message);
    console.log("\n💡 Tip: Gemma models are free with higher quotas");
  }
};

testGemini();