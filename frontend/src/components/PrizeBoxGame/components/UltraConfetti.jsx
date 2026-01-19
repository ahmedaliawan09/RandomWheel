"use client"

import { useEffect, useRef } from "react"

export function UltraConfetti({ active }) {
    const canvasRef = useRef(null)
    const animationRef = useRef(null)
    const particlesRef = useRef([])

    useEffect(() => {
        if (!active) {
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
            particlesRef.current = []
            return
        }

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const colors = ['#ff0080', '#ff8c00', '#40e0d0', '#ff1493', '#00ff7f', '#ffd700', '#ff6347', '#00ced1', '#ff69b4', '#7fff00', '#dc143c', '#00bfff', '#ff4500', '#9400d3', '#32cd32', '#ff00ff', '#1e90ff', '#ffff00']

        const createBurst = () => {
            const burstPoints = [
                { x: canvas.width * 0.2, y: canvas.height * 0.3 },
                { x: canvas.width * 0.5, y: canvas.height * 0.2 },
                { x: canvas.width * 0.8, y: canvas.height * 0.3 },
                { x: canvas.width * 0.3, y: canvas.height * 0.5 },
                { x: canvas.width * 0.7, y: canvas.height * 0.5 },
            ]

            burstPoints.forEach((point, burstIndex) => {
                setTimeout(() => {
                    for (let i = 0; i < 60; i++) {
                        const angle = (Math.PI * 2 * i) / 60 + Math.random() * 0.3
                        const speed = 6 + Math.random() * 8
                        particlesRef.current.push({
                            x: point.x, y: point.y,
                            vx: Math.cos(angle) * speed,
                            vy: Math.sin(angle) * speed,
                            color: colors[Math.floor(Math.random() * colors.length)],
                            size: 2 + Math.random() * 3,
                            type: 'firework',
                            life: 1, decay: 0.015 + Math.random() * 0.01,
                            trail: []
                        })
                    }
                }, burstIndex * 200)
            })

            for (let i = 0; i < 70; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: -50 - Math.random() * 200,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: 2 + Math.random() * 3,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: 12 + Math.random() * 15,
                    type: 'streamer',
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 8,
                    wave: Math.random() * Math.PI * 2,
                    life: 1, decay: 0.002
                })
            }

            for (let i = 0; i < 100; i++) {
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: Math.random() * 0.4,
                    color: Math.random() > 0.5 ? '#ffffff' : '#ffd700',
                    size: 1 + Math.random() * 2,
                    type: 'sparkle',
                    twinkle: Math.random() * Math.PI * 2,
                    life: 1, decay: 0.008
                })
            }
        }

        createBurst()

        const addMoreParticlesInterval = setInterval(() => {
            if (particlesRef.current.length < 300) {
                for (let i = 0; i < 10; i++) {
                    particlesRef.current.push({
                        x: Math.random() * canvas.width,
                        y: -50 - Math.random() * 200,
                        vx: (Math.random() - 0.5) * 1.5,
                        vy: 2 + Math.random() * 3,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        size: 12 + Math.random() * 15,
                        type: 'streamer',
                        rotation: Math.random() * 360,
                        rotationSpeed: (Math.random() - 0.5) * 8,
                        wave: Math.random() * Math.PI * 2,
                        life: 1, decay: 0.002
                    })
                }

                for (let i = 0; i < 15; i++) {
                    particlesRef.current.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        vx: (Math.random() - 0.5) * 0.8,
                        vy: Math.random() * 0.4,
                        color: Math.random() > 0.5 ? '#ffffff' : '#ffd700',
                        size: 1 + Math.random() * 2,
                        type: 'sparkle',
                        twinkle: Math.random() * Math.PI * 2,
                        life: 1, decay: 0.008
                    })
                }
            }

            if (Math.random() < 0.3) {
                const burstX = canvas.width * (0.2 + Math.random() * 0.6)
                const burstY = canvas.height * (0.2 + Math.random() * 0.6)

                for (let i = 0; i < 20; i++) {
                    const angle = (Math.PI * 2 * i) / 20 + Math.random() * 0.3
                    const speed = 4 + Math.random() * 6
                    particlesRef.current.push({
                        x: burstX, y: burstY,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        size: 2 + Math.random() * 3,
                        type: 'firework',
                        life: 1, decay: 0.02 + Math.random() * 0.01,
                        trail: []
                    })
                }
            }
        }, 1000)

        const animate = () => {
            ctx.fillStyle = 'rgba(0,0,0,0.08)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            particlesRef.current = particlesRef.current.filter(p => {
                p.life -= p.decay
                if (p.life <= 0) return false

                if (p.type === 'firework') {
                    p.trail.push({ x: p.x, y: p.y, life: 0.5 })
                    p.trail = p.trail.filter(t => { t.life -= 0.05; return t.life > 0 })
                    p.vy += 0.12
                    p.vx *= 0.98
                    p.x += p.vx
                    p.y += p.vy

                    p.trail.forEach((t) => {
                        ctx.globalAlpha = t.life * p.life
                        ctx.fillStyle = p.color
                        ctx.beginPath()
                        ctx.arc(t.x, t.y, p.size * 0.5, 0, Math.PI * 2)
                        ctx.fill()
                    })

                    ctx.globalAlpha = p.life
                    ctx.shadowBlur = 12
                    ctx.shadowColor = p.color
                    ctx.fillStyle = p.color
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                    ctx.fill()
                    ctx.shadowBlur = 0
                } else if (p.type === 'streamer') {
                    p.wave += 0.08
                    p.x += p.vx + Math.sin(p.wave) * 1.5
                    p.y += p.vy
                    p.rotation += p.rotationSpeed

                    ctx.globalAlpha = p.life
                    ctx.save()
                    ctx.translate(p.x, p.y)
                    ctx.rotate(p.rotation * Math.PI / 180)
                    ctx.fillStyle = p.color
                    ctx.fillRect(-p.size / 2, -2, p.size, 4)
                    ctx.restore()
                } else if (p.type === 'sparkle') {
                    p.twinkle += 0.12
                    p.x += p.vx
                    p.y += p.vy

                    ctx.globalAlpha = p.life * (0.3 + Math.sin(p.twinkle) * 0.7)
                    ctx.shadowBlur = 8
                    ctx.shadowColor = p.color
                    ctx.fillStyle = p.color

                    ctx.save()
                    ctx.translate(p.x, p.y)
                    ctx.beginPath()
                    for (let i = 0; i < 4; i++) {
                        const angle = (i * Math.PI) / 2
                        ctx.moveTo(0, 0)
                        ctx.lineTo(Math.cos(angle) * p.size, Math.sin(angle) * p.size)
                    }
                    ctx.strokeStyle = p.color
                    ctx.lineWidth = 1.5
                    ctx.stroke()
                    ctx.restore()
                    ctx.shadowBlur = 0
                }

                return p.y < canvas.height + 100 && p.x > -50 && p.x < canvas.width + 50
            })

            ctx.globalAlpha = 1
            animationRef.current = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            window.removeEventListener('resize', resize)
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
            if (addMoreParticlesInterval) clearInterval(addMoreParticlesInterval)
            particlesRef.current = []
        }
    }, [active])

    if (!active) return null
    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-40" style={{ mixBlendMode: 'screen' }} />
}
