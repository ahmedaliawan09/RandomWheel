"use client"

import { HoloCard } from '../components/HoloCard'
import { WinnerPodium } from '../components/WinnerPodium'

export function ReadyToPlayPhase({ selectedEmployees, startBoxGame }) {
    return (
        <div className="w-full max-w-6xl mt-12 text-center relative z-10">
            <HoloCard variant="purple" active>
                <div className="p-8">
                    <div className="relative inline-block mb-4">
                        <div className="text-[70px] animate-bounce" style={{ animationDuration: '0.8s' }}>🎉</div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ALL WINNERS SELECTED!
                    </h2>
                    <p className="text-slate-500 text-sm mb-6">{selectedEmployees.length} lucky employees ready to win!</p>

                    <WinnerPodium employees={selectedEmployees} className="mb-6 scale-150 origin-top mb-16" />

                    <button
                        onClick={startBoxGame}
                        className="px-12 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                        <span className="flex items-center gap-3">
                            <span className="text-2xl">🎁</span>
                            OPEN THE BOXES!
                        </span>
                    </button>
                </div>
            </HoloCard>
        </div>
    )
}
