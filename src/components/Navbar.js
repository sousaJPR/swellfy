import React from 'react'
import { TrendingUp, Flame, LineChart } from 'lucide-react'

const Navbar = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="sticky top-0 z-20 bg-slate-800/90 backdrop-blur-md border-b border-slate-700 px-4 sm:px-12 py-2 flex justify-between items-center gap-6">
            <div>
                <h1
                    onClick={() => setActiveTab('home')}
                    className="cursor-pointer text-xl md:text-2xl font-bold flex items-center">
                    🌊 Swell<span className="text-blue-500">fy</span>
                </h1>
            </div>
            <div className="relative bg-slate-900 p-1 rounded-xl flex items-center sm:w-auto min-w-[150px]">
                <div
                    className={`absolute h-[calc(100%-8px)] transition-all duration-300 ease-out bg-blue-600 rounded-lg shadow-lg
                        ${activeTab === 'freedom' ? 'left-1 w-[48%]' : ''}
                        ${activeTab === 'compound' ? 'left-[51%] w-[48%]' : ''}`}
                />

                {/* Botão: FIRE */}
                <button
                    onClick={() => setActiveTab('freedom')}
                    className={`cursor-pointer relative z-10 flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-bold transition-colors duration-200
      ${activeTab === 'freedom' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                    <Flame size={14} />
                    <span className="">FIRE</span>
                </button>

                {/* Botão: Juros Compostos */}
                <button
                    onClick={() => setActiveTab('compound')}
                    className={`cursor-pointer relative z-10 flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-bold transition-colors duration-200
      ${activeTab === 'compound' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                    <TrendingUp size={14} />
                    <span className="">Juros</span>
                </button>
            </div>

        </nav>
    )
}

export default Navbar