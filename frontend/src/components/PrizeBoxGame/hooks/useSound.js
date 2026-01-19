"use client"

import { useState, useCallback, useRef } from "react"

export function useSound() {
    const audioContextRef = useRef(null)
    const [soundEnabled, setSoundEnabled] = useState(true)

    const getAudioContext = useCallback(() => {
        try {
            if (typeof window === "undefined") return null
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
            }
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume()
            }
            return audioContextRef.current
        } catch (error) {
            console.warn('Audio context unavailable:', error)
            return null
        }
    }, [])

    const safePlay = useCallback((playFn) => {
        if (!soundEnabled) return
        try { playFn() } catch (error) { console.warn('Sound failed:', error) }
    }, [soundEnabled])

    const playTick = useCallback(() => {
        safePlay(() => {
            const ctx = getAudioContext()
            if (!ctx) return
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.frequency.value = 800 + Math.random() * 400
            osc.type = "sine"
            gain.gain.setValueAtTime(0.05, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02)
            osc.start(ctx.currentTime)
            osc.stop(ctx.currentTime + 0.02)
        })
    }, [getAudioContext, safePlay])

    const playSelect = useCallback(() => {
        safePlay(() => {
            const ctx = getAudioContext()
            if (!ctx) return
            const notes = [523, 659, 784, 1047]
            notes.forEach((freq, i) => {
                setTimeout(() => {
                    const osc = ctx.createOscillator()
                    const gain = ctx.createGain()
                    osc.connect(gain)
                    gain.connect(ctx.destination)
                    osc.frequency.value = freq
                    osc.type = "sine"
                    gain.gain.setValueAtTime(0.08, ctx.currentTime)
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
                    osc.start(ctx.currentTime)
                    osc.stop(ctx.currentTime + 0.12)
                }, i * 50)
            })
        })
    }, [getAudioContext, safePlay])

    const playClapping = useCallback(() => {
        safePlay(() => {
            const ctx = getAudioContext()
            if (!ctx) return

            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const bufferSize = ctx.sampleRate * 0.05
                    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
                    const data = buffer.getChannelData(0)
                    for (let j = 0; j < bufferSize; j++) {
                        data[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.1))
                    }

                    const noise = ctx.createBufferSource()
                    noise.buffer = buffer
                    const filter = ctx.createBiquadFilter()
                    filter.type = 'bandpass'
                    filter.frequency.value = 1000 + Math.random() * 500
                    filter.Q.value = 0.5
                    const gain = ctx.createGain()
                    gain.gain.setValueAtTime(0.15 + Math.random() * 0.1, ctx.currentTime)
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
                    noise.connect(filter)
                    filter.connect(gain)
                    gain.connect(ctx.destination)
                    noise.start(ctx.currentTime)
                }, i * 80 + Math.random() * 40)
            }
        })
    }, [getAudioContext, safePlay])

    const playFanfare = useCallback(() => {
        safePlay(() => {
            const ctx = getAudioContext()
            if (!ctx) return
            const notes = [392, 523, 659, 784, 659, 784, 1047]
            notes.forEach((freq, i) => {
                setTimeout(() => {
                    const osc = ctx.createOscillator()
                    const osc2 = ctx.createOscillator()
                    const gain = ctx.createGain()
                    osc.connect(gain)
                    osc2.connect(gain)
                    gain.connect(ctx.destination)
                    osc.frequency.value = freq
                    osc2.frequency.value = freq * 1.5
                    osc.type = "square"
                    osc2.type = "sawtooth"
                    gain.gain.setValueAtTime(0.08, ctx.currentTime)
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
                    osc.start(ctx.currentTime)
                    osc2.start(ctx.currentTime)
                    osc.stop(ctx.currentTime + 0.3)
                    osc2.stop(ctx.currentTime + 0.3)
                }, i * 120)
            })
        })
    }, [getAudioContext, safePlay])

    const playShuffle = useCallback(() => {
        safePlay(() => {
            const ctx = getAudioContext()
            if (!ctx) return
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.frequency.value = 150 + Math.random() * 150
            osc.type = "triangle"
            gain.gain.setValueAtTime(0.05, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
            osc.start(ctx.currentTime)
            osc.stop(ctx.currentTime + 0.05)
        })
    }, [getAudioContext, safePlay])

    const playDrumroll = useCallback(() => {
        safePlay(() => {
            const ctx = getAudioContext()
            if (!ctx) return
            let i = 0
            const interval = setInterval(() => {
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()
                osc.connect(gain)
                gain.connect(ctx.destination)
                osc.frequency.value = 80 + (i % 2) * 40
                osc.type = "triangle"
                gain.gain.setValueAtTime(0.06, ctx.currentTime)
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
                osc.start(ctx.currentTime)
                osc.stop(ctx.currentTime + 0.03)
                i++
                if (i > 50) clearInterval(interval)
            }, 35)
        })
    }, [getAudioContext, safePlay])

    const playBoxOpen = useCallback(() => {
        safePlay(() => {
            const ctx = getAudioContext()
            if (!ctx) return
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.frequency.setValueAtTime(200, ctx.currentTime)
            osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2)
            osc.type = "sawtooth"
            gain.gain.setValueAtTime(0.06, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
            osc.start(ctx.currentTime)
            osc.stop(ctx.currentTime + 0.2)
        })
    }, [getAudioContext, safePlay])

    const playWhoosh = useCallback(() => {
        safePlay(() => {
            const ctx = getAudioContext()
            if (!ctx) return
            const bufferSize = ctx.sampleRate * 0.3
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
            const data = buffer.getChannelData(0)
            for (let i = 0; i < bufferSize; i++) {
                const t = i / bufferSize
                data[i] = (Math.random() * 2 - 1) * Math.sin(t * Math.PI) * 0.3
            }
            const noise = ctx.createBufferSource()
            noise.buffer = buffer
            const filter = ctx.createBiquadFilter()
            filter.type = 'bandpass'
            filter.frequency.setValueAtTime(500, ctx.currentTime)
            filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.3)
            const gain = ctx.createGain()
            gain.gain.setValueAtTime(0.2, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
            noise.connect(filter)
            filter.connect(gain)
            gain.connect(ctx.destination)
            noise.start(ctx.currentTime)
        })
    }, [getAudioContext, safePlay])

    return { playTick, playSelect, playClapping, playFanfare, playShuffle, playDrumroll, playBoxOpen, playWhoosh, soundEnabled, setSoundEnabled }
}
