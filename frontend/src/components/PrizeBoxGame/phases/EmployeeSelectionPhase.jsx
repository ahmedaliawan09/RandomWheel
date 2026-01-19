"use client"

import { HoloCard } from '../components/HoloCard'
import { SlotReel } from '../components/SlotReel'

export function EmployeeSelectionPhase({
    allEmployeesPool,
    selectedEmployees,
    employeesToSelect,
    employeeSelectionHighlight,
    isSlotSpinning,
    isSelecting,
    startAutomaticSelection,
    stopSelection,
    onNext,
    playFanfare,
    showSelectedPopup,
    lastSelectedEmployee,
    closeSelectedPopup
}) {
    return (
        <>
            {/* Background Image - canva1.png */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: 'url(/canva1.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* Main Content - Layout Unchanged */}
            <div className="w-full h-full flex-1 max-w-[1400px] mx-auto relative z-10">
                <div className="grid grid-cols-[380px_1fr] gap-4 h-full">
                    {/* LEFT: SELECT EMPLOYEES - Full Height */}
                    <div className="h-full">
                        <HoloCard className="h-full" variant="purple" active={isSelecting}>
                            <div className="p-4 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                                        🎰 LUCKY DRAW
                                    </h2>
                                    <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white text-xs font-bold shadow-sm">
                                        {allEmployeesPool.length}
                                    </span>
                                </div>

                                <SlotReel
                                    employees={allEmployeesPool}
                                    currentHighlight={employeeSelectionHighlight}
                                    isSpinning={isSlotSpinning}
                                    selectedEmployee={isSelecting ? employeeSelectionHighlight : null}
                                />

                                <div className="flex-1" />

                                <div className="space-y-3 mt-4">
                                    <div className="flex justify-between bg-gradient-to-r from-slate-100 to-indigo-50 rounded-lg p-3 border border-indigo-100">
                                        <span className="text-slate-600 text-sm font-bold">WINNERS</span>
                                        <span className="text-indigo-600 text-sm font-bold">
                                            {selectedEmployees.length}/23
                                        </span>
                                    </div>

                                    <button
                                        onClick={startAutomaticSelection}
                                        disabled={isSelecting || selectedEmployees.length >= employeesToSelect}
                                        className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 disabled:from-slate-300 disabled:to-slate-400 text-white font-bold rounded-lg text-sm transition-all shadow-md hover:shadow-lg disabled:shadow-none"
                                    >
                                        {isSelecting ? 'SELECTING...' : 'START'}
                                    </button>

                                    <button
                                        onClick={stopSelection}
                                        disabled={!isSelecting}
                                        className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:from-slate-300 disabled:to-slate-400 text-white font-bold rounded-lg text-sm transition-all shadow-md hover:shadow-lg disabled:shadow-none"
                                    >
                                        STOP
                                    </button>
                                </div>
                            </div>
                        </HoloCard>
                    </div>

                    {/* RIGHT: SELECTED EMPLOYEES */}
                    <div className="h-full">
                        <HoloCard className="h-full" variant="green">
                            <div className="p-4 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                        🏆 SELECTED WINNERS
                                        <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white text-sm font-bold shadow-sm">
                                            {selectedEmployees.length}/{employeesToSelect}
                                        </span>
                                    </h2>
                                </div>

                                {selectedEmployees.length === 0 ? (
                                    <div className="flex-1 flex flex-col items-center justify-center">
                                        <div className="text-6xl mb-3 opacity-40">👥</div>
                                        <p className="text-lg font-bold text-slate-500">No winners yet</p>
                                        <p className="text-xs mt-1 text-slate-400">Press START to begin selection</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-5 xl:grid-cols-7 gap-4 place-content-start flex-1 overflow-y-auto">
                                        {selectedEmployees.map((emp, i) => (
                                            <div
                                                key={emp.id}
                                                className="relative bg-gradient-to-br from-white to-emerald-50 rounded-xl p-4 border border-emerald-200 shadow-sm hover:shadow-md transition-shadow"
                                            >
                                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-black rounded-md shadow-sm">
                                                    #{i + 1}
                                                </div>

                                                <div className="flex flex-col items-center pt-4">
                                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-xl font-black text-white mb-2 shadow-md">
                                                        {emp.avatar}
                                                    </div>

                                                    <p className="text-slate-800 font-bold text-sm text-center truncate w-full">
                                                        {emp.name}
                                                    </p>
                                                    <p className="text-slate-500 text-xs truncate w-full text-center">
                                                        {emp.department}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {selectedEmployees.length >= employeesToSelect && (
                                    <button
                                        onClick={() => {
                                            onNext()
                                            playFanfare()
                                        }}
                                        className="mt-4 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-bold text-base rounded-lg transition-all shadow-md hover:shadow-lg"
                                    >
                                        NEXT →
                                    </button>
                                )}
                            </div>
                        </HoloCard>
                    </div>
                </div>

                {/* Selected Employee Popup */}
                {showSelectedPopup && lastSelectedEmployee && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-900/60 backdrop-blur-sm">
                        <div
                            className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-2xl p-8 max-w-sm w-full mx-4 text-center border border-indigo-200 shadow-2xl"
                            style={{ animation: 'popIn 0.3s ease-out' }}
                        >
                            <div className="text-5xl mb-4">🎉</div>

                            <h3 className="text-xl font-black text-slate-800 mb-2">WINNER SELECTED!</h3>

                            <div className="relative inline-block mb-4">
                                <div
                                    className="absolute -inset-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full blur-md opacity-60"
                                    style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
                                />
                                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-3xl font-black text-white shadow-lg">
                                    {lastSelectedEmployee.avatar}
                                </div>
                            </div>

                            <p className="text-2xl font-bold text-slate-800 mb-1">{lastSelectedEmployee.name}</p>
                            <p className="text-indigo-600 font-semibold text-sm mb-1">ID: {lastSelectedEmployee.employeeId}</p>
                            <p className="text-slate-500 mb-6">{lastSelectedEmployee.department}</p>

                            <p className="text-sm text-slate-400 mb-4">
                                Winner #{selectedEmployees.length} of {employeesToSelect}
                            </p>

                            <button
                                onClick={closeSelectedPopup}
                                className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg"
                            >
                                ← BACK TO SELECTION
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}