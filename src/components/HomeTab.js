import React from 'react'
import { Flame, ArrowRight, TrendingUp, CheckCircle } from 'lucide-react'

const HomeTab = ({ setActiveTab }) => {
    return (
        <div className="space-y-16 py-8 animate-in fade-in duration-700">

            {/* Hero Section */}
            <section className="text-center space-y-6 max-w-2xl mx-auto">
                <div className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3">
                        <h1 className="py-3 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600 text-7xl md:text-8xl drop-shadow-2xl">
                            Swellfy
                        </h1>
                        <span className="text-5xl md:text-7xl">🌊</span>
                    </div>
                </div>

                <div className="space-y-4 max-w-xl mx-auto mt-4">
                    <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed">
                        Simuladores intuitivos criados para <span className="text-blue-400">simplificar</span> a tua jornada financeira.
                    </p>

                    <div className="px-4 flex flex-row items-center justify-center gap-4 text-slate-400 text-sm md:text-base italic">
                        <span className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-blue-500" /> Sem tabelas densas
                        </span>
                        <span className="hidden md:block opacity-20">|</span>
                        <span className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-blue-500" /> Literacia prática
                        </span>
                        <span className="hidden md:block opacity-20">|</span>
                        <span className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-blue-500" /> Visão de longo prazo
                        </span>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <button
                        onClick={() => setActiveTab('freedom')}
                        className="cursor-pointer px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-900/40 active:scale-95"
                    >
                        Calcular Meta FIRE
                    </button>
                    <button
                        onClick={() => setActiveTab('compound')}
                        className="cursor-pointer px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-full font-bold transition-all active:scale-95"
                    >
                        Simular Juros Compostos
                    </button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                {/* Feature 1: FIRE */}
                <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl hover:border-blue-500/30 transition-colors group">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                        <Flame size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Calculadora FIRE</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        Descobre o teu "Número da Liberdade" baseado no teu custo de vida mensal. Simula as várias % de retirada e verifica também a "saúde" desse objetivo, percebendo se o estás a drenar ou se ele continuará a crescer.
                    </p>
                    <button
                        onClick={() => setActiveTab('freedom')}
                        className="cursor-pointer text-blue-400 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        Explorar Meta <ArrowRight size={16} />
                    </button>
                </div>

                {/* Feature 2: Compound Interest */}
                <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl hover:border-green-500/30 transition-colors group">
                    <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                        <TrendingUp size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Juros Compostos</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        Visualiza o poder do tempo sobre o teu dinheiro. Simula aportes mensais, taxas de retorno e vê os teus "Milestones" de crescimento ao longo das décadas.
                    </p>
                    <button
                        onClick={() => setActiveTab('compound')}
                        className="cursor-pointer text-green-400 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                    >
                        Simular Agora <ArrowRight size={16} />
                    </button>
                </div>
            </section>
        </div>
    )
}

export default HomeTab