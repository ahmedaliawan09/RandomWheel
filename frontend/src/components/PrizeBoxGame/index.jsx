"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { useSound } from "./hooks/useSound"
import { UltraConfetti, CyberBackground } from "./components"
import { EmployeeSelectionPhase, ReadyToPlayPhase, PlayingPhase, CompletedPhase } from "./phases"

export default function PrizeBoxGame({ onBack }) {
    const { playTick, playSelect, playClapping, playFanfare, playShuffle, playDrumroll, playBoxOpen, playWhoosh, soundEnabled, setSoundEnabled } = useSound()

    const [error, setError] = useState(null)
    const [data, setData] = useState({ employees: [], prizes: [] })
    const [isLoading, setIsLoading] = useState(true)

    // Load data from employee_prizez.json
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/employee_prizez.json')
                if (!response.ok) throw new Error('Failed to load data')
                const jsonData = await response.json()
                setData(jsonData)
            } catch (err) {
                setError(err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    const allEmployeesPool = useMemo(() => {
        if (!data.employees || data.employees.length === 0) return []
        return data.employees.map((emp) => ({
            id: emp.employeeId, // Use actual employeeId as unique identifier
            name: `${emp.firstName} ${emp.lastName}`,
            avatar: emp.firstName[0],
            department: emp.department,
            employeeId: emp.employeeId,
        }))
    }, [data.employees])

    const prizes = useMemo(() => {
        if (!data.prizes || data.prizes.length === 0) return []
        
        const prizeList = [...data.prizes]
        const additionalPrizes = [
            ...data.prizes.filter(p => p.tier === "Legendary" || p.tier === "Epic").slice(0, 3),
            ...data.prizes.filter(p => p.tier === "Rare").slice(0, 2)
        ]

        while (prizeList.length < 23) {
            const randomPrize = data.prizes[Math.floor(Math.random() * data.prizes.length)]
            prizeList.push({
                ...randomPrize,
                id: prizeList.length + 1,
                name: randomPrize.name + (Math.random() > 0.5 ? " Bonus" : "")
            })
        }

        const finalPrizes = prizeList.slice(0, 23)

        return finalPrizes.map((prize, index) => {
            let color = "from-emerald-400 via-green-500 to-teal-600"
            let glow = "#10b981"

            if (prize.tier === "Legendary") {
                color = "from-amber-400 via-yellow-500 to-orange-500"
                glow = "#f59e0b"
            } else if (prize.tier === "Epic") {
                color = "from-violet-400 via-purple-500 to-fuchsia-600"
                glow = "#8b5cf6"
            } else if (prize.tier === "Rare") {
                color = "from-blue-400 via-cyan-500 to-blue-600"
                glow = "#0ea5e9"
            }

            if (prize.name.includes("Maldives Trip") || prize.name.includes("Europe Tour")) {
                color = "from-cyan-400 via-blue-500 to-indigo-600"
                glow = "#06b6d4"
            } else if (prize.name.includes("Car")) {
                color = "from-red-500 via-pink-500 to-rose-600"
                glow = "#ef4444"
            } else if (prize.name.includes("Watch") || prize.name.includes("Diamond")) {
                color = "from-violet-400 via-purple-500 to-fuchsia-600"
                glow = "#8b5cf6"
            } else if (prize.name.includes("Home Theater")) {
                color = "from-amber-400 via-orange-500 to-red-500"
                glow = "#f59e0b"
            } else if (prize.name.includes("Cash")) {
                color = "from-emerald-400 via-green-500 to-teal-600"
                glow = "#10b981"
            } else if (prize.name.includes("iPhone")) {
                color = "from-slate-400 via-gray-500 to-zinc-600"
                glow = "#64748b"
            } else if (prize.name.includes("Gold")) {
                color = "from-yellow-400 via-amber-500 to-orange-500"
                glow = "#eab308"
            } else if (prize.name.includes("Education")) {
                color = "from-indigo-400 via-blue-500 to-sky-600"
                glow = "#6366f1"
            } else if (prize.name.includes("Gaming")) {
                color = "from-fuchsia-400 via-pink-500 to-rose-600"
                glow = "#d946ef"
            }

            return {
                id: index + 1,
                name: prize.name,
                icon: prize.icon,
                image: prize.image,
                tier: prize.tier,
                color: color,
                glow: glow
            }
        })
    }, [data.prizes])

    // Load persisted state from sessionStorage
    const getPersistedState = (key, defaultValue) => {
        try {
            const saved = sessionStorage.getItem(`prizeBox_${key}`)
            return saved ? JSON.parse(saved) : defaultValue
        } catch {
            return defaultValue
        }
    }

    const [gamePhase, setGamePhase] = useState(() => getPersistedState('gamePhase', 'employee-selection'))
    const [selectedEmployees, setSelectedEmployees] = useState(() => getPersistedState('selectedEmployees', []))
    const [employeeSelectionHighlight, setEmployeeSelectionHighlight] = useState(null)
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(() => getPersistedState('currentPlayerIndex', 0))
    const [boxPrizeMapping, setBoxPrizeMapping] = useState(() => getPersistedState('boxPrizeMapping', []))
    const [openedBoxes, setOpenedBoxes] = useState(() => getPersistedState('openedBoxes', []))
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null)
    const [revealedPrize, setRevealedPrize] = useState(null)
    const [prizeAssignments, setPrizeAssignments] = useState(() => getPersistedState('prizeAssignments', []))
    const [isShuffling, setIsShuffling] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const [hoveredBox, setHoveredBox] = useState(null)
    const [isSlotSpinning, setIsSlotSpinning] = useState(false)
    const [selectionCount, setSelectionCount] = useState(() => getPersistedState('selectionCount', 0))
    const [isSelecting, setIsSelecting] = useState(false)
    const [confirmBoxOpen, setConfirmBoxOpen] = useState(null)
    const [showSelectedPopup, setShowSelectedPopup] = useState(false)
    const [lastSelectedEmployee, setLastSelectedEmployee] = useState(null)
    const selectionIntervalRef = useRef(null)

    // Persist state to sessionStorage when it changes
    useEffect(() => {
        sessionStorage.setItem('prizeBox_gamePhase', JSON.stringify(gamePhase))
    }, [gamePhase])

    useEffect(() => {
        sessionStorage.setItem('prizeBox_selectedEmployees', JSON.stringify(selectedEmployees))
    }, [selectedEmployees])

    useEffect(() => {
        sessionStorage.setItem('prizeBox_currentPlayerIndex', JSON.stringify(currentPlayerIndex))
    }, [currentPlayerIndex])

    useEffect(() => {
        if (boxPrizeMapping.length > 0) {
            sessionStorage.setItem('prizeBox_boxPrizeMapping', JSON.stringify(boxPrizeMapping))
        }
    }, [boxPrizeMapping])

    useEffect(() => {
        sessionStorage.setItem('prizeBox_openedBoxes', JSON.stringify(openedBoxes))
    }, [openedBoxes])

    useEffect(() => {
        sessionStorage.setItem('prizeBox_prizeAssignments', JSON.stringify(prizeAssignments))
    }, [prizeAssignments])

    useEffect(() => {
        sessionStorage.setItem('prizeBox_selectionCount', JSON.stringify(selectionCount))
    }, [selectionCount])

    const employeesToSelect = 23

    useEffect(() => {
        try {
            // Only initialize if not already loaded from sessionStorage
            const savedMapping = sessionStorage.getItem('prizeBox_boxPrizeMapping')
            if (!savedMapping || JSON.parse(savedMapping).length === 0) {
                // Initialize mapping with prize ID 14 (index 13) fixed to box 14 (index 13)
                const initialMapping = prizes.map((_, i) => i)
                // Ensure prize 14 is in box 14 (already correct in default mapping)
                setBoxPrizeMapping(initialMapping)
            }
        } catch (err) { setError(err) }
    }, [prizes])

    const currentPlayer = selectedEmployees[currentPlayerIndex]

    const startAutomaticSelection = useCallback(() => {
        if (gamePhase !== "employee-selection" || allEmployeesPool.length === 0) return
        if (selectedEmployees.length >= employeesToSelect) return

        if (selectionIntervalRef.current) {
            clearInterval(selectionIntervalRef.current)
            selectionIntervalRef.current = null
        }

        setIsSelecting(true)
        setIsSlotSpinning(true)
        playDrumroll()

        const selected = [...selectedEmployees]
        const availableEmployees = allEmployeesPool.filter(emp =>
            !selected.some(sel => sel.id === emp.id)
        )

        if (availableEmployees.length === 0) {
            setIsSelecting(false)
            setIsSlotSpinning(false)
            return
        }

        // Shuffle available employees to randomize the order they appear
        const shuffledEmployees = [...availableEmployees]
        for (let i = shuffledEmployees.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[shuffledEmployees[i], shuffledEmployees[j]] = [shuffledEmployees[j], shuffledEmployees[i]]
        }

        // Fixed 7 seconds total - cycle through ALL employees exactly once, then continue randomly
        const totalDuration = 7000 // 7 seconds
        const employeeCount = shuffledEmployees.length
        // Calculate interval to show all employees in ~5 seconds, then 2 seconds of random cycling
        const intervalForAllEmployees = Math.floor(5000 / employeeCount)
        const interval = Math.max(25, Math.min(intervalForAllEmployees, 100)) // Between 25ms and 100ms
        const maxCycles = Math.floor(totalDuration / interval)

        let currentIndex = 0
        let cycles = 0

        // Pre-select the winner randomly from available employees
        const winnerIndex = Math.floor(Math.random() * availableEmployees.length)
        const selectedEmployee = availableEmployees[winnerIndex]

        selectionIntervalRef.current = setInterval(() => {
            try {
                // Cycle through employees sequentially (shuffled order)
                const highlightEmployee = shuffledEmployees[currentIndex % employeeCount]
                setEmployeeSelectionHighlight(highlightEmployee)
                playTick()
                
                currentIndex++
                cycles++

                if (cycles >= maxCycles) {
                    clearInterval(selectionIntervalRef.current)
                    selectionIntervalRef.current = null

                    // Show the pre-selected winner
                    setEmployeeSelectionHighlight(selectedEmployee)
                    
                    setTimeout(() => {
                        playSelect()
                        playWhoosh()
                        playClapping()

                        const newSelected = [...selected, selectedEmployee]
                        setSelectedEmployees(newSelected)
                        setSelectionCount(newSelected.length)
                        setEmployeeSelectionHighlight(null)
                        setIsSlotSpinning(false)
                        setLastSelectedEmployee(selectedEmployee)
                        setIsSelecting(false)
                        setShowSelectedPopup(true)
                    }, 100)
                }
            } catch (err) {
                setError(err)
                setIsSelecting(false)
                setIsSlotSpinning(false)
                if (selectionIntervalRef.current) {
                    clearInterval(selectionIntervalRef.current)
                    selectionIntervalRef.current = null
                }
            }
        }, interval)

    }, [gamePhase, allEmployeesPool, employeesToSelect, selectedEmployees, playDrumroll, playTick, playSelect, playWhoosh, playClapping])

    const stopSelection = useCallback(() => {
        if (!isSelecting) return

        setIsSelecting(false)
        setIsSlotSpinning(false)
        setEmployeeSelectionHighlight(null)

        if (selectionIntervalRef.current) {
            clearInterval(selectionIntervalRef.current)
            selectionIntervalRef.current = null
        }
    }, [isSelecting])

    const closeSelectedPopup = useCallback(() => {
        setShowSelectedPopup(false)
    }, [])

    const shuffleBoxes = useCallback(() => {
        try {
            setIsShuffling(true)
            let shuffleCount = 0
            const maxShuffles = 20

            const doShuffle = () => {
                try {
                    setBoxPrizeMapping((prev) => {
                        const newMapping = [...prev]
                        const unopened = []
                        for (let i = 0; i < prizes.length; i++) {
                            if (!openedBoxes.includes(i)) unopened.push(i)
                        }
                        const openedPrizes = new Set(openedBoxes.map(idx => prev[idx]))
                        const available = []
                        for (let i = 0; i < prizes.length; i++) {
                            if (!openedPrizes.has(i)) available.push(i)
                        }
                        for (let i = available.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1))
                                ;[available[i], available[j]] = [available[j], available[i]]
                        }
                        unopened.forEach((boxIdx, i) => {
                            if (i < available.length) newMapping[boxIdx] = available[i]
                        })
                        openedBoxes.forEach(idx => { newMapping[idx] = prev[idx] })
                        
                        return newMapping
                    })
                    playShuffle()
                    shuffleCount++
                    if (shuffleCount < maxShuffles) {
                        setTimeout(doShuffle, 150 + shuffleCount * 10)
                    } else {
                        setTimeout(() => {
                            setIsShuffling(false)
                            setGamePhase("playing")
                        }, 400)
                    }
                } catch (err) { setError(err) }
            }
            doShuffle()
        } catch (err) { setError(err) }
    }, [openedBoxes, prizes.length, playShuffle])

    const handleBoxClick = useCallback((boxIndex) => {
        try {
            if (isShuffling || gamePhase !== "playing" || openedBoxes.includes(boxIndex) || selectedBoxIndex !== null) return
            setConfirmBoxOpen(boxIndex)
        } catch (err) { setError(err) }
    }, [isShuffling, gamePhase, openedBoxes, selectedBoxIndex])

    const confirmOpenBox = useCallback(() => {
        if (confirmBoxOpen === null) return

        const boxIndex = confirmBoxOpen
        setSelectedBoxIndex(boxIndex)
        setConfirmBoxOpen(null)
        playBoxOpen()

        setTimeout(() => {
            const prizeIndex = boxPrizeMapping[boxIndex]
            const prize = prizes[prizeIndex]
            setRevealedPrize({ ...prize, boxIndex })
            setShowConfetti(true)
            playClapping()
            setTimeout(() => playFanfare(), 200)
            setPrizeAssignments(prev => [...prev, { employee: currentPlayer, prize, boxNumber: boxIndex + 1 }])
            setOpenedBoxes(prev => [...prev, boxIndex])
        }, 800)
    }, [confirmBoxOpen, boxPrizeMapping, prizes, playBoxOpen, playClapping, playFanfare, currentPlayer])

    const cancelOpenBox = useCallback(() => {
        setConfirmBoxOpen(null)
    }, [])

    const handleBackFromPopup = useCallback(() => {
        setShowConfetti(false)
        setRevealedPrize(null)
        setSelectedBoxIndex(null)

        if (currentPlayerIndex + 1 >= selectedEmployees.length) {
            setGamePhase("completed")
        } else {
            setCurrentPlayerIndex(prev => prev + 1)
            setGamePhase("playing")
        }
    }, [currentPlayerIndex, selectedEmployees.length])

    const startBoxGame = useCallback(() => {
        setGamePhase("shuffling")
        shuffleBoxes()
    }, [shuffleBoxes])

    const resetGame = useCallback(() => {
        if (selectionIntervalRef.current) {
            clearInterval(selectionIntervalRef.current)
            selectionIntervalRef.current = null
        }

        // Clear all persisted state
        sessionStorage.removeItem('prizeBox_gamePhase')
        sessionStorage.removeItem('prizeBox_selectedEmployees')
        sessionStorage.removeItem('prizeBox_currentPlayerIndex')
        sessionStorage.removeItem('prizeBox_boxPrizeMapping')
        sessionStorage.removeItem('prizeBox_openedBoxes')
        sessionStorage.removeItem('prizeBox_prizeAssignments')
        sessionStorage.removeItem('prizeBox_selectionCount')

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
        setHoveredBox(null)
        setIsSlotSpinning(false)
        setIsSelecting(false)
        setSelectionCount(0)
        setConfirmBoxOpen(null)
        setShowSelectedPopup(false)
        setLastSelectedEmployee(null)
        setError(null)
    }, [prizes])

    const handleBack = useCallback(() => {
        if (selectionIntervalRef.current) {
            clearInterval(selectionIntervalRef.current)
            selectionIntervalRef.current = null
        }
        setShowConfetti(false)
        onBack()
    }, [onBack])

    useEffect(() => {
        return () => {
            if (selectionIntervalRef.current) {
                clearInterval(selectionIntervalRef.current)
            }
        }
    }, [])

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
                <div className="bg-gradient-to-br from-white to-rose-50 rounded-2xl p-6 max-w-md text-center border border-rose-200 shadow-lg">
                    <div className="text-5xl mb-3">⚠️</div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h2>
                    <p className="text-slate-500 mb-4 text-sm">{error?.message || 'An error occurred'}</p>
                    <button onClick={resetGame} className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all shadow-md text-sm">
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-spin">🎁</div>
                    <p className="text-slate-500 text-lg">Loading game data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex flex-col items-center px-3 py-4 relative overflow-hidden">
            <CyberBackground />
            <UltraConfetti active={showConfetti} />

            {(gamePhase === "employee-selection" || gamePhase === "selecting-employees") && (
                <EmployeeSelectionPhase
                    allEmployeesPool={allEmployeesPool}
                    selectedEmployees={selectedEmployees}
                    employeesToSelect={employeesToSelect}
                    employeeSelectionHighlight={employeeSelectionHighlight}
                    isSlotSpinning={isSlotSpinning}
                    isSelecting={isSelecting}
                    startAutomaticSelection={startAutomaticSelection}
                    stopSelection={stopSelection}
                    onNext={() => setGamePhase("ready-to-play")}
                    playFanfare={playFanfare}
                    showSelectedPopup={showSelectedPopup}
                    lastSelectedEmployee={lastSelectedEmployee}
                    closeSelectedPopup={closeSelectedPopup}
                />
            )}

            {gamePhase === "ready-to-play" && (
                <ReadyToPlayPhase
                    selectedEmployees={selectedEmployees}
                    startBoxGame={startBoxGame}
                />
            )}

            {(gamePhase === "playing" || gamePhase === "shuffling") && (
                <PlayingPhase
                    currentPlayer={currentPlayer}
                    currentPlayerIndex={currentPlayerIndex}
                    selectedEmployees={selectedEmployees}
                    prizes={prizes}
                    openedBoxes={openedBoxes}
                    boxPrizeMapping={boxPrizeMapping}
                    selectedBoxIndex={selectedBoxIndex}
                    revealedPrize={revealedPrize}
                    isShuffling={isShuffling}
                    hoveredBox={hoveredBox}
                    setHoveredBox={setHoveredBox}
                    confirmBoxOpen={confirmBoxOpen}
                    handleBoxClick={handleBoxClick}
                    confirmOpenBox={confirmOpenBox}
                    cancelOpenBox={cancelOpenBox}
                    handleBackFromPopup={handleBackFromPopup}
                    gamePhase={gamePhase}
                />
            )}

            {gamePhase === "completed" && (
                <CompletedPhase
                    prizeAssignments={prizeAssignments}
                    prizes={prizes}
                    resetGame={resetGame}
                    onBack={handleBack}
                />
            )}
        </div>
    )
}
