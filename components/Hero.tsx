"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Eye, Star, Leaf, TrendingDown, BarChart3 } from "lucide-react"
import FloatingCard from "./FloatingCard"

export default function Hero() {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)

  const handleWordHover = (word: string | null) => {
    setHoveredWord(word)
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#031F4B] via-[#062E6F] to-[#0A1B3D] text-white overflow-hidden">
      {/* Section Divider - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 to-blue-600"></div>

      {/* Dynamic Background Visuals */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        {/* Carbon Tracking Chart - Left Side */}
        <div className="absolute top-32 left-16 w-64 h-40 bg-white/10 rounded-xl backdrop-blur-sm p-4">
          <div className="text-xs text-white/70 mb-2 font-medium">Carbon Emissions (tons CO₂)</div>
          <div className="flex items-end justify-between h-24 gap-1">
            {[
              { height: "80%", color: "bg-red-400/60" },
              { height: "75%", color: "bg-red-400/60" },
              { height: "70%", color: "bg-orange-400/60" },
              { height: "65%", color: "bg-orange-400/60" },
              { height: "55%", color: "bg-yellow-400/60" },
              { height: "45%", color: "bg-emerald-400/60" },
              { height: "35%", color: "bg-emerald-400/60" },
              { height: "30%", color: "bg-emerald-500/60" },
            ].map((bar, index) => (
              <div
                key={index}
                className={`w-6 ${bar.color} rounded-t animate-pulse`}
                style={{
                  height: bar.height,
                  animationDelay: `${index * 200}ms`,
                  animationDuration: "3s",
                }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-white/50 mt-1">
            <span>2020</span>
            <span>2024</span>
          </div>
        </div>

        {/* Emission Analysis - Top Right */}
        <div className="absolute top-20 right-20 w-72 h-44 bg-white/10 rounded-xl backdrop-blur-sm p-4">
          <div className="text-xs text-white/70 mb-3 font-medium">Emission Sources Analysis</div>
          <div className="flex items-center justify-center mb-3">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(239, 68, 68, 0.8)"
                  strokeWidth="3"
                  strokeDasharray="40, 100"
                  className="animate-pulse"
                  style={{ animationDuration: "2s" }}
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(245, 158, 11, 0.8)"
                  strokeWidth="3"
                  strokeDasharray="30, 100"
                  strokeDashoffset="-40"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(16, 185, 129, 0.8)"
                  strokeWidth="3"
                  strokeDasharray="30, 100"
                  strokeDashoffset="-70"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-white/60">Transport</span>
              </div>
              <span className="text-white/70">40%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span className="text-white/60">Energy</span>
              </div>
              <span className="text-white/70">30%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-white/60">Renewable</span>
              </div>
              <span className="text-white/70">30%</span>
            </div>
          </div>
        </div>

        {/* Sustainability Forecast - Bottom Right */}
        <div className="absolute bottom-32 right-16 w-68 h-36 bg-white/10 rounded-xl backdrop-blur-sm p-4">
          <div className="text-xs text-white/70 mb-2 font-medium">Sustainability Forecast</div>
          <svg className="w-full h-20" viewBox="0 0 120 40">
            <defs>
              <linearGradient id="sustainabilityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(239, 68, 68, 0.8)" />
                <stop offset="50%" stopColor="rgba(245, 158, 11, 0.8)" />
                <stop offset="100%" stopColor="rgba(16, 185, 129, 0.8)" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#sustainabilityGradient)"
              strokeWidth="2"
              points="0,35 15,32 30,28 45,25 60,20 75,16 90,12 105,8 120,5"
              className="animate-pulse"
              style={{ animationDuration: "4s" }}
            />
            <circle cx="120" cy="5" r="2" fill="rgba(16, 185, 129, 0.8)" className="animate-ping" />
          </svg>
          <div className="flex justify-between text-xs text-white/50 mt-1">
            <span>Current</span>
            <span className="text-emerald-400">2030 Target</span>
          </div>
        </div>

        {/* Real-time Metrics - Bottom Left */}
        <div className="absolute bottom-40 left-20 w-56 h-32 bg-white/10 rounded-xl backdrop-blur-sm p-4">
          <div className="text-xs text-white/70 mb-3 font-medium">Live Sustainability Metrics</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-emerald-400 animate-pulse">2.4K</div>
              <div className="text-xs text-white/60">CO₂ Saved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400 animate-pulse" style={{ animationDelay: "0.5s" }}>
                15.2
              </div>
              <div className="text-xs text-white/60">MWh Clean</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-cyan-400 animate-pulse" style={{ animationDelay: "1s" }}>
                890L
              </div>
              <div className="text-xs text-white/60">Water Saved</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400 animate-pulse" style={{ animationDelay: "1.5s" }}>
                92%
              </div>
              <div className="text-xs text-white/60">ESG Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-emerald-500/10 animate-pulse"></div>
        <div
          className="absolute top-40 right-80 w-16 h-16 rounded-full bg-blue-500/20 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 right-40 w-24 h-24 rounded-full bg-emerald-500/15 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-20 h-20 rounded-full bg-teal-500/15 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 opacity-8">
        <TrendingDown
          className="absolute top-32 right-32 w-16 h-16 animate-float text-emerald-400"
          style={{ animationDuration: "6s", animationDelay: "0s" }}
        />
        <BarChart3
          className="absolute bottom-32 left-32 w-12 h-12 animate-float text-blue-400"
          style={{ animationDuration: "8s", animationDelay: "2s" }}
        />
        <Leaf
          className="absolute top-1/2 left-1/4 w-10 h-10 animate-float text-green-400"
          style={{ animationDuration: "7s", animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-6 pt-24 pb-20 relative z-10">
        {/* Ratings Bar */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>
              4.8 rating on <strong className="text-white">Capterra</strong>
            </span>
          </div>
          <div className="hidden md:block text-slate-500">|</div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>
              4.8 rating on <strong className="text-white">G2</strong>
            </span>
          </div>
          <div className="hidden md:block text-slate-500">|</div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>
              350+ reviews on <strong className="text-white">Xero</strong>
            </span>
          </div>
          <div className="hidden md:block text-slate-500">|</div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>
              550+ reviews on <strong className="text-emerald-400">EcoVadis</strong>
            </span>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="text-center max-w-5xl mx-auto relative">
          {/* Overlay when dashboard cards are visible */}
          <div
            className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-all duration-500 rounded-3xl ${
              hoveredWord === "dashboards" ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          ></div>

          {/* Floating Cards with staggered animations */}
          <FloatingCard
            type="dashboards"
            variant="carbon"
            isVisible={hoveredWord === "carbon"}
            position="top-32 left-4 md:left-16 lg:left-24"
            delay={0}
          />
          <FloatingCard
            type="dashboards"
            variant="energy"
            isVisible={hoveredWord === "emissions"}
            position="top-16 right-4 md:right-16 lg:right-24"
            delay={150}
          />
          <FloatingCard
            type="dashboards"
            variant="sustainability"
            isVisible={hoveredWord === "sustainability"}
            position="bottom-32 right-4 md:right-20 lg:right-32"
            delay={300}
          />

          {/* Other word hover cards */}
          <FloatingCard type="reports" isVisible={hoveredWord === "track"} position="top-0 left-0 md:left-20" />
          <FloatingCard type="forecasts" isVisible={hoveredWord === "forecast"} position="top-0 right-0 md:right-20" />
          <FloatingCard
            type="consolidations"
            isVisible={hoveredWord === "platform"}
            position="bottom-0 left-0 md:left-32"
          />

          {/* Updated Main Heading */}
          <h1
            className="relative z-20 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-8 text-[#C2D1F0]"
            style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.02em" }}
          >
            <span
              className="hover:text-white transition-all duration-300 cursor-pointer relative text-emerald-300"
              onMouseEnter={() => handleWordHover("track")}
              onMouseLeave={() => handleWordHover(null)}
            >
              Track
            </span>{" "}
            your{" "}
            <span
              className="hover:text-white transition-all duration-300 cursor-pointer relative text-emerald-300"
              onMouseEnter={() => handleWordHover("carbon")}
              onMouseLeave={() => handleWordHover(null)}
            >
              carbon footprint
            </span>
            , analyze{" "}
            <span
              className="hover:text-white transition-all duration-300 cursor-pointer relative text-emerald-300"
              onMouseEnter={() => handleWordHover("emissions")}
              onMouseLeave={() => handleWordHover(null)}
            >
              emissions
            </span>
            ,<br />
            and{" "}
            <span
              className="hover:text-white transition-all duration-300 cursor-pointer relative text-emerald-300"
              onMouseEnter={() => handleWordHover("forecast")}
              onMouseLeave={() => handleWordHover(null)}
            >
              forecast
            </span>{" "}
            <span
              className="hover:text-white transition-all duration-300 cursor-pointer relative text-emerald-300"
              onMouseEnter={() => handleWordHover("sustainability")}
              onMouseLeave={() => handleWordHover(null)}
            >
              sustainability
            </span>{" "}
            — all in one{" "}
            <span
              className="hover:text-white transition-all duration-300 cursor-pointer relative text-emerald-300"
              onMouseEnter={() => handleWordHover("platform")}
              onMouseLeave={() => handleWordHover(null)}
            >
              platform
            </span>
            .
          </h1>

          {/* AI Insights Subheading */}
          <div className="relative z-20 flex items-center justify-center gap-2 mb-12">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span className="text-lg md:text-xl text-slate-300 font-medium" style={{ fontFamily: "'Exo', sans-serif" }}>
              Powered by AI-driven sustainability intelligence
            </span>
          </div>

          {/* Call to Action */}
          <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform"
              style={{ fontFamily: "'Exo', sans-serif" }}
            >
              Start tracking your impact
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <button
              onClick={() => {
                document.getElementById("demo-section")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 group"
              style={{ fontFamily: "'Titillium Web', sans-serif" }}
            >
              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="underline underline-offset-4 decoration-slate-500 group-hover:decoration-white">
                See platform demo
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#031F4B] to-transparent"></div>
    </section>
  )
}
