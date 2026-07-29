'use client';

import { useEffect, useState } from 'react';
import { Calculator, Save, Sparkles, DollarSign, RefreshCw, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { revalidatePublicSite } from '@/lib/revalidate';
import TiltCard from '@/components/shared/TiltCard';

const CURRENCIES = [
  { symbol: '$', code: 'USD', name: 'US Dollar ($ USD)' },
  { symbol: '€', code: 'EUR', name: 'Euro (€ EUR)' },
  { symbol: '£', code: 'GBP', name: 'British Pound (£ GBP)' },
  { symbol: 'Rs', code: 'PKR', name: 'Pakistani Rupee (Rs PKR)' },
  { symbol: 'AED', code: 'AED', name: 'UAE Dirham (AED)' },
];

export default function AdminEstimator() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    currency: { symbol: '$', code: 'USD' },
    baseRates: {
      'Web Application': 1200,
      'GenAI Chatbot': 950,
      'E-Commerce SaaS': 1500,
      'Custom Full-Stack Platform': 2200,
    },
    timelineMultipliers: {
      'Standard (3-4 weeks)': 1.0,
      'Expedited (2 weeks)': 1.35,
      'Urgent (1 week)': 1.8,
    },
    addonRates: {
      'SEO & OpenGraph Optimization': 250,
      'Auth & Role-Based Permissions': 350,
      'Payment Gateway Integration': 400,
      'Cloud CI/CD & Serverless Setup': 300,
    },
  });

  const loadSettings = async () => {
    try {
      const data = await fetch('/api/estimator').then((r) => r.json());
      if (data && data.currency) {
        setSettings(data);
      }
    } catch {
      toast.error('Failed to load estimator settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/estimator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        toast.success('Estimator rates & currency updated!');
        revalidatePublicSite();
      } else {
        toast.error('Failed to save estimator settings');
      }
    } catch {
      toast.error('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Calculator size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Project Estimator & Currency Configurator</h1>
            <p className="text-xs text-[var(--foreground-secondary)]">Set global display currency, base project rates & addon pricing</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary py-2.5 px-5 text-xs gap-2 rounded-xl shadow-lg disabled:opacity-50"
        >
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
        </button>
      </div>

      {/* Currency Selector */}
      <TiltCard className="p-6 sm:p-8 space-y-4 border border-[var(--glass-border)]">
        <div className="flex items-center gap-2 pb-3 border-b border-[var(--glass-border)]">
          <DollarSign size={20} className="text-[var(--accent)]" />
          <h2 className="text-base font-bold text-[var(--foreground)]">Display Currency Selection</h2>
        </div>

        <p className="text-xs text-[var(--foreground-secondary)]">
          Select the active currency symbol and code used across the Project Scope Estimator on your public portfolio.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {CURRENCIES.map((curr) => (
            <button
              key={curr.code}
              type="button"
              onClick={() => setSettings({ ...settings, currency: { symbol: curr.symbol, code: curr.code } })}
              className={`p-3 rounded-2xl text-xs font-bold transition-all border text-center ${
                settings.currency?.code === curr.code
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg scale-105'
                  : 'glass-card text-[var(--foreground-secondary)] border-[var(--glass-border)] hover:text-[var(--foreground)]'
              }`}
            >
              <div className="text-lg font-black mb-1">{curr.symbol}</div>
              <div>{curr.code}</div>
            </button>
          ))}
        </div>
      </TiltCard>

      {/* Base Project Rates */}
      <div className="glass-card p-6 sm:p-8 space-y-4 border border-[var(--glass-border)] shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--glass-border)]">
          <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2">
            <Sparkles size={18} className="text-[var(--accent)]" />
            Base Project Rates ({settings.currency.symbol} {settings.currency.code})
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(settings.baseRates || {}).map(([key, val]) => (
            <div key={key} className="p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] space-y-2">
              <label className="text-xs font-bold text-[var(--foreground)] block">{key}</label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[var(--accent)]">{settings.currency.symbol}</span>
                <input
                  type="number"
                  value={val}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      baseRates: { ...settings.baseRates, [key]: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="admin-input font-bold"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Addon Feature Rates */}
      <div className="glass-card p-6 sm:p-8 space-y-4 border border-[var(--glass-border)] shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--glass-border)]">
          <h2 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-400" />
            Addon Feature Pricing ({settings.currency.symbol} {settings.currency.code})
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(settings.addonRates || {}).map(([key, val]) => (
            <div key={key} className="p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] space-y-2">
              <label className="text-xs font-bold text-[var(--foreground)] block">{key}</label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-emerald-400">{settings.currency.symbol}</span>
                <input
                  type="number"
                  value={val}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      addonRates: { ...settings.addonRates, [key]: parseInt(e.target.value) || 0 },
                    })
                  }
                  className="admin-input font-bold"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
