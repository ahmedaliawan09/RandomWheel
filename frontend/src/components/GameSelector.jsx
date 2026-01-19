"use client"

import { useState, useEffect } from "react"
import maazlogo from "../assets/maazlogo.png"

// Party Popper Component
function PartyPopper({ position, delay }) {
    const [confetti, setConfetti] = useState([])
    const [phase, setPhase] = useState('enter') // enter, blast, exit

    useEffect(() => {
        const timer1 = setTimeout(() => setPhase('blast'), 1500 + delay)
        const timer2 = setTimeout(() => {
            // Generate confetti
            const colors = ['#fbbf24', '#10b981', '#f472b6', '#22d3ee', '#a78bfa', '#ef4444', '#3b82f6']
            const newConfetti = Array.from({ length: 20 }, (_, i) => ({
                id: i,
                color: colors[Math.floor(Math.random() * colors.length)],
                angle: (Math.random() - 0.5) * 120,
                distance: 50 + Math.random() * 100,
                size: 4 + Math.random() * 6,
                delay: Math.random() * 0.2
            }))
            setConfetti(newConfetti)
        }, 1600 + delay)
        const timer3 = setTimeout(() => setPhase('exit'), 3000 + delay)
        const timer4 = setTimeout(() => {
            setPhase('enter')
            setConfetti([])
        }, 4000 + delay)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
            clearTimeout(timer4)
        }
    }, [delay])

    return (
        <div 
            className="absolute pointer-events-none"
            style={{ 
                left: position.x, 
                top: position.y,
                zIndex: 5
            }}
        >
            {/* Hand with popper */}
            <div
                style={{
                    fontSize: '40px',
                    transform: phase === 'enter' 
                        ? 'translateY(100px) rotate(-30deg)' 
                        : phase === 'blast'
                        ? 'translateY(0) rotate(15deg)'
                        : 'translateY(-50px) rotate(30deg) scale(0.5)',
                    opacity: phase === 'exit' ? 0 : 1,
                    transition: 'all 0.5s ease-out'
                }}
            >
                🎉
            </div>

            {/* Confetti particles */}
            {confetti.map((c) => (
                <div
                    key={c.id}
                    className="absolute rounded-full"
                    style={{
                        width: c.size,
                        height: c.size,
                        background: c.color,
                        boxShadow: `0 0 4px ${c.color}`,
                        left: '20px',
                        top: '0px',
                        animation: `confettiFly 1s ease-out forwards`,
                        animationDelay: `${c.delay}s`,
                        '--angle': `${c.angle}deg`,
                        '--distance': `${c.distance}px`
                    }}
                />
            ))}
        </div>
    )
}

export default function GameSelector({ onSelectGame }) {
    const [hoveredCard, setHoveredCard] = useState(null)
    const [mounted, setMounted] = useState(false)
    const [popperKey, setPopperKey] = useState(0)

    useEffect(() => {
        setMounted(true)
        // Restart poppers every 5 seconds
        const interval = setInterval(() => {
            setPopperKey(k => k + 1)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const playClickSound = () => {
        if (typeof window !== "undefined") {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
            const oscillator = audioCtx.createOscillator()
            const gainNode = audioCtx.createGain()
            oscillator.connect(gainNode)
            gainNode.connect(audioCtx.destination)
            oscillator.frequency.value = 1200
            oscillator.type = "square"
            gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15)
            oscillator.start(audioCtx.currentTime)
            oscillator.stop(audioCtx.currentTime + 0.15)
        }
    }

    if (!mounted) return null

    const popperPositions = [
        { x: '5%', y: '20%' },
        { x: '90%', y: '25%' },
        { x: '8%', y: '70%' },
        { x: '88%', y: '65%' },
    ]

    return (
        <div className="w-full h-screen flex flex-col overflow-hidden relative">
            {/* Background Image */}
                    <div 
                className="fixed top-0 left-0 w-full h-full"
                style={{ 
                    backgroundImage: "url('/bgspinner2.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    
                    zIndex: 0
                }}
            />
            {/* Overlay - darker */}
            {/* <div className="absolute inset-0 bg-white/30" /> */}

            {/* Water color splash background */}
            {/* <div className="absolute inset-0 overflow-hidden">
                <div 
                    className="absolute w-[600px] h-[600px] rounded-full  opacity-50"
                    style={{
                        background: 'radial-gradient(circle, #fbbf24 0%, #fef3c7 50%, transparent 70%)',
                        top: '-15%',
                        right: '-10%',
                        animation: 'waterBlob1 12s ease-in-out infinite'
                    }}
                />
                <div 
                    className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-50"
                    style={{
                        background: 'radial-gradient(circle, #10b981 0%, #d1fae5 50%, transparent 70%)',
                        bottom: '-15%',
                        left: '-10%',
                        animation: 'waterBlob2 14s ease-in-out infinite'
                    }}
                />
                <div 
                    className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-40"
                    style={{
                        background: 'radial-gradient(circle, #f472b6 0%, #fce7f3 50%, transparent 70%)',
                        top: '40%',
                        left: '30%',
                        animation: 'waterBlob3 10s ease-in-out infinite'
                    }}
                />
                <div 
                    className="absolute w-[350px] h-[350px] rounded-full blur-[80px] opacity-45"
                    style={{
                        background: 'radial-gradient(circle, #22d3ee 0%, #cffafe 50%, transparent 70%)',
                        top: '20%',
                        left: '60%',
                        animation: 'waterBlob4 11s ease-in-out infinite'
                    }}
                />
                <div 
                    className="absolute w-[300px] h-[300px] rounded-full blur-[70px] opacity-40"
                    style={{
                        background: 'radial-gradient(circle, #a78bfa 0%, #ede9fe 50%, transparent 70%)',
                        bottom: '20%',
                        right: '20%',
                        animation: 'waterBlob5 13s ease-in-out infinite'
                    }}
                />
            </div> */}

            {/* Party Poppers */}
            {popperPositions.map((pos, i) => (
                <PartyPopper key={`${popperKey}-${i}`} position={pos} delay={i * 800} />
            ))}

            {/* Moving horizontal lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={`line-${i}`}
                        className="absolute h-[3px] rounded-full"
                        style={{
                            width: '200px',
                            top: `${8 + i * 8}%`,
                            background: `linear-gradient(90deg, transparent, ${
                                ['#fbbf24', '#10b981', '#f472b6', '#22d3ee', '#a78bfa', '#f59e0b'][i % 6]
                            }, transparent)`,
                            opacity: 0.7,
                            animation: `lineMove ${4 + (i % 3)}s linear infinite`,
                            animationDelay: `${i * 0.4}s`
                        }}
                    />
                ))}
            </div>

            {/* Floating bubbles */}
            {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={`bubble-${i}`}
                        className="absolute rounded-full"
                        style={{
                            width: `${10 + Math.random() * 20}px`,
                            height: `${10 + Math.random() * 20}px`,
                            left: `${Math.random() * 100}%`,
                            background: `radial-gradient(circle at 30% 30%, white, ${
                                ['#fbbf24', '#10b981', '#f472b6', '#22d3ee', '#a78bfa'][i % 5]
                            }40)`,
                            border: `1px solid ${['#fbbf24', '#10b981', '#f472b6', '#22d3ee', '#a78bfa'][i % 5]}30`,
                            animation: `bubbleRise ${8 + Math.random() * 6}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div> */}

            {/* Ripple circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div 
                    className="absolute w-[300px] h-[300px] rounded-full border-2 border-amber-400/40"
                    style={{
                        top: '10%',
                        right: '15%',
                        animation: 'ripple 4s ease-out infinite'
                    }}
                />
                <div 
                    className="absolute w-[250px] h-[250px] rounded-full border-2 border-emerald-400/40"
                    style={{
                        bottom: '15%',
                        left: '10%',
                        animation: 'ripple 5s ease-out infinite',
                        animationDelay: '1s'
                    }}
                />
                <div 
                    className="absolute w-[200px] h-[200px] rounded-full border-2 border-pink-400/40"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: 'ripple 6s ease-out infinite',
                        animationDelay: '2s'
                    }}
                />
            </div>

            {/* Sparkle dots */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={`dot-${i}`}
                        className="absolute rounded-full"
                        style={{
                            width: '5px',
                            height: '5px',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            background: ['#fbbf24', '#10b981', '#f472b6', '#22d3ee', '#a78bfa'][i % 5],
                            boxShadow: `0 0 8px ${['#fbbf24', '#10b981', '#f472b6', '#22d3ee', '#a78bfa'][i % 5]}`,
                            animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full h-full flex flex-col">
                {/* Logo */}
                <div className="absolute top-4 left-4" style={{ animation: "slideIn 0.8s ease-out" }}>
                    <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl">
                        <img src={maazlogo} alt="Maaz Logo" className="w-42" />
                    </div>
                </div>

                {/* Title */}
                <div className="text-center pt-8">
                    <h1 
                        className="text-5xl py-4 md:text-6xl font-black"
                        style={{
                            background: 'linear-gradient(90deg, #b45309, #047857, #be185d, #0e7490, #7c3aed, #b45309)',
                            backgroundSize: '300% 100%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'textFlow 4s linear infinite'
                        }}
                    >
                        Employee Celebration
                    </h1>
                    
                    <div className="flex justify-center mt-3">
                        <div 
                            className="h-1.5 rounded-full"
                            style={{
                                width: '150px',
                                background: 'linear-gradient(90deg, #b45309, #047857, #be185d, #0e7490, #b45309)',
                                backgroundSize: '300% 100%',
                                animation: 'textFlow 3s linear infinite'
                            }}
                        />
                    </div>
                </div>

                {/* Cards Section */}
                <div className="flex-1 flex items-center justify-center px-6">
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
                        {/* UMRAH Card */}
                        <div
                            onClick={() => { playClickSound(); onSelectGame("umrah") }}
                            onMouseEnter={() => setHoveredCard("umrah")}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="cursor-pointer"
                            style={{ animation: 'cardSlideUp 0.6s ease-out 0.2s both' }}
                        >
                            <div
                                className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
                                    hoveredCard === "umrah" ? "scale-[1.03] -translate-y-2" : ""
                                }`}
                                style={{
                                    background: 'rgba(255,255,255,0.85)',
                                    backdropFilter: 'blur(20px)',
                                    border: '2px solid rgba(251,191,36,0.4)',
                                    boxShadow: hoveredCard === "umrah"
                                        ? "0 25px 50px -12px rgba(251,191,36,0.5), 0 0 0 2px rgba(251,191,36,0.6)"
                                        : "0 10px 40px -10px rgba(0,0,0,0.15)"
                                }}
                            >
                                <div 
                                    className="h-36 bg-cover bg-center relative"
                                    style={{ backgroundImage: "url('/umrah4.png')" }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-black rounded-full shadow-lg">
                                            ✨ MAAZ
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 text-center">
                                    <h2 className="text-3xl font-black text-slate-800 mb-1">UMRAH</h2>
                                    <p className="text-amber-600 font-bold text-lg mb-4">Lucky Draw</p>
                                    
                                    <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-black rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
                                        <span>🕌</span>
                                        <span>PLAY NOW</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mystery Box Card */}
                        <div
                            onClick={() => { playClickSound(); onSelectGame("prizes") }}
                            onMouseEnter={() => setHoveredCard("prizes")}
                            onMouseLeave={() => setHoveredCard(null)}
                            className="cursor-pointer"
                            style={{ animation: 'cardSlideUp 0.6s ease-out 0.4s both' }}
                        >
                            <div
                                className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
                                    hoveredCard === "prizes" ? "scale-[1.03] -translate-y-2" : ""
                                }`}
                                style={{
                                    background: 'rgba(255,255,255,0.85)',
                                    backdropFilter: 'blur(20px)',
                                    border: '2px solid rgba(16,185,129,0.4)',
                                    boxShadow: hoveredCard === "prizes"
                                        ? "0 25px 50px -12px rgba(16,185,129,0.5), 0 0 0 2px rgba(16,185,129,0.6)"
                                        : "0 10px 40px -10px rgba(0,0,0,0.15)"
                                }}
                            >
                                <div 
                                    className="h-36 bg-cover bg-center relative"
                                    style={{ backgroundImage: "url('/mystt.png')" }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10  to-transparent" />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-black rounded-full shadow-lg">
                                            🎁 MAAZ
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 text-center">
                                    <h2 className="text-3xl font-black text-slate-800 mb-1">MYSTERY</h2>
                                    <p className="text-emerald-600 font-bold text-lg mb-4">Prize Box</p>
                                    
                                    <button className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
                                        <span>🎁</span>
                                        <span>PLAY NOW</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes waterBlob1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(-30px, 20px) scale(1.1); }
                    50% { transform: translate(20px, -20px) scale(0.95); }
                    75% { transform: translate(-20px, -30px) scale(1.05); }
                }
                @keyframes waterBlob2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(40px, -20px) scale(1.15); }
                    50% { transform: translate(-30px, 30px) scale(0.9); }
                    75% { transform: translate(20px, 20px) scale(1.1); }
                }
                @keyframes waterBlob3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(50px, 30px) scale(1.2); }
                    66% { transform: translate(-40px, -20px) scale(0.85); }
                }
                @keyframes waterBlob4 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-60px, 40px) scale(1.15); }
                }
                @keyframes waterBlob5 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -40px) scale(1.1); }
                    66% { transform: translate(-50px, 20px) scale(0.9); }
                }
                @keyframes lineMove {
                    0% { left: -200px; opacity: 0; }
                    10% { opacity: 0.7; }
                    90% { opacity: 0.7; }
                    100% { left: 100%; opacity: 0; }
                }
                @keyframes bubbleRise {
                    0% { bottom: -50px; opacity: 0; transform: translateX(0); }
                    10% { opacity: 0.7; }
                    90% { opacity: 0.7; }
                    100% { bottom: 110%; opacity: 0; transform: translateX(30px); }
                }
                @keyframes ripple {
                    0% { transform: scale(0.8); opacity: 0.6; }
                    100% { transform: scale(2); opacity: 0; }
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.3); }
                }
                @keyframes textFlow {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 300% 50%; }
                }
                @keyframes slideIn {
                    from { transform: translateX(-30px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes cardSlideUp {
                    from { transform: translateY(40px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes confettiFly {
                    0% { 
                        transform: translate(0, 0) rotate(0deg); 
                        opacity: 1; 
                    }
                    100% { 
                        transform: translate(
                            calc(cos(var(--angle)) * var(--distance)), 
                            calc(sin(var(--angle)) * var(--distance) + 50px)
                        ) rotate(720deg); 
                        opacity: 0; 
                    }
                }
            `}</style>
        </div>
    )
}
