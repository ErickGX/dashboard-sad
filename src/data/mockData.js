export const generalInfo = {
  greeting: "Erick",
  date: new Date().toLocaleDateString("pt-BR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  balance: 1420500.00,
  monthlyRevenue: 345000.00,
};

export const kpiData = [
  {
    title: "Receita Recorrente Mensal",
    value: 285400,
    target: 250000,
    currency: true,
    inverseLogic: false, // Bigger is better
    description: "+14.1% em relação à meta"
  },
  {
    title: "Custo de Aquisição de Clientes",
    value: 1250,
    target: 800,
    currency: true,
    inverseLogic: true, // Smaller is better. 1250 is > 800, so it's bad (Red)
    description: "Custo superando teto projetado"
  },
  {
    title: "Taxa de Cancelamento",
    value: 4.2,
    suffix: "%",
    target: 3.5, // 3.5 to 5.0 is warning, > 5.0 is bad? Let's say <3.5 is Green, >4.0 is Red
    inverseLogic: true,
    description: "Oscilação em contas Enterprise"
  },
  {
    title: "Lifetime Value",
    value: 29500,
    target: 28000,
    currency: true,
    inverseLogic: false, // Bigger is better
    description: "Estável, clientes retidos"
  },
  {
    title: "Margem Lucrativa",
    value: 18.5,
    suffix: "%",
    target: 20, // 18.5 is close to 20, maybe yellow?
    inverseLogic: false,
    description: "Atenção: Queda nos custos fixos requerida"
  }
];

export const monthlyFinances = [
  { month: "Dez", revenue: 210000, expenses: 150000, margin: 60000 },
  { month: "Jan", revenue: 230000, expenses: 165000, margin: 65000 },
  { month: "Fev", revenue: 260000, expenses: 170000, margin: 90000 },
  { month: "Mar", revenue: 310000, expenses: 200000, margin: 110000 },
  { month: "Abr", revenue: 290000, expenses: 220000, margin: 70000 },
  { month: "Mai", revenue: 345000, expenses: 280000, margin: 65000 },
];

export const departmentPerformance = [
  { department: "Vendas", efficiency: 110 },
  { department: "Produto", efficiency: 95 },
  { department: "Tech / TI", efficiency: 88 }, // yellow/red
  { department: "Marketing", efficiency: 75 },  // red
  { department: "CS", efficiency: 105 },
];

// Severity: critical (🔴), warning (🟡), info (🟢)
export const activeAlerts = [
  {
    id: 1,
    severity: "critical",
    title: "Burn rate elevado em Marketing",
    message: "Gasto com Mídia Paga excedeu orçamento em R$ 45k sem retorno proporcional em MQLs.",
    time: "Hoje, 10:45"
  },
  {
    id: 2,
    severity: "critical",
    title: "Risco de cancelamento : Cliente Top 10",
    message: "OrsCorp S.A não abre a plataforma há 14 dias. Contrato encerra em 2 meses.",
    time: "Hoje, 09:15"
  },
  {
    id: 3,
    severity: "warning",
    title: "Atraso no Relatórios AWS",
    message: "Custo de infraestrutura não foi consolidado. Risco de faturamento inconsistente.",
    time: "Ontem, 16:30"
  },
  {
    id: 4,
    severity: "warning",
    title: "Equipe de Eng. Ociosa (Sêniors)",
    message: "Atraso na liberação das specs do módulo de RH bloqueou 3 devs seniores.",
    time: "Ontem, 11:20"
  },
  {
    id: 5,
    severity: "info",
    title: "Nova Certificação",
    message: "Auditoria SOC2 completada sem ressalvas graves.",
    time: "Segunda-feira"
  }
];
