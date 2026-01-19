"use client"

export function HoloCard({ children, className = '', active = false, variant = 'default' }) {
    const variants = {
        default: 'from-white via-white to-slate-50',
        purple: 'from-indigo-50 via-white to-purple-50',
        green: 'from-emerald-50 via-white to-teal-50',
        amber: 'from-amber-50 via-white to-orange-50'
    }

    return (
        <div className={`relative group ${className}`}>
            {/* Card body */}
            <div className={`relative bg-gradient-to-br ${variants[variant]} rounded-2xl border border-white/80 overflow-hidden backdrop-blur-sm`}>
                {/* Shimmer effect */}
                <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
                />
                {children}
            </div>
        </div>
    )
}
