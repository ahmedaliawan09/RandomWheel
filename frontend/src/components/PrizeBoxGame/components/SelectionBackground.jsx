"use client"

export function SelectionBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Ultra vibrant base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-800 to-fuchsia-900" />
            
            {/* Animated aurora layers */}
            <div 
                className="absolute inset-0 opacity-60"
                style={{
                    background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.5) 0%, rgba(236, 72, 153, 0.4) 25%, rgba(34, 211, 238, 0.5) 50%, rgba(168, 85, 247, 0.4) 75%, rgba(251, 146, 60, 0.5) 100%)',
                    backgroundSize: '400% 400%',
                    animation: 'auroraShift 8s ease-in-out infinite'
                }}
            />

            {/* Floating orbs - colorful and vibrant */}
            <div 
                className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full blur-3xl"
                style={{ 
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.7) 0%, rgba(168, 85, 247, 0.4) 50%, transparent 70%)',
                    animation: 'floatOrb1 12s ease-in-out infinite' 
                }}
            />
            <div 
                className="absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full blur-3xl"
                style={{ 
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.7) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 70%)',
                    animation: 'floatOrb2 10s ease-in-out infinite' 
                }}
            />
            <div 
                className="absolute -bottom-40 left-1/4 w-[800px] h-[800px] rounded-full blur-3xl"
                style={{ 
                    background: 'radial-gradient(circle, rgba(251, 146, 60, 0.6) 0%, rgba(249, 115, 22, 0.3) 50%, transparent 70%)',
                    animation: 'floatOrb3 14s ease-in-out infinite' 
                }}
            />
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-3xl"
                style={{ 
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(192, 132, 252, 0.3) 50%, transparent 70%)',
                    animation: 'pulseOrb 6s ease-in-out infinite' 
                }}
            />
            <div 
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
                style={{ 
                    background: 'radial-gradient(circle, rgba(52, 211, 153, 0.6) 0%, rgba(16, 185, 129, 0.3) 50%, transparent 70%)',
                    animation: 'floatOrb1 11s ease-in-out infinite reverse' 
                }}
            />
              <div
            className="min-h-screen flex items-center justify-center px-4 py-4 relative overflow-hidden"
            style={{
                backgroundImage: "url('/bg4.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        />
            </div>
)}