import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend
} from 'recharts';
import {
  TrendingUp, TrendingDown, DollarSign, AlertCircle, AlertTriangle,
  CheckCircle2, Minus, BellRing
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { generalInfo, kpiData, monthlyFinances, departmentPerformance, activeAlerts } from '@/data/mockData';
import { motion } from 'framer-motion';

// Logic for Semáforo based on inverse logic
const getTrafficLightColor = (value, target, inverse) => {
  const ratio = inverse ? target / value : value / target;
  if (ratio >= 1.0) return 'green'; // Reached or exceeded good target
  if (ratio >= 0.85) return 'yellow'; // Warning zone
  return 'red'; // Critical
};

const formatCurrency = (value) => 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(value);

const formatNumber = (value, isCurrency, suffix) => {
  if (isCurrency) return formatCurrency(value);
  return `${value}${suffix || ''}`;
};

export default function ExecutiveDashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-8 font-sans text-zinc-900 dark:text-zinc-50">
      
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bom dia, {generalInfo.greeting}.</h1>
          <p className="text-muted-foreground mt-1">Aqui está o resumo executivo ({generalInfo.date}).</p>
        </div>
        <div className="flex gap-4">
          <Card className="shadow-none border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-900/50">
            <CardContent className="p-4 flex flex-col justify-center items-end">
              <span className="text-xs font-semibold text-green-700 dark:text-green-500 uppercase tracking-widest">Caixa Atual</span>
              <span className="text-2xl font-black text-green-700 dark:text-green-400">{formatCurrency(generalInfo.balance)}</span>
            </CardContent>
          </Card>
          <Card className="shadow-none hidden md:block border-zinc-200 dark:border-zinc-800">
            <CardContent className="p-4 flex flex-col justify-center items-end">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Receita Mês</span>
              <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">{formatCurrency(generalInfo.monthlyRevenue)}</span>
            </CardContent>
          </Card>
        </div>
      </header>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {kpiData.map((kpi, idx) => {
          const colorObj = getTrafficLightColor(kpi.value, kpi.target, kpi.inverseLogic);
          
          let colorClasses = "";
          let Icon = Minus;

          if (colorObj === 'green') {
            colorClasses = "text-green-600 bg-green-100 dark:bg-green-900/40 dark:text-green-400 border-green-200 dark:border-green-800";
            Icon = TrendingUp;
          } else if (colorObj === 'yellow') {
            colorClasses = "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/40 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
            Icon = Minus;
          } else {
            colorClasses = "text-red-600 bg-red-100 dark:bg-red-900/40 dark:text-red-400 border-red-200 dark:border-red-800";
            Icon = TrendingDown;
          }

          return (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} key={kpi.title}>
              <Card className={cn("h-full border transition-all hover:shadow-md", colorClasses.includes('red') ? 'border-red-200 dark:border-red-900' : '')}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {kpi.title}
                  </CardTitle>
                  <div className={cn("p-1.5 rounded-full", colorClasses)}>
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={cn("text-2xl font-bold", colorClasses.split(' ')[0], colorClasses.split(' ')[3])}>
                    {formatNumber(kpi.value, kpi.currency, kpi.suffix)}
                  </div>
                  <p className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">
                    {kpi.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Main Charts */}
        <div className="col-span-1 xl:col-span-2 flex flex-col gap-6">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Histórico de Desempenho (6 meses)</CardTitle>
              <CardDescription>Comparativo de Receita Bruta vs Despesas Operacionais</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyFinances} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-zinc-800" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} dy={10} />
                  <YAxis tickFormatter={(val) => `R$${val/1000}k`} axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)} 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="top" height={36}/>
                  <Area type="monotone" dataKey="revenue" name="Receita" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="expenses" name="Despesas" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eficiência por Departamento</CardTitle>
              <CardDescription>Baseado na entrega vs custo de orçamento (%)</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] pb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentPerformance} layout="vertical" margin={{ top: 20, right: 20, left: 100, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#e5e7eb" className="dark:stroke-zinc-800" />
                  <XAxis 
                    type="number" 
                    orientation="top"
                    domain={[0, 125]}
                    ticks={[0, 25, 50, 75, 100, 125]} 
                    tickFormatter={(val) => `${val}%`}
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#6b7280', fontSize: 12}} 
                  />
                  <YAxis dataKey="department" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontWeight: 500}} />
                  <Tooltip 
                    formatter={(val) => `${val}%`} 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="efficiency" radius={[0, 4, 4, 0]} barSize={24}>
                    {departmentPerformance.map((entry, index) => {
                      let fill = '#16a34a'; // Green
                      if (entry.efficiency < 85) fill = '#dc2626'; // Red
                      else if (entry.efficiency < 100) fill = '#facc15'; // Yellow (lighter: yellow-400)
                      return <Cell key={`cell-${index}`} fill={fill} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        </div>

        {/* Alerts Panel Sidebar */}
        <div className="col-span-1 xl:col-span-1">
          <Card className="h-full border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col">
            <CardHeader className="bg-zinc-100/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
                <BellRing className="w-5 h-5 text-zinc-500" />
                <CardTitle>Painel de Alertas</CardTitle>
              </div>
              <CardDescription>Ordem de severidade para ação imediata.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex-1 overflow-auto">
              <div className="space-y-4">
                {activeAlerts.map((alert) => {
                  let alertClasses = "";
                  let Icon = AlertCircle;
                  if (alert.severity === 'critical') {
                    alertClasses = "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900/50";
                    Icon = AlertCircle;
                  } else if (alert.severity === 'warning') {
                    alertClasses = "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-900/50";
                    Icon = AlertTriangle;
                  } else {
                    alertClasses = "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900/50";
                    Icon = CheckCircle2;
                  }

                  return (
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      key={alert.id} 
                      className={cn("p-4 rounded-lg border", alertClasses)}
                    >
                      <div className="flex gap-3">
                        <div className={cn("mt-0.5", 
                          alert.severity === 'critical' ? 'text-red-600 dark:text-red-500' :
                          alert.severity === 'warning' ? 'text-yellow-600 dark:text-yellow-500' :
                          'text-green-600 dark:text-green-500'
                        )}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className={cn("font-semibold text-sm", 
                             alert.severity === 'critical' ? 'text-red-900 dark:text-red-200' :
                             alert.severity === 'warning' ? 'text-yellow-900 dark:text-yellow-200' :
                             'text-green-900 dark:text-green-200'
                          )}>{alert.title}</h4>
                          <p className="text-sm mt-1 text-zinc-700 dark:text-zinc-300">
                            {alert.message}
                          </p>
                          <span className="text-xs font-medium opacity-60 mt-2 block w-full text-right">{alert.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
