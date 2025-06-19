"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50" : "bg-transparent backdrop-blur-md"
      }`}
    >
      <div className="flex items-center justify-between px-8 py-4 text-white max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg mr-3 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
            </svg>
          </div>
          <span className="text-lg font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            SustainaFin
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-emerald-300 transition-colors text-sm">
            Carbon Tracking
          </a>
          <a href="#" className="hover:text-emerald-300 transition-colors text-sm">
            Energy Monitoring
          </a>
          <a href="#" className="hover:text-emerald-300 transition-colors text-sm">
            AI Reports
          </a>
          <a href="#" className="hover:text-emerald-300 transition-colors text-sm">
            Sustainability
          </a>
          <a href="#" className="hover:text-emerald-300 transition-colors text-sm">
            Login
          </a>
        </div>

        {/* CTA Button */}
        <Button className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-5 py-2 text-sm rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
          Start Free Trial
        </Button>
      </div>
    </nav>
  )
}
