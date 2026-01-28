"use client"
import React, { useState } from 'react'
import CompoundCalc from '@/components/CompoundCalc'
import FreedomCalc from '@/components/FreedomCalc'
import Navbar from '@/components/Navbar'

export default function FinancialPilot() {
  const [activeTab, setActiveTab] = useState('freedom')

  return (
    <main className="min-h-screen bg-slate-900  text-slate-200">
      {/* Tabs Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab} />

      <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-6">
        {activeTab === 'compound' ? <CompoundCalc /> : <FreedomCalc setActiveTab={setActiveTab} />}
      </div>
    </main>
  )
}