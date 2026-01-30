"use client"
import React, { useState } from 'react'
import CompoundCalc from '@/components/CompoundCalc'
import FreedomCalc from '@/components/FreedomCalc'
import Navbar from '@/components/Navbar'
import HomeTab from '@/components/HomeTab'

export default function FinancialPilot() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <main className="min-h-screen bg-slate-900  text-slate-200">
      {/* Tabs Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab} />

      <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-6">
        {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} />}
        {activeTab === 'compound' && <CompoundCalc />}
        {activeTab === 'freedom' && <FreedomCalc />}
      </div>
    </main>
  )
}