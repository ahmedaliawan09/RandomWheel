"use client"

import { HoloCard } from '../components/HoloCard'
import { UltraConfetti } from '../components/UltraConfetti'

export function PlayingPhase({
    currentPlayer,
    currentPlayerIndex,
    selectedEmployees,
    prizes,
    openedBoxes,
    boxPrizeMapping,
    selectedBoxIndex,
    revealedPrize,
    isShuffling,
    hoveredBox,
    setHoveredBox,
    confirmBoxOpen,
    handleBoxClick,
    confirmOpenBox,
    cancelOpenBox,
    handleBackFromPopup,
    gamePhase
}) {
    return (
        <>
            {/* Background Image - canva1.png */}
            <div 
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: 'url(/canva1.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            <div className="w-full max-w-6xl relative z-10">
            <div className="grid lg:grid-cols-3 gap-5">
                {/* LEFT COLUMN: Current Player Info */}
                <div className="lg:col-span-1">
                    <div className="sticky top-4">
                        <HoloCard className="h-full" variant="purple" active>
                            <div className="p-6">
                                <div className="flex flex-col items-center text-center">
                                    <div className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white text-base font-bold tracking-wider shadow-md mb-5">
                                        PLAYER {currentPlayerIndex + 1} OF {selectedEmployees.length}
                                    </div>

                                    <div className="relative mb-4">
                                        <div 
                                            className="absolute -inset-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full blur-lg opacity-50"
                                            style={{ animation: 'pulse 2s ease-in-out infinite' }}
                                        />
                                        <div className="relative w-28 h-28 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl font-black text-white shadow-xl border-4 border-white">
                                            {currentPlayer?.avatar}
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-black text-slate-800 mb-2">{currentPlayer?.name}</h2>
                                    <p className="text-slate-500 font-semibold text-base mb-5">{currentPlayer?.department}</p>

                                    <div className="grid grid-cols-2 gap-4 w-full mb-6">
                                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100 text-center">
                                            <p className="text-slate-500 text-sm font-bold mb-2">PRIZES LEFT</p>
                                            <p className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                                {prizes.length - openedBoxes.length}
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-100 text-center">
                                            <p className="text-slate-500 text-sm font-bold mb-2">BOXES OPENED</p>
                                            <p className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                                {openedBoxes.length}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <p className="text-slate-600 font-bold text-base mb-3 text-left">Game Progress</p>
                                        <div className="h-3 bg-slate-200 rounded-full overflow-hidden mb-2">
                                            <div
                                                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-800"
                                                style={{ width: `${(currentPlayerIndex / selectedEmployees.length) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-slate-400 text-sm text-right">{currentPlayerIndex}/{selectedEmployees.length} Players</p>
                                    </div>
                                </div>
                            </div>
                        </HoloCard>
                    </div>
                </div>

                {/* RIGHT COLUMN: Prize Boxes Grid */}
                <div className="lg:col-span-2">
                    {/* Shuffling Overlay */}
                    {isShuffling && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
                            <div className="text-center flex flex-col items-center">
                                {/* Boxes Loading Animation */}
                                <div className="boxes-loader mb-6">
                                    <div className="box box0"><div /></div>
                                    <div className="box box1"><div /></div>
                                    <div className="box box2"><div /></div>
                                    <div className="box box3"><div /></div>
                                    <div className="box box4"><div /></div>
                                    <div className="box box5"><div /></div>
                                    <div className="box box6"><div /></div>
                                    <div className="box box7"><div /></div>
                                    <div className="ground"><div /></div>
                                </div>
                                
                                <p className="text-white text-lg font-semibold mb-8 mt-12">Prizes are being randomized!</p>
                                
                                {/* Eyes Animation */}
                                <div className="eyes-loader" />
                            </div>
                            
                            <style>{`
                                .boxes-loader {
                                    --duration: 3s;
                                    --primary: rgba(39, 94, 254, 1);
                                    --primary-light: #2f71ff;
                                    --primary-rgba: rgba(39, 94, 254, 0);
                                    width: 200px;
                                    height: 320px;
                                    position: relative;
                                    transform-style: preserve-3d;
                                    zoom: 0.6;
                                }
                                @media (max-width: 480px) {
                                    .boxes-loader { zoom: 0.44; }
                                }
                                .boxes-loader:before, .boxes-loader:after {
                                    --r: 20.5deg;
                                    content: "";
                                    width: 320px;
                                    height: 140px;
                                    position: absolute;
                                    right: 32%;
                                    bottom: -11px;
                                    background: #e8e8e8;
                                    transform: translateZ(200px) rotate(var(--r));
                                    animation: mask var(--duration) linear forwards infinite;
                                }
                                .boxes-loader:after {
                                    --r: -20.5deg;
                                    right: auto;
                                    left: 32%;
                                }
                                .boxes-loader .ground {
                                    position: absolute;
                                    left: -50px;
                                    bottom: -120px;
                                    transform-style: preserve-3d;
                                    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1);
                                }
                                .boxes-loader .ground div {
                                    transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0);
                                    width: 200px;
                                    height: 200px;
                                    background: var(--primary);
                                    background: linear-gradient(45deg, var(--primary) 0%, var(--primary) 50%, var(--primary-light) 50%, var(--primary-light) 100%);
                                    transform-style: preserve-3d;
                                    animation: ground var(--duration) linear forwards infinite;
                                }
                                .boxes-loader .ground div:before, .boxes-loader .ground div:after {
                                    --rx: 90deg;
                                    --ry: 0deg;
                                    --x: 44px;
                                    --y: 162px;
                                    --z: -50px;
                                    content: "";
                                    width: 156px;
                                    height: 300px;
                                    opacity: 0;
                                    background: linear-gradient(var(--primary), var(--primary-rgba));
                                    position: absolute;
                                    transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
                                    animation: ground-shine var(--duration) linear forwards infinite;
                                }
                                .boxes-loader .ground div:after {
                                    --rx: 90deg;
                                    --ry: 90deg;
                                    --x: 0;
                                    --y: 177px;
                                    --z: 150px;
                                }
                                .boxes-loader .box {
                                    --x: 0;
                                    --y: 0;
                                    position: absolute;
                                    animation: var(--duration) linear forwards infinite;
                                    transform: translate(var(--x), var(--y));
                                }
                                .boxes-loader .box div {
                                    background-color: var(--primary);
                                    width: 48px;
                                    height: 48px;
                                    position: relative;
                                    transform-style: preserve-3d;
                                    animation: var(--duration) ease forwards infinite;
                                    transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0);
                                }
                                .boxes-loader .box div:before, .boxes-loader .box div:after {
                                    --rx: 90deg;
                                    --ry: 0deg;
                                    --z: 24px;
                                    --y: -24px;
                                    --x: 0;
                                    content: "";
                                    position: absolute;
                                    background-color: inherit;
                                    width: inherit;
                                    height: inherit;
                                    transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--x), var(--y)) translateZ(var(--z));
                                    filter: brightness(var(--b, 1.2));
                                }
                                .boxes-loader .box div:after {
                                    --rx: 0deg;
                                    --ry: 90deg;
                                    --x: 24px;
                                    --y: 0;
                                    --b: 1.4;
                                }
                                .boxes-loader .box.box0 { --x: -220px; --y: -120px; left: 58px; top: 108px; }
                                .boxes-loader .box.box1 { --x: -260px; --y: 120px; left: 25px; top: 120px; }
                                .boxes-loader .box.box2 { --x: 120px; --y: -190px; left: 58px; top: 64px; }
                                .boxes-loader .box.box3 { --x: 280px; --y: -40px; left: 91px; top: 120px; }
                                .boxes-loader .box.box4 { --x: 60px; --y: 200px; left: 58px; top: 132px; }
                                .boxes-loader .box.box5 { --x: -220px; --y: -120px; left: 25px; top: 76px; }
                                .boxes-loader .box.box6 { --x: -260px; --y: 120px; left: 91px; top: 76px; }
                                .boxes-loader .box.box7 { --x: -240px; --y: 200px; left: 58px; top: 87px; }
                                .boxes-loader .box0 { animation-name: box-move0; }
                                .boxes-loader .box0 div { animation-name: box-scale0; }
                                .boxes-loader .box1 { animation-name: box-move1; }
                                .boxes-loader .box1 div { animation-name: box-scale1; }
                                .boxes-loader .box2 { animation-name: box-move2; }
                                .boxes-loader .box2 div { animation-name: box-scale2; }
                                .boxes-loader .box3 { animation-name: box-move3; }
                                .boxes-loader .box3 div { animation-name: box-scale3; }
                                .boxes-loader .box4 { animation-name: box-move4; }
                                .boxes-loader .box4 div { animation-name: box-scale4; }
                                .boxes-loader .box5 { animation-name: box-move5; }
                                .boxes-loader .box5 div { animation-name: box-scale5; }
                                .boxes-loader .box6 { animation-name: box-move6; }
                                .boxes-loader .box6 div { animation-name: box-scale6; }
                                .boxes-loader .box7 { animation-name: box-move7; }
                                .boxes-loader .box7 div { animation-name: box-scale7; }
                                @keyframes box-move0 { 12% { transform: translate(var(--x), var(--y)); } 25%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                                @keyframes box-scale0 { 6% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 14%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                                @keyframes box-move1 { 16% { transform: translate(var(--x), var(--y)); } 29%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                                @keyframes box-scale1 { 10% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 18%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                                @keyframes box-move2 { 20% { transform: translate(var(--x), var(--y)); } 33%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                                @keyframes box-scale2 { 14% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 22%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                                @keyframes box-move3 { 24% { transform: translate(var(--x), var(--y)); } 37%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                                @keyframes box-scale3 { 18% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 26%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                                @keyframes box-move4 { 28% { transform: translate(var(--x), var(--y)); } 41%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                                @keyframes box-scale4 { 22% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 30%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                                @keyframes box-move5 { 32% { transform: translate(var(--x), var(--y)); } 45%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                                @keyframes box-scale5 { 26% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 34%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                                @keyframes box-move6 { 36% { transform: translate(var(--x), var(--y)); } 49%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                                @keyframes box-scale6 { 30% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 38%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                                @keyframes box-move7 { 40% { transform: translate(var(--x), var(--y)); } 53%, 52% { transform: translate(0, 0); } 80% { transform: translate(0, -32px); } 90%, 100% { transform: translate(0, 188px); } }
                                @keyframes box-scale7 { 34% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(0); } 42%, 100% { transform: rotateY(-47deg) rotateX(-15deg) rotateZ(15deg) scale(1); } }
                                @keyframes ground { 0%, 65% { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0); } 75%, 90% { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(1); } 100% { transform: rotateX(90deg) rotateY(0deg) translate(-48px, -120px) translateZ(100px) scale(0); } }
                                @keyframes ground-shine { 0%, 70% { opacity: 0; } 75%, 87% { opacity: 0.2; } 100% { opacity: 0; } }
                                @keyframes mask { 0%, 65% { opacity: 0; } 66%, 100% { opacity: 1; } }
                                
                                /* Eyes Animation */
                                .eyes-loader {
                                    position: relative;
                                    width: 108px;
                                    display: flex;
                                    justify-content: space-between;
                                }
                                .eyes-loader::after, .eyes-loader::before {
                                    content: "";
                                    display: inline-block;
                                    width: 48px;
                                    height: 48px;
                                    background-color: #fff;
                                    background-image: radial-gradient(circle 14px, #0d161b 100%, transparent 0);
                                    background-repeat: no-repeat;
                                    border-radius: 50%;
                                    animation: eyeMove 10s infinite, blink 10s infinite;
                                }
                                @keyframes eyeMove {
                                    0%, 10% { background-position: 0px 0px; }
                                    13%, 40% { background-position: -15px 0px; }
                                    43%, 70% { background-position: 15px 0px; }
                                    73%, 90% { background-position: 0px 15px; }
                                    93%, 100% { background-position: 0px 0px; }
                                }
                                @keyframes blink {
                                    0%, 10%, 12%, 20%, 22%, 40%, 42%, 60%, 62%, 70%, 72%, 90%, 92%, 98%, 100% { height: 48px; }
                                    11%, 21%, 41%, 61%, 71%, 91%, 99% { height: 18px; }
                                }
                            `}</style>
                        </div>
                    )}

                    {/* Confirmation Popup */}
                    {confirmBoxOpen !== null && (
                        <ConfirmationPopup
                            boxNumber={confirmBoxOpen + 1}
                            onConfirm={confirmOpenBox}
                            onCancel={cancelOpenBox}
                        />
                    )}

                    {/* Prize Reveal Modal with Confetti */}
                    {revealedPrize && (
                        <PrizeRevealModal
                            prize={revealedPrize}
                            currentPlayer={currentPlayer}
                            onBack={handleBackFromPopup}
                        />
                    )}

                    {/* Prize Boxes Grid */}
                    <PrizeBoxesGrid
                        prizes={prizes}
                        boxPrizeMapping={boxPrizeMapping}
                        openedBoxes={openedBoxes}
                        selectedBoxIndex={selectedBoxIndex}
                        hoveredBox={hoveredBox}
                        setHoveredBox={setHoveredBox}
                        handleBoxClick={handleBoxClick}
                        isShuffling={isShuffling}
                        gamePhase={gamePhase}
                    />
                </div>
            </div>
        </div>
        </>
    )
}

function ConfirmationPopup({ boxNumber, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-900/50 backdrop-blur-sm">
            <div 
                className="relative max-w-sm w-full mx-4"
                style={{ animation: 'popIn 0.3s ease-out' }}
            >
                <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 rounded-xl p-6 text-center border border-amber-200 shadow-2xl">
                    <p className="text-slate-600 text-base mb-2">You're about to open <span className="font-bold text-slate-800">Box #{boxNumber}</span></p>
                    <div className="text-3xl mb-4 font-bold mt-2">Are you Sure ❓</div>
                    <h3 className="text-xl font-black text-slate-800 mb-4">To Open this Box</h3>

                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors border border-slate-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all shadow-md"
                        >
                            Yes, Open It!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PrizeRevealModal({ prize, currentPlayer, onBack }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-900/70 backdrop-blur-md">
            {/* Confetti in the background */}
            <UltraConfetti active={true} />
            
            <div 
                className="relative max-w-lg mx-4 w-full z-10"
                style={{ animation: 'popIn 0.4s ease-out' }}
            >
                {/* Glow effect behind card */}
                <div 
                    className="absolute -inset-5 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-3xl blur-xl opacity-50"
                    style={{ animation: 'pulse 1.5s ease-in-out infinite' }}
                />
                
                <div className="relative bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-2xl p-10 text-center border border-indigo-200 shadow-2xl">
                    {prize.image ? (
                        <img 
                            src={prize.image} 
                            alt={prize.name} 
                            className="w-48 h-48 object-contain mx-auto mb-5"
                        />
                    ) : (
                        <div className="text-7xl mb-5">{prize.icon}</div>
                    )}

                    <h3 className="text-3xl font-black text-slate-800 mb-4">
                        {prize.name}
                    </h3>

                    <div className="inline-block px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white text-base font-black mb-5 shadow-md">
                        ⭐ {prize.tier} ⭐
                    </div>

                    <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-lg p-5 border border-indigo-100 mb-6">
                        <p className="text-slate-500 text-base mb-2">🎊 CONGRATULATIONS 🎊</p>
                        <p className="text-slate-800 text-2xl font-black">{currentPlayer?.name}</p>
                        <p className="text-indigo-600 font-semibold text-sm mt-1">ID: {currentPlayer?.employeeId}</p>
                        <p className="text-slate-500 text-base mt-2">{currentPlayer?.department}</p>
                        <p className="text-slate-400 text-sm mt-3">Opened Box #{prize.boxIndex + 1}</p>
                    </div>

                    <button
                        onClick={onBack}
                        className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                        ← BACK TO BOXES
                    </button>
                </div>
            </div>
        </div>
    )
}

function PrizeBoxesGrid({
    prizes,
    boxPrizeMapping,
    openedBoxes,
    selectedBoxIndex,
    hoveredBox,
    setHoveredBox,
    handleBoxClick,
    isShuffling,
    gamePhase
}) {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 md:gap-4">
            {prizes.slice(0, 23).map((_, boxIndex) => {
                const prizeIndex = boxPrizeMapping[boxIndex]
                const prize = prizes[prizeIndex]
                const isSelected = selectedBoxIndex === boxIndex
                const isOpened = openedBoxes.includes(boxIndex)
                const isHovered = hoveredBox === boxIndex
                const canSelect = gamePhase === "playing" && !isShuffling && selectedBoxIndex === null && !isOpened

                return (
                    <div key={boxIndex} className="relative aspect-square min-w-[85px] min-h-[85px]">
                        <button
                            onClick={() => handleBoxClick(boxIndex)}
                            onMouseEnter={() => setHoveredBox(boxIndex)}
                            onMouseLeave={() => setHoveredBox(null)}
                            disabled={!canSelect || isOpened}
                            className={`w-full h-full transition-all duration-300 ${canSelect ? 'cursor-pointer hover:scale-105' : ''} ${isSelected ? 'scale-105' : ''}`}
                        >
                            {/* Hover glow */}
                            {isHovered && canSelect && (
                                <div className="absolute -inset-1 bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 rounded-xl blur-md opacity-60" />
                            )}
                            
                            <div
                                className={`absolute inset-0 rounded-xl transition-all duration-300 overflow-hidden ${isOpened
                                    ? 'bg-gradient-to-br from-emerald-100 via-white to-teal-100 border-2 border-emerald-300'
                                    : isSelected
                                        ? 'bg-gradient-to-br from-indigo-100 via-white to-purple-100 border-2 border-indigo-300'
                                        : 'bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 border-2 border-amber-300'
                                    } ${isHovered && canSelect ? 'border-amber-400' : ''} shadow-md`}
                            >
                                {!isOpened && !isSelected && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                                        <div className="text-3xl md:text-4xl mb-1">🎁</div>
                                        <div className="text-slate-700 font-black text-xs md:text-sm bg-white/60 px-2 py-0.5 rounded-md">
                                            #{boxIndex + 1}
                                        </div>
                                    </div>
                                )}

                                {(isOpened || isSelected) && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                                        {prize.image ? (
                                            <img 
                                                src={prize.image} 
                                                alt={prize.name} 
                                                className="w-10 h-10 md:w-12 md:h-12 object-contain mb-1"
                                            />
                                        ) : (
                                            <div className="text-2xl md:text-3xl mb-1">
                                                {prize.icon}
                                            </div>
                                        )}
                                        <div className="font-bold text-xs md:text-sm text-center leading-tight text-slate-700 bg-white/60 px-1.5 py-0.5 rounded-md line-clamp-2">
                                            {prize.name}
                                        </div>
                                        {isOpened && (
                                            <div className="absolute top-2 right-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-7 h-7 flex items-center justify-center shadow-sm">
                                                <span className="text-white font-black text-sm">✓</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
