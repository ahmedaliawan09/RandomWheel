"use client"

import { HoloCard } from '../components/HoloCard'

export function CompletedPhase({ prizeAssignments, prizes, resetGame, onBack }) {
    const downloadWinnersList = () => {
        // Create CSV content
        const headers = ['#', 'Employee Name', 'Department', 'Employee ID', 'Prize Won', 'Prize Tier']
        const rows = prizeAssignments.map((assignment, index) => [
            index + 1,
            assignment.employee.name,
            assignment.employee.department,
            assignment.employee.employeeId || 'N/A',
            assignment.prize.name,
            assignment.prize.tier
        ])
        
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n')
        
        // Create and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `prize_winners_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="w-full max-w-5xl relative z-10">
            <div className="grid lg:grid-cols-3 gap-5">
                {/* Left: Fixed Text Section */}
                <div className="lg:col-span-1">
                    <HoloCard className="h-full" variant="purple" active>
                        <div className="p-8 text-center lg:text-left h-full flex flex-col">
                            <div className="text-[70px] mb-4">🎊</div>

                            <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                GAME COMPLETE!
                            </h2>
                            <p className="text-slate-500 text-base mb-5">All prizes have been distributed!</p>

                            <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl p-5 border border-indigo-100 mb-5">
                                <p className="text-indigo-600 font-bold text-base mb-2">Summary</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="text-center">
                                        <p className="text-slate-500 text-sm">Winners</p>
                                        <p className="text-slate-800 text-3xl font-bold">{prizeAssignments.length}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-slate-500 text-sm">Prizes</p>
                                        <p className="text-slate-800 text-3xl font-bold">{prizes.slice(0, 15).length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <button
                                    onClick={downloadWinnersList}
                                    className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg"
                                >
                                    📥 DOWNLOAD LIST
                                </button>

                                <button
                                    onClick={resetGame}
                                    className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl transition-all shadow-md hover:shadow-lg"
                                >
                                    🔄 PLAY AGAIN
                                </button>

                                <button
                                    onClick={onBack}
                                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors border border-slate-300"
                                >
                                    ← Back to Menu
                                </button>
                            </div>
                        </div>
                    </HoloCard>
                </div>

                {/* Right: Winners List */}
                <div className="lg:col-span-2">
                    <HoloCard className="h-full" variant="amber">
                        <div className="p-6">
                            <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                                🏆 ALL WINNERS
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
                                {prizeAssignments.map((assignment, i) => (
                                    <div
                                        key={i}
                                        className="bg-gradient-to-br from-white to-amber-50 rounded-lg p-4 border border-amber-200 flex items-center gap-3 shadow-sm"
                                    >
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-lg font-black text-white shadow-md">
                                            {assignment.employee.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-slate-800 font-bold text-sm truncate">{assignment.employee.name}</p>
                                            <p className="text-indigo-600 text-xs font-semibold">ID: {assignment.employee.employeeId}</p>
                                            <p className="text-slate-500 text-xs truncate">{assignment.prize.name}</p>
                                        </div>
                                        {assignment.prize.image ? (
                                            <img 
                                                src={assignment.prize.image} 
                                                alt={assignment.prize.name} 
                                                className="w-10 h-10 object-contain"
                                            />
                                        ) : (
                                            <div className="text-2xl">{assignment.prize.icon}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </HoloCard>
                </div>
            </div>
        </div>
    )
}
