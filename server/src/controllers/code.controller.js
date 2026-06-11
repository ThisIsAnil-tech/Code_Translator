import { translateCode } from "../services/translation.service.js";
import { analyzeComplexity } from "../services/complexity.service.js";
import { optimizeCode } from "../services/optimization.service.js";
import { explainCode } from "../services/explanation.service.js";
import { createHistoryEntry } from "../services/history.service.js";

// New endpoint: Run ALL operations at once
export const runAll = async (req, res, next) => {
  try {
    const { code, sourceLanguage, targetLanguage } = req.body;

    if (!code || !sourceLanguage) {
      return res.status(400).json({
        success: false,
        message: "code and sourceLanguage are required.",
      });
    }

    console.log("🚀 Running all operations simultaneously for the same code...");

    // Run all 4 operations in parallel for maximum speed
    const [translation, complexity, optimization, explanation] = await Promise.all([
      translateCode(code, sourceLanguage, targetLanguage || sourceLanguage),
      analyzeComplexity(code, sourceLanguage),
      optimizeCode(code, sourceLanguage),
      explainCode(code, sourceLanguage),
    ]);

    // Save all to history (fire and forget)
    const operations = [
      { type: "translate", output: translation, targetLanguage: targetLanguage || sourceLanguage },
      { type: "analyze", output: complexity },
      { type: "optimize", output: optimization },
      { type: "explain", output: explanation },
    ];

    operations.forEach(op => {
      createHistoryEntry({
        userId: req.user._id,
        type: op.type,
        inputCode: code,
        sourceLanguage: sourceLanguage,
        targetLanguage: op.targetLanguage,
        output: op.output,
      }).catch(err => console.error(`Failed to save ${op.type} history:`, err.message));
    });

    // Return all results at once
    return res.json({
      success: true,
      data: {
        translation,
        complexity,
        optimization,
        explanation,
      }
    });
  } catch (error) {
    next(error);
  }
};

// Individual endpoints (keep these for backward compatibility)
export const translate = async (req, res, next) => {
  try {
    const { code, sourceLanguage, targetLanguage } = req.body;

    if (!code || !sourceLanguage || !targetLanguage) {
      return res.status(400).json({
        success: false,
        message: "code, sourceLanguage, and targetLanguage are required.",
      });
    }

    const result = await translateCode(code, sourceLanguage, targetLanguage);

    createHistoryEntry({
      userId: req.user._id,
      type: "translate",
      inputCode: code,
      sourceLanguage,
      targetLanguage,
      output: result,
    }).catch((err) => console.error("Failed to save history:", err.message));

    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const analyze = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "code and language are required.",
      });
    }

    const result = await analyzeComplexity(code, language);

    createHistoryEntry({
      userId: req.user._id,
      type: "analyze",
      inputCode: code,
      sourceLanguage: language,
      output: result,
    }).catch((err) => console.error("Failed to save history:", err.message));

    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const optimize = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "code and language are required.",
      });
    }

    const result = await optimizeCode(code, language);

    createHistoryEntry({
      userId: req.user._id,
      type: "optimize",
      inputCode: code,
      sourceLanguage: language,
      output: result,
    }).catch((err) => console.error("Failed to save history:", err.message));

    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const explain = async (req, res, next) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "code and language are required.",
      });
    }

    const result = await explainCode(code, language);

    createHistoryEntry({
      userId: req.user._id,
      type: "explain",
      inputCode: code,
      sourceLanguage: language,
      output: result,
    }).catch((err) => console.error("Failed to save history:", err.message));

    return res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};