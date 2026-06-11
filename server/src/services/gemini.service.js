import { generateContent } from "../config/gemini.config.js";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const askGemini = async (prompt, retryCount = 0) => {
  const maxRetries = 5;
  const baseDelay = 2000; // Start with 2 seconds
  
  try {
    const response = await generateContent(prompt);
    if (!response) {
      throw new Error("Gemini returned an empty response");
    }
    return response;
  } catch (error) {
    console.error(`Gemini API Error (attempt ${retryCount + 1}):`, error.message);
    
    // Check if it's a 429 or server error (retryable)
    const isRetryable = error.message.includes('429') || 
                        error.message.includes('RESOURCE_EXHAUSTED') ||
                        error.message.includes('500') ||
                        error.message.includes('503');
    
    if (isRetryable && retryCount < maxRetries) {
      const delay = baseDelay * Math.pow(2, retryCount); // Exponential: 2s, 4s, 8s, 16s, 32s
      console.log(`🔄 Retrying in ${delay/1000} seconds... (Attempt ${retryCount + 2}/${maxRetries + 1})`);
      await sleep(delay);
      return askGemini(prompt, retryCount + 1);
    }
    
    throw new Error(
      "The AI service is currently unavailable. Please try again later."
    );
  }
};