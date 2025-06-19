"use client"

import { useState, useEffect } from "react"

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [showName, setShowName] = useState(false)
  const [breakApart, setBreakApart] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Loading animation - 3 seconds
    const loadingInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval)
          // Show name after loading completes
          setTimeout(() => setShowName(true), 200)
          // Break apart animation
          setTimeout(() => setBreakApart(true), 1200)
          // Fade out
          setTimeout(() => setFadeOut(true), 1800)
          // Complete
          setTimeout(() => onComplete(), 2300)
          return 100
        }
        return prev + 100 / (3000 / 50) // 3 seconds total
      })
    }, 50)

    return () => clearInterval(loadingInterval)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-all duration-500 ${
        fadeOut ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(30deg, transparent 40%, rgba(255,255,255,0.1) 40%, rgba(255,255,255,0.1) 60%, transparent 60%)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-2xl px-8">
        {/* Loading Bar Container */}
        <div className="relative mb-8">
          {/* Background Bar */}
          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            {/* Progress Bar */}
            <div
              className={`h-full bg-white rounded-full transition-all duration-100 ease-out relative ${
                breakApart ? "animate-pulse" : ""
              }`}
              style={{ width: `${progress}%` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]"></div>
            </div>
          </div>

          {/* Breaking apart effect */}
          {breakApart && (
            <div className="absolute inset-0 flex items-center">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="h-1 bg-white rounded-full animate-ping"
                  style={{
                    width: `${100 / 20}%`,
                    animationDelay: `${i * 50}ms`,
                    animationDuration: "0.6s",
                    transform: `translateY(${Math.random() * 40 - 20}px) translateX(${Math.random() * 40 - 20}px) rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`,
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* Company Name Animation */}
        <div className="text-center mb-8">
          <h1
            className={`text-6xl md:text-8xl font-bold text-white transition-all duration-1000 ${
              showName ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-8"
            }`}
            style={{
              fontFamily: "'Orbitron', 'Exo', 'Titillium Web', monospace",
              textShadow: "0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.4)",
              letterSpacing: "0.1em",
            }}
          >
            {showName && (
              <span className="inline-block">
                {"SustainaFin".split("").map((char, index) => (
                  <span
                    key={index}
                    className="inline-block animate-pulse"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationDuration: "0.6s",
                      animationFillMode: "both",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            )}
          </h1>

          {/* Glitch effect overlay */}
          {showName && (
            <div className="absolute inset-0 flex items-center justify-center">
              <h1
                className="text-6xl md:text-8xl font-bold text-cyan-400 opacity-30 animate-pulse"
                style={{
                  fontFamily: "'Orbitron', 'Exo', 'Titillium Web', monospace",
                  letterSpacing: "0.1em",
                  transform: "translateX(2px)",
                  animationDuration: "0.1s",
                }}
              >
                SustainaFin
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Percentage Counter */}
      <div className="absolute bottom-8 left-8">
        <div
          className="text-4xl md:text-6xl font-bold text-white tabular-nums"
          style={{
            fontFamily: "'Orbitron', 'Exo', 'Titillium Web', monospace",
            textShadow: "0 0 20px rgba(255,255,255,0.6)",
          }}
        >
          {Math.floor(progress)}
          <span className="text-2xl md:text-4xl opacity-80">%</span>
        </div>
      </div>

      {/* Scanning line effect */}
      <div
        className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-60 transition-all duration-100 ${
          breakApart ? "opacity-0" : ""
        }`}
        style={{
          left: `${progress}%`,
          boxShadow: "0 0 20px rgba(255,255,255,0.8)",
        }}
      ></div>

      {/* Particle effects */}
      {showName && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-ping"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 1}s`,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  )
}
