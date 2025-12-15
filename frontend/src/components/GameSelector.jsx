"use client"

import { useState, useEffect, useRef } from "react"

export default function GameSelector({ onSelectGame }) {
    const [hoveredCard, setHoveredCard] = useState(null)
    const [lightPositions, setLightPositions] = useState([])
    const [mounted, setMounted] = useState(false)
    const audioRef = useRef(null)

    useEffect(() => {
        setMounted(true)
        const positions = Array.from({ length: 20 }, (_, i) => i)
        setLightPositions(positions)
    }, [])

    const playHoverSound = () => {
        if (typeof window !== "undefined") {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
            const oscillator = audioCtx.createOscillator()
            const gainNode = audioCtx.createGain()
            oscillator.connect(gainNode)
            gainNode.connect(audioCtx.destination)
            oscillator.frequency.value = 800
            oscillator.type = "sine"
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1)
            oscillator.start(audioCtx.currentTime)
            oscillator.stop(audioCtx.currentTime + 0.1)
        }
    }

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

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="max-w-6xl w-full">
                {/* Header with animated lights */}
                <div className="text-center mb-12 relative">
                    {/* Top light strip */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[80%] max-w-lg h-1 flex justify-between items-center">
                        {lightPositions.map((i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full"
                                style={{
                                    background: "radial-gradient(circle, #fbbf24 0%, #f59e0b 50%, transparent 70%)",
                                    boxShadow: "0 0 8px #fbbf24, 0 0 16px #f59e0b",
                                    animationName: "lightBlink",
                                    animationDuration: "1.2s",
                                    animationTimingFunction: "ease-in-out",
                                    animationIterationCount: "infinite",
                                    animationDelay: `${i * 0.06}s`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Company badge */}
                    <div className="inline-block relative mb-6 mt-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 blur-xl opacity-50 animate-pulse" />
                        <div className="relative px-8 py-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full shadow-2xl">
                            <span className="text-black text-sm font-black tracking-[0.2em]">MAAZ INFORMATICS</span>
                            <div
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                style={{
                                    animationName: "shimmerEffect",
                                    animationDuration: "2s",
                                    animationTimingFunction: "linear",
                                    animationIterationCount: "infinite",
                                }}
                            />
                        </div>
                    </div>

                    {/* Main title */}
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight leading-tight">
                        <span className="block">Employee</span>
                        <span
                            className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent"
                            style={{
                                textShadow: "0 0 60px rgba(251,191,36,0.5)",
                            }}
                        >
                            Celebration
                        </span>
                    </h1>

                    {/* Subtitle with glow */}
                    <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto font-light">
                        Two extraordinary games of chance await. Select your destiny!
                    </p>
                </div>

                {/* Game Cards */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-10 px-4">
                    {/* UMRAH Game Card */}
                    <div
                        onClick={() => {
                            playClickSound()
                            onSelectGame("umrah")
                        }}
                        onMouseEnter={() => {
                            setHoveredCard("umrah")
                            playHoverSound()
                        }}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="group cursor-pointer"
                    >
                        <div
                            className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${hoveredCard === "umrah" ? "scale-[1.03] -translate-y-2" : ""
                                }`}
                            style={{
                                boxShadow:
                                    hoveredCard === "umrah"
                                        ? "0 25px 80px -10px rgba(251,191,36,0.4), 0 0 40px rgba(251,191,36,0.2)"
                                        : "0 10px 40px -10px rgba(0,0,0,0.5)",
                            }}
                        >
                            {/* Animated border */}
                            <div
                                className="absolute inset-0 rounded-2xl"
                                style={{
                                    padding: "2px",
                                    background: "linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24, #f59e0b)",
                                    backgroundSize: "300% 100%",
                                    animationName: "borderGlow",
                                    animationDuration: "3s",
                                    animationTimingFunction: "linear",
                                    animationIterationCount: "infinite",
                                }}
                            >
                                <div className="w-full h-full rounded-2xl bg-slate-900" />
                            </div>

                            {/* Running lights around border */}
                            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                                {Array.from({ length: 40 }).map((_, i) => {
                                    const perimeter = 2 * (100 + 100)
                                    const pos = (i / 40) * perimeter
                                    let top, left
                                    if (pos < 100) {
                                        top = "0%"
                                        left = `${pos}%`
                                    } else if (pos < 200) {
                                        top = `${pos - 100}%`
                                        left = "100%"
                                    } else if (pos < 300) {
                                        top = "100%"
                                        left = `${100 - (pos - 200)}%`
                                    } else {
                                        top = `${100 - (pos - 300)}%`
                                        left = "0%"
                                    }
                                    return (
                                        <div
                                            key={i}
                                            className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 -translate-x-1/2 -translate-y-1/2"
                                            style={{
                                                top,
                                                left,
                                                boxShadow: "0 0 6px #fbbf24, 0 0 12px #fbbf24",
                                                animationName: "runningLight",
                                                animationDuration: "2s",
                                                animationTimingFunction: "linear",
                                                animationIterationCount: "infinite",
                                                animationDelay: `${i * 0.05}s`,
                                            }}
                                        />
                                    )
                                })}
                            </div>

                            {/* Card content */}
                            <div className="relative z-10 p-8  flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 rounded-2xl m-[2px]">
                                {/* Corner decorations */}
                                <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-amber-500/60 rounded-tl-lg" />
                                <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-amber-500/60 rounded-br-lg" />

                                {/* Spotlight effect on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent transition-opacity duration-500 ${hoveredCard === "umrah" ? "opacity-100" : "opacity-0"
                                        }`}
                                />

                                <div className="relative">
                                    {/* Game badge */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/40 backdrop-blur-sm">
                                            <span className="text-amber-400 text-xs font-bold tracking-widest">GAME 01</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {[0, 1, 2].map((i) => (
                                                <div
                                                    key={i}
                                                    className="w-1.5 h-1.5 rounded-full bg-amber-400"
                                                    style={{
                                                        animationName: "dotPulse",
                                                        animationDuration: "1.5s",
                                                        animationTimingFunction: "ease-in-out",
                                                        animationIterationCount: "infinite",
                                                        animationDelay: `${i * 0.2}s`,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">UMRAH</h2>
                                    <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent mb-4">
                                        SELECTION
                                    </h3>

                                    {/* Description */}
                                    <p className="text-slate-400 text-base leading-relaxed">
                                        The wheel of destiny spins. Two categories, two winners. Experience heart-pounding suspense!
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="space-y-2 mb-6">
                                    {["5-6 Years Experience Pool", "7+ Years Experience Pool", "Dramatic Fake-Out Reveals"].map(
                                        (feature, i) => (
                                            <div key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                                                <div className="w-5 h-5 rounded bg-amber-500/20 flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                                    </svg>
                                                </div>
                                                <span>{feature}</span>
                                            </div>
                                        ),
                                    )}
                                </div>

                                {/* Play button */}
                                <button className="w-full py-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black font-black rounded-xl text-lg tracking-wider shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all relative overflow-hidden group/btn">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                        </svg>
                                        PLAY NOW
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mystery Box Game Card */}
                    <div
                        onClick={() => {
                            playClickSound()
                            onSelectGame("prizes")
                        }}
                        onMouseEnter={() => {
                            setHoveredCard("prizes")
                            playHoverSound()
                        }}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="group cursor-pointer"
                    >
                        <div
                            className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${hoveredCard === "prizes" ? "scale-[1.03] -translate-y-2" : ""
                                }`}
                            style={{
                                boxShadow:
                                    hoveredCard === "prizes"
                                        ? "0 25px 80px -10px rgba(16,185,129,0.4), 0 0 40px rgba(16,185,129,0.2)"
                                        : "0 10px 40px -10px rgba(0,0,0,0.5)",
                            }}
                        >
                            {/* Animated border */}
                            <div
                                className="absolute inset-0 rounded-2xl"
                                style={{
                                    padding: "2px",
                                    background: "linear-gradient(90deg, #10b981, #14b8a6, #10b981, #14b8a6)",
                                    backgroundSize: "300% 100%",
                                    animationName: "borderGlow",
                                    animationDuration: "3s",
                                    animationTimingFunction: "linear",
                                    animationIterationCount: "infinite",
                                }}
                            >
                                <div className="w-full h-full rounded-2xl bg-slate-900" />
                            </div>

                            {/* Running lights around border */}
                            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                                {Array.from({ length: 40 }).map((_, i) => {
                                    const perimeter = 2 * (100 + 100)
                                    const pos = (i / 40) * perimeter
                                    let top, left
                                    if (pos < 100) {
                                        top = "0%"
                                        left = `${pos}%`
                                    } else if (pos < 200) {
                                        top = `${pos - 100}%`
                                        left = "100%"
                                    } else if (pos < 300) {
                                        top = "100%"
                                        left = `${100 - (pos - 200)}%`
                                    } else {
                                        top = `${100 - (pos - 300)}%`
                                        left = "0%"
                                    }
                                    return (
                                        <div
                                            key={i}
                                            className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 -translate-x-1/2 -translate-y-1/2"
                                            style={{
                                                top,
                                                left,
                                                boxShadow: "0 0 6px #10b981, 0 0 12px #10b981",
                                                animationName: "runningLight",
                                                animationDuration: "2s",
                                                animationTimingFunction: "linear",
                                                animationIterationCount: "infinite",
                                                animationDelay: `${i * 0.05}s`,
                                            }}
                                        />
                                    )
                                })}
                            </div>

                            {/* Card content */}
                            <div className="relative z-10 p-8 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 rounded-2xl m-[2px]">
                                {/* Corner decorations */}
                                <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-emerald-500/60 rounded-tl-lg" />
                                <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-emerald-500/60 rounded-br-lg" />

                                {/* Spotlight effect on hover */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent transition-opacity duration-500 ${hoveredCard === "prizes" ? "opacity-100" : "opacity-0"
                                        }`}
                                />

                                <div className="relative ">
                                    {/* Game badge */}
                                    <div className="flex items-center gap-3 mb-6 ">
                                        <div className="px-4 py-1.5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-500/40 backdrop-blur-sm">
                                            <span className="text-emerald-400 text-xs font-bold tracking-widest">GAME 02</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {[0, 1, 2].map((i) => (
                                                <div
                                                    key={i}
                                                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                                                    style={{
                                                        animationName: "dotPulse",
                                                        animationDuration: "1.5s",
                                                        animationTimingFunction: "ease-in-out",
                                                        animationIterationCount: "infinite",
                                                        animationDelay: `${i * 0.2}s`,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">MYSTERY</h2>
                                    <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent mb-4">
                                        BOX RUSH
                                    </h3>

                                    {/* Description */}
                                    <p className="text-slate-400 text-base leading-relaxed">
                                        First, 8-10 lucky employees are chosen. Then, each picks a box hiding amazing prizes!
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="space-y-2 mb-6">
                                    {["Select 8-10 from 250+ Employees", "Boxes Shuffle After Each Pick", "Prizes Move Secretly"].map(
                                        (feature, i) => (
                                            <div key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                                                <div className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                                    </svg>
                                                </div>
                                                <span>{feature}</span>
                                            </div>
                                        ),
                                    )}
                                </div>

                                {/* Play button */}
                                <button className="w-full  py-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-black font-black rounded-xl text-lg tracking-wider shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all relative overflow-hidden group/btn">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                        </svg>
                                        PLAY NOW
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-12">
                    <p className="text-slate-600 text-xs tracking-[0.2em] uppercase">Fair & Transparent Random Selection</p>
                </div>

                <style jsx>{`
          @keyframes lightBlink {
            0%, 100% { opacity: 0.2; transform: scale(0.6); }
            50% { opacity: 1; transform: scale(1.3); }
          }
          @keyframes borderGlow {
            0% { background-position: 0% 50%; }
            100% { background-position: 300% 50%; }
          }
          @keyframes runningLight {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
          @keyframes dotPulse {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes shimmerEffect {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
            </div>
        </div>
    )
}
