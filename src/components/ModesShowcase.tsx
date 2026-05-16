"use client";

import { useState } from 'react'

type Mode = 'online' | 'offline' | 'both'

export default function ModesShowcase() {
  const [activeMode, setActiveMode] = useState<Mode>('online')

  const modes = {
    online: {
      emoji: '📱',
      label: 'Online orders',
      pill: 'WhatsApp-first',
      tagline: '"Order milte hi, bill bhej do."',
      desc: 'Orderzo turns a WhatsApp message into a professional invoice + UPI link in 10 seconds.',
      accent: '#635BFF',
      bgGradient: 'from-[#EFEEFF] to-white',
      borderColor: 'border-[#DAD8FF]',
      taglineColor: 'text-[#4D44E0]',
      stats: [
        { value: '10s', label: 'Bill time' },
        { value: '₹0', label: 'Commission' },
        { value: '1-tap', label: 'UPI pay' },
      ],
      features: [
        { icon: '💬', text: 'WhatsApp-native invoice with shop branding' },
        { icon: '🔗', text: 'One-tap UPI link auto-attached' },
        { icon: '💳', text: 'Customer pays from any UPI app' },
        { icon: '✓', text: 'Auto-confirmation message sent back' },
      ],
    },
    offline: {
      emoji: '🏪',
      label: 'Walk-in counter',
      pill: 'Counter sales',
      tagline: '"Computer hatao. Phone uthao."',
      desc: 'Your phone is now your billing machine. 10-second bills. Cash, UPI, or card.',
      accent: '#16a34a',
      bgGradient: 'from-green-50 to-white',
      borderColor: 'border-green-200',
      taglineColor: 'text-green-800',
      stats: [
        { value: '10s', label: 'Quick sale' },
        { value: '3', label: 'Pay methods' },
        { value: '₹0', label: 'Hardware' },
      ],
      features: [
        { icon: '⚡', text: 'Quick Sale — items + amount, phone optional' },
        { icon: '💵', text: 'Cash / UPI / Card payment tracking' },
        { icon: '📊', text: 'Auto-totals at end of day' },
        { icon: '🚫', text: 'No thermal printer, no Tally, no PC' },
      ],
    },
    both: {
      emoji: '🔄',
      label: 'Both modes',
      pill: 'Best of both',
      tagline: '"Kabhi WhatsApp, kabhi counter."',
      desc: 'Many Indian businesses run both daily. One app. One dashboard. Switch on the fly.',
      accent: '#9333ea',
      bgGradient: 'from-purple-50 to-white',
      borderColor: 'border-purple-200',
      taglineColor: 'text-purple-800',
      stats: [
        { value: '2-in-1', label: 'Modes' },
        { value: '1', label: 'Dashboard' },
        { value: '∞', label: 'Customers' },
      ],
      features: [
        { icon: '📊', text: 'Single unified dashboard for all orders' },
        { icon: '🔀', text: 'WhatsApp + counter sales in one view' },
        { icon: '📈', text: 'Daily summary split by source' },
        { icon: '🔄', text: 'Switch modes on the fly — no setup change' },
      ],
    },
  }

  const current = modes[activeMode]

  return (
    <section className="px-4 sm:px-8 lg:px-12 py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#635BFF] uppercase tracking-wider mb-3">One app, three modes</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-5 leading-[1.05]">
            Built for the way<br />
            <span className="text-[#635BFF]">your business</span> actually works.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
            Tell us how customers reach you. Orderzo shapes itself around your reality — not the other way around.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#EFEEFF] text-[#3530B8] rounded-full px-4 py-2 text-sm font-semibold">
            <span>👉</span>
            <span>Click a mode to see it in action</span>
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 rounded-2xl p-1.5 gap-1 shadow-inner">
            {(Object.keys(modes) as Mode[]).map((mode) => {
              const m = modes[mode]
              const isActive = activeMode === mode
              return (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={
                    'px-4 sm:px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center gap-2 ' +
                    (isActive
                      ? 'bg-white shadow-md ring-2'
                      : 'text-gray-600 hover:text-gray-900')
                  }
                  style={isActive ? { ['--tw-ring-color' as any]: m.accent, color: m.accent } : {}}
                >
                  <span className="text-xl">{m.emoji}</span>
                  <span>{m.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative w-72 sm:w-80">
              <div
                className="absolute inset-0 blur-3xl rounded-full opacity-30"
                style={{ background: `radial-gradient(circle, ${current.accent} 0%, transparent 70%)` }}
              ></div>

              <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                <div className="bg-white rounded-[2rem] overflow-hidden">

                  {activeMode === 'online' && (
                    <>
                      <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                        <div className="w-9 h-9 bg-pink-300 rounded-full flex items-center justify-center text-base font-bold text-pink-800">L</div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">Lakshmi</p>
                          <p className="text-[10px] text-white/70">online</p>
                        </div>
                      </div>
                      <div className="bg-[#ECE5DD] px-3 py-3 space-y-2 min-h-[380px]">
                        <div className="flex">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                            <p className="text-sm text-gray-900">Aaj 2 tiffin chahiye 🙏</p>
                            <p className="text-[10px] text-gray-400 text-right mt-1">12:34 PM</p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-sm p-2 max-w-[85%] shadow-sm">
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                              <div className="bg-[#635BFF] text-white px-3 py-2">
                                <p className="text-[10px] font-bold opacity-90">PADMA&apos;S KITCHEN</p>
                                <p className="text-xs font-bold">Invoice #1234</p>
                              </div>
                              <div className="px-3 py-2 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-gray-700">Tiffin × 2</span>
                                  <span className="font-bold text-gray-900">₹200</span>
                                </div>
                              </div>
                              <div className="bg-gray-50 px-3 py-2 flex justify-between items-center border-t border-gray-100">
                                <span className="text-xs text-gray-600">Total</span>
                                <span className="text-base font-extrabold text-gray-900">₹200</span>
                              </div>
                              <div className="bg-white px-3 py-2 border-t border-gray-100">
                                <button className="w-full bg-[#635BFF] text-white text-xs font-bold py-2 rounded-lg">
                                  Pay via UPI →
                                </button>
                              </div>
                            </div>
                            <p className="text-[10px] text-gray-500 text-right mt-1 px-1">12:35 PM ✓✓</p>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                            <p className="text-sm text-gray-900">Paid ✓</p>
                            <p className="text-[10px] text-gray-400 text-right mt-1">12:36 PM</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeMode === 'offline' && (
                    <>
                      <div className="bg-green-600 text-white px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-base">⚡</span>
                          <p className="font-bold text-sm">Quick Sale</p>
                        </div>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">10s flow</span>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-white p-4 space-y-3 min-h-[380px]">
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Customer (optional)</label>
                          <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 mt-1 text-sm text-gray-400">+91 phone (skip if walk-in)</div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Items</label>
                          <div className="bg-white border-2 border-green-500 rounded-lg px-3 py-2 mt-1 text-sm font-semibold text-gray-900">2 tiffin · 1 dal</div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Amount</label>
                          <div className="bg-white border-2 border-green-500 rounded-lg px-3 py-2 mt-1 text-lg font-extrabold text-gray-900">₹230</div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Paid by</label>
                          <div className="grid grid-cols-3 gap-1.5 mt-1">
                            <button className="bg-green-600 text-white text-xs font-bold py-2 rounded-lg">💵 Cash</button>
                            <button className="bg-white border border-gray-200 text-gray-600 text-xs font-medium py-2 rounded-lg">UPI</button>
                            <button className="bg-white border border-gray-200 text-gray-600 text-xs font-medium py-2 rounded-lg">Card</button>
                          </div>
                        </div>
                        <button className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-green-500/30 mt-2">
                          Save bill →
                        </button>
                      </div>
                    </>
                  )}

                  {activeMode === 'both' && (
                    <>
                      <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-gray-500">Today</p>
                          <p className="text-base font-extrabold text-gray-900">All orders</p>
                        </div>
                        <div className="w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs">P</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-white px-4 py-4">
                        <p className="text-[10px] text-gray-500 mb-1">Today&apos;s earnings</p>
                        <p className="text-3xl font-extrabold text-gray-900">₹4,250</p>
                        <div className="flex items-center gap-3 mt-2 text-[10px]">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-[#635BFF] rounded-full"></span>
                            <span className="text-gray-700 font-semibold">WhatsApp: ₹1,800</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span className="text-gray-700 font-semibold">Counter: ₹2,450</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-3 py-3 space-y-2 min-h-[200px]">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-1">Recent</p>
                        <div className="bg-white border border-gray-100 rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm">
                          <div className="w-7 h-7 bg-[#EFEEFF] rounded-full flex items-center justify-center text-xs">📱</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">Lakshmi · 2 tiffin</p>
                            <p className="text-[10px] text-gray-500">WhatsApp · UPI</p>
                          </div>
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold">₹200</span>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm">
                          <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-xs">🏪</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">Walk-in · 3 tiffin</p>
                            <p className="text-[10px] text-gray-500">Counter · Cash</p>
                          </div>
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold">₹300</span>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-lg px-3 py-2 flex items-center gap-2 shadow-sm">
                          <div className="w-7 h-7 bg-[#EFEEFF] rounded-full flex items-center justify-center text-xs">📱</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">Ravi · 1 tiffin</p>
                            <p className="text-[10px] text-gray-500">WhatsApp · UPI</p>
                          </div>
                          <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-bold">₹100</span>
                        </div>
                      </div>
                    </>
                  )}

                </div>
              </div>
            </div>
          </div>

          <div className={'relative order-1 lg:order-2 bg-gradient-to-br ' + current.bgGradient + ' border-2 ' + current.borderColor + ' rounded-3xl p-6 sm:p-8 transition-all shadow-2xl overflow-hidden'}>

            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 -translate-y-12 translate-x-12 pointer-events-none"
              style={{ background: current.accent }}
            ></div>
            <div
              className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-10 translate-y-12 -translate-x-12 pointer-events-none"
              style={{ background: current.accent }}
            ></div>

            <div className="relative flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white shadow-sm">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: current.accent }}></span>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: current.accent }}>{current.pill}</span>
              </div>
            </div>

            <div className="relative flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl blur-md opacity-40" style={{ background: current.accent }}></div>
                <div className="relative w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg ring-2 ring-white">
                  {current.emoji}
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">{current.label}</h3>
            </div>

            <p className={'relative font-bold italic text-base sm:text-lg mb-3 ' + current.taglineColor}>
              {current.tagline}
            </p>

            <p className="relative text-sm sm:text-base text-gray-700 leading-relaxed mb-5">
              {current.desc}
            </p>

            <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2 mb-5 pb-5 border-b border-white/40">
              {current.stats.map((stat, i) => (
                <div key={i} className="flex items-baseline gap-1.5">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: current.accent }}>{stat.value}</span>
                  <span className="text-xs font-semibold text-gray-600">{stat.label}</span>
                  {i < current.stats.length - 1 && <span className="text-gray-300 mx-1">·</span>}
                </div>
              ))}
            </div>

            <div className="relative mb-5">
              <ul className="space-y-2.5">
                {current.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-800">
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-base"
                      style={{ border: '1px solid ' + current.accent + '30' }}
                    >{feat.icon}</div>
                    <span className="leading-snug pt-1">{feat.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex flex-wrap items-center gap-3">
              <a href="/login" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-lg">
                Start with this mode →
              </a>
              <span className="text-xs text-gray-600">
                Free 30 invoices/month · No card needed
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
