import { useState } from "react";
import toast from "react-hot-toast";
import CodeEditor from "../components/CodeEditor.jsx";
import OutputPanel from "../components/OutputPanel.jsx";
import LanguageSelector from "../components/LanguageSelector.jsx";
import { STARTER_CODE } from "../constants/languages.js";
import API from "../services/api.js"; 
import "../styles/output.css";
import "../styles/home.css";

const ACTIONS = ["translate", "analyze", "optimize", "explain"];

function HomePage() {
  const [code, setCode] = useState(STARTER_CODE.python);
  const [sourceLanguage, setSourceLanguage] = useState("python");
  const [targetLanguage, setTargetLanguage] = useState("java");
  const [activeAction, setActiveAction] = useState("translate");
  const [results, setResults] = useState({
    translate: null,
    analyze: null,
    optimize: null,
    explain: null,
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSourceChange = (langId) => {
    setSourceLanguage(langId);
    if (STARTER_CODE[langId]) setCode(STARTER_CODE[langId]);
    setResults({
      translate: null,
      analyze: null,
      optimize: null,
      explain: null,
    });
  };

  const handleSwap = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    if (results.translate?.translatedCode) {
      setCode(results.translate.translatedCode);
      setResults({
        translate: null,
        analyze: null,
        optimize: null,
        explain: null,
      });
    }
  };

  const handleCopy = async () => {
    if (!results[activeAction]) return;

    let text = "";
    if (activeAction === "translate") text = results.translate?.translatedCode || "";
    else if (activeAction === "optimize") text = results.optimize?.optimizedCode || "";
    else if (activeAction === "explain") text = results.explain?.explanation || "";
    else if (activeAction === "analyze")
      text = `Time: ${results.analyze?.timeComplexity}\nSpace: ${results.analyze?.spaceComplexity}\n\n${results.analyze?.explanation || ""}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  // NEW: Run ALL operations at once
  const handleRun = async () => {
    if (!code.trim()) return toast.error("Please write some code first.");
    if (!sourceLanguage) return toast.error("Select a source language.");

    setLoading(true);
    setResults({
      translate: null,
      analyze: null,
      optimize: null,
      explain: null,
    });

    try {
      const response = await API.post("/code/run-all", {
        code,
        sourceLanguage,
        targetLanguage: activeAction === "translate" ? targetLanguage : sourceLanguage,
      });

      const data = response.data.data;
      setResults({
        translate: data.translation,
        analyze: data.complexity,
        optimize: data.optimization,
        explain: data.explanation,
      });
      toast.success("All operations completed!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Get current result based on active tab
  const currentResult = results[activeAction];

  return (
    <div className="home">
      <div className="toolbar">
        <div className="action-tabs">
          {ACTIONS.map((a) => (
            <button
              key={a}
              className={`action-tab ${activeAction === a ? "active" : ""}`}
              onClick={() => setActiveAction(a)}
            >
              {a}
            </button>
          ))}
        </div>
        <button className="run-btn" onClick={handleRun} disabled={loading}>
          {loading ? "Running All..." : "Run All"}
        </button>
      </div>

      <div className="panels">
        {/* Source Panel */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-header-left">
              <span className="panel-label">Source</span>
              <LanguageSelector
                value={sourceLanguage}
                onChange={handleSourceChange}
              />
            </div>
            <button className="clear-btn" onClick={() => setCode("")}>
              Clear
            </button>
          </div>
          <div className="panel-body">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={sourceLanguage}
            />
          </div>
        </div>

        {/* Swap Area */}
        <div className="swap-area">
          {activeAction === "translate" ? (
            <button className="swap-btn" onClick={handleSwap} title="Swap languages">
              &#8644;
            </button>
          ) : (
            <span className="swap-arrow">&#8594;</span>
          )}
        </div>

        {/* Output Panel */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-header-left">
              <span className="panel-label">
                {activeAction === "translate" ? "Target" : "Output"}
              </span>
              {activeAction === "translate" && (
                <LanguageSelector
                  value={targetLanguage}
                  onChange={setTargetLanguage}
                />
              )}
              {currentResult && activeAction !== "translate" && (
                <span className="action-badge">{activeAction}</span>
              )}
            </div>
            {currentResult && (
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div className="panel-body">
            {loading ? (
              <div className="loading-state">
                <div className="spinner" />
                <p>Running all 4 operations...</p>
              </div>
            ) : (
              <OutputPanel
                result={currentResult}
                action={activeAction}
                targetLanguage={
                  activeAction === "translate" ? targetLanguage : sourceLanguage
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;