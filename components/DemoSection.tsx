"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Calculator, Target, AlertTriangle, Zap, Download, BarChart3, TrendingDown, Eye, Filter } from "lucide-react"
import Image from "next/image"

interface FloatingElement {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  type: "orb" | "triangle" | "hexagon" | "diamond" | "star" | "circle" | "square" | "pentagon"
  color: string
  pulsePhase: number
  originalX: number
  originalY: number
  repelX: number
  repelY: number
  baseOpacity: number
  rotation: number
  rotationSpeed: number
  isOrb: boolean
  currentOpacity: number
  currentScale: number
  targetOpacity: number // Add smooth target tracking
  targetScale: number // Add smooth target tracking
  velocityX: number // Add velocity for smoother movement
  velocityY: number // Add velocity for smoother movement
}

export default function DemoSection() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [activeStatus, setActiveStatus] = useState("Complete")
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 }) // Start off-screen
  const [isMouseInSection, setIsMouseInSection] = useState(false)
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([])
  const [sectionBounds, setSectionBounds] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const [isInitialized, setIsInitialized] = useState(false)

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Memoized colors and shapes for better performance
  const colors = useMemo(
    () => [
      "rgba(16, 185, 129, ", // emerald
      "rgba(59, 130, 246, ", // blue
      "rgba(147, 51, 234, ", // purple
      "rgba(236, 72, 153, ", // pink
      "rgba(245, 158, 11, ", // amber
      "rgba(34, 197, 94, ", // green
      "rgba(168, 85, 247, ", // violet
      "rgba(255, 255, 255, ", // white
    ],
    [],
  )

  const shapeTypes = useMemo(() => ["triangle", "hexagon", "diamond", "star", "circle", "square", "pentagon"], [])

  // Optimized section bounds update
  useEffect(() => {
    const updateBounds = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setSectionBounds({
          top: 0,
          left: 0,
          width: rect.width,
          height: rect.height,
        })
        setIsInitialized(true)
      }
    }

    // Immediate update
    updateBounds()

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateBounds, 100)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  // Fast element initialization
  useEffect(() => {
    if (!isInitialized || sectionBounds.width === 0 || sectionBounds.height === 0) return

    const elements: FloatingElement[] = []
    const area = sectionBounds.width * sectionBounds.height
    const density = window.innerWidth < 768 ? 0.00006 : 0.0001 // Slightly reduced for better performance
    const totalElements = Math.floor(area * density)
    const orbCount = Math.floor(totalElements * 0.85)
    const otherShapesCount = totalElements - orbCount

    // Pre-calculate random values for better performance
    const createRandomElement = (id: number, isOrb: boolean): FloatingElement => {
      const x = Math.random() * sectionBounds.width
      const y = Math.random() * sectionBounds.height
      const baseOpacity = Math.random() * 0.2 + 0.08 // Slightly lower base opacity

      return {
        id,
        x,
        y,
        originalX: x,
        originalY: y,
        vx: (Math.random() - 0.5) * (isOrb ? 0.2 : 0.3), // Slower base movement
        vy: (Math.random() - 0.5) * (isOrb ? 0.2 : 0.3),
        size: Math.random() * (isOrb ? 30 : 25) + (isOrb ? 12 : 18), // Slightly smaller
        opacity: baseOpacity,
        baseOpacity,
        currentOpacity: baseOpacity,
        currentScale: 1,
        targetOpacity: baseOpacity,
        targetScale: 1,
        velocityX: 0,
        velocityY: 0,
        type: isOrb ? "orb" : (shapeTypes[Math.floor(Math.random() * shapeTypes.length)] as any),
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        repelX: 0,
        repelY: 0,
        rotation: isOrb ? 0 : Math.random() * Math.PI * 2,
        rotationSpeed: isOrb ? 0 : (Math.random() - 0.5) * 0.01, // Slower rotation
        isOrb,
      }
    }

    // Create orbs
    for (let i = 0; i < orbCount; i++) {
      elements.push(createRandomElement(i, true))
    }

    // Create other shapes
    for (let i = 0; i < otherShapesCount; i++) {
      elements.push(createRandomElement(orbCount + i, false))
    }

    setFloatingElements(elements)
  }, [isInitialized, sectionBounds, colors, shapeTypes])

  // Enhanced mouse tracking with better performance
  useEffect(() => {
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return // Skip if already processing

      rafId = requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect()
          const isInSection =
            e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

          setIsMouseInSection(isInSection)

          if (isInSection) {
            setMousePosition({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            })
          }
        }
        rafId = 0
      })
    }

    const handleMouseLeave = () => {
      setIsMouseInSection(false)
      setMousePosition({ x: -1000, y: -1000 })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Optimized animation loop with better interactivity
  useEffect(() => {
    let lastTime = 0

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      const normalizedDelta = Math.min(deltaTime / 16.67, 2)

      setFloatingElements((prev) =>
        prev.map((element) => {
          let {
            x,
            y,
            vx,
            vy,
            pulsePhase,
            repelX,
            repelY,
            baseOpacity,
            rotation,
            rotationSpeed,
            isOrb,
            currentOpacity,
            currentScale,
            targetOpacity,
            targetScale,
            velocityX,
            velocityY,
          } = element

          // Movement with drift
          const driftMultiplier = isOrb ? 0.5 : 1.0
          x += vx * normalizedDelta * driftMultiplier
          y += vy * normalizedDelta * driftMultiplier

          // Rotation for non-orbs
          if (!isOrb) {
            rotation += rotationSpeed * normalizedDelta
          }

          // Boundary collision
          const padding = element.size
          if (x <= padding || x >= sectionBounds.width - padding) {
            vx *= -0.7
            x = Math.max(padding, Math.min(sectionBounds.width - padding, x))
          }
          if (y <= padding || y >= sectionBounds.height - padding) {
            vy *= -0.7
            y = Math.max(padding, Math.min(sectionBounds.height - padding, y))
          }

          // Enhanced smooth mouse interaction
          let interactionBoost = 0

          if (isMouseInSection && mousePosition.x > -500) {
            const dx = mousePosition.x - x
            const dy = mousePosition.y - y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const repelRadius = isOrb ? 120 : 140

            if (distance < repelRadius && distance > 0) {
              // Smooth easing function for more natural interaction
              const normalizedDistance = distance / repelRadius
              const easedForce = 1 - Math.pow(normalizedDistance, 2.5) // Smoother curve
              const angle = Math.atan2(dy, dx)

              // Gentler, more gradual repulsion
              const repelStrength = isOrb ? 2.0 : 2.2
              const repelForce = easedForce * repelStrength * normalizedDelta
              repelX = -Math.cos(angle) * repelForce
              repelY = -Math.sin(angle) * repelForce

              // Smooth visual feedback with easing
              interactionBoost = easedForce * (isOrb ? 0.5 : 0.35)
              targetOpacity = baseOpacity + interactionBoost * 0.8
              targetScale = 1 + interactionBoost * 0.25 // Reduced scale change
            } else {
              // Gradual return to normal with smooth decay
              repelX *= Math.pow(0.88, normalizedDelta)
              repelY *= Math.pow(0.88, normalizedDelta)
            }
          } else {
            // Return to idle state smoothly
            repelX *= Math.pow(0.92, normalizedDelta)
            repelY *= Math.pow(0.92, normalizedDelta)
          }

          // Apply repulsion with velocity damping for smoothness
          x += repelX * 0.8 // Reduced direct application
          y += repelY * 0.8

          // Keep within bounds
          x = Math.max(padding, Math.min(sectionBounds.width - padding, x))
          y = Math.max(padding, Math.min(sectionBounds.height - padding, y))

          // Much smoother transitions for opacity and scale
          const lerpFactor = Math.min(0.06 * normalizedDelta, 0.15) // Slower, capped lerp
          currentOpacity += (targetOpacity - currentOpacity) * lerpFactor
          currentScale += (targetScale - currentScale) * lerpFactor

          // Gentler pulse phase
          pulsePhase += 0.015 * normalizedDelta // Slower pulse

          return {
            ...element,
            x,
            y,
            vx,
            vy,
            pulsePhase,
            repelX,
            repelY,
            opacity: currentOpacity,
            rotation,
            currentOpacity,
            currentScale,
            targetOpacity,
            targetScale,
            velocityX,
            velocityY,
          }
        }),
      )

      lastTime = currentTime
      animationRef.current = requestAnimationFrame(animate)
    }

    if (floatingElements.length > 0) {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition, isMouseInSection, sectionBounds, floatingElements.length])

  // Optimized canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !sectionRef.current) return

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true })
    if (!ctx) return

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"

    const resizeCanvas = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap DPR for performance

        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        canvas.style.width = rect.width + "px"
        canvas.style.height = rect.height + "px"

        ctx.scale(dpr, dpr)
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = "high"
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const render = () => {
      if (!canvas.width || !canvas.height) return

      ctx.clearRect(
        0,
        0,
        canvas.width / Math.min(window.devicePixelRatio || 1, 2),
        canvas.height / Math.min(window.devicePixelRatio || 1, 2),
      )

      // Render orbs first (background layer)
      floatingElements.forEach((element) => {
        const { x, y, size, type, color, pulsePhase, rotation, currentOpacity, currentScale } = element

        if (type === "orb") {
          // Smoother pulse effect
          const pulseEffect = Math.sin(pulsePhase) * 0.08 // Reduced pulse intensity
          const dynamicOpacity = Math.min(currentOpacity + pulseEffect * 0.15, 1.0)
          const finalScale = currentScale * (1 + pulseEffect * 0.5)

          ctx.save()
          ctx.translate(x, y)
          ctx.scale(finalScale, finalScale)

          // Enhanced orb with smoother gradients
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size / 2)
          gradient.addColorStop(0, `${color}${dynamicOpacity})`)
          gradient.addColorStop(0.3, `${color}${dynamicOpacity * 0.7})`) // Smoother falloff
          gradient.addColorStop(0.7, `${color}${dynamicOpacity * 0.3})`)
          gradient.addColorStop(1, `${color}0)`)

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
          ctx.fill()

          // Smoother inner core
          const coreGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size / 8)
          coreGradient.addColorStop(0, `${color}${Math.min(dynamicOpacity * 1.2, 1)})`) // Reduced intensity
          coreGradient.addColorStop(1, `${color}0)`)

          ctx.fillStyle = coreGradient
          ctx.beginPath()
          ctx.arc(0, 0, size / 8, 0, Math.PI * 2)
          ctx.fill()

          // Smoother glow for interactive orbs
          if (currentScale > 1.05) {
            // Lower threshold for smoother activation
            const glowIntensity = (currentScale - 1) * 2 // Gradual glow intensity
            ctx.shadowColor = color.replace("rgba(", "rgba(").replace(", ", `, ${dynamicOpacity * glowIntensity})`)
            ctx.shadowBlur = size * Math.min(currentScale, 1.5) // Capped blur
            ctx.globalAlpha = dynamicOpacity * 0.2 * glowIntensity
            ctx.beginPath()
            ctx.arc(0, 0, size / 4, 0, Math.PI * 2)
            ctx.fill()
          }

          ctx.restore()
        }
      })

      // Render other shapes (foreground layer)
      floatingElements.forEach((element) => {
        if (element.isOrb) return

        const { x, y, size, type, color, pulsePhase, rotation, currentOpacity, currentScale } = element

        const pulseEffect = Math.sin(pulsePhase) * 0.1
        const dynamicOpacity = Math.min(currentOpacity + pulseEffect * 0.2, 0.8)
        const finalScale = currentScale * (1 + pulseEffect)

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)
        ctx.scale(finalScale, finalScale)

        ctx.strokeStyle = `${color}${dynamicOpacity})`
        ctx.fillStyle = `${color}${dynamicOpacity * 0.2})`
        ctx.lineWidth = currentScale > 1.1 ? 3 : 2

        if (currentScale > 1.1) {
          ctx.shadowColor = color.replace("rgba(", "rgba(").replace(", ", `, ${dynamicOpacity * 0.6})`)
          ctx.shadowBlur = 10
        }

        // Render shapes (keeping existing shape rendering code)
        if (type === "circle") {
          ctx.beginPath()
          ctx.arc(0, 0, size / 3, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
        } else if (type === "triangle") {
          ctx.beginPath()
          ctx.moveTo(0, -size / 3)
          ctx.lineTo(-size / 3, size / 3)
          ctx.lineTo(size / 3, size / 3)
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
        } else if (type === "square") {
          const halfSize = size / 4
          ctx.beginPath()
          ctx.rect(-halfSize, -halfSize, halfSize * 2, halfSize * 2)
          ctx.fill()
          ctx.stroke()
        } else if (type === "diamond") {
          ctx.beginPath()
          ctx.moveTo(0, -size / 3)
          ctx.lineTo(size / 3, 0)
          ctx.lineTo(0, size / 3)
          ctx.lineTo(-size / 3, 0)
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
        } else if (type === "star") {
          ctx.beginPath()
          for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5
            const x1 = Math.cos(angle) * (size / 4)
            const y1 = Math.sin(angle) * (size / 4)
            const x2 = Math.cos(angle + Math.PI / 5) * (size / 8)
            const y2 = Math.sin(angle + Math.PI / 5) * (size / 8)

            if (i === 0) ctx.moveTo(x1, y1)
            else ctx.lineTo(x1, y1)
            ctx.lineTo(x2, y2)
          }
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
        } else if (type === "pentagon") {
          ctx.beginPath()
          for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
            const px = Math.cos(angle) * (size / 4)
            const py = Math.sin(angle) * (size / 4)
            if (i === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
        } else if (type === "hexagon") {
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3
            const px = Math.cos(angle) * (size / 4)
            const py = Math.sin(angle) * (size / 4)
            if (i === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.closePath()
          ctx.fill()
          ctx.stroke()
        }

        ctx.restore()
      })

      requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [floatingElements])

  // Fast intersection observer setup
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, index]))
          }
        },
        { threshold: 0.1, rootMargin: "50px" }, // Faster loading
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el
  }

  return (
    <section
      ref={sectionRef}
      id="demo-section"
      className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-20 overflow-hidden"
    >
      {/* Interactive Orb Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          mixBlendMode: "screen",
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />

      {/* Section Dividers */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-purple-600 z-10"></div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 to-pink-600 z-10"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header - Fast Loading */}
        <div
          ref={setSectionRef(0)}
          className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.has(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Platform Demo
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto" style={{ fontFamily: "'Exo', sans-serif" }}>
            Experience how SustainaFin transforms sustainability data into actionable insights
          </p>
        </div>

        {/* Track Your Impact Section - Fast Loading */}
        <div
          ref={setSectionRef(1)}
          className={`mb-20 transition-all duration-700 delay-100 ${
            visibleSections.has(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3
                  className="text-2xl md:text-3xl font-bold text-white"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Track Your Impact
                </h3>
                <p className="text-slate-300" style={{ fontFamily: "'Exo', sans-serif" }}>
                  Monitor carbon footprint, energy intensity, and consumption across your portfolio
                </p>
              </div>
            </div>

            <div className="relative group">
              <Image
                src="/stats.png"
                alt="Sustainability tracking dashboard showing carbon footprint, energy intensity, and consumption metrics"
                width={1200}
                height={600}
                className="w-full rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                priority
              />

              {/* Interactive Tooltips */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-sm font-medium text-emerald-400">Carbon Footprint</div>
                <div className="text-xs text-white/80">Total CO₂ equivalent emissions</div>
              </div>

              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-sm font-medium text-blue-400">Energy Intensity</div>
                <div className="text-xs text-white/80">Energy use per square meter</div>
              </div>

              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-sm font-medium text-purple-400">Energy Consumption</div>
                <div className="text-xs text-white/80">Total energy usage in kWh</div>
              </div>
            </div>

            <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  <span>22% reduction in energy intensity</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  <span>27% reduction in consumption</span>
                </div>
              </div>
              <Button
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white"
                style={{ fontFamily: "'Exo', sans-serif" }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Data
              </Button>
            </div>
          </div>
        </div>

        {/* Analyze Carbon Emissions Section - Fast Loading */}
        <div
          ref={setSectionRef(2)}
          className={`mb-20 transition-all duration-700 delay-200 ${
            visibleSections.has(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3
                  className="text-2xl md:text-3xl font-bold text-white"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  Analyze Carbon Emissions
                </h3>
                <p className="text-slate-300" style={{ fontFamily: "'Exo', sans-serif" }}>
                  Compare embodied carbon across project types with interactive filtering
                </p>
              </div>
            </div>

            {/* Interactive Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-wrap gap-3">
                <span className="text-sm text-slate-300 font-medium">Type:</span>
                {["Refurbishment", "New Build", "All"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeFilter === filter
                        ? "bg-gradient-to-r from-emerald-500 to-blue-600 text-white"
                        : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                    }`}
                    style={{ fontFamily: "'Exo', sans-serif" }}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="text-sm text-slate-300 font-medium">Status:</span>
                {["Complete", "Estimate"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setActiveStatus(status)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeStatus === status
                        ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                        : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                    }`}
                    style={{ fontFamily: "'Exo', sans-serif" }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative group">
              <Image
                src="/graph.png"
                alt="Embodied carbon emissions comparison chart across different project types"
                width={1200}
                height={600}
                className="w-full rounded-xl shadow-2xl transition-all duration-500 group-hover:scale-[1.02]"
                style={{
                  filter: activeFilter !== "All" ? "brightness(1.1) contrast(1.1)" : "none",
                }}
              />

              {/* Legend Overlay */}
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-sm font-medium text-white mb-2">Carbon Targets</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-0.5 bg-gray-400"></div>
                    <span className="text-white/80">2025: 600 kgCO₂e/m²</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-0.5 bg-gray-600 border-dashed border border-gray-400"></div>
                    <span className="text-white/80">2030: 500 kgCO₂e/m²</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-slate-300">
                <span className="font-medium">Active Filters:</span> {activeFilter} • {activeStatus}
              </div>
              <Button
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                style={{ fontFamily: "'Exo', sans-serif" }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Data
              </Button>
            </div>
          </div>
        </div>

        {/* Sustainability Intelligence Features Section - Fast Loading */}
        <div
          ref={setSectionRef(3)}
          className={`transition-all duration-700 delay-300 ${
            visibleSections.has(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="text-center mb-12">
              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Sustainability Intelligence Features
              </h3>
              <p className="text-slate-300" style={{ fontFamily: "'Exo', sans-serif" }}>
                Powerful tools to automate, track, and optimize your sustainability journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Calculator,
                  title: "Auto Footprint Calculator",
                  description: "Automatically calculate carbon footprints across all projects and portfolios",
                  color: "from-emerald-500 to-green-600",
                },
                {
                  icon: Target,
                  title: "Live Goal Tracker",
                  description: "Real-time tracking of sustainability goals with progress visualization",
                  color: "from-blue-500 to-cyan-600",
                },
                {
                  icon: AlertTriangle,
                  title: "Compliance Alerts",
                  description: "Proactive notifications for regulatory compliance and target deadlines",
                  color: "from-orange-500 to-red-600",
                },
                {
                  icon: Zap,
                  title: "API Integration",
                  description: "Seamless integration with external tools and existing workflows",
                  color: "from-purple-500 to-pink-600",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group bg-slate-700/30 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 hover:bg-slate-600/30 transition-all duration-300 hover:scale-105"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Exo', sans-serif" }}>
                    {feature.title}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action - Fast Loading */}
        <div
          ref={setSectionRef(4)}
          className={`text-center mt-16 transition-all duration-700 delay-400 ${
            visibleSections.has(4) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            style={{ fontFamily: "'Exo', sans-serif" }}
          >
            Start Your Free Trial
            <Eye className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
