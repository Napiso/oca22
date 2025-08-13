import React from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Legend, CartesianGrid, ComposedChart, RadialBarChart, RadialBar, ReferenceLine
} from "recharts";

// ====== Dados atualizados (Oca ads: 15/07/2025 a 13/08/2025) ======
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
  ctr: 1.13, // %
  cpm: 5.11, // BRL
};

// ====== Formatadores ======
const fmt = new Intl.NumberFormat("pt-BR");
const money = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v ?? 0);

// ====== Métricas derivadas ======
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

// ====== Dados para gráficos ======
const deliveryStacked = [{ name: "Entrega", Alcance: report.reach, Repetições: Math.max(report.impressions - report.reach, 0) }];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold leading-tight">Relatório Meta Ads – Oca Projetos</h1>
            <p className="text-xs text-zinc-500">
              {new Date(report.start).toLocaleDateString("pt-BR")} – {new Date(report.end).toLocaleDateString("pt-BR")} • Campanha: <span className="font-medium">{report.campaign}</span>
            </p>
          </div>
          <nav className="hidden md:flex items-center gap-2 text-sm">
            <a href="#resumo" className="px-3 py-1.5 rounded-full hover:bg-zinc-100">Resumo</a>
            <a href="#kpis" className="px-3 py-1.5 rounded-full hover:bg-zinc-100">KPIs</a>
            <a href="#entrega" className="px-3 py-1.5 rounded-full hover:bg-zinc-100">Entrega</a>
            <a href="#eficiencia" className="px-3 py-1.5 rounded-full hover:bg-zinc-100">Eficiência</a>
            <a href="#taxas" className="px-3 py-1.5 rounded-full hover:bg-zinc-100">Taxas</a>
            <a href="#benchmarks" className="px-3 py-1.5 rounded-full hover:bg-zinc-100">Benchmarks</a>
            <a href="#insights" className="px-3 py-1.5 rounded-full hover:bg-zinc-100">Insights</a>
          </nav>
        </div>
      </header>

      {/* Resumo */}
      <section id="resumo" className="max-w-6xl mx-auto px-4 pt-8 pb-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Resumo em linguagem simples</h2>
          <p className="text-sm text-zinc-600">
            Entre {new Date(report.start).toLocaleDateString("pt-BR")} e {new Date(report.end).toLocaleDateString("pt-BR")}, os anúncios alcançaram {fmt.format(report.reach)} pessoas únicas e geraram {fmt.format(report.impressions)} visualizações.
            Foram {fmt.format(report.pageEngagement)} interações (curtidas, comentários etc.) e {fmt.format(report.linkClicks)} cliques no link, com investimento de {money(report.spend)}. Em média, cada pessoa viu o anúncio {report.frequency.toFixed(2)}x.
            O custo para alcançar mil pessoas ficou em {money(report.cpm)}, e {derived.ctrPct.toFixed(2)}% das pessoas que viram clicaram.
          </p>
        </motion.div>
      </section>

      {/* KPIs */}
      <section id="kpis" className="max-w-6xl mx-auto px-4 pb-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Kpi label="Alcance" value={fmt.format(report.reach)} sub="pessoas" />
          <Kpi label="Impressões" value={fmt.format(report.impressions)} />
          <Kpi label="Frequência" value={report.frequency.toFixed(2)} />
          <Kpi label="Investimento" value={money(report.spend)} />
          <Kpi label="Cliques" value={fmt.format(report.linkClicks)} />
          <Kpi label="Engajamentos" value={fmt.format(report.pageEngagement)} />
        </motion.div>
      </section>

      {/* Entrega */}
      <section id="entrega" className="max-w-6xl mx-auto px-4 pb-4">
        <div className="grid md:grid-cols-12 gap-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="md:col-span-7 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-medium mb-2">Impressões vs. Alcance (com repetições)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deliveryStacked} barCategoryGap={32}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(v) => fmt.format(v)} />
                  <Legend />
                  <Bar dataKey="Alcance" stackId="a" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Repetições" stackId="a" fill="#94a3b8" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-zinc-500 mt-2">Repetições = Impressões − Alcance (visualizações além do primeiro contato).</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="md:col-span-5 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-medium mb-2">Frequência vs. meta</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="60%" outerRadius="95%" data={[{ name: "Progresso", value: Math.min((report.frequency / derived.freqTarget) * 100, 100) }]} startAngle={90} endAngle={-270}>
                  <RadialBar background dataKey="value" cornerRadius={16} fill="#0ea5e9" />
                  <Tooltip formatter={(v) => `${Number(v).toFixed(0)}% do alvo`} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm">
              <span className="font-medium">{report.frequency.toFixed(2)}x</span> de <span className="font-medium">{derived.freqTarget.toFixed(1)}x</span> sugeridos para reforçar a mensagem.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Eficiência */}
      <section id="eficiencia" className="max-w-6xl mx-auto px-4 pb-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-medium mb-2">Eficiência de mídia (R$)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { metric: "CPM", value: Number(report.cpm.toFixed(2)) },
                { metric: "CPC", value: Number(derived.cpc.toFixed(2)) },
                { metric: "CPE", value: Number(derived.cpe.toFixed(2)) },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip formatter={(v) => money(Number(v))} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-zinc-500 mt-2">CPM = custo por mil impressões • CPC = custo por clique • CPE = custo por engajamento.</p>
        </motion.div>
      </section>

      {/* Benchmarks */}
      <section id="benchmarks" className="max-w-6xl mx-auto px-4 pb-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-medium mb-2">CTR vs. benchmarks</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={[{ name: "CTR", value: derived.ctrPct }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(v) => `${v}%`} domain={[0, Math.max(2, Math.ceil(Math.max(derived.ctrPct, 1.3) + 1))]} />
                <Tooltip formatter={(v) => `${Number(v).toFixed(2)}%`} />
                <Bar dataKey="value" barSize={48} fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                <ReferenceLine y={1.0} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Base 1.0%", fill: "#52525b", position: "right" }} />
                <ReferenceLine y={1.3} stroke="#22c55e" strokeDasharray="4 4" label={{ value: "Meta 1.3%", fill: "#52525b", position: "right" }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </section>

      {/* Tabela */}
      <section className="max-w-6xl mx-auto px-4 pb-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white rounded-2xl p-6 shadow-sm overflow-x-auto">
          <h3 className="text-sm font-medium mb-2">Tabela de métricas</h3>
          <table className="min-w-full text-sm">
            <thead className="text-left text-zinc-500">
              <tr>
                <th className="py-2 pr-4">Métrica</th>
                <th className="py-2 pr-4">Valor</th>
                <th className="py-2 pr-4">Observação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <Row m="Alcance" v={fmt.format(report.reach)} o="Pessoas únicas impactadas." />
              <Row m="Impressões" v={fmt.format(report.impressions)} o="Total de exibições do anúncio." />
              <Row m="Frequência" v={`${report.frequency.toFixed(2)}x`} o={`Meta sugerida: ${derived.freqTarget.toFixed(1)}x.`} />
              <Row m="Investimento" v={money(report.spend)} o="Total gasto no período." />
              <Row m="CPM" v={money(report.cpm)} o="Custo por mil impressões." />
              <Row m="CPC" v={money(derived.cpc)} o="Custo por clique." />
              <Row m="CPE" v={money(derived.cpe)} o="Custo por engajamento." />
              <Row m="Cliques" v={fmt.format(report.linkClicks)} o="Total de cliques no link." />
              <Row m="Engajamentos" v={fmt.format(report.pageEngagement)} o="Curtidas, comentários, etc." />
              <Row m="CTR" v={`${derived.ctrPct.toFixed(2)}%`} o="Cliques ÷ impressões." />
              <Row m="Eng./Imp." v={`${derived.erImp.toFixed(2)}%`} o="Interações ÷ impressões." />
              <Row m="Cliques/Alc." v={`${derived.clickReach.toFixed(2)}%`} o="Cliques ÷ pessoas alcançadas." />
              <Row m="Eng./Alc." v={`${derived.engReach.toFixed(2)}%`} o="Interações ÷ pessoas alcançadas." />
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* Insights */}
      <section id="insights" className="max-w-6xl mx-auto px-4 pb-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-medium mb-2">Insights práticos</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-700">
            <li><span className="font-medium">CPM competitivo</span> ({money(report.cpm)}): há espaço para <b>escalar orçamento</b> mantendo eficiência.</li>
            <li><span className="font-medium">Frequência</span> em {report.frequency.toFixed(2)}x: subir gradualmente até <b>{derived.freqTarget.toFixed(1)}x</b> com criativos rotativos para evitar saturação.</li>
            <li><span className="font-medium">CTR</span> {derived.ctrPct.toFixed(2)}%: <b>testar variações de criativos</b> (vídeo curto, ganchos claros) para buscar 1.3%+.</li>
            <li><span className="font-medium">CPC ~ {money(derived.cpc)}</span> e <span className="font-medium">CPE ~ {money(derived.cpe)}</span>: otimizar posicionamentos e públicos semelhantes (LAL) de quem engajou.</li>
            <li><span className="font-medium">Remarketing</span>: segmentar quem engajou/visitou para aumentar respostas (DMs, cadastro, visita ao perfil).</li>
          </ul>
        </motion.div>
      </section>

      <footer className="max-w-6xl mx-auto px-4 pb-8 text-center text-xs text-zinc-500">
        Oca Projetos • Relatório Meta Ads • {new Date(report.end).toLocaleDateString("pt-BR")}
      </footer>
    </div>
  );
}

// ====== Componentes auxiliares ======
function Kpi({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-zinc-200 p-4 hover:shadow-sm transition-shadow bg-white">
      <div className="text-xs uppercase tracking-wide text-zinc-500 mb-1">{label}</div>
      <div className="text-2xl font-semibold leading-none">{value}</div>
      {sub ? <div className="text-xs text-zinc-500 mt-1">{sub}</div> : null}
    </div>
  );
}

function Row({ m, v, o }) {
  return (
    <tr>
      <td className="py-2 pr-4 font-medium text-zinc-800">{m}</td>
      <td className="py-2 pr-4">{v}</td>
      <td className="py-2 pr-4 text-zinc-600">{o}</td>
    </tr>
  );
}
