"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import BackgroundElements from "./components/BackgroundElements"
import Preloader from "./components/Preloader"
import Footer from "./components/Footer"
import DemoSection from "./components/DemoSection"
import WorkInActionSection from "./components/WorkInActionSection"

export default function EnhancedLanding() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handlePreloaderComplete = () => {
    setIsLoading(false)
    // Small delay to ensure smooth transition
    setTimeout(() => setShowContent(true), 100)
  }

  // Prevent scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isLoading])

  return (
    <div className="relative min-h-screen">
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main Content */}
      <div className={`transition-all duration-1000 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        <div className="relative min-h-screen font-['Inter'] antialiased">
          <BackgroundElements />
          <Navbar />
          <Hero />
          <WorkInActionSection />
          <DemoSection />
          <Footer />
        </div>
      </div>
    </div>
  )
}
