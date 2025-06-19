"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Event {
  id: number
  title: string
  subtitle: string
  image: string
  additionalImages: string[]
  description: string
  tags: string[]
  date: string
  location: string
  colors: {
    primary: string
    secondary: string
  }
}

const events: Event[] = [
  {
    id: 1,
    title: "UN CLIMATE CONFERENCE",
    subtitle: "GLOBAL SUSTAINABILITY SUMMIT",
    image: "/un-meeting.jpeg",
    additionalImages: ["/un-assembly-hall.png", "/un-panel-discussion.png"],
    description:
      "SustainaFin participated in the United Nations Climate Conference, presenting our innovative carbon tracking platform to world leaders and environmental organizations. Our AI-powered sustainability intelligence tools were showcased as part of the global initiative to combat climate change. The conference highlighted how technology can bridge the gap between environmental goals and actionable business strategies, with SustainaFin leading the conversation on data-driven sustainability solutions.",
    tags: ["GLOBAL", "UN SUMMIT"],
    date: "November 2024",
    location: "New York, USA",
    colors: {
      primary: "#065f46", // emerald-800
      secondary: "#0f766e", // teal-700
    },
  },
  {
    id: 2,
    title: "FEATURE WALKTHROUGH",
    subtitle: "PLATFORM ONBOARDING SESSION",
    image: "/platform-session.png",
    additionalImages: ["/platform-group-meeting.png", "/platform-workshop.png"],
    description:
      "Our comprehensive platform demonstration session brought together enterprise clients and sustainability professionals to explore SustainaFin's full capabilities. Attendees experienced hands-on training with our carbon footprint calculator, energy monitoring dashboards, and AI-powered forecasting tools. The session covered real-world implementation strategies, best practices for ESG reporting, and how organizations can leverage our platform to achieve their net-zero commitments while maintaining operational efficiency.",
    tags: ["ENTERPRISE", "TRAINING"],
    date: "October 2024",
    location: "London, UK",
    colors: {
      primary: "#0f766e", // teal-700
      secondary: "#1e40af", // blue-700
    },
  },
  {
    id: 3,
    title: "AI CARBON INTELLIGENCE",
    subtitle: "SUMMIT & PARTNERSHIP EVENT",
    image: "/industry-conference.png",
    additionalImages: ["/ai-conference-auditorium.png", "/ai-business-panel.png"],
    description:
      "A groundbreaking summit focused on the intersection of artificial intelligence and carbon management, where SustainaFin unveiled our latest AI-driven sustainability insights. Industry leaders, technology partners, and environmental experts gathered to discuss the future of automated emission tracking, predictive analytics for sustainability planning, and ethical AI applications in environmental monitoring. The event established new partnerships and collaborative frameworks for advancing AI-powered climate solutions.",
    tags: ["AI INNOVATION", "PARTNERSHIPS"],
    date: "September 2024",
    location: "Berlin, Germany",
    colors: {
      primary: "#1e40af", // blue-700
      secondary: "#065f46", // emerald-800
    },
  },
]

export default function WorkInActionSection() {
  const [currentEvent, setCurrentEvent] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isInView, setIsInView] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const sectionRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const imageCarouselRef = useRef<NodeJS.Timeout | null>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const digitRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), 200)
        }
      },
      {
        threshold: 0,
        rootMargin: "50px 0px 0px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-carousel with proper timing
  useEffect(() => {
    if (isInView && !isPaused && !isModalOpen && !isTransitioning) {
      intervalRef.current = setInterval(() => {
        handleTransition()
      }, 3000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isInView, isPaused, isModalOpen, isTransitioning, currentEvent])

  // Image carousel on hover
  useEffect(() => {
    if (isImageHovered && !isTransitioning) {
      const totalImages = 1 + events[currentEvent].additionalImages.length

      imageCarouselRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % totalImages)
      }, 1200) // 1.2 seconds per image
    } else {
      if (imageCarouselRef.current) {
        clearInterval(imageCarouselRef.current)
      }
      // Reset to first image when not hovering
      if (!isImageHovered) {
        setCurrentImageIndex(0)
      }
    }

    return () => {
      if (imageCarouselRef.current) {
        clearInterval(imageCarouselRef.current)
      }
    }
  }, [isImageHovered, isTransitioning, currentEvent])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  const handleTransition = () => {
    setIsTransitioning(true)
    const nextEvent = (currentEvent + 1) % events.length

    // Reset image carousel when transitioning
    setCurrentImageIndex(0)
    setIsImageHovered(false)

    // Start diagonal background transition
    if (backgroundRef.current) {
      backgroundRef.current.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      backgroundRef.current.style.background = `linear-gradient(135deg, ${events[nextEvent].colors.primary} 0%, ${events[nextEvent].colors.secondary} 100%)`
    }

    // Digit slide up animation with glow effect
    if (digitRef.current) {
      digitRef.current.style.transform = "translateY(-100%)"
      digitRef.current.style.opacity = "0"
      digitRef.current.style.filter = "blur(2px)"
    }

    // Title fade out
    if (titleRef.current) {
      titleRef.current.style.opacity = "0"
      titleRef.current.style.transform = "translateX(-30px)"
    }

    // Image transition
    if (imageRef.current) {
      imageRef.current.style.transform = "translateY(-15px) scale(0.96)"
      imageRef.current.style.opacity = "0.8"
    }

    // Change event after 600ms
    setTimeout(() => {
      setCurrentEvent(nextEvent)
    }, 600)

    // Reset digit - slide in from bottom with glow
    setTimeout(() => {
      if (digitRef.current) {
        digitRef.current.style.transform = "translateY(100%)"
        digitRef.current.style.opacity = "0"
        digitRef.current.style.filter = "blur(2px) drop-shadow(0 0 20px rgba(255,255,255,0.8))"

        setTimeout(() => {
          if (digitRef.current) {
            digitRef.current.style.transition = "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
            digitRef.current.style.transform = "translateY(0)"
            digitRef.current.style.opacity = "1"
            digitRef.current.style.filter = "blur(0px) drop-shadow(0 0 10px rgba(255,255,255,0.4))"
          }
        }, 50)
      }
    }, 700)

    // Reset title - fade in from left
    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.style.transform = "translateX(-30px)"
        titleRef.current.style.opacity = "0"

        setTimeout(() => {
          if (titleRef.current) {
            titleRef.current.style.transition = "all 0.8s ease-out"
            titleRef.current.style.transform = "translateX(0)"
            titleRef.current.style.opacity = "1"
          }
        }, 100)
      }
    }, 800)

    // Reset image
    setTimeout(() => {
      if (imageRef.current) {
        imageRef.current.style.transition = "all 0.9s ease-out"
        imageRef.current.style.transform = "translateY(0) scale(1)"
        imageRef.current.style.opacity = "1"
      }
    }, 900)

    // Complete transition
    setTimeout(() => {
      setIsTransitioning(false)

      // Reset transitions for next cycle
      setTimeout(() => {
        if (digitRef.current) digitRef.current.style.transition = "all 0.6s ease-out"
        if (titleRef.current) titleRef.current.style.transition = "all 0.6s ease-out"
        if (imageRef.current) imageRef.current.style.transition = "all 0.6s ease-out"
      }, 100)
    }, 1200)
  }

  const handleReadMore = (event: Event, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    setSelectedEvent(event)
    setIsModalOpen(true)
    setIsPaused(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
    setIsPaused(false)
  }

  const handleSectionInteraction = () => {
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 8000)
  }

  const nextEvent = () => {
    if (!isTransitioning) {
      handleTransition()
      handleSectionInteraction()
    }
  }

  const prevEvent = () => {
    if (!isTransitioning) {
      setCurrentEvent((prev) => (prev - 1 + events.length) % events.length)
      handleSectionInteraction()
    }
  }

  const currentEventData = events[currentEvent]
  const allImages = [currentEventData.image, ...currentEventData.additionalImages]
  const currentDisplayImage = allImages[currentImageIndex]

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen text-white overflow-hidden flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={handleSectionInteraction}
      >
        {/* Base Background */}
        <div
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background: `linear-gradient(135deg, ${currentEventData.colors.primary} 0%, ${currentEventData.colors.secondary} 100%)`,
          }}
        ></div>

        {/* Diagonal Split Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 transition-all duration-300 ease-out"
            style={{
              background: `linear-gradient(135deg, ${currentEventData.colors.primary} 50%, ${currentEventData.colors.secondary} 50%)`,
              clipPath: "polygon(0 0, 70% 0, 100% 100%, 0 100%)",
            }}
          ></div>
        </div>

        {/* Transition Background */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            background: `linear-gradient(135deg, ${currentEventData.colors.primary} 0%, ${currentEventData.colors.secondary} 100%)`,
          }}
        ></div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
          <div
            className={`w-full transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2
                className="text-4xl md:text-5xl font-bold text-white"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Our Work in Action
              </h2>
              <div className="w-24 h-1 bg-white/60 mx-auto mt-4"></div>
            </div>

            {/* Main Content Layout */}
            <div className="relative flex items-center justify-center h-[55vh]">
              {/* Left Side - Event Title */}
              <div className="absolute left-0 md:left-16 lg:left-24 z-30 max-w-xs md:max-w-sm">
                <div ref={titleRef} className="space-y-6 transition-all duration-600 ease-out">
                  <h3
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-wide"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      textShadow: "3px 3px 6px rgba(0,0,0,0.7)",
                    }}
                  >
                    {currentEventData.title}
                  </h3>

                  <p
                    className="text-lg md:text-xl text-white/90 font-medium"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {currentEventData.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {currentEventData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-emerald-400 text-emerald-900 text-sm font-bold rounded border-2 border-emerald-400"
                        style={{ fontFamily: "'Exo', sans-serif" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Button */}
                  <Button
                    onClick={(e) => handleReadMore(currentEventData, e)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg"
                    style={{ fontFamily: "'Exo', sans-serif" }}
                  >
                    READ MORE →
                  </Button>
                </div>
              </div>

              {/* Center - Square Image with Carousel */}
              <div className="relative z-20">
                <div
                  ref={imageRef}
                  className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 transition-all duration-600 ease-out cursor-pointer"
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                >
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl"></div>

                  {/* Image Container with Carousel Effect */}
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    {allImages.map((imageSrc, index) => (
                      <Image
                        key={`${currentEvent}-${index}`}
                        src={imageSrc || "/placeholder.svg"}
                        alt={`${currentEventData.title} - Image ${index + 1}`}
                        fill
                        className={`object-cover absolute inset-0 transition-all duration-1000 ease-in-out ${
                          index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                        }`}
                        style={{
                          filter: "brightness(1.1) contrast(1.2) saturate(1.1)",
                          transform:
                            index === currentImageIndex && isImageHovered
                              ? "scale(1.05)"
                              : index === currentImageIndex
                                ? "scale(1)"
                                : "scale(1.05)",
                        }}
                      />
                    ))}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>

                  {/* Image Counter Indicator */}
                  {isImageHovered && allImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                      {allImages.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex ? "bg-white scale-125" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Event Number */}
              <div className="absolute right-0 md:right-16 lg:right-24 z-30 flex items-center">
                <div className="flex items-baseline">
                  {/* Static "0" */}
                  <div
                    className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-white select-none"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      lineHeight: "0.8",
                      textShadow: "4px 4px 8px rgba(0,0,0,0.7)",
                    }}
                  >
                    0
                  </div>

                  {/* Animated Digit Container */}
                  <div className="relative w-16 md:w-20 lg:w-32 h-24 md:h-32 lg:h-48 overflow-hidden">
                    <div
                      ref={digitRef}
                      className="absolute inset-0 flex items-center justify-center transition-all duration-600 ease-out"
                    >
                      <div
                        className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-white select-none"
                        style={{
                          fontFamily: "'Orbitron', sans-serif",
                          lineHeight: "0.8",
                          textShadow: "4px 4px 8px rgba(0,0,0,0.7)",
                          filter: "drop-shadow(0 0 10px rgba(255,255,255,0.4))",
                        }}
                      >
                        {currentEvent + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between mt-12">
              {/* Progress Indicators */}
              <div className="flex gap-4">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isTransitioning) {
                        setCurrentEvent(index)
                        handleSectionInteraction()
                      }
                    }}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentEvent
                        ? "bg-emerald-400 scale-125 shadow-lg"
                        : "bg-white/50 hover:bg-emerald-300 hover:scale-110"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevEvent}
                  disabled={isTransitioning}
                  className="w-12 h-12 bg-white/20 hover:bg-emerald-500/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-white/50 disabled:opacity-50"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextEvent}
                  disabled={isTransitioning}
                  className="w-12 h-12 bg-white/20 hover:bg-emerald-500/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-white/50 disabled:opacity-50"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Empty space for layout balance */}
              <div className="w-24"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop with blur effect */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={closeModal}
            style={{ backdropFilter: "blur(8px)" }}
          ></div>

          {/* Modal Content */}
          <div
            className="relative bg-gradient-to-br from-emerald-800 to-teal-900 border-2 border-emerald-400/30 rounded-2xl p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/30"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedEvent.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-400 text-emerald-900 text-sm font-bold rounded-lg"
                      style={{ fontFamily: "'Exo', sans-serif" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3
                  className="text-2xl md:text-3xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {selectedEvent.title}
                </h3>
                <p className="text-lg text-emerald-200 font-medium mb-4" style={{ fontFamily: "'Exo', sans-serif" }}>
                  {selectedEvent.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-white/80 mb-6">
                  <span className="font-medium">{selectedEvent.date}</span>
                  <span className="hidden sm:block">•</span>
                  <span className="font-medium">{selectedEvent.location}</span>
                </div>
              </div>

              <div className="relative">
                <Image
                  src={selectedEvent.image || "/placeholder.svg"}
                  alt={selectedEvent.title}
                  width={600}
                  height={300}
                  className="w-full h-48 md:h-56 object-cover rounded-xl shadow-xl"
                />
              </div>

              <p
                className="text-white/90 leading-relaxed text-base md:text-lg"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {selectedEvent.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
