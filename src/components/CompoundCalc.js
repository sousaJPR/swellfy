import { useState, useMemo } from "react"
import { calculateCompoundInterest } from '@/lib/math'
import { TrendingUp, Settings2 } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CompoundCalc = () => {

    const [years, setYears] = useState(10)
    const [initialValue, setInitialValue] = useState(1000)
    const [monthly, setMonthly] = useState(100)
    const [rate, setRate] = useState(8)
    const totalFinal = calculateCompoundInterest(initialValue, monthly, rate, years);
    const totalInvested = initialValue + (monthly * 12 * years)
    const totalProfit = totalFinal - totalInvested

    const chartData = useMemo(() => {
        const data = [];
        for (let i = 0; i <= years; i++) {
            const valueAtYear = calculateCompoundInterest(initialValue, monthly, rate, i);
            const investedAtYear = initialValue + (monthly * 12 * i);
            data.push({
                ano: i,
                total: Math.round(valueAtYear),
                investido: Math.round(investedAtYear),
            });
        }
        return data
    }, [years, initialValue, monthly, rate])
    return (
        <div className="space-y-4">
            <div className='text-center md:text-left'>
                <h2 className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Calculadora de Juros Compostos</h2>
            </div>
            {/* Card de Património (Hero) */}
            <div className="bg-linear-to-br from-blue-600 to-blue-900 rounded-2xl p-6 md:p-10 text-white shadow-2xl">
                <p className="text-blue-100 text-xs uppercase tracking-[0.2em] font-bold opacity-80">Património Estimado</p>
                <h2 className="text-4xl md:text-6xl font-black mt-2 tracking-tight">
                    {totalFinal.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-6 border-t border-blue-400/30 pt-4">
                    <div>
                        <p className="text-[10px] uppercase text-blue-200 font-bold">Total Investido</p>
                        <p className="text-lg md:text-2xl font-bold">
                            {totalInvested.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase text-blue-200 font-bold">Lucro de Juros</p>
                        <p className="text-lg md:text-2xl font-bold text-green-300">
                            + {totalProfit.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Area: Lado a Lado no Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Coluna da Esquerda: Inputs (4 colunas de 12) */}
                <aside className="md:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-5 text-slate-800">
                        <div className="flex items-center gap-2 font-bold text-slate-900 border-b pb-3">
                            <Settings2 size={18} className="text-blue-600" />
                            Configurações
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Capital Inicial</label>
                                <input type="number" value={initialValue} onChange={(e) => setInitialValue(Number(e.target.value))}
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Aporte Mensal</label>
                                <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))}
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Tempo</label>
                                    <span className="text-xs font-bold text-blue-600">{years} anos</span>
                                </div>
                                <input type="range" min="1" max="40" value={years} onChange={(e) => setYears(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase">Taxa Anual (%)</label>
                                <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Coluna da Direita: Gráfico (8 colunas de 12) */}
                <section className="md:col-span-8 bg-slate-800 p-4 md:p-6 rounded-2xl border border-slate-700 shadow-inner flex flex-col min-h-[400px]">
                    <h3 className="text-[10px] font-bold mb-6 text-slate-400 flex items-center gap-2 uppercase tracking-widest">
                        <TrendingUp size={14} /> Curva de Crescimento
                    </h3>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                                <XAxis dataKey="ano" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tick={{ dy: 10 }} />
                                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                                <Tooltip
                                    formatter={(value) => value.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="total" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTotal)" strokeWidth={3} />
                                <Area type="monotone" dataKey="investido" stroke="#64748b" fill="transparent" strokeDasharray="4 4" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default CompoundCalc