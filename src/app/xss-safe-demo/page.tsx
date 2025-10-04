// app/local-vuln/page.tsx
"use client";

import React, { useRef, useState } from "react";

/**
 * LOCAL VULNERABLE DEMO (dev-only)
 * - INTENTIONALLY vulnerable: uses innerHTML to render user input (shows XSS).
 * - Also provides a safe rendering option (textContent) for comparison.
 *
 * RUN ONLY ON LOCALHOST / IN ISOLATED VM OR CONTAINER.
 * DO NOT DEPLOY THIS PAGE PUBLICLY.
 */

export default function LocalVulnPage(): React.ReactElement {
  // initial value as a plain string (contains angle brackets)
  const [value, setValue] = useState<string>("<b>bold text</b>");
  const [status, setStatus] = useState<string>("(nothing rendered yet)");
  const outRef = useRef<HTMLDivElement | null>(null);

  function renderVulnerable() {
    if (!outRef.current) return;
    // intentionally vulnerable: insert raw HTML from user input
    outRef.current.innerHTML = value;
    setStatus("Rendered with innerHTML (vulnerable)");
  }

  function renderSafe() {
    if (!outRef.current) return;
    // safe: escapes HTML, shows as text
    outRef.current.textContent = value;
    setStatus("Rendered with textContent (safe)");
  }

  function clearOutput() {
    if (outRef.current) outRef.current.innerHTML = "";
    setStatus("(cleared)");
  }

  return (
    <main style={{ maxWidth: 900, margin: "2rem auto", fontFamily: "system-ui, Arial", padding: 16 }}>
      <h1 style={{ color: "#b91c1c" }}>LOCAL VULNERABLE DEMO — DEV ONLY</h1>
      <p style={{ color: "#b91c1c" }}>
        <strong>Warning:</strong> This page is intentionally vulnerable to demonstrate XSS.
        Use only on <code>http://localhost</code> or an isolated VM/container. Do not publish.
      </p>

      <label style={{ display: "block", marginTop: 12 }}>
        Enter HTML / text / script:
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={6}
          style={{ width: "100%", marginTop: 8, fontFamily: "monospace" }}
          aria-label="vuln-input"
        />
      </label>

      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <button
          onClick={renderVulnerable}
          style={{
            background: "#ef4444",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Render as HTML (vulnerable)
        </button>

        <button
          onClick={renderSafe}
          style={{
            background: "#10b981",
            color: "white",
            padding: "8px 12px",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Show escaped (safe)
        </button>

        <button
          onClick={clearOutput}
          style={{ padding: "8px 12px", borderRadius: 4, cursor: "pointer" }}
        >
          Clear output
        </button>
      </div>

      <div style={{ marginTop: 18 }}>
        <strong>Status:</strong> <span>{status}</span>
      </div>

      <h3 style={{ marginTop: 18 }}>Output</h3>
      <div
        id="vuln-out"
        ref={outRef}
        style={{ padding: 12, border: "1px solid #ddd", minHeight: 80, background: "#fff" }}
      />

      <section
        style={{
          marginTop: 20,
          padding: 12,
          border: "1px solid #fde68a",
          borderRadius: 6,
          background: "#fff7ed",
        }}
      >
        <h4>Demo tips</h4>
        <ul>
          <li>
            Paste <code>&lt;b&gt;bold text&lt;/b&gt;</code> and click <em>Render as HTML</em> — text will appear bold.
          </li>
          <li>
            Paste <code>&lt;script&gt;alert('XSS demo')&lt;/script&gt;</code> and click <em>Render as HTML</em> — an
            alert may show (behavior can vary by browser). This demonstrates script execution if the browser executes the injected script.
          </li>
          <li>
            Click <em>Show escaped (safe)</em> to show the safe, escaped representation instead.
          </li>
        </ul>
        <p style={{ marginTop: 8, color: "#374151" }}>
          After the lesson, remove this page and any demo files and stop the dev server. Prefer the controlled iframe or DOMPurify demos for safer teaching.
        </p>
      </section>
    </main>
  );
}
