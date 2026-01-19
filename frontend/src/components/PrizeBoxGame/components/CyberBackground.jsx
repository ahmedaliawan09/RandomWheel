"use client"

export function CyberBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Ultra-premium base gradient with metallic sheen */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-gray-25 to-emerald-50" />
            
            {/* Metallic shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/40" />
            
            {/* Sophisticated animated gradient mesh - extreme premium */}
            <div 
                className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-cyan-100/70 via-sky-100/50 to-blue-100/40 rounded-full blur-3xl"
                style={{ animation: 'float1 10s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
            />
            <div 
                className="absolute top-1/4 -right-10 w-[550px] h-[550px] bg-gradient-to-bl from-emerald-100/60 via-teal-100/45 to-cyan-100/35 rounded-full blur-3xl"
                style={{ animation: 'float2 12s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
            />
            <div 
                className="absolute -bottom-20 left-1/3 w-[650px] h-[650px] bg-gradient-to-tr from-violet-100/50 via-purple-100/40 to-fuchsia-100/30 rounded-full blur-3xl"
                style={{ animation: 'float3 11s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
            />
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-slate-100/50 via-gray-100/35 to-zinc-100/25 rounded-full blur-3xl"
                style={{ animation: 'pulse 8s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
            />
            <div 
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-amber-100/40 via-yellow-100/30 to-orange-100/20 rounded-full blur-3xl"
                style={{ animation: 'float1 13s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse' }}
            />
            <div 
                className="absolute top-10 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-rose-100/45 via-pink-100/35 to-red-100/25 rounded-full blur-3xl"
                style={{ animation: 'float2 9s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
            />

            {/* Ultra-precise geometric elements */}
            <div className="absolute top-32 left-32 w-40 h-40 border-2 border-cyan-300/40 rounded-full" style={{ animation: 'spin 25s linear infinite' }} />
            <div className="absolute bottom-40 right-32 w-32 h-32 border-2 border-emerald-300/40 rounded-full" style={{ animation: 'spin 20s linear infinite reverse' }} />
            <div className="absolute top-1/3 left-10 w-24 h-24 border-2 border-violet-300/40 rounded-lg rotate-45" style={{ animation: 'float3 7s cubic-bezier(0.4, 0, 0.2, 1) infinite' }} />
            <div className="absolute bottom-1/3 right-40 w-20 h-20 border-2 border-amber-300/30 hexagon" style={{ animation: 'spin 18s linear infinite' }} />
            
            {/* Micro-detail floating particles */}
            <div className="absolute top-1/4 left-20 w-1.5 h-1.5 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full opacity-50" style={{ animation: 'float1 6s ease-in-out infinite' }} />
            <div className="absolute top-1/2 right-24 w-1 h-1 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full opacity-50" style={{ animation: 'float2 5s ease-in-out infinite' }} />
            <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-gradient-to-br from-violet-500 to-purple-500 rounded-full opacity-45" style={{ animation: 'float3 7s ease-in-out infinite' }} />
            <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full opacity-50" style={{ animation: 'float1 6s ease-in-out infinite reverse' }} />
            <div className="absolute bottom-24 left-1/2 w-1.5 h-1.5 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full opacity-40" style={{ animation: 'float2 8s ease-in-out infinite' }} />
            
            {/* Ultra-fine particle grid */}
            <div className="absolute top-10 left-10 w-0.5 h-0.5 bg-cyan-400/30 rounded-full" style={{ animation: 'float3 4s ease-in-out infinite' }} />
            <div className="absolute top-40 right-40 w-0.5 h-0.5 bg-emerald-400/30 rounded-full" style={{ animation: 'float1 5s ease-in-out infinite' }} />
            <div className="absolute bottom-10 left-40 w-0.5 h-0.5 bg-violet-400/30 rounded-full" style={{ animation: 'float2 4s ease-in-out infinite' }} />

            {/* Nano-precision grid pattern */}
            <div 
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.3) 0.5px, transparent 0.5px),
                                      linear-gradient(90deg, rgba(14, 165, 233, 0.3) 0.5px, transparent 0.5px)`,
                    backgroundSize: '40px 40px'
                }}
            />
            
            {/* Secondary micro-grid */}
            <div 
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `linear-gradient(rgba(20, 184, 166, 0.2) 0.25px, transparent 0.25px),
                                      linear-gradient(90deg, rgba(20, 184, 166, 0.2) 0.25px, transparent 0.25px)`,
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Glass-morphism layers */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/80 via-white/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/60 via-white/20 to-transparent" />
            <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-white/50 via-white/20 to-transparent" />
            <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-white/50 via-white/20 to-transparent" />
            
            {/* Dynamic light beams */}
            <div className="absolute top-0 left-1/4 w-px h-64 bg-gradient-to-b from-cyan-400/20 via-cyan-300/10 to-transparent" />
            <div className="absolute top-0 right-1/3 w-px h-48 bg-gradient-to-b from-emerald-400/20 via-emerald-300/10 to-transparent" />
            <div className="absolute bottom-0 left-2/3 w-px h-56 bg-gradient-to-t from-violet-400/20 via-violet-300/10 to-transparent" />

            {/* Diamond pattern overlay */}
            <div 
                className="absolute inset-0 opacity-[0.008]"
                style={{
                    backgroundImage: `linear-gradient(45deg, rgba(6, 182, 212, 0.1) 25%, transparent 25%),
                                      linear-gradient(-45deg, rgba(6, 182, 212, 0.1) 25%, transparent 25%),
                                      linear-gradient(45deg, transparent 75%, rgba(6, 182, 212, 0.1) 75%),
                                      linear-gradient(-45deg, transparent 75%, rgba(6, 182, 212, 0.1) 75%)`,
                    backgroundSize: '80px 80px'
                }}
            />
           

            {/* Final premium gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-white/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20" />

            {/* Animation keyframes - enhanced with premium easing */}
            <style jsx>{`
                @keyframes float1 {
                    0%, 100% { 
                        transform: translateY(0) translateX(0) rotate(0deg); 
                    }
                    33% { 
                        transform: translateY(-40px) translateX(20px) rotate(2deg); 
                    }
                    66% { 
                        transform: translateY(30px) translateX(-15px) rotate(-1deg); 
                    }
                }
                @keyframes float2 {
                    0%, 100% { 
                        transform: translateY(0) translateX(0) scale(1); 
                    }
                    50% { 
                        transform: translateY(35px) translateX(-25px) scale(1.02); 
                    }
                }
                @keyframes float3 {
                    0%, 100% { 
                        transform: translateY(0) translateX(0); 
                    }
                    25% { 
                        transform: translateY(-25px) translateX(15px); 
                    }
                    50% { 
                        transform: translateY(20px) translateX(-20px); 
                    }
                    75% { 
                        transform: translateY(-15px) translateX(10px); 
                    }
                }
                @keyframes spin {
                    from { 
                        transform: rotate(0deg); 
                    }
                    to { 
                        transform: rotate(360deg); 
                    }
                }
                @keyframes pulse {
                    0%, 100% { 
                        opacity: 0.4; 
                        transform: translate(-50%, -50%) scale(1); 
                    }
                    50% { 
                        opacity: 0.6; 
                        transform: translate(-50%, -50%) scale(1.08); 
                    }
                }
                
                /* Hexagon shape for geometric element */
                .hexagon {
                    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                }
            `}</style>
        </div>
    )
}