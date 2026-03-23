"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

type Role = "user" | "assistant";
type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  displayed: string;
};

const GREET = "Hi, I’m Job’s AI assistant. Ask me anything.";

function uid() {
  return Math.random().toString(16).slice(2);
}

export function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const typingTimer = useRef<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const quickActions = useMemo(
    () => [
      { label: "Show skills", prompt: "Show skills" },
      { label: "Explain projects", prompt: "Explain projects" },
      { label: "Why hire him?", prompt: "Why hire him?" },
    ],
    []
  );

  const assistantResponse = (prompt: string) => {
    const p = prompt.toLowerCase();

    if (p.includes("skill")) {
      return [
        "Core modules loaded:",
        "• Backend: .NET, ASP.NET Core, clean architecture, security-first patterns",
        "• Frontend: Angular, React/Next.js, TypeScript, performance-minded UI",
        "• AI: LLM integration, prompt workflows, learning-driven experimentation",
        "• Tools/Cloud: Azure, CI/CD, Docker/K8s fundamentals",
      ].join("\n");
    }

    if (p.includes("project")) {
      return [
        "Real-world systems executed:",
        "• Outlook Email Scanner: real-time email scanning with security policy alignment",
        "• SignalR IT Management: live dashboards + incident workflows with low-latency updates",
        "• Web API Systems: scalable APIs with auth, rate limiting, documentation",
        "• UI Projects: reusable component systems, accessibility + speed",
        "• AI/ML (Experimental): GenAI + LLM API experiments for intelligent tooling",
      ].join("\n");
    }

    if (p.includes("hire") || p.includes("why")) {
      return [
        "Why hire him?",
        "• Systems mindset: scalable, maintainable, measurable performance",
        "• Security by design: threat-aware development and practical defenses",
        "• Product energy: clean UX, fast iteration, strong developer collaboration",
        "• AI-ready: integrates LLMs responsibly to augment workflows",
      ].join("\n");
    }

    return [
      "Accessing system knowledge base…",
      "I can help with:",
      "• skills & module breakdown",
      "• project explanations",
      "• engineering approach (security, scalability, UX)",
      "",
      "Try one of the quick actions above.",
    ].join("\n");
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    setMessages([
      {
        id: uid(),
        role: "assistant",
        content: GREET,
        displayed: "",
      },
    ]);
  }, []);

  useEffect(() => {
    // Type the initial greeting once.
    if (messages.length !== 1) return;
    const msg = messages[0];
    if (msg.displayed.length > 0) return;

    const full = msg.content;
    let i = 0;
    if (typingTimer.current) window.clearInterval(typingTimer.current);
    typingTimer.current = window.setInterval(() => {
      i++;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === msg.id ? { ...m, displayed: full.slice(0, i) } : m
        )
      );
      if (i >= full.length) {
        if (typingTimer.current) window.clearInterval(typingTimer.current);
        typingTimer.current = null;
      }
      scrollToBottom();
    }, 18);

    return () => {
      if (typingTimer.current) window.clearInterval(typingTimer.current);
      typingTimer.current = null;
    };
  }, [messages]);

  const send = (prompt: string) => {
    if (typingTimer.current) {
      window.clearInterval(typingTimer.current);
      typingTimer.current = null;
    }

    const userMessage: ChatMessage = {
      id: uid(),
      role: "user",
      content: prompt,
      displayed: prompt,
    };

    const assistantFull = assistantResponse(prompt);
    const assistantMessage: ChatMessage = {
      id: uid(),
      role: "assistant",
      content: assistantFull,
      displayed: "",
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);

    let i = 0;
    typingTimer.current = window.setInterval(() => {
      i++;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? { ...m, displayed: assistantFull.slice(0, i) }
            : m
        )
      );
      if (i >= assistantFull.length) {
        if (typingTimer.current) window.clearInterval(typingTimer.current);
        typingTimer.current = null;
      }
      scrollToBottom();
    }, 14);
  };

  return (
    <section
      id="ai"
      data-story-section
      className="relative py-24 md:py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_62%)]" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">
            AI LAYER
          </span>
          <h2
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Activating AI Assistant
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* Left: quick actions / dashboard */}
          <div className="lg:col-span-2">
            <div
              data-ai-panel
              className="glass-card rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.7)]" />
                  <div className="text-sm font-mono text-zinc-300 tracking-widest">
                    MODULES ONLINE
                  </div>
                </div>
                <div className="text-xs text-zinc-500 font-mono">
                  v1.0.0
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-mono">SECURITY</span>
                  <span className="text-xs text-blue-300 font-mono">
                    ENCRYPTED
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-mono">SCALING</span>
                  <span className="text-xs text-purple-300 font-mono">
                    ADAPTIVE
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-mono">LLM LAYER</span>
                  <span className="text-xs text-cyan-300 font-mono">
                    READY
                  </span>
                </div>
              </div>

              <div className="mt-7">
                <div className="text-xs font-mono text-zinc-500 tracking-widest uppercase">
                  Quick actions
                </div>
                <div className="mt-3 flex flex-col gap-3">
                  {quickActions.map((a) => (
                    <MagneticButton
                      key={a.label}
                      as="button"
                      onClick={() => send(a.prompt)}
                      className="bg-white/[0.03] border border-white/10 text-white px-5 py-3 rounded-xl justify-start"
                    >
                      <span className="font-mono text-sm">{a.label}</span>
                    </MagneticButton>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-xs text-zinc-500 font-mono leading-relaxed">
                Tip: scroll through the system, then ask the assistant to explain what you&apos;re seeing.
              </div>
            </div>
          </div>

          {/* Right: chat */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-mono text-zinc-400 tracking-widest uppercase">
                    Job&apos;s AI Assistant
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">
                    Chat console (simulated)
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  online
                </div>
              </div>

              <div className="h-[360px] md:h-[420px] overflow-auto pr-2 scrollbar-hide">
                <div className="space-y-3">
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex ${
                        m.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[90%] rounded-2xl px-4 py-3 border ${
                          m.role === "user"
                            ? "bg-blue-500/15 border-blue-500/30"
                            : "bg-white/[0.02] border-white/10"
                        }`}
                      >
                        <div className="whitespace-pre-wrap font-mono text-xs md:text-sm text-zinc-300">
                          {m.displayed}
                          {m.role === "assistant" &&
                            m.displayed.length < m.content.length && (
                              <span className="inline-block w-[6px] h-[14px] bg-blue-300/70 translate-y-1 ml-1 animate-pulse" />
                            )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <AIInput onSend={send} />
              </div>
            </div>

            <div className="mt-5 text-xs text-zinc-500 font-mono leading-relaxed">
              This is a narrative assistant layer. It simulates answers based on your system context.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AIInput({ onSend }: { onSend: (prompt: string) => void }) {
  const [value, setValue] = useState("");

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <div className="flex-1">
      <div className="glass-card rounded-2xl p-2 border border-white/10 flex items-center gap-2">
        <input
          className="flex-1 bg-transparent outline-none px-3 py-2 font-mono text-sm text-zinc-300 placeholder:text-zinc-600"
          placeholder="Ask the AI layer… (e.g., “Explain projects”)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
        />
        <button
          className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm border border-white/10 hover:shadow-[0_0_24px_rgba(59,130,246,0.35)] transition-shadow"
          onClick={submit}
          type="button"
        >
          Send
        </button>
      </div>
    </div>
  );
}

