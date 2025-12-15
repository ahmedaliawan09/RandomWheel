"use client"

import { useState, useEffect, useRef, useCallback } from "react"

// Background Music Hook
function useBackgroundMusic() {
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        audioRef.current = new Audio("/asma-ul-husna.mp3")
        audioRef.current.loop = true
        audioRef.current.volume = 0.3

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [])

    const playMusic = useCallback(() => {
        if (audioRef.current && !isPlaying) {
            audioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch((e) => console.log("Audio play failed:", e))
        }
    }, [isPlaying])

    const pauseMusic = useCallback(() => {
        if (audioRef.current && isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
        }
    }, [isPlaying])

    const toggleMusic = useCallback(() => {
        if (isPlaying) {
            pauseMusic()
        } else {
            playMusic()
        }
    }, [isPlaying, playMusic, pauseMusic])

    return { playMusic, pauseMusic, toggleMusic, isPlaying }
}

// Confetti Component
function Confetti({ active }) {
    const [particles, setParticles] = useState([])

    useEffect(() => {
        if (active) {
            const colors = ["#fbbf24", "#f59e0b", "#d97706", "#22d3ee", "#06b6d4", "#a78bfa", "#f472b6", "#ffffff"]
            const newParticles = Array.from({ length: 100 }, (_, i) => ({
                id: i,
                x: 50 + (Math.random() - 0.5) * 10,
                y: 40 + (Math.random() - 0.5) * 10,
                vx: (Math.random() - 0.5) * 500,
                vy: (Math.random() - 0.5) * 300 - 200,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 1000,
            }))
            setParticles(newParticles)
            const timer = setTimeout(() => setParticles([]), 3000)
            return () => clearTimeout(timer)
        } else {
            setParticles([])
        }
    }, [active])

    if (!active || particles.length === 0) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        borderRadius: "50%",
                        boxShadow: `0 0 ${p.size}px ${p.color}`,
                        animation: "confettiFall 3s ease-out forwards",
                        "--tx": `${p.vx}px`,
                        "--ty": `${p.vy}px`,
                        "--rot": `${p.rotationSpeed}deg`,
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes confettiFall {
                    0% {
                        transform: translate(0, 0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(var(--tx), calc(var(--ty) + 300px)) rotate(var(--rot));
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    )
}

export default function UmrahSpinner({ onBack }) {
    const { toggleMusic, isPlaying, playMusic } = useBackgroundMusic()

    const generateEmployees = useCallback((category) => {
        const firstNames = [
            "Ahmed",
            "Fatima",
            "Omar",
            "Sara",
            "Hassan",
            "Aisha",
            "Ali",
            "Maryam",
            "Yusuf",
            "Zahra",
            "Ibrahim",
            "Khadija",
            "Bilal",
            "Amina",
            "Tariq",
            "Nadia",
            "Jamal",
            "Huda",
            "Kareem",
            "Layla",
            "Muhammad",
            "Ayesha",
            "Abdullah",
            "Zainab",
            "Usman",
            "Ruqayya",
            "Yaqub",
            "Sumaya",
            "Sulaiman",
            "Hafsa",
            "Ishaq",
            "Safiya",
            "Dawood",
            "Umm",
            "Musa",
            "Khawla",
            "Harun",
            "Halima",
            "Idris",
            "Rayhana",
            "Nuh",
            "Juwayriya",
            "Lut",
            "Maymuna",
            "Shuaib",
            "Umamah",
            "Salih",
            "Shifa",
            "Hud",
            "Nasiba",
            "Ilyas",
            "Baraka",
            "Dhul",
            "Thurayya",
            "Uzair",
            "Asiya",
            "Luqman",
            "Balqis",
            "Zakariya",
            "Mawada",
            "Yahya",
            "Rahma",
            "Isa",
            "Sakina",
            "Ahmad",
            "Tasneem",
            "Qasim",
            "Naima",
            "Uthman",
            "Sawda",
            "Zubayr",
            "Hasna",
            "Talha",
            "Amira",
            "Saad",
        ]
        const lastNames = ["Khan", "Ali", "Hassan", "Malik", "Ahmed", "Sheikh", "Qureshi", "Ansari", "Rahman", "Patel"]

        const count = category === "junior" ? 55 : 58
        const startId = category === "junior" ? 1 : 100

        return Array.from({ length: count }, (_, i) => ({
            id: startId + i,
            name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
            avatar: firstNames[i % firstNames.length][0],
        }))
    }, [])

    // States
    const [categorySelected, setCategorySelected] = useState(null)
    const [gameState, setGameState] = useState("ready")
    const [employees, setEmployees] = useState([])
    const [winner, setWinner] = useState(null)
    const [scrollOffset, setScrollOffset] = useState(0)
    const [showConfetti, setShowConfetti] = useState(false)
    const animationRef = useRef(null)
    const startTimeRef = useRef(0)
    const winnerIndexRef = useRef(-1)
    const targetScrollRef = useRef(0)
    const phaseStartRef = useRef(0) // Declare phaseStart variable

    const ITEM_HEIGHT = 80
    const CONTAINER_HEIGHT = 320 // h-80 = 20rem = 320px
    const YELLOW_BOX_CENTER = CONTAINER_HEIGHT / 2 // 160px from top

    const selectCategory = useCallback(
        (category) => {
            setCategorySelected(category)
            setEmployees(generateEmployees(category))
            setGameState("ready")
            setScrollOffset(0)
            winnerIndexRef.current = -1
            phaseStartRef.current = 0 // Reset phaseStart on category selection
        },
        [generateEmployees],
    )

    const startSpinning = useCallback(() => {
        if (!employees.length || animationRef.current) return

        setGameState("spinning")
        setShowConfetti(false)
        setWinner(null)

        // Choose a random winner index
        const randomWinnerIndex = Math.floor(Math.random() * employees.length)
        winnerIndexRef.current = randomWinnerIndex

        // Get the winner
        const chosenWinner = employees[randomWinnerIndex]

        // Calculate final target position
        const winnerTopPosition = randomWinnerIndex * ITEM_HEIGHT
        const finalTargetScroll = winnerTopPosition + ITEM_HEIGHT / 2 - YELLOW_BOX_CENTER
        const totalHeight = employees.length * ITEM_HEIGHT

        // Pick random fake-out indices (not the winner)
        const getFakeIndex = () => {
            let idx
            do {
                idx = Math.floor(Math.random() * employees.length)
            } while (idx === randomWinnerIndex)
            return idx
        }

        const fakeIndices = [getFakeIndex(), getFakeIndex(), getFakeIndex(), getFakeIndex(), getFakeIndex()]

        // Smooth easing functions
        const easings = {
            linear: (t) => t,
            easeIn: (t) => t * t * t,
            easeOut: (t) => 1 - Math.pow(1 - t, 3),
            easeInOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
            easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
            easeOutQuint: (t) => 1 - Math.pow(1 - t, 5),
            easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        }

        startTimeRef.current = performance.now()
        let lastTimestamp = startTimeRef.current

        // Animation phases breakdown:
        // Phase 1: Show ALL names smoothly (5 seconds) - scroll through entire list once
        // Phase 2-11: Suspense phases with fake-outs and direction changes (~20 seconds)

        const INITIAL_DISPLAY_DURATION = 5000 // 5 seconds to show all names
        const SUSPENSE_DURATION = 20000 // 20 seconds of suspense
        const TOTAL_DURATION = INITIAL_DISPLAY_DURATION + SUSPENSE_DURATION // 25 seconds total

        // Calculate fake stop positions
        const getFakeStopPosition = (fakeIdx) => {
            return fakeIdx * ITEM_HEIGHT + ITEM_HEIGHT / 2 - YELLOW_BOX_CENTER
        }

        const animate = (timestamp) => {
            const elapsed = timestamp - startTimeRef.current
            const deltaTime = Math.min(timestamp - lastTimestamp, 50)
            lastTimestamp = timestamp

            let newScroll = 0

            if (elapsed < INITIAL_DISPLAY_DURATION) {
                // Use easeInOut for buttery smooth start and slight slowdown at end
                const progress = elapsed / INITIAL_DISPLAY_DURATION
                const easedProgress = easings.easeInOut(progress)

                // Scroll through entire list once
                newScroll = easedProgress * totalHeight
            } else {
                const suspenseElapsed = elapsed - INITIAL_DISPLAY_DURATION
                const suspenseProgress = suspenseElapsed / SUSPENSE_DURATION

                // Base position after initial scroll (one full cycle)
                const baseScroll = totalHeight

                if (suspenseProgress < 0.12) {
                    // Slow forward movement (0-12% = ~2.4s)
                    const phaseProgress = suspenseProgress / 0.12
                    const eased = easings.easeOut(phaseProgress)
                    newScroll = baseScroll + eased * ITEM_HEIGHT * 3
                } else if (suspenseProgress < 0.22) {
                    // First fake-out - slow down dramatically toward fake name (12-22% = ~2s)
                    const phaseProgress = (suspenseProgress - 0.12) / 0.1
                    const eased = easings.easeOutQuint(phaseProgress)
                    const fakeTarget = getFakeStopPosition(fakeIndices[0])

                    // Move toward fake target then overshoot slightly
                    const overshoot = Math.sin(phaseProgress * Math.PI) * ITEM_HEIGHT * 0.3
                    newScroll =
                        baseScroll +
                        ((fakeTarget - (phaseStartRef.current % totalHeight) + totalHeight) % totalHeight) * eased * 0.4 +
                        overshoot
                } else if (suspenseProgress < 0.32) {
                    // Reverse direction slowly (22-32% = ~2s)
                    const phaseProgress = (suspenseProgress - 0.22) / 0.1
                    const eased = easings.easeInOut(phaseProgress)
                    const prevScroll = baseScroll + ITEM_HEIGHT * 4.5
                    newScroll = prevScroll - eased * ITEM_HEIGHT * 2.5
                } else if (suspenseProgress < 0.42) {
                    // Forward again, medium pace (32-42% = ~2s)
                    const phaseProgress = (suspenseProgress - 0.32) / 0.1
                    const eased = easings.easeInOut(phaseProgress)
                    const startPos = baseScroll + ITEM_HEIGHT * 2
                    newScroll = startPos + eased * ITEM_HEIGHT * 4
                } else if (suspenseProgress < 0.52) {
                    // Second fake-out - almost stop (42-52% = ~2s)
                    const phaseProgress = (suspenseProgress - 0.42) / 0.1
                    const eased = easings.easeOutExpo(phaseProgress)
                    const startPos = baseScroll + ITEM_HEIGHT * 6
                    const fakeTarget = getFakeStopPosition(fakeIndices[1])

                    // Very slow approach to fake target
                    const drift = (1 - eased) * ITEM_HEIGHT * 1.5
                    newScroll = startPos + ITEM_HEIGHT * 1.5 - drift
                } else if (suspenseProgress < 0.6) {
                    // Gentle backwards drift (52-60% = ~1.6s)
                    const phaseProgress = (suspenseProgress - 0.52) / 0.08
                    const eased = easings.easeInOut(phaseProgress)
                    const startPos = baseScroll + ITEM_HEIGHT * 7.5
                    newScroll = startPos - eased * ITEM_HEIGHT * 1.8
                } else if (suspenseProgress < 0.7) {
                    // Third fake-out with hover (60-70% = ~2s)
                    const phaseProgress = (suspenseProgress - 0.6) / 0.1
                    const eased = easings.easeOutQuint(phaseProgress)
                    const startPos = baseScroll + ITEM_HEIGHT * 5.7

                    // Tiny oscillation to tease
                    const oscillate = Math.sin(phaseProgress * Math.PI * 3) * ITEM_HEIGHT * 0.15
                    newScroll = startPos + eased * ITEM_HEIGHT * 2 + oscillate
                } else if (suspenseProgress < 0.78) {
                    // Small forward push (70-78% = ~1.6s)
                    const phaseProgress = (suspenseProgress - 0.7) / 0.08
                    const eased = easings.easeInOut(phaseProgress)
                    const startPos = baseScroll + ITEM_HEIGHT * 7.7
                    newScroll = startPos + eased * ITEM_HEIGHT * 1.5
                } else if (suspenseProgress < 0.86) {
                    // Fourth fake-out - very slow tease (78-86% = ~1.6s)
                    const phaseProgress = (suspenseProgress - 0.78) / 0.08
                    const eased = easings.easeOutQuart(phaseProgress)
                    const startPos = baseScroll + ITEM_HEIGHT * 9.2

                    // Ultra slow movement
                    newScroll = startPos + eased * ITEM_HEIGHT * 0.8
                } else if (suspenseProgress < 0.92) {
                    // Tiny backwards nudge (86-92% = ~1.2s)
                    const phaseProgress = (suspenseProgress - 0.86) / 0.06
                    const eased = easings.easeInOut(phaseProgress)
                    const startPos = baseScroll + ITEM_HEIGHT * 10
                    newScroll = startPos - eased * ITEM_HEIGHT * 0.6
                } else {
                    const phaseProgress = (suspenseProgress - 0.92) / 0.08
                    const eased = easings.easeOutQuint(phaseProgress)

                    // Calculate starting position
                    const startPos = baseScroll + ITEM_HEIGHT * 9.4

                    // Calculate target (winner position with proper offset)
                    const normalizedFinal = ((finalTargetScroll % totalHeight) + totalHeight) % totalHeight
                    const adjustedTarget = normalizedFinal + totalHeight // Add one cycle to ensure we're past start

                    // Interpolate to final position
                    newScroll = startPos + (adjustedTarget - startPos) * eased
                }
            }

            // Normalize scroll position for seamless looping
            const normalizedScroll = ((newScroll % totalHeight) + totalHeight) % totalHeight
            setScrollOffset(normalizedScroll)

            if (elapsed < TOTAL_DURATION) {
                animationRef.current = requestAnimationFrame(animate)
            } else {
                // Animation complete - snap precisely to winner
                const finalScroll = ((finalTargetScroll % totalHeight) + totalHeight) % totalHeight
                setScrollOffset(finalScroll)
                setWinner(chosenWinner)
                setGameState("revealing")
                setShowConfetti(true)
                animationRef.current = null
            }
        }

        animationRef.current = requestAnimationFrame(animate)
    }, [employees])

    // Clean up animation on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])

    // Start background music when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            playMusic()
        }, 500)

        return () => clearTimeout(timer)
    }, [playMusic])

    const goBackToCategory = useCallback(() => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
            animationRef.current = null
        }
        setCategorySelected(null)
        setGameState("ready")
        setWinner(null)
        setScrollOffset(0)
        setShowConfetti(false)
        winnerIndexRef.current = -1
    }, [])

    // Category Selection Screen
    if (!categorySelected) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
                style={{
                    backgroundImage: "url('/umrah3.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 w-full max-w-2xl mb-12 text-center">
                    <h1 className="text-5xl font-black text-white mb-4 drop-shadow-lg">UMRAH SELECTION</h1>
                    <p className="text-white/90 text-lg mb-12 drop-shadow">Choose an experience category</p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { key: "junior", label: "5-6 Years", description: "Experience Pool" },
                            { key: "senior", label: "7+ Years", description: "Experience Pool" },
                        ].map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => selectCategory(cat.key)}
                                className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:scale-105 border-2 border-white/20 hover:border-white/40"
                                style={{
                                    background:
                                        cat.key === "junior"
                                            ? "linear-gradient(135deg, rgba(14, 116, 144, 0.9) 0%, rgba(22, 78, 99, 0.9) 100%)"
                                            : "linear-gradient(135deg, rgba(180, 83, 9, 0.9) 0%, rgba(120, 53, 15, 0.9) 100%)",
                                    boxShadow: `0 0 40px ${cat.key === "junior" ? "rgba(34,211,238,0.5)" : "rgba(251,191,36,0.5)"}`,
                                }}
                            >
                                <div className="relative z-10 text-center">
                                    <div
                                        className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl font-black text-white border-4 border-white/50"
                                        style={{
                                            background:
                                                cat.key === "junior"
                                                    ? "linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)"
                                                    : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                                            boxShadow: `0 0 30px ${cat.key === "junior" ? "rgba(34,211,238,0.8)" : "rgba(251,191,36,0.8)"}`,
                                        }}
                                    >
                                        {cat.label.split(" ")[0][0]}
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2">{cat.label}</h3>
                                    <p className="text-white/90">{cat.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-12">
                        <button
                            onClick={toggleMusic}
                            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full border border-white/30 transition-all duration-200 flex items-center gap-3 mx-auto"
                        >
                            <span className="text-xl">{isPlaying ? "🔊" : "🔇"}</span>
                            <span className="font-semibold">{isPlaying ? "Music Playing" : "Music Muted"}</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Calculate which item index is currently in the yellow box center
    const totalHeight = employees.length * ITEM_HEIGHT
    const currentCenterIndex =
        Math.round((scrollOffset + YELLOW_BOX_CENTER - ITEM_HEIGHT / 2) / ITEM_HEIGHT) % employees.length

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
            style={{
                backgroundImage: "url('/umrah3.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 w-full max-w-md mb-12">
                <div className="rounded-2xl border-2 border-amber-500/50 p-8 bg-slate-900/80 shadow-2xl shadow-amber-500/20">
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={goBackToCategory}
                            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="font-medium">Change Category</span>
                        </button>

                        <div className="text-center">
                            <span className="text-amber-300 text-xs font-bold tracking-widest drop-shadow">NAMES APPROACHING</span>
                        </div>

                        <button
                            onClick={toggleMusic}
                            className="text-white/90 hover:text-white transition-colors duration-200"
                            title={isPlaying ? "Mute Music" : "Play Music"}
                        >
                            <span className="text-xl">{isPlaying ? "🔊" : "🔇"}</span>
                        </button>
                    </div>

                    <div className="relative h-80 bg-gradient-to-b from-slate-900/80 to-slate-900/60 rounded-lg overflow-hidden mb-8 border border-amber-500/50">
                        {/* Yellow highlight bar in center */}
                        <div className="absolute top-1/2 left-0 right-0 h-20 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent -translate-y-1/2 z-20 pointer-events-none border-t-2 border-b-2 border-amber-400/70 shadow-lg shadow-amber-400/40">
                            {gameState === "revealing" && winner && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-amber-300 font-bold text-lg animate-pulse bg-black/50 px-4 py-1 rounded-full backdrop-blur-sm">
                                        🏆 WINNER 🏆
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative h-full overflow-hidden">
                            <div
                                className="will-change-transform"
                                style={{
                                    transform: `translateY(-${scrollOffset}px)`,
                                    backfaceVisibility: "hidden",
                                }}
                            >
                                {/* Repeat employees 3 times for seamless scrolling */}
                                {Array.from({ length: 3 })
                                    .flatMap(() => employees)
                                    .map((emp, idx) => {
                                        const actualIndex = idx % employees.length
                                        const isWinnerItem = winner && winner.id === emp.id
                                        const isInYellowBox = gameState === "revealing" && isWinnerItem

                                        return (
                                            <div
                                                key={idx}
                                                className="h-20 flex items-center justify-center text-2xl font-bold text-white transition-all duration-100"
                                                style={{
                                                    background: isInYellowBox
                                                        ? "linear-gradient(to right, rgba(251,191,36,0.5), rgba(251,191,36,0.7), rgba(251,191,36,0.5))"
                                                        : "linear-gradient(to right, rgba(15,23,42,0.1), rgba(251,191,36,0.1), rgba(15,23,42,0.1))",
                                                    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                                                }}
                                            >
                                                <div
                                                    className={`transition-all duration-300 ${isInYellowBox ? "scale-110 text-amber-300 animate-pulse" : ""}`}
                                                >
                                                    {emp.name}
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>

                    {/* WINNER POPUP */}
                    {winner && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <div className="absolute inset-0 bg-black/70" onClick={() => { }}></div>
                            <div className="relative z-10 w-full max-w-md animate-in zoom-in duration-500">
                                <div className="bg-gradient-to-br from-amber-500/90 via-yellow-500/80 to-orange-500/80 rounded-2xl p-8 border-4 border-amber-300 shadow-2xl shadow-amber-400/50 text-center backdrop-blur-sm">
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-amber-400 text-black font-black px-6 py-2 rounded-full text-sm animate-pulse">
                                            🎉 CONGRATULATIONS 🎉
                                        </div>
                                    </div>

                                    <div className="mt-8 mb-6">
                                        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-400 flex items-center justify-center text-6xl font-black text-white shadow-2xl shadow-amber-400/70 border-4 border-amber-300 animate-bounce">
                                            {winner.avatar}
                                        </div>

                                        <h3 className="text-4xl font-black text-white mb-3 leading-tight drop-shadow">{winner.name}</h3>

                                        <p className="text-amber-200 text-sm font-bold mb-2 drop-shadow">
                                            Employee ID: {String(winner.id).padStart(3, "0")}
                                        </p>

                                        <div className="h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent my-6" />

                                        <p className="text-amber-100 font-bold text-lg mb-6 drop-shadow">Selected for Umrah Package 2024</p>

                                        <div className="flex justify-center gap-4 text-3xl mb-6">
                                            <span className="animate-pulse">✨</span>
                                            <span className="animate-bounce">🎊</span>
                                            <span className="animate-pulse">✨</span>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setGameState("ready")
                                                setWinner(null)
                                                setShowConfetti(false)
                                            }}
                                            className="mt-4 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-black py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-amber-400/50 text-lg"
                                        >
                                            CONTINUE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4 mt-8">
                        {gameState === "ready" && (
                            <button
                                onClick={startSpinning}
                                className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-black py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-amber-400/50 text-lg"
                            >
                                SPIN THE DRUM
                            </button>
                        )}
                        {gameState === "spinning" && (
                            <button
                                disabled
                                className="flex-1 bg-gradient-to-r from-amber-400/50 to-yellow-500/50 text-black font-black py-4 px-6 rounded-lg text-lg cursor-not-allowed"
                            >
                                SPINNING...
                            </button>
                        )}
                        {gameState === "revealing" && (
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => {
                                        if (animationRef.current) {
                                            cancelAnimationFrame(animationRef.current)
                                            animationRef.current = null
                                        }
                                        setGameState("ready")
                                        setWinner(null)
                                        setScrollOffset(0)
                                        setShowConfetti(false)
                                        winnerIndexRef.current = -1
                                    }}
                                    className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-black py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-amber-400/50"
                                >
                                    New Selection
                                </button>
                                <button
                                    onClick={() => {
                                        if (animationRef.current) {
                                            cancelAnimationFrame(animationRef.current)
                                            animationRef.current = null
                                        }
                                        setCategorySelected(null)
                                        setGameState("ready")
                                        setWinner(null)
                                        setScrollOffset(0)
                                        setShowConfetti(false)
                                        winnerIndexRef.current = -1
                                    }}
                                    className="flex-1 bg-slate-700/80 hover:bg-slate-600/80 text-white font-black py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    Back to Category
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Confetti active={showConfetti} />
        </div>
    )
}
