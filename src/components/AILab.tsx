import React, { useState, useEffect, useRef, useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolioData";
import StatusBadge from "./StatusBadge";
import { FiPlay, FiRefreshCw, FiCopy, FiCheck, FiCpu, FiShield, FiTerminal } from "react-icons/fi";

const AILab: React.FC = () => {
  const { aiLab } = portfolioData;
  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [customPrompt, setCustomPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [networkMode, setNetworkMode] = useState<"live" | "simulated">("simulated");

  const activeDemo = aiLab.demos[selectedDemoIndex] || aiLab.demos[0];
  const sectionRef = useRef<HTMLElement>(null);

  // Initialize prompt & initial output on demo change
  useEffect(() => {
    setSelectedPromptIndex(0);
    setCustomPrompt(activeDemo.samplePrompts[0] || "");
    setOutput(activeDemo.mockResponses[0] || "");
  }, [selectedDemoIndex]);

  // Rule 3: After it mounts (and when content shifts), call ScrollTrigger.refresh()
  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(refreshTimer);
  }, [selectedDemoIndex, output]);

  // Handle Scenario Selection
  const handlePromptSelect = (index: number) => {
    setSelectedPromptIndex(index);
    setCustomPrompt(activeDemo.samplePrompts[index] || "");
    setOutput(activeDemo.mockResponses[index] || "");
  };

  // Run Agent
  const handleExecute = useCallback(async () => {
    setIsLoading(true);
    const apiUrl = import.meta.env.VITE_AGENT_API_URL;
    const promptToSend = customPrompt || activeDemo.samplePrompts[selectedPromptIndex] || "";

    if (apiUrl) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        setNetworkMode("live");
        const res = await fetch(`${apiUrl}/api/agent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            demoId: activeDemo.id,
            prompt: promptToSend,
          }),
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`API responded with ${res.status}`);
        }

        const data = await res.json();
        // Rule 8: Render model output as plain text only
        setOutput(typeof data.result === "string" ? data.result : JSON.stringify(data.result, null, 2));
        setIsLoading(false);
        return;
      } catch (err) {
        clearTimeout(timeoutId);
        console.warn("Live API call failed or unreachable, switching to deterministic simulation:", err);
      }
    }

    // Deterministic simulation fallback
    setNetworkMode("simulated");
    setTimeout(() => {
      const matchIndex = (activeDemo.samplePrompts as readonly string[]).indexOf(promptToSend);
      if (matchIndex !== -1 && activeDemo.mockResponses[matchIndex]) {
        setOutput(activeDemo.mockResponses[matchIndex]);
      } else {
        // Construct deterministic structured trace for custom input
        const trace = `[AGENT REASONING TRACE]\n> Ingesting custom user input...\n> Prompt: "${promptToSend}"\n> Parsing intent & context entities...\n> Classification: Dynamic Demonstration Inquiry\n> Executing agent function chain...\n\n[STRUCTURED AGENT OUTPUT]\n{\n  "status": "COMPLETED",\n  "agentRole": "${activeDemo.role}",\n  "inputLength": ${promptToSend.length},\n  "processedTimestamp": "${new Date().toISOString()}",\n  "reasoningSteps": [\n    "Extracted key constraints and parameters",\n    "Validated against business policies and schemas",\n    "Generated structured response payload"\n  ],\n  "executionStatus": "SUCCESS_VERIFIED"\n}`;
        setOutput(trace);
      }
      setIsLoading(false);
    }, 600);
  }, [activeDemo, customPrompt, selectedPromptIndex]);

  // Reset
  const handleReset = () => {
    setCustomPrompt(activeDemo.samplePrompts[0] || "");
    setOutput(activeDemo.mockResponses[0] || "");
    setSelectedPromptIndex(0);
  };

  // Copy to clipboard
  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="ai-lab"
      className="section-container mx-auto mt-16 px-4 md:mt-28 md:px-0"
    >
      {/* ── Section Header ── */}
      <div className="mb-10 text-center md:text-left">
        <span className="text-xs font-semibold tracking-widest uppercase text-[var(--accentColor)]">
          {aiLab.kicker}
        </span>
        <h2 className="mt-2 text-3xl font-normal md:text-5xl">
          {aiLab.title}{" "}
          <span className="text-[var(--accentColor)] font-medium">
            {aiLab.titleAccent}
          </span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#adacac] md:text-base">
          {aiLab.subtitle}
        </p>
      </div>

      {/* ── Demo Switcher Tabs ── */}
      <div className="flex flex-wrap gap-2.5 pb-6 border-b border-white/10">
        {aiLab.demos.map((demo, idx) => {
          const isActive = idx === selectedDemoIndex;
          return (
            <button
              key={demo.id}
              onClick={() => setSelectedDemoIndex(idx)}
              data-cursor="disable"
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 border ${
                isActive
                  ? "bg-[#1f1729] text-white border-[var(--accentColor)] shadow-[0_0_20px_rgba(194,164,255,0.2)]"
                  : "bg-white/[0.03] text-[#adacac] border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              <FiCpu className={isActive ? "text-[var(--accentColor)]" : "opacity-60"} />
              <span>{demo.name}</span>
              <StatusBadge status={demo.badge} />
            </button>
          );
        })}
      </div>

      {/* ── Active Demo Interactive Panel ── */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-[#120e16]/80 p-5 backdrop-blur-xl md:p-8">
        {/* Demo Header Info */}
        <div className="flex flex-col gap-3 pb-6 border-b border-white/10 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold text-white md:text-2xl">
                {activeDemo.name}
              </h3>
              <StatusBadge status={activeDemo.badge} />
            </div>
            <p className="mt-1 text-xs text-[#a29bfe] font-mono">
              {aiLab.ui.roleLabel}: {activeDemo.role}
            </p>
            <p className="mt-2 text-sm text-[#adacac] max-w-3xl">
              {activeDemo.description}
            </p>
          </div>

          {/* Fictional Company Tag */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] text-[#9ca3af] self-start md:self-auto">
            <FiShield className="text-[var(--accentColor)]" />
            <span>{activeDemo.disclaimer}</span>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#6b7280] font-medium mr-1">
            {aiLab.ui.techStackLabel}:
          </span>
          {activeDemo.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.05] text-[#d1d5db] border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ── Interaction Area (2 Columns on Desktop) ── */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Left Column: Input & Scenarios */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            {/* Preset Scenarios */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-2.5">
                {aiLab.ui.selectPromptLabel}
              </label>
              <div className="flex flex-col gap-2">
                {activeDemo.samplePrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handlePromptSelect(pIdx)}
                    data-cursor="disable"
                    className={`text-left p-3 rounded-lg text-xs leading-relaxed transition-all border select-text ${
                      selectedPromptIndex === pIdx
                        ? "bg-[#1c1527] border-[var(--accentColor)]/60 text-white"
                        : "bg-white/[0.02] border-white/5 text-[#9ca3af] hover:border-white/15 hover:text-white"
                    }`}
                  >
                    <span className="text-[var(--accentColor)] font-mono mr-1.5 font-bold">
                      #{pIdx + 1}
                    </span>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="flex-1 flex flex-col">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-2">
                {aiLab.ui.customInputLabel}
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder={aiLab.ui.inputPlaceholder}
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-xs md:text-sm text-white placeholder-[#6b7280] focus:border-[var(--accentColor)] focus:outline-none transition-colors select-text resize-none"
                style={{ userSelect: "text" }}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleExecute}
                disabled={isLoading}
                data-cursor="disable"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[var(--accentColor)] text-[#0b080c] font-semibold text-xs md:text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
              >
                <FiPlay className={isLoading ? "animate-spin" : ""} />
                <span>{isLoading ? aiLab.ui.runningBtn : aiLab.ui.runBtn}</span>
              </button>

              <button
                onClick={handleReset}
                title={aiLab.ui.resetBtn}
                data-cursor="disable"
                className="p-3 rounded-xl border border-white/10 bg-white/[0.04] text-[#adacac] hover:text-white hover:border-white/20 transition-all"
              >
                <FiRefreshCw />
              </button>
            </div>
          </div>

          {/* Right Column: Execution Trace & Output Console */}
          <div className="flex flex-col lg:col-span-7">
            <div className="flex items-center justify-between pb-2.5">
              <div className="flex items-center gap-2">
                <FiTerminal className="text-[var(--accentColor)]" />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
                  {aiLab.ui.outputHeader}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[#9ca3af] border border-white/5">
                  {networkMode === "live"
                    ? aiLab.ui.networkStatusLive
                    : aiLab.ui.networkStatusSimulated}
                </span>

                <button
                  onClick={handleCopy}
                  title={aiLab.ui.copyOutputBtn}
                  data-cursor="disable"
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-[#d1d5db] border border-white/10 transition-colors"
                >
                  {copied ? (
                    <>
                      <FiCheck className="text-emerald-400" />
                      <span className="text-emerald-400">{aiLab.ui.copiedNotice}</span>
                    </>
                  ) : (
                    <>
                      <FiCopy />
                      <span>{aiLab.ui.copyOutputBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Plain-text Output Screen (Rule 8: Never dangerouslySetInnerHTML) */}
            <div
              className="flex-1 min-h-[300px] max-h-[460px] overflow-y-auto rounded-xl border border-white/10 bg-[#080509] p-4 font-mono text-xs leading-relaxed text-[#c2a4ff] select-text shadow-inner"
              style={{ userSelect: "text" }}
            >
              {isLoading ? (
                <div className="flex h-full items-center justify-center text-[#9ca3af] animate-pulse">
                  <span>{aiLab.ui.runningBtn}</span>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap break-words font-mono text-xs select-text text-gray-200">
                  {output}
                </pre>
              )}
            </div>

            {/* Plain text & Safety Guarantee Indicator */}
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#6b7280]">
              <span>{aiLab.ui.plainTextBadge}</span>
              <span>{aiLab.ui.fictionalNotice}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AILab;
