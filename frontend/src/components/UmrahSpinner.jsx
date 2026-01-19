"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { UltraConfetti } from "./PrizeBoxGame/components/UltraConfetti"

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

    return { playMusic, isPlaying }
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

// Spinning Wheel Component
function SpinningWheel({ employees, rotation, isSpinning, onSpin, gameState, isSeniorCategory }) {
    const wheelSize = 580
    const centerSize = 100
    const segmentCount = employees.length
    const displayEmployees = employees
    const segmentAngle = 360 / segmentCount

    const colors = [
        "#f59e0b", "#0891b2", "#d97706", "#0e7490",
        "#b45309", "#155e75", "#92400e", "#164e63",
        "#78350f", "#083344", "#fbbf24", "#22d3ee",
        "#f97316", "#06b6d4", "#ea580c", "#0284c7"
    ]

    return (
        <div className="relative" style={{ width: wheelSize, height: wheelSize }}>
            {/* Pointer/Arrow on RIGHT side (horizontal) */}
            <div className="absolute top-1/2 -right-5 -translate-y-1/2 z-30">
                <div
                    className="w-0 h-0 border-t-[22px] border-b-[22px] border-r-[44px] border-t-transparent border-b-transparent"
                    style={{
                        borderRightColor: "#ffffffff",
                        filter: "drop-shadow(0 0 12px rgba(255, 255, 0, 1)) drop-shadow(0 0 25px rgba(251,191,36,0.6))"
                    }}
                />
            </div>

            {/* Outer glow ring */}
            <div
                className="absolute inset-0 rounded-full"
                style={{
                    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
                    padding: "12px",
                    boxShadow: isSpinning
                        ? "0 0 60px rgba(251,191,36,0.9), 0 0 120px rgba(251,191,36,0.5)"
                        : "0 0 30px rgba(251,191,36,0.6)",
                    transition: "box-shadow 0.3s ease"
                }}
            >
                {/* Wheel container */}
                <div
                    className="w-full h-full rounded-full overflow-hidden relative"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: isSpinning ? "none" : "transform 0.1s ease-out",
                        background: "#1e293b"
                    }}
                >
                    {/* SVG Wheel */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {displayEmployees.map((emp, index) => {
                            const startAngle = index * segmentAngle - 90
                            const endAngle = startAngle + segmentAngle
                            const startRad = (startAngle * Math.PI) / 180
                            const endRad = (endAngle * Math.PI) / 180
                            const midAngle = (startAngle + endAngle) / 2
                            const midRad = (midAngle * Math.PI) / 180

                            const x1 = 50 + 50 * Math.cos(startRad)
                            const y1 = 50 + 50 * Math.sin(startRad)
                            const x2 = 50 + 50 * Math.cos(endRad)
                            const y2 = 50 + 50 * Math.sin(endRad)

                            const largeArc = segmentAngle > 180 ? 1 : 0

                            // Position text along the segment, reading from outer edge toward center
                            const textRadius = 35
                            const textX = 50 + textRadius * Math.cos(midRad)
                            const textY = 50 + textRadius * Math.sin(midRad)

                            // Rotate text to be horizontal (readable)
                            // Adjust rotation so text reads naturally
                            let textRotation = midAngle
                            // If text would be upside down, flip it
                            if (midAngle > 90 && midAngle < 270) {
                                textRotation = midAngle + 180
                            }

                            // Get the first word of firstName (e.g., "ABDULLAH" from "ABDULLAH NASEER")
                            const fullFirstName = emp.firstName || emp.name.split(" ")[0]
                            const nameParts = fullFirstName.split(" ")
                            const firstWord = nameParts[0]
                            // For senior category: If firstName is just "MUHAMMAD", show "M. lastName"
                            // If firstName is "MUHAMMAD SOMETHING", show "M. SOMETHING"
                            let displayName = firstWord
                            if (isSeniorCategory) {
                                if (firstWord.toUpperCase() === "MUHAMMAD") {
                                    if (nameParts.length > 1) {
                                        displayName = `M. ${nameParts[1]}`
                                    } else if (emp.lastName) {
                                        displayName = `M. ${emp.lastName}`
                                    }
                                } else if (firstWord.toUpperCase() === "M." && nameParts.length > 1) {
                                    displayName = `M. ${nameParts[1]}`
                                }
                            }

                            return (
                                <g key={index}>
                                    <path
                                        d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                        fill={colors[index % colors.length]}
                                        stroke="#0f172a"
                                        strokeWidth="0.3"
                                    />
                                    <text
                                        x={textX}
                                        y={textY}
                                        fill="white"
                                        fontSize="2.2"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                                        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.9)" }}
                                    >
                                        {displayName.length > 10 ? displayName.substring(0, 9) + ".." : displayName}
                                    </text>
                                </g>
                            )
                        })}
                    </svg>
                </div>
            </div>

            {/* Center hub with SPIN button */}
            <button
                onClick={onSpin}
                disabled={gameState !== "ready"}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center z-20 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                style={{
                    width: centerSize,
                    height: centerSize,
                    background: gameState === "ready"
                        ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)"
                        : "linear-gradient(135deg, #9ca3af 0%, #6b7280 50%, #4b5563 100%)",
                    boxShadow: gameState === "ready"
                        ? "0 4px 25px rgba(251,191,36,0.8), inset 0 2px 6px rgba(255,255,255,0.3), 0 0 40px rgba(251,191,36,0.4)"
                        : "0 4px 25px rgba(0,0,0,0.4), inset 0 2px 6px rgba(255,255,255,0.2)",
                    border: "5px solid #fef3c7",
                    cursor: gameState === "ready" ? "pointer" : "not-allowed"
                }}
            >
                <span className="text-white font-black text-lg drop-shadow-lg" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                    {gameState === "spinning" ? "..." : "SPIN"}
                </span>
            </button>
        </div>
    )
}

export default function UmrahSpinner({ onBack }) {
    const { playMusic } = useBackgroundMusic()

    // Load persisted state from sessionStorage
    const getPersistedState = (key, defaultValue) => {
        try {
            const saved = sessionStorage.getItem(`umrah_${key}`)
            return saved ? JSON.parse(saved) : defaultValue
        } catch {
            return defaultValue
        }
    }

    const [categorySelected, setCategorySelected] = useState(() => getPersistedState('categorySelected', null))
    const [gameState, setGameState] = useState("ready")
    const [employees, setEmployees] = useState([])
    const [winner, setWinner] = useState(null)
    const [rotation, setRotation] = useState(0)
    const [showConfetti, setShowConfetti] = useState(false)
    const [loading, setLoading] = useState(false)
    const animationRef = useRef(null)
    const startTimeRef = useRef(0)

    // Persist categorySelected to sessionStorage
    useEffect(() => {
        if (categorySelected) {
            sessionStorage.setItem('umrah_categorySelected', JSON.stringify(categorySelected))
        } else {
            sessionStorage.removeItem('umrah_categorySelected')
        }
    }, [categorySelected])

    const loadEmployees = useCallback(async (category) => {
        setLoading(true)
        try {
            const response = await fetch('/employees_umrah.json')
            if (!response.ok) throw new Error('Failed to load employee data')
            const data = await response.json()
            const categoryEmployees = data[category] || []
            const formattedEmployees = categoryEmployees.map(emp => ({
                id: emp.id,
                name: `${emp.firstName} ${emp.lastName}`,
                firstName: emp.firstName,
                lastName: emp.lastName,
                avatar: emp.avatar,
                department: emp.department || "N/A",
                employeeId: emp.employeeId || emp.id
            }))
            setEmployees(formattedEmployees)
            setGameState("ready")
            setRotation(0)
        } catch (error) {
            console.error('Error loading employees:', error)
            const firstNames = ["Ahmed", "Fatima", "Omar", "Sara", "Hassan", "Aisha", "Ali", "Maryam",
                "Yusuf", "Zahra", "Ibrahim", "Khadija", "Bilal", "Amina", "Tariq", "Nadia",
                "Jamal", "Huda", "Kareem", "Layla", "Muhammad", "Ayesha", "Abdullah", "Zainab",
                "Usman", "Ruqayya", "Yaqub", "Sumaya", "Sulaiman", "Hafsa", "Ishaq", "Safiya",
                "Dawood", "Umm", "Musa", "Khawla", "Harun", "Halima", "Idris", "Rayhana",
                "Nuh", "Juwayriya", "Lut", "Maymuna", "Shuaib"]
            const lastNames = ["Khan", "Ali", "Hassan", "Malik", "Ahmed", "Sheikh", "Qureshi", "Ansari"]
            const count = 49
            const fallbackEmployees = Array.from({ length: count }, (_, i) => ({
                id: i + 1,
                name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
                firstName: firstNames[i % firstNames.length],
                lastName: lastNames[i % lastNames.length],
                avatar: firstNames[i % firstNames.length][0],
                department: "Engineering",
                employeeId: `EMP${String(i + 1).padStart(3, "0")}`
            }))
            setEmployees(fallbackEmployees)
            setGameState("ready")
            setRotation(0)
        } finally {
            setLoading(false)
        }
    }, [])

    // Load employees when category is restored from sessionStorage on refresh
    useEffect(() => {
        if (categorySelected && employees.length === 0 && !loading) {
            loadEmployees(categorySelected)
        }
    }, [categorySelected, employees.length, loading, loadEmployees])

    const selectCategory = useCallback((category) => {
        setCategorySelected(category)
        loadEmployees(category)
    }, [loadEmployees])

   const startSpinning = useCallback(() => {
    if (!employees.length || animationRef.current) return

    setGameState("spinning")
    setShowConfetti(false)
    setWinner(null)

    const segmentCount = employees.length
    const segmentAngle = 360 / segmentCount
    
    const randomWinnerIndex = Math.floor(Math.random() * segmentCount)
    const chosenWinner = employees[randomWinnerIndex]

    const segmentCenterFromTop = randomWinnerIndex * segmentAngle + segmentAngle / 2
    const targetAngle = (450 - segmentCenterFromTop) % 360

    // ───────────────────────────────────────────────────────────────
    //          SPIN SETTINGS - Wheel keeps spinning until popup
    // ───────────────────────────────────────────────────────────────
    const SPIN_DURATION = 52000  // 8 seconds total spin time
    const POPUP_DELAY = 2500    // 2.5 seconds after wheel stops

    const totalSpins = 8        // number of full rotations
    const totalRotation = totalSpins * 360 + targetAngle

    startTimeRef.current = performance.now()
    setRotation(0)
    let lastRotation = 0

    const animate = (timestamp) => {
        const elapsed = timestamp - startTimeRef.current
        const progress = Math.min(elapsed / SPIN_DURATION, 1)
        
        // Cubic ease-out for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentRotation = totalRotation * easeOut

        setRotation(currentRotation)
        lastRotation = currentRotation

        if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate)
        } else {
            // Wheel has stopped - show popup after short delay
            setRotation(totalRotation)
            animationRef.current = null
            
            setTimeout(() => {
                setWinner(chosenWinner)
                setGameState("revealing")
                setShowConfetti(true)
            }, POPUP_DELAY)
        }
    }

    animationRef.current = requestAnimationFrame(animate)
}, [employees])

    useEffect(() => {
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => playMusic(), 500)
        return () => clearTimeout(timer)
    }, [playMusic])

    const goBackToCategory = useCallback(() => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
            animationRef.current = null
        }
        sessionStorage.removeItem('umrah_categorySelected')
        setCategorySelected(null)
        setEmployees([])
        setGameState("ready")
        setWinner(null)
        setRotation(0)
        setShowConfetti(false)
    }, [])

    const resetGame = useCallback(() => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
            animationRef.current = null
        }
        setGameState("ready")
        setWinner(null)
        setRotation(0)
        setShowConfetti(false)
    }, [])

    // Category Selection Screen
    if (!categorySelected) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center   relative overflow-hidden"
                style={{
                    backgroundImage: "url('/umrah4.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 z-20 group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/80 to-yellow-500/80 hover:from-amber-600 hover:to-yellow-600 text-black font-bold rounded-full transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back to Games</span>
                </button>

                <div className="relative z-10 w-full max-w-2xl mb-12 text-center">
                    <h1 className="text-5xl font-black text-white mb-4 drop-shadow-lg">UMRAH SELECTION</h1>
                    <p className="text-white text-lg mb-12 drop-shadow">Choose an experience category</p>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { key: "junior", label: "5 to Below 7 Years Experience" },
                                { key: "senior", label: "7+ Years Experience" },
                            ].map((cat) => (
                                <button
                                    key={cat.key}
                                    onClick={() => selectCategory(cat.key)}
                                    className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:scale-105 border-2 border-white/20 hover:border-white/40"
                                    style={{
                                        background: cat.key === "junior"
                                            ? "linear-gradient(135deg, rgba(14, 116, 144, 0.9) 0%, rgba(22, 78, 99, 0.9) 100%)"
                                            : "linear-gradient(135deg, rgba(180, 83, 9, 0.9) 0%, rgba(120, 53, 15, 0.9) 100%)",
                                        boxShadow: `0 0 40px ${cat.key === "junior" ? "rgba(34,211,238,0.5)" : "rgba(251,191,36,0.5)"}`,
                                    }}
                                >
                                    <div className="relative z-10 text-center">
                                        <div
                                            className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl font-black text-white border-4 border-white/50"
                                            style={{
                                                background: cat.key === "junior"
                                                    ? "linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)"
                                                    : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                                                boxShadow: `0 0 30px ${cat.key === "junior" ? "rgba(34,211,238,0.8)" : "rgba(251,191,36,0.8)"}`,
                                            }}
                                        >
                                            {cat.label.split(" ")[0][0]}
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-2">{cat.label}</h3>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-4 relative overflow-hidden"
            style={{
                backgroundImage: "url('/bgspinner1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >


            {/* Change Category Button - Top Left */}
            <button
                onClick={goBackToCategory}
                className="absolute top-4 left-4 z-20 group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/100 to-yellow-500/100 hover:from-amber-600 hover:to-yellow-600 text-black font-bold rounded-full transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105"
            >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Change Category</span>
            </button>

            {/* Main Content - Wheel centered */}
            <div className="relative z-10 flex items-center gap-8">
                {/* Spinning Wheel with integrated SPIN button */}
                <SpinningWheel
                    employees={employees}
                    rotation={rotation}
                    isSpinning={gameState === "spinning"}
                    onSpin={startSpinning}
                    gameState={gameState}
                    isSeniorCategory={categorySelected === 'senior'}
                />

                {/* Action buttons - Right side of wheel */}
                <div className="flex flex-col gap-4">
                    {gameState === "revealing" && (
                        <>
                            <button
                                onClick={resetGame}
                                className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-black py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-xl shadow-amber-400/50 whitespace-nowrap"
                            >
                                🔄 New Selection
                            </button>
                            <button
                                onClick={goBackToCategory}
                                className="bg-slate-700/80 hover:bg-slate-600/80 text-white font-black py-4 px-6 rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-xl whitespace-nowrap"
                            >
                                ← Back to Category
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Winner Popup */}
            {winner && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                    <UltraConfetti active={showConfetti} />
                    <div className="relative z-10 w-full max-w-md animate-in zoom-in duration-500">
                        <div className="bg-gradient-to-br from-amber-500/90 via-yellow-500/80 to-orange-500/80 rounded-2xl p-8 border-4 border-amber-300 shadow-2xl shadow-amber-400/50 text-center backdrop-blur-sm">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <div className="bg-amber-400 text-black font-black px-6 py-2 rounded-full text-sm animate-pulse">
                                    🎉 CONGRATULATIONS 🎉
                                </div>
                            </div>

                            <div className="mt-8 mb-6">
                                <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 via-yellow-300 to-orange-400 flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-amber-400/70 border-4 border-amber-300">
                                    🏆
                                </div>

                                <h3 className="text-3xl font-black text-white mb-3 leading-tight drop-shadow animate-bounce">
                                    {(() => {
                                        // For senior category, if first name is Muhammad, show "M. SecondName LastName"
                                        if (categorySelected === 'senior') {
                                            const nameParts = (winner.firstName || winner.name.split(" ")[0]).split(" ")
                                            const firstWord = nameParts[0]
                                            if (firstWord.toUpperCase() === "MUHAMMAD") {
                                                if (nameParts.length > 1) {
                                                    return `M. ${nameParts[1]} ${winner.lastName}`
                                                } else if (winner.lastName) {
                                                    return `M. ${winner.lastName}`
                                                }
                                            } else if (firstWord.toUpperCase() === "M." && nameParts.length > 1) {
                                                return `M. ${nameParts[1]} ${winner.lastName}`
                                            }
                                        }
                                        return winner.name
                                    })()}
                                </h3>

                                 

                                {winner.department && winner.department !== "N/A" && (
                                    <p className="text-amber-100 text-sm font-medium mb-2 drop-shadow">
                                        Department: {winner.department}
                                    </p>
                                )}

                                <div className="h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent my-6" />

                                <p className="text-amber-100 font-bold text-lg mb-6 drop-shadow">Selected for Umrah Package 2026</p>

                                <div className="flex justify-center gap-4 text-3xl mb-6">
                                    <span className="animate-pulse">✨</span>
                                    <span className="animate-bounce">🎊</span>
                                    <span className="animate-pulse">✨</span>
                                </div>

                                <button
                                    onClick={resetGame}
                                    className="mt-4 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-black py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-amber-400/50 text-lg"
                                >
                                    CONTINUE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Confetti active={showConfetti} />
        </div>
    )
}



