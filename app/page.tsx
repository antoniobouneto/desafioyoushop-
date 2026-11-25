"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Coins,
  CreditCard,
  Eye,
  Home,
  Menu,
  MousePointer2,
  PackageCheck,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
  X,
  Zap,
} from "lucide-react";

type Period = "7 dias" | "30 dias";
type IconType = typeof Home;

const formatMoney = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const navLinks: { label: string; icon: IconType; href: string }[] = [
  { label: "Visão geral", icon: Home, href: "#overview" },
  { label: "Meus ganhos", icon: Wallet, href: "#balances" },
  { label: "Performance", icon: Activity, href: "#performance" },
  { label: "Simulador", icon: TrendingUp, href: "#simulator" },
  { label: "Consistência", icon: Target, href: "#consistency" },
];

const weekSeries = [
  { label: "Seg", value: 116 },
  { label: "Ter", value: 148 },
  { label: "Qua", value: 132 },
  { label: "Qui", value: 192 },
  { label: "Sex", value: 176 },
  { label: "Sáb", value: 238 },
  { label: "Dom", value: 204 },
];

const monthSeries = [
  { label: "1 nov", value: 108 },
  { label: "4 nov", value: 142 },
  { label: "7 nov", value: 121 },
  { label: "10 nov", value: 186 },
  { label: "13 nov", value: 158 },
  { label: "16 nov", value: 223 },
  { label: "19 nov", value: 194 },
  { label: "22 nov", value: 261 },
  { label: "25 nov", value: 232 },
];

function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const [active, setActive] = useState("Visão geral");

  return (
    <>
      {mobileOpen && <button className="sidebar-scrim" aria-label="Fechar menu" onClick={onClose} />}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark"><span /></div>
          <div className="brand-word">rastro<span>.</span><small>PAINEL DO CREATOR</small></div>
          <button className="icon-button sidebar-close" onClick={onClose} aria-label="Fechar menu"><X size={18} /></button>
        </div>

        <div className="workspace-switch">
          <div className="avatar avatar-small">AB</div>
          <div className="workspace-copy"><strong>Antonio B.</strong><span>Creator · conta demo</span></div>
          <ChevronDown size={15} className="muted-icon" />
        </div>

        <p className="nav-caption">MENU PRINCIPAL</p>
        <nav className="side-nav" aria-label="Navegação principal">
          {navLinks.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              className={`nav-link ${active === label ? "nav-link-active" : ""}`}
              onClick={() => { setActive(label); onClose(); }}
            >
              <Icon size={18} strokeWidth={1.9} />
              <span>{label}</span>
              {label === "Consistência" && <span className="nav-dot" />}
            </a>
          ))}
        </nav>

        <div className="sidebar-spacer" />
        <div className="help-card">
          <div className="help-icon"><CircleHelp size={17} /></div>
          <strong>Precisa de ajuda?</strong>
          <p>Entenda como ler seu saldo e suas projeções.</p>
          <button onClick={() => window.alert("Central de ajuda demonstrativa")}>Acessar central <ArrowRight size={14} /></button>
        </div>
        <div className="sidebar-bottom">
          <a className="nav-link" href="#settings"><Settings2 size={18} /><span>Configurações</span></a>
          <div className="user-row">
            <div className="avatar">AB</div>
            <div className="workspace-copy"><strong>Antonio Boucinhas</strong><span>Plano demonstrativo</span></div>
            <ChevronRight size={15} className="muted-icon" />
          </div>
        </div>
      </aside>
    </>
  );
}

function PerformanceChart({ period }: { period: Period }) {
  const series = period === "7 dias" ? weekSeries : monthSeries;
  const width = 690;
  const height = 228;
  const left = 48;
  const right = 14;
  const top = 16;
  const bottom = 34;
  const max = 320;
  const points = series.map((point, index) => ({
    x: left + (index * (width - left - right)) / Math.max(series.length - 1, 1),
    y: top + ((max - point.value) / max) * (height - top - bottom),
    ...point,
  }));
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ");
  const area = `${line} L${points[points.length - 1].x},${height - bottom} L${points[0].x},${height - bottom} Z`;
  const gridValues = [0, 100, 200, 300];

  return (
    <svg className="performance-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Comissão demonstrativa nos últimos ${period}`}>
      <defs>
        <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#9CE800" stopOpacity=".24" />
          <stop offset="100%" stopColor="#9CE800" stopOpacity="0" />
        </linearGradient>
      </defs>
      {gridValues.map((value) => {
        const y = top + ((max - value) / max) * (height - top - bottom);
        return (
          <g key={value}>
            <line x1={left} x2={width - right} y1={y} y2={y} className="chart-grid" />
            <text x={left - 10} y={y + 4} textAnchor="end" className="chart-axis">{value === 0 ? "0" : `${value}`}</text>
          </g>
        );
      })}
      <path d={area} fill="url(#chartFill)" />
      <path d={line} className="chart-line" />
      {points.map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="5.5" className="chart-point-halo" />
          <circle cx={point.x} cy={point.y} r="3" className="chart-point" />
          <text x={point.x} y={height - 10} textAnchor="middle" className="chart-axis">{point.label}</text>
        </g>
      ))}
    </svg>
  );
}

function StatCard({
  eyebrow,
  value,
  note,
  icon: Icon,
  iconClass,
  change,
}: {
  eyebrow: string;
  value: string;
  note: string;
  icon: IconType;
  iconClass: string;
  change?: string;
}) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span className="stat-eyebrow">{eyebrow}</span>
        <span className={`stat-icon ${iconClass}`}><Icon size={18} strokeWidth={2} /></span>
      </div>
      <div className="stat-value-row"><strong>{value}</strong>{change && <span className="stat-change"><ArrowUpRight size={13} /> {change}</span>}</div>
      <p className="stat-note">{note}</p>
    </article>
  );
}

export default function DashboardPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [period, setPeriod] = useState<Period>("7 dias");
  const [clicks, setClicks] = useState(1000);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const projections = useMemo(() => {
    const commission = 48;
    return [
      { name: "Conservador", conversion: 0.015, color: "scenario-muted" },
      { name: "Realista", conversion: 0.025, color: "scenario-primary" },
      { name: "Otimista", conversion: 0.0375, color: "scenario-light" },
    ].map((scenario) => ({
      ...scenario,
      value: clicks * scenario.conversion * commission * 3,
      sales: Math.round(clicks * scenario.conversion),
    }));
  }, [clicks]);

  const today = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date());

  return (
    <div className="app-shell">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main className="main-panel" id="overview">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"><Menu size={21} /></button>
            <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>Visão geral</strong></div>
          </div>
          <div className="topbar-actions">
            <span className="today-label"><CalendarDays size={15} /> {today}</span>
            <div className="top-action-wrap">
              <button className={`top-action ${searchOpen ? "top-action-active" : ""}`} aria-label="Pesquisar" onClick={() => setSearchOpen((value) => !value)}><Search size={18} /></button>
              {searchOpen && <div className="popover search-popover"><strong>Pesquisar no Rastro</strong><input autoFocus placeholder="Ex.: saldo, comissão..." aria-label="Pesquisar" /></div>}
            </div>
            <div className="top-action-wrap">
              <button className={`top-action notification-action ${showNotifications ? "top-action-active" : ""}`} aria-label="Notificações" onClick={() => setShowNotifications((value) => !value)}><Bell size={18} /><i /></button>
              {showNotifications && <div className="popover notification-popover"><div className="popover-heading"><strong>Notificações</strong><span>DEMO</span></div><p><Clock3 size={15} /> R$ 180 demonstrativos previstos para liberação em 28/11.</p><p><Target size={15} /> Sua meta ilustrativa da semana está 75% concluída.</p></div>}
            </div>
            <div className="avatar avatar-top">AB</div>
          </div>
        </header>

        <div className="page-content">
          <div className="demo-banner"><span className="demo-dot" /><strong>AMBIENTE DE DEMONSTRAÇÃO</strong><span>Todos os valores e dados desta tela são fictícios e não representam resultados da YouShop.</span><ShieldCheck size={16} className="demo-shield" /></div>

          <section className="welcome-row">
            <div>
              <div className="welcome-overline"><span className="mini-spark"><Sparkles size={13} /></span> SEU ESPAÇO, SEU RASTRO</div>
              <h1>Bom dia, Antonio <span>—</span></h1>
              <p>Acompanhe seus ganhos e planeje seus próximos passos com clareza.</p>
            </div>
            <button className="outline-button" onClick={() => document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" })}><TrendingUp size={16} /> Simular ganhos</button>
          </section>

          <section className="stats-grid" id="balances" aria-label="Resumo de ganhos demonstrativos">
            <StatCard eyebrow="GANHOS ACUMULADOS · DEMO" value="R$ 1.240" note="Comissões e bônus ilustrativos" icon={Coins} iconClass="icon-lime" change="12,8%" />
            <StatCard eyebrow="DISPONÍVEL PARA SAQUE · DEMO" value="R$ 760" note="Valor demonstrativo disponível" icon={Wallet} iconClass="icon-blue" />
            <StatCard eyebrow="EM GARANTIA · DEMO" value="R$ 480" note="Liberação ilustrativa entre 28 nov — 01 dez" icon={Clock3} iconClass="icon-gold" />
            <StatCard eyebrow="CLIQUES NO PERÍODO · DEMO" value="2.846" note="Cliques ilustrativos nos últimos 7 dias" icon={MousePointer2} iconClass="icon-violet" change="8,4%" />
          </section>

          <section className="content-grid main-grid" id="performance">
            <article className="panel chart-panel">
              <div className="panel-heading">
                <div><div className="panel-kicker">ACOMPANHAMENTO · DEMO</div><h2>Performance do período</h2><p>Comissões ilustrativas ao longo do tempo</p></div>
                <div className="period-control">
                  <button className="period-button" onClick={() => setPeriod((current) => current === "7 dias" ? "30 dias" : "7 dias")}><CalendarDays size={15} /> Últimos {period} <ChevronDown size={14} /></button>
                </div>
              </div>
              <div className="chart-legend"><span><i className="legend-line" /> Comissões estimadas</span><span className="chart-sum">{period === "7 dias" ? "R$ 1.206" : "R$ 5.842"} <small>no período</small></span></div>
              <PerformanceChart period={period} />
              <div className="chart-footnote"><span><i className="legend-dot" /> Série fictícia de demonstração</span><span>Valores em R$</span></div>
            </article>

            <article className="panel balance-panel">
              <div className="panel-heading panel-heading-tight"><div><div className="panel-kicker">VISÃO DO SALDO · DEMO</div><h2>Seus ganhos</h2></div><button className="more-button" aria-label="Mais opções"><span /><span /><span /></button></div>
              <div className="balance-main"><span>Saldo total demonstrativo</span><strong>R$ 1.240,00</strong><div className="balance-caption"><Eye size={14} /> Exibição ilustrativa</div></div>
              <div className="balance-divider" />
              <div className="balance-row"><span><i className="balance-status available" /> Disponível</span><strong>R$ 760,00</strong></div>
              <div className="balance-row"><span><i className="balance-status pending" /> Em garantia</span><strong>R$ 480,00</strong></div>
              <div className="release-box"><div className="release-icon"><CalendarDays size={17} /></div><div><strong>Próxima liberação ilustrativa</strong><span>28 nov · exemplo de agenda</span></div><span className="release-amount">R$ 180</span></div>
              <button className="primary-button full-width" onClick={() => window.alert("Ação demonstrativa: sem saque real configurado.")}><ArrowDownToLine size={16} /> Solicitar saque <span>· demo</span></button>
            </article>
          </section>

          <section className="content-grid lower-grid">
            <article className="panel simulator-panel" id="simulator">
              <div className="panel-heading simulator-heading">
                <div><div className="panel-kicker">SIMULADOR HONESTO · DEMO</div><h2>Explore cenários possíveis</h2><p>Altere os cliques mensais e veja como as premissas mudam o exemplo.</p></div>
                <div className="simulator-mark"><TrendingUp size={18} /></div>
              </div>
              <div className="input-card">
                <div className="input-copy"><div className="input-label"><MousePointer2 size={15} /> Cliques estimados por mês</div><span>Exemplo de entrada</span></div>
                <div className="click-input-wrap"><input type="number" min="100" max="10000" step="100" value={clicks} onChange={(event) => setClicks(Math.min(10000, Math.max(100, Number(event.target.value) || 100)))} aria-label="Cliques estimados por mês" /><span>cliques/mês</span></div>
                <input className="range-input" type="range" min="100" max="10000" step="100" value={clicks} onChange={(event) => setClicks(Number(event.target.value))} aria-label="Ajustar cliques estimados" style={{ "--range-progress": `${((clicks - 100) / 9900) * 100}%` } as React.CSSProperties} />
                <div className="range-labels"><span>100</span><span>10.000</span></div>
              </div>
              <div className="scenario-row">
                {projections.map((scenario) => (
                  <div className={`scenario-card ${scenario.color}`} key={scenario.name}>
                    <div className="scenario-top"><span>{scenario.name}</span>{scenario.name === "Realista" && <span className="recommended">BASE</span>}</div>
                    <strong>{formatMoney(scenario.value)}</strong>
                    <span className="scenario-period">em 90 dias · ilustração</span>
                    <div className="scenario-details"><span>{(scenario.conversion * 100).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}% conv.</span><span>~{scenario.sales} vendas/mês</span></div>
                  </div>
                ))}
              </div>
              <div className="assumption-note"><ShieldCheck size={15} /><span><strong>Premissas do exemplo:</strong> comissão fixa de R$ 48 por venda, conversão de 1,5% / 2,5% / 3,75%, cliques mensais constantes. Não é previsão, promessa de renda nem dado da YouShop.</span></div>
            </article>

            <article className="panel consistency-panel" id="consistency">
              <div className="panel-heading panel-heading-tight"><div><div className="panel-kicker">TRILHA DE CONSISTÊNCIA · DEMO</div><h2>Pequenos passos, no seu ritmo</h2></div><div className="streak-icon"><Zap size={17} fill="currentColor" /></div></div>
              <div className="goal-summary"><div><span>Meta ilustrativa da semana</span><strong>3 de 4 vendas válidas</strong></div><span className="goal-progress-number">75%</span></div>
              <div className="progress-track"><div className="progress-fill" /></div>
              <div className="goal-meta"><span><Check size={14} /> Atualizado hoje · dado fictício</span><span>1 venda para concluir</span></div>
              <div className="reward-card"><div className="reward-icon"><Sparkles size={17} /></div><div className="reward-copy"><strong>Recompensa de exemplo</strong><span>Bônus ilustrativo após vendas válidas, sem estorno e conforme regras da campanha.</span></div><div className="reward-amount">+R$ 60<small>DEMO</small></div></div>
              <div className="consistency-footer"><span><ShieldCheck size={14} /> Alertas opcionais</span><button onClick={() => window.alert("Configuração demonstrativa. Nenhum alerta será enviado.")}>Ver regras <ArrowRight size={14} /></button></div>
            </article>
          </section>

          <section className="panel activity-panel" id="activity">
            <div className="panel-heading activity-heading"><div><div className="panel-kicker">MOVIMENTAÇÕES · DEMO</div><h2>Atividade recente</h2><p>Exemplos de lançamentos no extrato</p></div><button className="text-button" onClick={() => window.alert("Extrato demonstrativo completo")}>Ver extrato completo <ArrowRight size={15} /></button></div>
            <div className="activity-list">
              <div className="activity-item"><div className="activity-kind kind-sale"><ShoppingBag size={17} /></div><div className="activity-copy"><strong>Comissão · Kit Skincare Glow</strong><span>Venda aprovada · há 2 horas · item demonstrativo</span></div><span className="activity-status status-ok"><Check size={12} /> Validada</span><strong className="activity-value">+ R$ 48,00</strong><ChevronRight size={16} className="activity-chevron" /></div>
              <div className="activity-item"><div className="activity-kind kind-pending"><Clock3 size={17} /></div><div className="activity-copy"><strong>Comissão · Garrafa Térmica Urban</strong><span>Em período de garantia · liberação demonstrativa em 28 nov</span></div><span className="activity-status status-pending">Em garantia</span><strong className="activity-value">+ R$ 32,00</strong><ChevronRight size={16} className="activity-chevron" /></div>
              <div className="activity-item"><div className="activity-kind kind-bonus"><Sparkles size={17} /></div><div className="activity-copy"><strong>Bônus de consistência · exemplo</strong><span>Campanha demonstrativa · meta concluída</span></div><span className="activity-status status-ok"><Check size={12} /> Validada</span><strong className="activity-value">+ R$ 60,00</strong><ChevronRight size={16} className="activity-chevron" /></div>
            </div>
          </section>

          <footer className="page-footer"><div><span className="footer-mark">r<span>.</span></span><span>Rastro <i>·</i> Você no controle</span></div><span>Protótipo conceitual · dados ilustrativos · 2026</span><a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Voltar ao início <ArrowUpRight size={13} /></a></footer>
        </div>
      </main>
    </div>
  );
}
