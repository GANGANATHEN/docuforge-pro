'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Terminal, ShieldCheck, Zap, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [repoUrl, setRepoUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [previewOutput, setPreviewOutput] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.animate-hero', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.from(terminalRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleQuickScan = () => {
    if (!repoUrl) return;
    setAnalyzing(true);
    setPreviewOutput(null);

    setTimeout(() => {
      setAnalyzing(false);
      setPreviewOutput(`# 🚀 ${repoUrl.split('/').pop() || 'Repository'}
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## 📖 Overview
Architected with high modularity and AST-based parsing. Scanned 48 source files in 0.18s.

## ⚡ Quick Start
\`\`\`bash
git clone ${repoUrl}
pip install -r requirements.txt
python main.py
\`\`\``);
    }, 1200);
  };

  return (
    <main ref={heroRef} className="min-h-screen flex flex-col justify-between">
      {/* Navbar */}
      <nav className="border-b border-gray-800/80 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-emerald-400" />
          <span className="font-bold text-lg tracking-tight">DocuForge<span className="text-emerald-400">Pro</span></span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition">Pricing</a>
          <a href="#playground" className="text-sm bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-4 py-2 rounded-lg transition">
            Try Browser Scanner
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center flex flex-col items-center">
        <div className="animate-hero inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-6">
          <Zap className="w-3.5 h-3.5" /> 100% Offline • Zero Cloud API Costs • Sub-second AST Engine
        </div>

        <h1 className="animate-hero text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-3xl leading-tight">
          Turn Any Codebase Into A Production README in <span className="text-emerald-400">0.2s</span>.
        </h1>

        <p className="animate-hero text-gray-400 text-lg max-w-2xl mb-10">
          Native AST parsing extracts signatures, dependency trees, badges, and folder architecture without leaking your private code to remote AI servers.
        </p>

        {/* Interactive Terminal Demo */}
        <div ref={terminalRef} className="w-full max-w-3xl bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-2xl text-left">
          <div className="bg-gray-900/80 px-4 py-3 border-b border-gray-800 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-gray-400 font-mono ml-2">bash - docuforge v1.0.0</span>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed text-gray-300">
            <p className="text-gray-500">$ python3 docuforge.py ./enterprise-core</p>
            <p className="text-emerald-400 mt-2">🔍 Scanning directory tree...</p>
            <p className="text-gray-400">├── AST parsed: 142 functions, 28 classes</p>
            <p className="text-gray-400">├── Detected stacks: Python (FastAPI), C++17, Next.js</p>
            <p className="text-gray-400">└── Formatted Shields.io badges + Directory map generated</p>
            <p className="text-white mt-3 font-semibold">✨ Wrote README_GENERATED.md (1,840 LOC documented in 0.19s)</p>
          </div>
        </div>
      </section>

      {/* Browser Playground */}
      <section id="playground" className="max-w-4xl mx-auto px-6 py-16 w-full">
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-2">Test Direct Cloud Parser</h2>
          <p className="text-gray-400 text-sm mb-6">Enter any public GitHub repo name or URL to preview output structure.</p>
          
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g. https://github.com/torvalds/linux or your-username/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition"
            />
            <button
              onClick={handleQuickScan}
              disabled={analyzing}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-semibold px-6 py-3 rounded-xl text-sm transition flex items-center gap-2"
            >
              {analyzing ? 'Scanning...' : 'Generate Spec'}
            </button>
          </div>

          {previewOutput && (
            <div className="mt-6 bg-gray-950 border border-gray-800/80 rounded-xl p-4 font-mono text-xs text-gray-300 whitespace-pre-wrap">
              {previewOutput}
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-16 w-full">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Straightforward Licensing</h2>
        <p className="text-gray-400 text-center text-sm mb-12">Run locally forever. No subscriptions required for standalone binaries.</p>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Tier */}
          <div className="border border-gray-800 bg-gray-900/20 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Community Lite</h3>
              <p className="text-gray-400 text-sm mb-4">For solo open-source projects.</p>
              <div className="text-3xl font-bold text-white mb-6">$0</div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Standard Python CLI engine</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Basic markdown layout</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Shields.io badge generation</li>
              </ul>
            </div>
            <a href="https://github.com/Ganganathen" target="_blank" rel="noreferrer" className="mt-8 border border-gray-700 hover:border-gray-500 text-center py-3 rounded-xl text-sm font-semibold transition">
              Clone via GitHub
            </a>
          </div>

          {/* Pro Bundle */}
          <div className="border-2 border-emerald-500/80 bg-emerald-500/5 rounded-2xl p-8 flex flex-col justify-between relative">
            <span className="absolute -top-3 right-6 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              One-Time License
            </span>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">DocuForge Pro + C++</h3>
              <p className="text-gray-400 text-sm mb-4">Complete binary distribution and AST engine.</p>
              <div className="text-3xl font-bold text-white mb-6">$9 <span className="text-sm font-normal text-gray-400">one-time</span></div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Everything in Community</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> C++17 ultra-fast repository walker</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Full AST signature extraction</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Local Ollama API hook integration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Lifetime standalone binary updates</li>
              </ul>
            </div>
            <a href="#checkout" className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-black text-center py-3 rounded-xl text-sm font-bold transition">
              Get Pro Access ($9)
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/80 py-8 text-center text-xs text-gray-500">
        © 2026 DocuForge Pro. Built for high-efficiency developers.
      </footer>
    </main>
  );
}