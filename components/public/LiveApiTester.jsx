'use client';

import { useState } from 'react';
import { Play, Code, CheckCircle2, Clock, Terminal, RefreshCw } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const ENDPOINTS = [
  { method: 'GET', url: '/api/profile', name: 'Profile Data', payload: null },
  { method: 'GET', url: '/api/projects', name: 'Public Projects', payload: null },
  { method: 'GET', url: '/api/skills', name: 'Tech Skills', payload: null },
  { method: 'GET', url: '/api/experience', name: 'Career Timeline', payload: null },
  { method: 'POST', url: '/api/chatbot', name: 'Chatbot API', payload: JSON.stringify({ message: 'What are Ahmad\'s main skills?' }, null, 2) },
];

export default function LiveApiTester() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINTS[0]);
  const [requestBody, setRequestBody] = useState(ENDPOINTS[0].payload || '');
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [latency, setLatency] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (endpoint) => {
    setSelectedEndpoint(endpoint);
    setRequestBody(endpoint.payload || '');
    setResponse(null);
    setStatus(null);
    setLatency(null);
  };

  const handleRun = async () => {
    setLoading(true);
    setResponse(null);
    setStatus(null);
    const startTime = performance.now();

    try {
      const options = {
        method: selectedEndpoint.method,
        headers: { 'Content-Type': 'application/json' },
      };

      if (selectedEndpoint.method === 'POST' && requestBody) {
        options.body = requestBody;
      }

      const res = await fetch(selectedEndpoint.url, options);
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);

      const data = await res.json();

      setStatus({ code: res.status, text: res.statusText || 'OK' });
      setLatency(duration);
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      const endTime = performance.now();
      setStatus({ code: 500, text: 'Fetch Error' });
      setLatency(Math.round(endTime - startTime));
      setResponse(JSON.stringify({ error: err.message || 'Network error' }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="api-explorer" className="relative py-4">
      <div className="section-container max-w-5xl mx-auto">
        <SectionHeader
          badge="Live API Sandbox"
          title="Interactive REST API Explorer — Test live endpoints & inspect JSON responses:"
        />

        <div className="glass-card overflow-hidden shadow-2xl border border-[var(--glass-border)]">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[var(--glass-bg)] border-b border-[var(--glass-border)] backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <Code size={18} className="text-[var(--accent)]" />
              <span className="text-sm font-bold text-[var(--foreground)]">Developer API Sandbox</span>
            </div>

            {status && (
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className={`px-2.5 py-1 rounded-md font-bold ${status.code >= 200 && status.code < 300 ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-500 border border-rose-500/30'}`}>
                  {status.code} {status.text}
                </span>
                <span className="text-[var(--foreground)] font-semibold flex items-center gap-1">
                  <Clock size={13} /> {latency}ms
                </span>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-[240px_1fr] divide-y md:divide-y-0 md:divide-x divide-[var(--glass-border)]">
            {/* Left Sidebar: Endpoints List */}
            <div className="p-4 space-y-2 bg-[var(--glass-bg)] backdrop-blur-xl">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--accent)] px-2 mb-2">Select Endpoint</div>
              {ENDPOINTS.map((ep) => (
                <button
                  key={ep.url}
                  type="button"
                  onClick={() => handleSelect(ep)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-left transition-all border ${
                    selectedEndpoint.url === ep.url
                      ? 'bg-[var(--accent)]/15 border-[var(--accent)] text-[var(--foreground)] font-extrabold shadow-sm'
                      : 'border-[var(--glass-border)] text-[var(--foreground)] font-medium hover:bg-[var(--glass-bg-hover)]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${ep.method === 'GET' ? 'bg-sky-500/20 text-sky-500 border border-sky-500/30' : 'bg-purple-500/20 text-purple-500 border border-purple-500/30'}`}>
                      {ep.method}
                    </span>
                    <span className="truncate">{ep.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Main Area: Request URL bar & JSON output */}
            <div className="p-6 space-y-4 bg-[var(--glass-bg)] backdrop-blur-2xl">
              {/* URL Bar */}
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[var(--glass-bg-hover)] border border-[var(--glass-border)] text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-[var(--accent)] text-white font-bold">
                  {selectedEndpoint.method}
                </span>
                <span className="flex-1 text-[var(--foreground)] font-bold truncate">{selectedEndpoint.url}</span>
                <button
                  type="button"
                  onClick={handleRun}
                  disabled={loading}
                  className="btn-primary text-xs gap-1.5 py-1.5 px-3 rounded-lg shadow-sm disabled:opacity-50"
                >
                  {loading ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
                  <span>{loading ? 'Sending...' : 'Send Request'}</span>
                </button>
              </div>

              {/* POST Request Body Editor if applicable */}
              {selectedEndpoint.method === 'POST' && (
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)] mb-1 block">Request Body (JSON)</label>
                  <textarea
                    rows={3}
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[var(--glass-bg-hover)] border border-[var(--glass-border)] text-xs font-mono text-[var(--foreground)] font-bold outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>
              )}

              {/* JSON Output Viewer */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)]">Response Payload</span>
                  {response && <span className="text-[11px] text-emerald-500 font-mono font-bold flex items-center gap-1"><CheckCircle2 size={12} /> Response Received</span>}
                </div>

                <div className="relative min-h-[200px] max-h-[300px] overflow-y-auto p-4 rounded-xl bg-[var(--glass-bg-hover)] border border-[var(--glass-border)] font-mono text-xs text-[var(--foreground)] font-semibold shadow-inner">
                  {response ? (
                    <pre className="whitespace-pre-wrap">{response}</pre>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--foreground-secondary)] text-xs font-sans gap-2 font-semibold">
                      <Terminal size={24} className="text-[var(--accent)] opacity-60" />
                      <span>Click "Send Request" to test endpoint live</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
