import React, { useState, useMemo } from 'react'
import { TrendingUp, Wallet, Clock, CircleQuestionMark } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'


const FreedomCalc = ({ setActiveTab }) => {
    const [profitPercentage, setProfitPercentage] = useState(60); // Padrão: 60% do total é lucro
    const [fireMonthly, setFireMonthly] = useState(2000)
    const [swr, setSwr] = useState(4) // Safe Withdrawal Rate
    const [showHint, setShowHint] = useState(false)
    const [postFireRate, setPostFireRate] = useState(7); // Rentabilidade esperada na reforma
    const [showTaxInfo, setShowTaxInfo] = useState(false)
    const conservativeNet = fireMonthly * 0.80

    const retirementData = useMemo(() => {
        const data = [];
        let currentBalance = (fireMonthly * 12) / (swr / 100);
        const annualWithdrawal = fireMonthly * 12;

        for (let i = 0; i <= 30; i++) {
            data.push({
                ano: i,
                saldo: Math.round(currentBalance),
                retiradaAcumulada: Math.round(annualWithdrawal * i)
            });
            // O saldo cresce pela taxa, e depois retira-se o valor anual
            currentBalance = (currentBalance * (1 + postFireRate / 100)) - annualWithdrawal;
            // Se o saldo chegar a zero, paramos ou mantemos zero
            if (currentBalance < 0) currentBalance = 0;
        }
        return data;
    }, [fireMonthly, swr, postFireRate])

    {/* Cálculo da duração sem investimento */ }
    const fireTarget = (fireMonthly * 12) / (swr / 100);
    const durationUninvested = Math.floor(fireTarget / (fireMonthly * 12))

    // Cálculo rápido de inflação para a nota (30 anos a 2.5%)
    const futureCost = fireMonthly * Math.pow(1 + 0.025, 30)
    return (
        <div className="space-y-4">

            <div className="space-y-1 text-center md:text-left">
                <h2 className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Calculadora de Independência Financeira</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Coluna de Inputs */}
                <aside className="lg:col-span-5 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-xl space-y-5 text-slate-800">
                        <div className="flex items-center gap-2 font-bold text-slate-900 border-b pb-3">
                            <Wallet size={18} className="text-green-600" />
                            Estilo de Vida
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-500 uppercase italic">
                                    Custo de Vida Mensal Alvo (€)
                                </label>
                                {/* Dica Adaptada para Mobile e Desktop */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowHint(!showHint)}
                                        onMouseEnter={() => setShowHint(true)}
                                        onMouseLeave={() => setShowHint(false)}
                                        className="cursor-help text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-1"
                                    >
                                        <CircleQuestionMark className='h-[12px] w-[12px]' /> O que incluir?
                                    </button>

                                    {/* Tooltip com Animação Scale */}
                                    <div className={`
        absolute left-0 bottom-full mb-2 w-64 p-4 bg-slate-900 text-white text-[11px] rounded-xl shadow-2xl border border-slate-700 z-50 
        transition-all duration-200 origin-bottom-left
        ${showHint ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}
    `}>
                                        <p className="font-bold text-blue-400 mb-2 underline">Média mensal de gastos reais:</p>
                                        <ul className="space-y-1.5 opacity-90">
                                            <li>• Despesas Mensais Fixas * 12</li>
                                            <li>• Seguros (Carro, Vida, Saúde)</li>
                                            <li>• Impostos Anuais (IMI, IUC)</li>
                                            <li>• Manutenção e Férias</li>
                                            <li>• Prendas e Subscrições</li>
                                        </ul>
                                        <div className="mt-2 pt-2 border-t border-slate-700 text-slate-400 italic">
                                            Soma todos os pontos acima e divide por 12.
                                        </div>
                                        {/* Seta para apontar para o botão */}
                                        <div className="absolute -bottom-1 left-4 w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45"></div>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    value={fireMonthly === 0 ? '' : fireMonthly}
                                    onChange={(e) => setFireMonthly(Number(e.target.value))}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none font-bold text-lg"
                                />
                                <p className="text-[10px] text-slate-400 italic">Quanto precisas para viver por mês hoje?</p>
                            </div>

                            <div className="space-y-1 pt-2">

                                <div className="flex justify-between">
                                    <label className="text-xs font-bold text-slate-500 uppercase italic">Taxa de Retirada (SWR)</label>
                                    <span className="text-xs font-bold text-green-600">{swr}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="3"
                                    max="5"
                                    step="0.1"
                                    value={swr}
                                    onChange={(e) => setSwr(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                                />
                                <p className="text-[10px] text-slate-400">
                                    Baseado no <strong>Estudo Trinity</strong>: 4% é a taxa histórica que permite retirar dinheiro por 30+ anos sem esgotar o capital, ajustando à inflação.
                                    No entanto, quanto menor a %, mais seguro é o plano a longo prazo, sendo que um dos objetivos é que a valorização seja sempre superior aos montantes retirados.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-600/10 border border-blue-500/20 p-5 rounded-xl text-center md:text-left">
                        <p className="text-xs text-blue-400 leading-relaxed font-medium">
                            💡 <strong>Regra dos 25:</strong> Com uma taxa de 4%, o teu objetivo é acumular 25x o teu custo de vida anual.
                        </p>
                    </div>
                </aside>

                {/* Coluna de Resultados */}
                <section className="lg:col-span-7 space-y-6">

                    {/* Card do Objetivo - Limpo e Focado */}
                    <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <TrendingUp size={120} />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <div>
                                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Objetivo de Liberdade Financeira</p>
                                <h4 className="text-5xl md:text-7xl font-black text-white mt-2 tracking-tighter">
                                    {Math.round(fireTarget).toLocaleString('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                                </h4>
                                <p className="text-slate-400 text-sm mt-4">
                                    Retirada mensal de <span className="text-white font-medium">{fireMonthly.toLocaleString('pt-PT')}€</span>
                                    <span className="mx-2 text-slate-600">|</span>
                                    Estimativa Líquida: <span className="text-green-400 font-medium">~{Math.round(conservativeNet).toLocaleString('pt-PT')}€</span>
                                </p>
                            </div>

                            {/* Reality Check Discreto */}
                            <div className="pt-4 border-t border-white/5">
                                <p className="text-[11px] text-slate-400">
                                    <span className="text-slate-200 font-bold">Reality Check:</span> Cada +100€ de custo mensal exige mais <span className="text-blue-400">{(100 * 12 / (swr / 100)).toLocaleString('pt-PT', { maximumFractionDigits: 0 })}€</span> no teu objetivo.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Grid de "Contexto" por baixo do card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* Box Inflação - Tom Neutro */}
                        <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
                            <div className="flex gap-3 items-start font-medium">
                                <Clock size={16} className="text-slate-400 shrink-0" />
                                <div>
                                    <p className="text-slate-300 text-xs">Poder de Compra (30 anos)</p>
                                    <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                                        Para manter este estilo de vida com 2.5% de inflação, o valor alvo será de <span className="text-slate-300">{Math.round(futureCost).toLocaleString('pt-PT')}€/mês</span>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Box Risco - Tom de Aviso Suave */}
                        <div className="bg-orange-500/5 p-4 rounded-2xl border border-orange-500/10">
                            <div className="flex gap-3 items-start">
                                <Wallet size={16} className="text-orange-400/80 shrink-0" />
                                <div>
                                    <p className="text-orange-200/80 text-xs font-medium">Risco de Capital Parado</p>
                                    <p className="text-orange-400/80 text-[11px] mt-1 leading-relaxed">
                                        Sem investimento, o montante esgota-se em <span className="text-orange-300 font-bold">{durationUninvested} anos</span>. O retorno é o motor da sustentabilidade.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-[10px] text-slate-500 italic text-center mt-4 italic">
                        * Estimativas baseadas em dados históricos. Não constitui aconselhamento financeiro.
                    </p>

                    {/* Info Extra Dinâmica */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-center">
                            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">Multiplicador de Gastos</p>
                            <p className="text-xl font-bold text-slate-300 mt-1">{Math.round(100 / swr)}x Anual</p>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-center">
                            <p className="text-slate-400 text-[10px] uppercase font-bold">Rendimento Anual Alvo</p>
                            <p className="text-xl font-bold text-slate-300 mt-1">{(fireMonthly * 12).toLocaleString('pt-PT')}€</p>
                        </div>
                        <div
                            className="bg-slate-800/50 border border-orange-500/20 p-4 rounded-xl text-center cursor-help relative group transition-all hover:bg-slate-800"
                            onClick={() => setShowTaxInfo(!showTaxInfo)}
                            onMouseEnter={() => setShowTaxInfo(true)}
                            onMouseLeave={() => setShowTaxInfo(false)}
                        >
                            <p className="text-orange-400 text-[10px] uppercase font-bold tracking-tighter flex justify-center items-center gap-1">
                                Carga Fiscal Est. <CircleQuestionMark size={12} className="opacity-50" />
                            </p>
                            <p className="text-xl font-bold text-orange-500/90 mt-1">
                                - {Math.round(fireMonthly * 0.20).toLocaleString('pt-PT')}€
                            </p>

                            {/* Tooltip Híbrido */}
                            {showTaxInfo && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-4 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200 text-left pointer-events-none md:pointer-events-auto">
                                    <div className="space-y-2">
                                        <p className="text-white font-bold text-xs flex items-center gap-2">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                            A "Fatia" do Estado
                                        </p>
                                        <p className="text-[11px] text-slate-300 leading-relaxed">
                                            Estimamos que precises de reservar cerca de <strong>20% da tua retirada</strong> para impostos.
                                            <br /><br />
                                            Em Portugal, a taxa é de 28%, mas como incide apenas sobre o lucro (mais-valia), o valor real pago sobre o total costuma ser inferior.
                                        </p>
                                        <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                                            <span className="text-[9px] text-slate-500 uppercase font-bold">Baseado em ~70% de Lucro</span>
                                            <span className="text-[9px] text-orange-400 md:hidden italic">Toca para fechar</span>
                                        </div>
                                    </div>
                                    {/* Seta do Balão */}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

            </div>
            {/* Secção de Sustentabilidade Pós-FIRE */}
            <div className="mt-12 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h4 className="text-xl font-bold text-white">Sustentabilidade do Capital</h4>
                        <p className="text-slate-400 text-xs mt-1">Simulação de 30 anos, com retiradas. Utiliza o slider para simular diferentes % de retorno e perceber o impacto no capital.</p>
                    </div>

                    {/* Slider para taxa de retorno na reforma */}
                    <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 min-w-[200px]">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400 mb-2">
                            <span>Taxa Anual (%)</span>
                            <span className="text-blue-400">{postFireRate}%</span>
                        </div>
                        <input
                            type="range" min="1" max="12" step="0.5"
                            value={postFireRate}
                            onChange={(e) => setPostFireRate(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>
                </div>

                <div className="h-[300px] w-full bg-slate-800/30 p-4 rounded-2xl border border-slate-700">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={retirementData}>
                            <defs>
                                <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={postFireRate >= swr ? "#22c55e" : "#ef4444"} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                            <XAxis dataKey="ano" stroke="#64748b" fontSize={10} tick={{ dy: 10 }} label={{ value: 'Anos', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#64748b' }} />
                            <YAxis stroke="#64748b" fontSize={10} tickFormatter={(val) => `${val / 1000}k`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                                formatter={(value) => value.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                            />
                            <Area
                                type="monotone"
                                dataKey="saldo"
                                stroke={postFireRate >= swr ? "#22c55e" : "#ef4444"}
                                fillOpacity={1}
                                fill="url(#colorSaldo)"
                                strokeWidth={3}
                                name="Saldo de Capital"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <p className="text-center text-[10px] text-slate-400 italic">
                    {postFireRate > swr
                        ? "✅ O teu retorno é superior à tua retirada. O teu património é perpétuo e continuará a crescer."
                        : "⚠️ Atenção: O teu retorno é inferior ou igual à retirada. O capital poderá esgotar-se a longo prazo."}
                </p>
            </div>

            {/* CTA para o Simulador */}
            <div className="flex flex-col items-center gap-3 pt-6 border-t border-slate-800">
                <p className="text-slate-400 text-sm">Pronto para traçar o plano?</p>
                <button
                    onClick={() => setActiveTab('compound')}
                    className="cursor-pointer px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-base transition-all shadow-lg shadow-blue-900/40 active:scale-95"
                >
                    Simulador de Aportes
                </button>
            </div>
        </div>
    )
}

export default FreedomCalc