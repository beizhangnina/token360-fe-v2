"use client";

import { useState } from "react";
import Link from "next/link";
import { Code2, Copy, Check } from "lucide-react";

const tabs = [
  {
    label: "TypeScript",
    file: "quickstart.ts",
    code: `import { Token360 } from "@token360/sdk"

const output = await Token360.run(
  "alibaba/wan-2.6/text-to-video",
  {
    prompt: "Driving through a futuristic city",
    duration: 5,
    resolution: "720p"
  }
);`,
  },
  {
    label: "Python",
    file: "quickstart.py",
    code: `import requests

url = 'https://api.token360.com/v1/models/alibaba/wan-2.6/text-to-video'
headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json',
}
payload = {
  'prompt': 'Driving through a futuristic city',
  'duration': 5,
  'resolution': '720p',
}

resp = requests.post(url, headers=headers, json=payload)
print(resp.json())`,
  },
  {
    label: "cURL",
    file: "quickstart.sh",
    code: `curl -X POST 'https://api.token360.com/v1/models/alibaba/wan-2.6/text-to-video' \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "prompt": "Driving through a futuristic city",
    "duration": 5,
    "resolution": "720p"
  }'`,
  },
];

export function DeveloperSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tabs[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative z-20 bg-[var(--bg-primary)] px-6 py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 lg:flex-row lg:items-start">
        {/* Left */}
        <div className="lg:w-[45%]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
            <Code2 className="h-3 w-3" /> REST SDK · quickstart
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-primary)] md:text-5xl">
            Built For Developers
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            One API across modalities. Node, Python, or cURL — go from zero to inference in minutes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--text-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--bg-primary)] transition-transform hover:scale-[1.02]"
            >
              API Docs
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)]"
            >
              Explore Models
            </Link>
          </div>
        </div>

        {/* Right - Code Block */}
        <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] lg:w-[55%]">
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] px-4 py-3">
            <Code2 className="h-4 w-4 text-[var(--text-muted)]" />
            <span className="text-sm text-[var(--text-secondary)]">{tabs[activeTab].file}</span>
          </div>
          {/* Tabs */}
          <div className="flex border-b border-[var(--border-subtle)]">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  i === activeTab
                    ? "border-b-2 border-[var(--text-primary)] text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Code */}
          <div className="relative">
            <button
              onClick={handleCopy}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
            <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
              <code className="text-[var(--text-primary)]">{tabs[activeTab].code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
