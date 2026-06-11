import { AI_PROVIDER, AI_CONFIG } from '../config/ai.config.js';
import { GoogleGenAI } from "@google/genai";
import ollama from 'ollama';

// Initialize Google client (only if needed)
let googleAI = null;
if (AI_PROVIDER === 'google') {
  googleAI = new GoogleGenAI({ apiKey: AI_CONFIG.google.apiKey });
}

const askOllama = async (prompt) => {
  try {
    console.log("🤖 [Ollama] Processing request...");
    const response = await ollama.chat({
      model: AI_CONFIG.ollama.model,
      messages: [{ role: 'user', content: prompt }],
    });
    console.log("✅ [Ollama] Response received");
    return response.message.content;
  } catch (error) {
    console.error("❌ [Ollama] Error:", error.message);
    throw new Error(`Ollama failed: ${error.message}. Make sure Ollama is running.`);
  }
};

const askGoogle = async (prompt) => {
  try {
    console.log("🤖 [Google] Processing request...");
    const response = await googleAI.models.generateContent({
      model: AI_CONFIG.google.model,
      contents: prompt,
    });
    console.log("✅ [Google] Response received");
    return response.text;
  } catch (error) {
    console.error("❌ [Google] Error:", error.message);
    throw new Error(`Google AI failed: ${error.message}`);
  }
};

// Main AI function - uses selected provider
export const askAI = async (prompt) => {
  console.log(`🚀 Using AI Provider: ${AI_PROVIDER.toUpperCase()}`);
  
  if (AI_PROVIDER === 'ollama') {
    return await askOllama(prompt);
  } else if (AI_PROVIDER === 'google') {
    return await askGoogle(prompt);
  } else {
    throw new Error(`Unknown AI provider: ${AI_PROVIDER}`);
  }
};