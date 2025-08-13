import React from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Legend, CartesianGrid, ComposedChart, RadialBarChart, RadialBar, ReferenceLine
} from "recharts";

const report = {
  account: "Oca ads",
  campaign: "Seguidores OCA",
  start: "2025-07-15",
  end: "2025-08-13",
  reach: 9784,
  impressions: 13690,
  frequency: 1.40,
  spend: 50.0,
  currency: "BRL",
  linkClicks: 155,
  pageEngagement: 1380,
  ctr: 1.13,
  cpm: 5.11,
};

const fmt = new Intl.NumberFormat("pt-BR");
const money = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v ?? 0);

const derived = {
  cpc: report.linkClicks ? report.spend / report.linkClicks : 0,
  cpe: report.pageEngagement ? report.spend / report.pageEngagement : 0,
  repeats: Math.max(report.impressions - report.reach, 0),
  ctrPct: report.ctr,
  erImp: report.impressions ? (report.pageEngagement / report.impressions) * 100 : 0,
  clickReach: report.reach ? (report.linkClicks / report.reach) * 100 : 0,
  engReach: report.reach ? (report.pageEngagement / report.reach) * 100 : 0,
  freqTarget: 2.5,
};

const deliveryStacked = [{ name: "Entrega", Alcance: report.reach, Repetições: Math.max(report.impressions - report.reach, 0) }];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold leading-tight">Relatório Meta Ads – Oca Projetos</h1>
            <p className="text-xs text-zinc-500">
              {new Date(report.start).toLocaleDateString("pt-BR")} – {new Date(report.end).toLocaleDateString("pt-BR")} • Campanha: <span className="font-medium">{report.campaign}</span>
            </p>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-sm text-zinc-700">Dashboard pronto para deploy.</p>
      </main>
    </div>
  );
}
