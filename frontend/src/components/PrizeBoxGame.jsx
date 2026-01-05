"use client"

import { useState, useEffect, useCallback, useRef } from "react"

// Sound effects hook
function useSound() {
    const audioContextRef = useRef(null)

    const getAudioContext = useCallback(() => {
        if (typeof window === "undefined") return null
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
        }
        return audioContextRef.current
    }, [])

    const playTick = useCallback(() => {
        const ctx = getAudioContext()
        if (!ctx) return
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.frequency.value = 600 + Math.random() * 200
        osc.type = "sine"
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.05)
    }, [getAudioContext])

    const playSelect = useCallback(() => {
        const ctx = getAudioContext()
        if (!ctx) return
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.frequency.value = 1000
        osc.type = "square"
        gain.gain.setValueAtTime(0.12, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.1)
    }, [getAudioContext])

    const playReveal = useCallback(() => {
        const ctx = getAudioContext()
        if (!ctx) return
        const notes = [440, 554, 659, 880]
        notes.forEach((freq, i) => {
            setTimeout(() => {
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()
                osc.connect(gain)
                gain.connect(ctx.destination)
                osc.frequency.value = freq
                osc.type = "sine"
                gain.gain.setValueAtTime(0.15, ctx.currentTime)
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25)
                osc.start(ctx.currentTime)
                osc.stop(ctx.currentTime + 0.25)
            }, i * 80)
        })
    }, [getAudioContext])

    const playShuffle = useCallback(() => {
        const ctx = getAudioContext()
        if (!ctx) return
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.frequency.value = 200 + Math.random() * 100
        osc.type = "triangle"
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.08)
    }, [getAudioContext])

    const playDrumroll = useCallback(() => {
        const ctx = getAudioContext()
        if (!ctx) return
        let i = 0
        const interval = setInterval(() => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.frequency.value = 100 + (i % 2) * 50
            osc.type = "triangle"
            gain.gain.setValueAtTime(0.1, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
            osc.start(ctx.currentTime)
            osc.stop(ctx.currentTime + 0.05)
            i++
            if (i > 30) clearInterval(interval)
        }, 50)
    }, [getAudioContext])

    const playBoxOpen = useCallback(() => {
        const ctx = getAudioContext()
        if (!ctx) return
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.frequency.value = 300 + Math.random() * 200
        osc.type = "sawtooth"
        gain.gain.setValueAtTime(0.1, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.1)
    }, [getAudioContext])

    return { playTick, playSelect, playReveal, playShuffle, playDrumroll, playBoxOpen }
}

function Confetti({ active }) {
    const [particles, setParticles] = useState([])

    useEffect(() => {
        if (active) {
            const colors = [
                "#10b981",
                "#34d399",
                "#6ee7b7",
                "#fbbf24",
                "#f59e0b",
                "#ffffff",
                "#a855f7",
                "#ec4899",
                "#3b82f6",
                "#06b6d4",
                "#f43f5e",
                "#14b8a6",
                "#8b5cf6",
                "#fb923c",
                "#22d3ee",
            ]
            const newParticles = Array.from({ length: 150 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 0.5,
                duration: 2 + Math.random() * 1.5,
                size: 6 + Math.random() * 10,
            }))
            setParticles(newParticles)
        } else {
            setParticles([])
        }
    }, [active])

    if (!active) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.x}%`,
                        top: "-20px",
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        animationName: "confettiDrop",
                        animationDuration: `${p.duration}s`,
                        animationTimingFunction: "ease-out",
                        animationFillMode: "forwards",
                        animationDelay: `${p.delay}s`,
                        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                        boxShadow: `0 0 8px ${p.color}`,
                    }}
                />
            ))}
            <style jsx>{`
        @keyframes confettiDrop {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
        </div>
    )
}

export default function PrizeBoxGame({ onBack }) {
    const { playTick, playSelect, playReveal, playShuffle, playDrumroll, playBoxOpen } = useSound()

    // All 250+ employees pool
    const allEmployeesPool = Array.from({ length: 260 }, (_, i) => {
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
        ]
        const lastNames = [
            "Khan",
            "Ali",
            "Hassan",
            "Malik",
            "Ahmed",
            "Sheikh",
            "Qureshi",
            "Ansari",
            "Rahman",
            "Patel",
            "Syed",
            "Mirza",
            "Chaudhry",
            "Butt",
            "Awan",
        ]
        return {
            id: i + 1,
            name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
            avatar: firstNames[i % firstNames.length][0],
            department: ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations", "IT", "Legal"][i % 8],
            employeeId: 1000 + i,
        }
    })

    const prizes = [
        { id: 1, name: "Maldives Trip", icon: "🏝️", tier: "Legendary", color: "from-cyan-400 via-blue-500 to-indigo-600" },
        { id: 2, name: "Brand New Car", icon: "🚗", tier: "Legendary", color: "from-red-500 via-pink-500 to-rose-600" },
        { id: 3, name: "Diamond Watch", icon: "💎", tier: "Epic", color: "from-violet-400 via-purple-500 to-fuchsia-600" },
        { id: 4, name: "Home Theater", icon: "🎬", tier: "Epic", color: "from-amber-400 via-orange-500 to-red-500" },
        { id: 5, name: "Cash 50,000", icon: "💰", tier: "Rare", color: "from-emerald-400 via-green-500 to-teal-600" },
        { id: 6, name: "Latest iPhone", icon: "📱", tier: "Rare", color: "from-slate-400 via-gray-500 to-zinc-600" },
        { id: 7, name: "Gold Jewelry", icon: "👑", tier: "Rare", color: "from-yellow-400 via-amber-500 to-orange-500" },
        { id: 8, name: "Education Fund", icon: "🎓", tier: "Epic", color: "from-indigo-400 via-blue-500 to-sky-600" },
        { id: 9, name: "Europe Tour", icon: "✈️", tier: "Legendary", color: "from-sky-400 via-cyan-500 to-teal-600" },
        { id: 10, name: "Gaming Setup", icon: "🎮", tier: "Rare", color: "from-fuchsia-400 via-pink-500 to-rose-600" },
    ]

    const [gamePhase, setGamePhase] = useState("employee-selection")
    const [selectedEmployees, setSelectedEmployees] = useState([])
    const [employeeSelectionHighlight, setEmployeeSelectionHighlight] = useState(null)
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
    const [boxPrizeMapping, setBoxPrizeMapping] = useState([])
    const [openedBoxes, setOpenedBoxes] = useState([])
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null)
    const [revealedPrize, setRevealedPrize] = useState(null)
    const [prizeAssignments, setPrizeAssignments] = useState([])
    const [isShuffling, setIsShuffling] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const [employeesToSelect, setEmployeesToSelect] = useState(8)
    const [lockedBoxes, setLockedBoxes] = useState({})
    const selectionIntervalRef = useRef(null)

    // Initialize box-prize mapping
    useEffect(() => {
        const initialMapping = prizes.map((_, i) => i)
        setBoxPrizeMapping(initialMapping)
    }, [])

    const currentPlayer = selectedEmployees[currentPlayerIndex]

    const startEmployeeSelection = () => {
        if (gamePhase !== "employee-selection") return

        setGamePhase("selecting-employees")
        playDrumroll()

        let selectedCount = 0
        const selected = []
        const availableEmployees = [...allEmployeesPool]

        const selectNext = () => {
            if (selectedCount >= employeesToSelect) {
                setSelectedEmployees(selected)
                setGamePhase("ready-to-play")
                return
            }

            // Dramatic selection animation with 3-4 seconds duration
            let cycles = 0
            // Increased cycles for longer suspense (3-4 seconds)
            const maxCycles = 50 + Math.floor(Math.random() * 20) // 50-70 cycles

            const cycle = () => {
                const randomIndex = Math.floor(Math.random() * availableEmployees.length)
                setEmployeeSelectionHighlight(availableEmployees[randomIndex])
                playTick()
                cycles++

                if (cycles < maxCycles) {
                    // Progressive slowdown for suspense
                    const delay = 30 + cycles * 2 // Starts fast, gets slower
                    setTimeout(cycle, delay)
                } else {
                    // Final selection with extra suspense
                    const finalIndex = Math.floor(Math.random() * availableEmployees.length)
                    const selectedEmployee = availableEmployees[finalIndex]
                    setEmployeeSelectionHighlight(selectedEmployee)
                    playSelect()

                    setTimeout(() => {
                        selected.push(selectedEmployee)
                        availableEmployees.splice(finalIndex, 1)
                        selectedCount++
                        setSelectedEmployees([...selected])

                        if (selectedCount < employeesToSelect) {
                            setTimeout(selectNext, 1200)
                        } else {
                            setGamePhase("ready-to-play")
                        }
                    }, 800)
                }
            }

            cycle()
        }

        selectNext()
    }

    const shuffleBoxes = useCallback(() => {
        setIsShuffling(true)

        let shuffleCount = 0
        const maxShuffles = 15

        const doShuffle = () => {
            setBoxPrizeMapping((prevMapping) => {
                // Create a copy of current mapping
                const newMapping = [...prevMapping]

                // Find all unopened boxes
                const unopenedBoxes = []
                for (let i = 0; i < prizes.length; i++) {
                    if (!openedBoxes.includes(i)) {
                        unopenedBoxes.push(i)
                    }
                }

                // Get prizes that are NOT in opened boxes (available for shuffling)
                const openedPrizes = new Set()
                openedBoxes.forEach((boxIndex) => {
                    openedPrizes.add(prevMapping[boxIndex])
                })

                const availablePrizes = []
                for (let i = 0; i < prizes.length; i++) {
                    if (!openedPrizes.has(i)) {
                        availablePrizes.push(i)
                    }
                }

                // Fisher-Yates shuffle for available prizes
                for (let i = availablePrizes.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1))
                        ;[availablePrizes[i], availablePrizes[j]] = [availablePrizes[j], availablePrizes[i]]
                }

                // Assign shuffled prizes to unopened boxes
                unopenedBoxes.forEach((boxIndex, i) => {
                    if (i < availablePrizes.length) {
                        newMapping[boxIndex] = availablePrizes[i]
                    }
                })

                // IMPORTANT: Keep opened boxes with their original prizes
                openedBoxes.forEach((boxIndex) => {
                    newMapping[boxIndex] = prevMapping[boxIndex]
                })

                return newMapping
            })

            playShuffle()
            shuffleCount++

            if (shuffleCount < maxShuffles) {
                setTimeout(doShuffle, 180 + shuffleCount * 25)
            } else {
                setTimeout(() => {
                    setIsShuffling(false)
                    setGamePhase("playing")
                }, 500)
            }
        }

        doShuffle()
    }, [openedBoxes, prizes.length, playShuffle])

    const handleBoxClick = useCallback(
        (boxIndex) => {
            if (isShuffling || gamePhase !== "playing" || openedBoxes.includes(boxIndex) || selectedBoxIndex !== null) return

            setSelectedBoxIndex(boxIndex)
            playBoxOpen()

            setTimeout(() => {
                const prizeIndex = boxPrizeMapping[boxIndex]
                const prize = prizes[prizeIndex]

                setRevealedPrize({ ...prize, boxIndex })
                setShowConfetti(true)
                playReveal()

                setPrizeAssignments((prev) => [
                    ...prev,
                    {
                        employee: currentPlayer,
                        prize,
                        boxNumber: boxIndex + 1,
                    },
                ])

                setOpenedBoxes((prev) => [...prev, boxIndex])

                setTimeout(() => {
                    setShowConfetti(false)

                    if (currentPlayerIndex + 1 >= selectedEmployees.length) {
                        setGamePhase("completed")
                    } else {
                        setCurrentPlayerIndex((prev) => prev + 1)
                        setSelectedBoxIndex(null)
                        setRevealedPrize(null)
                        setGamePhase("playing")
                    }
                }, 3500)
            }, 1200)
        },
        [
            isShuffling,
            gamePhase,
            openedBoxes,
            boxPrizeMapping,
            prizes,
            playBoxOpen,
            playReveal,
            currentPlayer,
            currentPlayerIndex,
            selectedEmployees.length,
        ],
    )

    const startBoxGame = () => {
        setGamePhase("shuffling")
        shuffleBoxes()
    }

    const resetGame = () => {
        setGamePhase("employee-selection")
        setSelectedEmployees([])
        setEmployeeSelectionHighlight(null)
        setCurrentPlayerIndex(0)
        setBoxPrizeMapping(prizes.map((_, i) => i))
        setOpenedBoxes([])
        setSelectedBoxIndex(null)
        setRevealedPrize(null)
        setPrizeAssignments([])
        setShowConfetti(false)
        setLockedBoxes({})
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center px-4 py-6 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
                <div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
                <div
                    className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                />
            </div>

            <Confetti active={showConfetti} />

            {/* Header */}
            <div className="mb-6 text-center relative z-10">
                <button
                    onClick={onBack}
                    className="mb-4 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white rounded-xl transition-all text-sm font-bold border border-slate-600 hover:border-emerald-400/50 shadow-lg hover:shadow-emerald-500/20"
                >
                    ← Back to Games
                </button>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-3 drop-shadow-2xl">
                    MYSTERY{" "}
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                        BOX RUSH
                    </span>
                </h1>
                <p className="text-slate-300 text-lg">Select employees, then let them choose their destiny!</p>
            </div>

            {/* Phase 1: Employee Selection */}
            {(gamePhase === "employee-selection" || gamePhase === "selecting-employees") && (
                <div className="w-full max-w-5xl relative z-10">
                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 mb-6 shadow-2xl">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-3xl font-black text-white mb-1">🎰 Employee Lottery</h2>
                                <p className="text-slate-300">
                                    Selecting {employeesToSelect} lucky employees from {allEmployeesPool.length}
                                </p>
                            </div>

                            {gamePhase === "employee-selection" && (
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <label className="text-slate-200 font-semibold">Players:</label>
                                        <select
                                            value={employeesToSelect}
                                            onChange={(e) => setEmployeesToSelect(Number(e.target.value))}
                                            className="bg-slate-700/80 text-white rounded-lg px-4 py-2 border border-slate-600 hover:border-emerald-500/50 transition-colors font-semibold"
                                        >
                                            {[8, 9, 10].map((n) => (
                                                <option key={n} value={n}>
                                                    {n}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        onClick={startEmployeeSelection}
                                        className="px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black font-black rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all transform hover:scale-105 text-lg"
                                    >
                                        🎲 Start Lottery
                                    </button>
                                </div>
                            )}
                        </div>

                        {gamePhase === "selecting-employees" && employeeSelectionHighlight && (
                            <div className="mb-8 text-center">
                                <div className="inline-block bg-gradient-to-br from-emerald-500/30 via-teal-500/30 to-cyan-500/30 backdrop-blur-sm rounded-3xl p-8 border-2 border-emerald-400/60 shadow-2xl shadow-emerald-500/30">
                                    <div className="relative">
                                        <div className="absolute inset-0 animate-ping opacity-20">
                                            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500" />
                                        </div>
                                        <div className="relative w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 flex items-center justify-center text-4xl font-black text-white shadow-2xl animate-pulse border-4 border-white/30">
                                            {employeeSelectionHighlight.avatar}
                                        </div>
                                    </div>
                                    <p className="text-2xl font-black text-white mb-1">{employeeSelectionHighlight.name}</p>
                                    <p className="text-emerald-300 font-bold">{employeeSelectionHighlight.department}</p>
                                    <div className="mt-4 text-xs text-slate-300 font-mono">
                                        ID: {employeeSelectionHighlight.employeeId}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                            {Array.from({ length: employeesToSelect }).map((_, i) => {
                                const emp = selectedEmployees[i]
                                return (
                                    <div
                                        key={i}
                                        className={`rounded-xl p-5 text-center transition-all duration-500 ${emp
                                            ? "bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/20 transform scale-105"
                                            : "bg-slate-700/30 border border-slate-600/30"
                                            }`}
                                    >
                                        {emp ? (
                                            <>
                                                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 flex items-center justify-center text-xl font-black text-white shadow-lg">
                                                    {emp.avatar}
                                                </div>
                                                <p className="text-white font-bold text-sm truncate">{emp.name}</p>
                                                <p className="text-emerald-300 text-xs font-semibold">{emp.department}</p>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-slate-600/30 flex items-center justify-center text-slate-500 border-2 border-dashed border-slate-500/50">
                                                    <span className="text-3xl">?</span>
                                                </div>
                                                <p className="text-slate-400 text-sm font-semibold">Slot {i + 1}</p>
                                            </>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Phase 2: Ready to play */}
            {gamePhase === "ready-to-play" && (
                <div className="w-full max-w-4xl text-center relative z-10">
                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-10 border border-slate-700/50 mb-6 shadow-2xl">
                        <div className="text-6xl mb-6 animate-bounce">🎉</div>
                        <h2 className="text-4xl font-black text-white mb-3 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Players Selected!
                        </h2>
                        <p className="text-slate-300 text-lg mb-8">
                            {selectedEmployees.length} lucky employees will compete for amazing prizes
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-10">
                            {selectedEmployees.map((emp, i) => (
                                <div
                                    key={emp.id}
                                    className="bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-xl p-4 border border-emerald-400/40 shadow-lg hover:scale-105 transition-transform"
                                >
                                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-black text-white shadow-lg">
                                        {emp.avatar}
                                    </div>
                                    <p className="text-white font-bold text-xs truncate">{emp.name}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={startBoxGame}
                            className="px-12 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black font-black text-2xl rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/60 transition-all transform hover:scale-110"
                        >
                            🎁 Start Box Game!
                        </button>
                    </div>
                </div>
            )}

            {/* Phase 3: Box Game */}
            {(gamePhase === "playing" || gamePhase === "shuffling" || gamePhase === "revealing") && (
                <div className="w-full max-w-6xl relative z-10">
                    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-8 mb-8 shadow-2xl shadow-emerald-500/30 border-2 border-emerald-400/50">
                        <div className="flex items-center justify-between flex-wrap gap-6">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="absolute inset-0 animate-ping opacity-20">
                                        <div className="w-20 h-20 bg-white rounded-2xl" />
                                    </div>
                                    <div className="relative w-20 h-20 bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl font-black text-white border-4 border-white/40 shadow-xl">
                                        {currentPlayer?.avatar}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-emerald-100 text-xs font-black tracking-widest mb-2">
                                        🎯 PLAYER {currentPlayerIndex + 1} OF {selectedEmployees.length}
                                    </p>
                                    <h2 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">{currentPlayer?.name}</h2>
                                    <p className="text-emerald-100 font-bold text-lg">{currentPlayer?.department}</p>
                                </div>
                            </div>
                            <div className="text-right bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                <p className="text-emerald-100 text-sm font-bold mb-1">Available Prizes</p>
                                <p className="text-4xl font-black text-white">{prizes.length - openedBoxes.length}</p>
                            </div>
                        </div>
                    </div>

                    {isShuffling && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-black/90 via-slate-900/90 to-black/90 backdrop-blur-lg">
                            <div className="text-center">
                                <div className="relative mb-8">
                                    <div className="absolute inset-0 animate-ping opacity-30">
                                        <div className="text-8xl">🔀</div>
                                    </div>
                                    <div className="relative text-8xl animate-spin" style={{ animationDuration: "0.6s" }}>
                                        🔀
                                    </div>
                                </div>
                                <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text animate-pulse mb-4">
                                    SHUFFLING...
                                </h2>
                                <p className="text-slate-300 text-xl font-semibold">Prizes are moving to new positions!</p>
                            </div>
                        </div>
                    )}

                    {gamePhase === "revealing" && revealedPrize && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-black/90 via-slate-900/90 to-black/90 backdrop-blur-lg">
                            <div
                                className={`bg-gradient-to-br ${revealedPrize.color} rounded-3xl p-12 text-center max-w-lg mx-4 shadow-2xl transform animate-bounceIn border-4 border-white/30`}
                            >
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 animate-ping opacity-30">
                                        <div className="text-8xl">{revealedPrize.icon}</div>
                                    </div>
                                    <div className="relative text-8xl animate-bounce">{revealedPrize.icon}</div>
                                </div>
                                <h3 className="text-4xl font-black text-white mb-4 drop-shadow-2xl">{revealedPrize.name}</h3>
                                <div className="inline-block px-5 py-2 bg-white/30 backdrop-blur-sm rounded-full text-white text-lg font-black mb-6 border-2 border-white/40">
                                    ⭐ {revealedPrize.tier}
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/30">
                                    <p className="text-white font-black text-2xl mb-2">🎊 Congratulations!</p>
                                    <p className="text-white text-xl font-bold">{currentPlayer?.name}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                        {prizes.map((_, boxIndex) => {
                            const prizeIndex = boxPrizeMapping[boxIndex]
                            const prize = prizes[prizeIndex]
                            const isSelected = selectedBoxIndex === boxIndex
                            const isOpened = openedBoxes.includes(boxIndex)
                            const isLocked = lockedBoxes[boxIndex] !== undefined
                            const canSelect = gamePhase === "playing" && !isShuffling && selectedBoxIndex === null && !isOpened

                            return (
                                <div key={boxIndex} className="relative aspect-square">
                                    <button
                                        onClick={() => handleBoxClick(boxIndex)}
                                        disabled={!canSelect || isOpened}
                                        className={`w-full h-full rounded-2xl transition-all duration-300 ${isShuffling && !isOpened ? "animate-boxShuffle" : ""
                                            } ${canSelect ? "hover:scale-110 cursor-pointer" : ""} ${isSelected ? "scale-110 z-50" : ""
                                            } ${isOpened ? "opacity-100 cursor-not-allowed" : ""}`}
                                        style={{
                                            animationDelay: isShuffling ? `${boxIndex * 0.05}s` : "0s",
                                        }}
                                    >
                                        {/* Box exterior */}
                                        <div
                                            className={`absolute inset-0 rounded-2xl transition-all duration-500 ${isOpened
                                                ? `bg-gradient-to-br ${prize.color} border-4 border-white/40`
                                                : isSelected
                                                    ? `bg-gradient-to-br ${prize.color} border-4 border-white/50`
                                                    : "bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 border-2 border-yellow-300/50"
                                                }`}
                                            style={{
                                                boxShadow: isOpened
                                                    ? "0 20px 60px -10px rgba(0,0,0,0.6), inset 0 0 40px rgba(255,255,255,0.2)"
                                                    : canSelect
                                                        ? "0 15px 50px -10px rgba(251,191,36,0.6), 0 0 0 2px rgba(251,191,36,0.3)"
                                                        : isSelected
                                                            ? "0 25px 70px -10px rgba(16,185,129,0.8), 0 0 0 3px rgba(16,185,129,0.5)"
                                                            : "0 8px 30px -5px rgba(0,0,0,0.5)",
                                            }}
                                        >
                                            {/* Unopened box content */}
                                            {!isOpened && !isSelected && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                                    <div className="text-5xl mb-2">🎁</div>
                                                    <div className="text-slate-900 font-black text-xl">#{boxIndex + 1}</div>
                                                    {/* Enhanced shimmer effect */}
                                                    <div
                                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl overflow-hidden"
                                                        style={{
                                                            animationName: "shimmer",
                                                            animationDuration: "2s",
                                                            animationTimingFunction: "linear",
                                                            animationIterationCount: "infinite",
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {/* Opened/Revealed box content */}
                                            {(isOpened || isSelected) && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                                                    <div className="text-5xl mb-2 animate-pulse">{prize.icon}</div>
                                                    <div className="font-black text-sm text-center leading-tight">{prize.name}</div>
                                                    {isOpened && (
                                                        <div className="absolute top-2 right-2 bg-white/30 backdrop-blur-sm rounded-full w-7 h-7 flex items-center justify-center border-2 border-white/40">
                                                            <span className="text-white font-black text-xs">✓</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Enhanced hover glow */}
                                        {canSelect && (
                                            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-amber-400/0 via-yellow-400/0 to-amber-400/0 hover:from-amber-400/30 hover:via-yellow-400/40 hover:to-amber-400/30 transition-all blur-lg" />
                                        )}

                                        {/* Lock indicator */}
                                        {isLocked && (
                                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-2 border-white z-60">
                                                <span className="text-white font-bold text-sm">🔒</span>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-xl">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-slate-200 font-black text-lg">🏆 Progress</span>
                            <span className="text-emerald-400 font-black text-2xl">
                                {currentPlayerIndex}/{selectedEmployees.length}
                            </span>
                        </div>
                        <div className="h-4 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/50">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full transition-all duration-1000 shadow-lg shadow-emerald-500/50"
                                style={{ width: `${(currentPlayerIndex / selectedEmployees.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Phase 4: Game Complete */}
            {gamePhase === "completed" && (
                <div className="w-full max-w-4xl relative z-10">
                    <div className="text-center mb-10">
                        <div className="text-8xl mb-6 animate-bounce">🎊</div>
                        <h2 className="text-5xl font-black text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text mb-4">
                            Game Complete!
                        </h2>
                        <p className="text-2xl text-slate-300 font-semibold">All prizes have been distributed!</p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 mb-8 max-h-[500px] overflow-y-auto shadow-2xl">
                        <h3 className="text-2xl font-black text-white mb-6 sticky top-0 bg-gradient-to-br from-slate-800 to-slate-900 py-3 z-10 border-b-2 border-emerald-500/30">
                            🏆 Final Results
                        </h3>
                        <div className="space-y-4">
                            {prizeAssignments.map((assignment, index) => (
                                <div
                                    key={index}
                                    className={`bg-gradient-to-r ${assignment.prize.color} rounded-2xl p-5 flex items-center justify-between transform hover:scale-[1.02] transition-transform shadow-xl border-2 border-white/20`}
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl border-2 border-white/30 shadow-lg">
                                            {assignment.prize.icon}
                                        </div>
                                        <div>
                                            <p className="text-white font-black text-lg">{assignment.employee.name}</p>
                                            <p className="text-white/90 font-bold">{assignment.prize.name}</p>
                                            <p className="text-white/70 text-sm">{assignment.employee.department}</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-black text-xl border-2 border-white/30 shadow-lg">
                                        {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-5 justify-center">
                        <button
                            onClick={resetGame}
                            className="px-10 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-black font-black text-xl rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/60 transition-all transform hover:scale-105"
                        >
                            🎲 Play Again
                        </button>
                        <button
                            onClick={onBack}
                            className="px-10 py-5 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-black text-xl rounded-2xl transition-all border-2 border-slate-600 hover:border-slate-500"
                        >
                            ← Back to Games
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes boxShuffle {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(15px) translateY(-10px) rotate(8deg); }
          50% { transform: translateX(-15px) translateY(10px) rotate(-8deg); }
          75% { transform: translateX(10px) translateY(-5px) rotate(5deg); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.08); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounceIn {
          animation: bounceIn 0.7s ease-out;
        }
      `}</style>
        </div>
    )
}
