"use client"

import { useState, useEffect, useRef } from "react"
import GameSelector from "../../components/GameSelector"
import UmrahSpinner from "../../components/UmrahSpinner"
import PrizeBoxGame from "../../components/PrizeBoxGame"

export default function Home() {
    const [currentGame, setCurrentGame] = useState(null)
    const [particles, setParticles] = useState([])
    const [lightBeams, setLightBeams] = useState([])
    const audioContextRef = useRef(null)

    useEffect(() => {
        // Create floating gold particles
        const newParticles = Array.from({ length: 80 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 2,
            duration: Math.random() * 15 + 8,
            delay: Math.random() * 8,
            opacity: Math.random() * 0.5 + 0.2,
        }))
        setParticles(newParticles)

        // Create sweeping light beams
        const beams = Array.from({ length: 6 }, (_, i) => ({
            id: i,
            angle: i * 60 + Math.random() * 20,
            duration: Math.random() * 8 + 6,
            delay: Math.random() * 4,
        }))
        setLightBeams(beams)
    }, [])

    return (
        <div className="min-h-screen bg-black overflow-hidden relative">
            {/* Deep dark gradient background */}
            <div className="fixed inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />

            {/* Radial spotlight from center */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.08)_0%,transparent_60%)]" />

            {/* Corner accent glows */}
            <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
            <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-amber-400/3 rounded-full blur-[150px]" />

            {/* Animated light beams */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
                {lightBeams.map((beam) => (
                    <div
                        key={beam.id}
                        className="absolute top-1/2 left-1/2 w-[2px] h-[150vh] bg-gradient-to-b from-amber-400/40 via-amber-300/20 to-transparent origin-top"
                        style={{
                            transform: `rotate(${beam.angle}deg)`,
                            animationName: "sweepBeam",
                            animationDuration: `${beam.duration}s`,
                            animationTimingFunction: "ease-in-out",
                            animationIterationCount: "infinite",
                            animationDelay: `${beam.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Floating particles */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="absolute rounded-full"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            background: `radial-gradient(circle, rgba(251,191,36,${p.opacity}) 0%, transparent 70%)`,
                            animationName: "floatParticle",
                            animationDuration: `${p.duration}s`,
                            animationTimingFunction: "ease-in-out",
                            animationIterationCount: "infinite",
                            animationDelay: `${p.delay}s`,
                            boxShadow: `0 0 ${p.size * 2}px rgba(251,191,36,0.3)`,
                        }}
                    />
                ))}
            </div>

            {/* Scan lines overlay for retro casino feel */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
                }}
            />

            <style jsx>{`
        @keyframes floatParticle {
          0%, 100% { 
            transform: translateY(0) translateX(0) scale(1); 
            opacity: 0.3; 
          }
          25% { 
            transform: translateY(-30px) translateX(15px) scale(1.2); 
            opacity: 0.8; 
          }
          50% { 
            transform: translateY(-15px) translateX(-20px) scale(0.8); 
            opacity: 0.5; 
          }
          75% { 
            transform: translateY(-45px) translateX(10px) scale(1.1); 
            opacity: 0.9; 
          }
        }
        @keyframes sweepBeam {
          0%, 100% { 
            transform: rotate(var(--start-angle, 0deg)); 
            opacity: 0.3; 
          }
          50% { 
            transform: rotate(calc(var(--start-angle, 0deg) + 30deg)); 
            opacity: 0.6; 
          }
        }
      `}</style>

            {/* Main content */}
            <div className="relative z-10 min-h-screen">
                {currentGame === null ? (
                    <GameSelector onSelectGame={setCurrentGame} />
                ) : currentGame === "umrah" ? (
                    <UmrahSpinner onBack={() => setCurrentGame(null)} />
                ) : (
                    <PrizeBoxGame onBack={() => setCurrentGame(null)} />
                )}
            </div>
        </div>
    )
}
