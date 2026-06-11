// AI Provider Configuration - Switch manually between providers

// Set this to 'ollama' or 'google' to switch providers
export const AI_PROVIDER = 'ollama'; // Change to 'google' when quota is available

// Model configurations for each provider
export const AI_CONFIG = {
  ollama: {
    model: 'codellama:7b', // or 'deepseek-coder:1.3b' for faster
    url: 'http://localhost:11434',
  },
  google: {
    model: 'gemini-2.0-flash',
    apiKey: process.env.GEMINI_API_KEY,
  }
};