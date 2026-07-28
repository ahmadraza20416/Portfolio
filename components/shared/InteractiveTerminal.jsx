'use client';

import { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles, Trash2, Code, User, Briefcase, Mail } from 'lucide-react';

export default function InteractiveTerminal({ profile = {} }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Welcome to Ahmad Raza\'s Interactive Developer Shell [v2.5.0]. Type "help" or click a command below.',
    },
  ]);

  const containerRef = useRef(null);

  // Scroll ONLY the inner terminal content container, NOT the window
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdStr) => {
    const cmd = cmdStr.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `$ ${cmdStr}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `Available commands:
  • about    - Brief intro about Ahmad Raza
  • skills   - Core technologies & tech stack overview
  • projects - Featured projects & architecture
  • contact  - Email, phone, & social handles
  • clear    - Clear terminal logs
  • matrix   - Toggle cyber matrix mode`,
        });
        break;

      case 'about':
        newHistory.push({
          type: 'response',
          text: `👨‍💻 Ahmad Raza | Full-Stack Engineer & AI Developer
📍 Location: Lahore, Pakistan
🚀 Mission: Building sleek, high-performing web platforms & AI automation tools that scale businesses.`,
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'response',
          text: `⚡ Tech Stack:
  • Frontend: React, Next.js, JavaScript (ES6+), Tailwind CSS, Framer Motion
  • Backend: Node.js, Express, MongoDB, Mongoose, REST & GraphQL APIs
  • AI & ML: LangChain, OpenAI APIs, Chatbot Development, Web Scraping
  • Tools: Git, Netlify, Docker, Vercel, Postman`,
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'response',
          text: `📂 Featured Projects:
  1. Custom Web Platform (Next.js + MongoDB)
  2. GenAI Enterprise Chatbot System (Node + LLMs)
  3. E-Commerce Automation Suite (React + Node)`,
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'response',
          text: `📬 Get in touch:
  • Email: ahmadraza20416@gmail.com
  • Phone: +92 307 9618398
  • LinkedIn: linkedin.com/in/ahmadraza20416
  • GitHub: github.com/ahmadraza20416`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'matrix':
        newHistory.push({
          type: 'response',
          text: '🟢 MATRIX MODE INITIALIZED... Accessing high-speed neural network node...',
        });
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cmdStr}". Type "help" for a list of available commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <div className="glass-card w-full max-w-2xl mx-auto overflow-hidden text-xs sm:text-sm font-mono shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--glass-bg)] border-b border-[var(--glass-border)]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
          <span className="ml-2 text-xs text-[var(--foreground-secondary)] flex items-center gap-1.5 font-medium">
            <Terminal size={14} className="text-[var(--accent)]" />
            ahmad@portfolio:~ (zsh)
          </span>
        </div>

        <button
          type="button"
          onClick={() => handleCommand('clear')}
          className="text-xs text-[var(--foreground-secondary)] hover:text-rose-400 flex items-center gap-1 transition-colors"
          title="Clear Terminal"
        >
          <Trash2 size={13} />
          Clear
        </button>
      </div>

      {/* Terminal Inner Container (Scrolls independently) */}
      <div
        ref={containerRef}
        className="p-4 sm:p-6 h-[220px] sm:h-[260px] overflow-y-auto space-y-3 bg-slate-950/60 backdrop-blur-xl"
      >
        {history.map((item, index) => (
          <div key={index} className="leading-relaxed">
            {item.type === 'user' && (
              <span className="text-emerald-400 font-semibold">{item.text}</span>
            )}
            {item.type === 'system' && (
              <span className="text-sky-300/90">{item.text}</span>
            )}
            {item.type === 'response' && (
              <pre className="text-slate-200 whitespace-pre-wrap font-mono mt-1 text-xs sm:text-sm">
                {item.text}
              </pre>
            )}
            {item.type === 'error' && (
              <span className="text-rose-400">{item.text}</span>
            )}
          </div>
        ))}
      </div>

      {/* Quick Interactive Command Buttons */}
      <div className="px-4 py-2 bg-[var(--glass-bg)] border-t border-[var(--glass-border)] flex flex-wrap gap-1.5">
        {[
          { label: 'about', icon: User },
          { label: 'skills', icon: Code },
          { label: 'projects', icon: Briefcase },
          { label: 'contact', icon: Mail },
          { label: 'help', icon: Sparkles },
        ].map((btn) => (
          <button
            key={btn.label}
            type="button"
            onClick={() => handleCommand(btn.label)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-[var(--glass-bg-hover)] text-[var(--foreground-secondary)] hover:text-[var(--accent)] hover:border-[var(--glass-border-hover)] border border-[var(--glass-border)] transition-all"
          >
            <btn.icon size={12} />
            {btn.label}
          </button>
        ))}
      </div>

      {/* Terminal Command Input Form */}
      <form onSubmit={onSubmit} className="flex items-center px-4 py-3 bg-slate-950/80 border-t border-[var(--glass-border)]">
        <span className="text-emerald-400 font-bold mr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'help' or command..."
          className="flex-1 bg-transparent border-none text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] text-xs sm:text-sm font-mono"
        />
        <button type="submit" aria-label="Run command" className="text-[var(--accent)] hover:text-white p-1">
          <CornerDownLeft size={16} />
        </button>
      </form>
    </div>
  );
}
