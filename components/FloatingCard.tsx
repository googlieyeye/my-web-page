"use client"

import { useEffect, useState } from "react"

interface FloatingCardProps {
  type: "reports" | "forecasts" | "dashboards" | "consolidations"
  isVisible: boolean
  position: string
  variant?: "carbon" | "energy" | "sustainability"
  delay?: number
}

export default function FloatingCard({ type, isVisible, position, variant, delay = 0 }: FloatingCardProps) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShouldRender(true), delay)
      return () => clearTimeout(timer)
    } else {
      setShouldRender(false)
    }
  }, [isVisible, delay])

  const cardContent = {
    reports: {
      title: "Sustainability Reports",
      content: (
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Carbon Emissions</span>
            <span className="text-red-500 font-bold">2.4K tons</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium">Energy Saved</span>
            <span className="text-emerald-600 font-bold">15.2 MWh</span>
          </div>
          <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2">
            <span>Net Impact</span>
            <span className="text-emerald-600">-18% CO₂</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
            <div className="bg-gradient-to-r from-emerald-500 to-green-400 h-3 rounded-full w-4/5 shadow-sm"></div>
          </div>
        </div>
      ),
    },
    forecasts: {
      title: "Carbon Forecast",
      content: (
        <div className="space-y-3">
          <svg className="w-full h-20" viewBox="0 0 100 50">
            <defs>
              <linearGradient id="carbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#carbonGradient)"
              strokeWidth="3"
              points="0,40 20,38 40,35 60,30 80,25 100,20"
            />
            <circle cx="100" cy="20" r="3" fill="#10b981" />
          </svg>
          <div className="text-center">
            <span className="text-emerald-600 font-bold text-sm">↓ 25% reduction projected</span>
          </div>
        </div>
      ),
    },
    dashboards: getDashboardContent(variant),
    consolidations: {
      title: "ESG Summary",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="font-medium">Environmental</span>
            </div>
            <span className="font-bold">A+</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium">Social</span>
            </div>
            <span className="font-bold">A</span>
          </div>
          <div className="flex items-center justify-between text-sm font-bold border-t border-gray-200 pt-2">
            <span>Governance</span>
            <span className="text-emerald-600">A+</span>
          </div>
        </div>
      ),
    },
  }

  function getDashboardContent(variant?: string) {
    switch (variant) {
      case "carbon":
        return {
          title: "Carbon Tracking",
          subtitle: "2,847 tons CO₂",
          content: (
            <div className="space-y-4">
              {/* Carbon Donut Chart */}
              <div className="flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeDasharray="35, 100"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeDasharray="30, 100"
                      strokeDashoffset="-35"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeDasharray="35, 100"
                      strokeDashoffset="-65"
                    />
                  </svg>
                </div>
              </div>
              {/* Carbon Sources */}
              <div className="space-y-2">
                {[
                  { color: "bg-red-500", label: "Transportation" },
                  { color: "bg-amber-500", label: "Energy" },
                  { color: "bg-emerald-500", label: "Renewable" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className={`w-3 h-3 ${item.color} rounded-sm shadow-sm`}></div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ),
        }
      case "energy":
        return {
          title: "Energy Monitor",
          subtitle: "1,247 kWh",
          growth: "↓ 12.3%",
          content: (
            <div className="space-y-4">
              <div className="text-sm text-gray-500 font-medium">vs. last month</div>
              {/* Energy Bar Chart */}
              <div className="flex items-end justify-between h-20 gap-1">
                {[
                  { height: "60%", color: "bg-gradient-to-t from-emerald-500 to-emerald-400" },
                  { height: "45%", color: "bg-gradient-to-t from-emerald-600 to-emerald-500" },
                  { height: "70%", color: "bg-gradient-to-t from-emerald-500 to-emerald-400" },
                  { height: "55%", color: "bg-gradient-to-t from-emerald-600 to-emerald-500" },
                  { height: "80%", color: "bg-gradient-to-t from-emerald-500 to-emerald-400" },
                  { height: "40%", color: "bg-gradient-to-t from-emerald-600 to-emerald-500" },
                  { height: "65%", color: "bg-gradient-to-t from-emerald-500 to-emerald-400" },
                  { height: "75%", color: "bg-gradient-to-t from-emerald-600 to-emerald-500" },
                  { height: "50%", color: "bg-gradient-to-t from-emerald-500 to-emerald-400" },
                  { height: "85%", color: "bg-gradient-to-t from-emerald-600 to-emerald-500" },
                  { height: "60%", color: "bg-gradient-to-t from-emerald-500 to-emerald-400" },
                  { height: "70%", color: "bg-gradient-to-t from-emerald-600 to-emerald-500" },
                ].map((bar, index) => (
                  <div
                    key={index}
                    className={`w-2.5 ${bar.color} rounded-t shadow-sm`}
                    style={{
                      height: bar.height,
                      animationDelay: `${index * 50}ms`,
                    }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>Jan</span>
                <span>Dec</span>
              </div>
            </div>
          ),
        }
      case "sustainability":
        return {
          title: "Sustainability Score",
          growth: "↑ 8.7%",
          amount: "92/100",
          content: (
            <div className="space-y-4">
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-600">92/100</div>
                <div className="text-sm text-gray-500 font-medium">ESG Rating</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-emerald-500 to-green-400 h-2 rounded-full w-11/12 shadow-sm"></div>
              </div>
            </div>
          ),
        }
      default:
        return {
          title: "Sustainability Dashboard",
          content: (
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "CO₂ Saved", value: "2.4K", color: "text-emerald-600" },
                { label: "Energy", value: "1.2MW", color: "text-blue-600" },
                { label: "Water", value: "890L", color: "text-cyan-600" },
                { label: "Waste", value: "-15%", color: "text-green-600" },
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100">
                  <div className="text-xs text-gray-500 font-medium">{item.label}</div>
                  <div className={`text-sm font-bold ${item.color}`}>{item.value}</div>
                </div>
              ))}
            </div>
          ),
        }
    }
  }

  const card = cardContent[type]

  return (
    <div
      className={`absolute ${position} transition-all duration-700 ease-out transform z-50 ${
        shouldRender && isVisible
          ? "opacity-100 scale-100 translate-y-0 rotate-0"
          : "opacity-0 scale-75 translate-y-8 rotate-1 pointer-events-none"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {/* Glow Effect */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-blue-400/30 rounded-2xl blur-xl animate-pulse"></div>

        {/* Main Card */}
        <div className="relative bg-white/98 backdrop-blur-lg border-2 border-white/60 rounded-2xl p-6 shadow-2xl text-gray-800 min-w-[240px] ring-1 ring-black/5 hover:shadow-3xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-base font-bold text-gray-900">{card.title}</h4>
              {card.subtitle && <div className="text-2xl font-bold text-gray-900 mt-1">{card.subtitle}</div>}
            </div>
            <div className="flex items-center gap-2">
              {card.growth && (
                <span className="text-sm text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-full">
                  {card.growth}
                </span>
              )}
              <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="text-gray-700">{card.content}</div>
        </div>
      </div>
    </div>
  )
}
