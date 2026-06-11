import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import HistoryList from "../components/HistoryList.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import {
  getHistory,
  deleteHistoryItem,
  clearHistory,
} from "../services/historyService.js";
import "../styles/history.css";

function HistoryPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    fetchHistory();
  }, [currentPage]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getHistory(currentPage, ITEMS_PER_PAGE);
      setEntries(data.entries);
      setTotalPages(data.totalPages);
      setTotalEntries(data.totalEntries);
    } catch {
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHistoryItem(id);
      toast.success("Deleted");
      if (selectedEntry?._id === id) setSelectedEntry(null);
      fetchHistory();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Delete all history?")) return;
    try {
      const r = await clearHistory();
      toast.success(`Cleared ${r.deletedCount} entries`);
      setEntries([]);
      setTotalEntries(0);
      setTotalPages(0);
      setSelectedEntry(null);
      setCurrentPage(1);
    } catch {
      toast.error("Failed to clear");
    }
  };

  const renderDetailOutput = () => {
    if (!selectedEntry) return null;

    switch (selectedEntry.type) {
      case "translate":
        return (
          <div>
            <span className="detail-lang-badge">
              Target: {selectedEntry.targetLanguage}
            </span>
            <pre className="detail-code-block">
              {selectedEntry.output?.translatedCode}
            </pre>
          </div>
        );

      case "analyze":
        return (
          <div>
            <div className="detail-complexity-row">
              <div className="detail-complexity-card">
                <div className="detail-complexity-label">Time</div>
                <div className="detail-complexity-value">
                  {selectedEntry.output?.timeComplexity}
                </div>
              </div>
              <div className="detail-complexity-card">
                <div className="detail-complexity-label">Space</div>
                <div className="detail-complexity-value">
                  {selectedEntry.output?.spaceComplexity}
                </div>
              </div>
            </div>
            {selectedEntry.output?.explanation && (
              <p className="detail-text">{selectedEntry.output.explanation}</p>
            )}
          </div>
        );

      case "optimize":
        return (
          <div>
            <pre className="detail-code-block">
              {selectedEntry.output?.optimizedCode}
            </pre>
            {selectedEntry.output?.suggestions && (
              <p className="detail-text">{selectedEntry.output.suggestions}</p>
            )}
          </div>
        );

      case "explain":
        return (
          <p className="detail-text">{selectedEntry.output?.explanation}</p>
        );

      default:
        return null;
    }
  };

  return (
    <div className="history-page">
      <div className="history-sidebar">
        <div className="history-sidebar-header">
          <h2>History</h2>
          {totalEntries > 0 && (
            <button className="clear-all-btn" onClick={handleClearAll}>
              Clear all
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <HistoryList
              entries={entries}
              onView={setSelectedEntry}
              onDelete={handleDelete}
            />

            {totalPages > 1 && (
              <div className="history-pagination">
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`page-btn ${currentPage === p ? "active" : ""}`}
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="history-detail">
        {selectedEntry ? (
          <>
            <div className="detail-header">
              <div>
                <span className="detail-type">{selectedEntry.type}</span>
                <span className="detail-date">
                  {new Date(selectedEntry.createdAt).toLocaleString()}
                </span>
              </div>
              <button className="close-detail" onClick={() => setSelectedEntry(null)}>
                Close
              </button>
            </div>
            <div className="detail-input">
              <div className="detail-label">Input Code ({selectedEntry.sourceLanguage})</div>
              <div className="detail-input-editor">
                <CodeEditor
                  code={selectedEntry.inputCode}
                  onChange={() => {}}
                  language={selectedEntry.sourceLanguage}
                  readOnly
                />
              </div>
            </div>
            <div className="detail-output">
              <div className="detail-label">Output</div>
              <div className="detail-output-box">{renderDetailOutput()}</div>
            </div>
          </>
        ) : (
          <div className="detail-empty">
            <p>Select a history entry to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;