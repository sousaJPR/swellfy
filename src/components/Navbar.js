import React from 'react'
import { TrendingUp, Unlock, LineChart } from 'lucide-react'

const Navbar = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="sticky top-0 z-20 bg-slate-800/90 backdrop-blur-md border-b border-slate-700 px-4 sm:px-12 py-2 flex justify-between items-center gap-6">
            <div>
                <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    <TrendingUp className="text-blue-500" /> Financial <span className="text-blue-500">Pilot</span>
                </h1>
            </div>
            <div className='flex gap-2'>

                {/* Tab Comparador */}
                <div className="relative group">
                    <button
                        onClick={() => setActiveTab('freedom')}
                        className={`cursor-pointer p-3 rounded-xl transition-all ${activeTab === 'freedom' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                    >
                        <Unlock size={22} />
                    </button>
                    {/* Tooltip personalizado */}
                    <span className="absolute -bottom-10 right-0 scale-0 group-hover:scale-100 transition-all bg-slate-700 text-white text-[10px] font-bold py-1 px-3 rounded shadow-lg uppercase tracking-widest whitespace-nowrap pointer-events-none origin-left">
                        Liberdade Financeira
                    </span>
                </div>

                {/* Tab Simulador */}
                <div className="relative group">
                    <button
                        onClick={() => setActiveTab('compound')}
                        className={`cursor-pointer p-3 rounded-xl transition-all ${activeTab === 'compound' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                    >
                        <LineChart size={22} />
                    </button>
                    {/* Tooltip personalizado */}
                    <span className="absolute -bottom-10 right-0 scale-0 group-hover:scale-100 transition-all bg-slate-700 text-white text-[10px] font-bold py-1 px-3 rounded shadow-lg uppercase tracking-widest whitespace-nowrap pointer-events-none origin-left">
                        Juros Compostos
                    </span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar