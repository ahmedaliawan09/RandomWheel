"use client"

import { useMemo } from "react"

export function SlotReel({ employees, currentHighlight, isSpinning, selectedEmployee }) {
    const displayEmployees = useMemo(() => {
        if (selectedEmployee) return [selectedEmployee]
        if (!isSpinning && !currentHighlight) return employees.slice(0, 3)
        if (currentHighlight) {
            const idx = employees.findIndex(e => e.id === currentHighlight.id)
            const start = Math.max(0, idx - 1)
            return employees.slice(start, start + 3)
        }
        return employees.slice(0, 3)
    }, [employees, currentHighlight, isSpinning, selectedEmployee])

    return (
        <div className="relative h-[200px] overflow-hidden rounded-xl bg-white border-2 border-indigo-300">
            {/* Center highlight bar */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-16 border-y-2 border-indigo-400 bg-indigo-50 z-10" />

            {/* Employee list */}
            <div className="flex flex-col items-center justify-center h-full">
                {displayEmployees.map((emp) => {
                    const isActive = currentHighlight?.id === emp.id || selectedEmployee?.id === emp.id
                    return (
                        <div
                            key={emp.id}
                            className={`flex items-center gap-3 p-3 z-20 ${isActive ? 'scale-105' : 'scale-95'}`}
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-black text-white ${isActive
                                ? 'bg-gradient-to-br from-indigo-500 to-purple-500'
                                : 'bg-gray-400'
                                }`}>
                                {emp.avatar}
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-base" style={{ color: '#000000' }}>
                                    {emp.name}
                                </p>
                                <p className="text-sm" style={{ color: '#333333' }}>
                                    {emp.department}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}
