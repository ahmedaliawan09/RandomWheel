"use client"

export function WinnerPodium({ employees, className = '' }) {
    const firstRow = employees.slice(0, 11)
    const secondRow = employees.slice(11)

    const renderEmployee = (emp, i, indexOffset = 0) => (
        <div
            key={emp.id}
            className="flex flex-col items-center"
            style={{
                animation: 'popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                animationDelay: `${(i + indexOffset) * 0.1}s`,
                animationFillMode: 'both'
            }}
        >
            <div className="relative mb-2">
                <div 
                    className="absolute -inset-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full blur-md opacity-50"
                    style={{ animation: 'pulse 2s ease-in-out infinite' }}
                />
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-base font-black text-white border-2 border-white shadow-lg">
                    {emp.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-[10px] font-black text-white border border-white shadow-sm">
                    {i + indexOffset + 1}
                </div>
            </div>
            <p className="text-slate-700 text-[10px] font-bold text-center max-w-16 truncate">{emp.name.split(' ')[0]}</p>
        </div>
    )

    return (
        <div className={`flex flex-col items-center gap-4 pb-16 ${className}`}>
            <div className="flex items-end justify-center gap-2 flex-wrap">
                {firstRow.map((emp, i) => renderEmployee(emp, i, 0))}
            </div>
            {secondRow.length > 0 && (
                <div className="flex items-end justify-center gap-2 flex-wrap">
                    {secondRow.map((emp, i) => renderEmployee(emp, i, 11))}
                </div>
            )}
        </div>
    )
}
