import { Button } from "@/components/ui/button"
import { Star, Sparkles, ArrowRight, Eye } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-white/5"></div>
        <div className="absolute top-40 right-80 w-16 h-16 rounded-full bg-white/10"></div>
        <div className="absolute bottom-40 right-40 w-24 h-24 rounded-full bg-orange-500/20"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 rounded-full bg-white/5"></div>
      </div>

      {/* Chart decorative elements */}
      <div className="absolute top-32 right-32 opacity-20">
        <div className="flex space-x-1">
          <div className="w-2 h-16 bg-white/30 rounded"></div>
          <div className="w-2 h-12 bg-white/20 rounded"></div>
          <div className="w-2 h-20 bg-white/40 rounded"></div>
          <div className="w-2 h-8 bg-white/25 rounded"></div>
          <div className="w-2 h-14 bg-white/35 rounded"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Rating badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">4.8 rating on</span>
            <span className="font-bold">Capterra</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">4.8 rating on</span>
            <span className="font-bold">G2</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">350+ reviews on</span>
            <span className="font-bold">Xero</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">550+ reviews on</span>
            <span className="font-bold text-green-400">Smart Business</span>
          </div>
        </div>

        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left side - Dashboard preview */}
          <div className="flex-1 max-w-md">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-300">Expenses</h3>
                <span className="text-xs text-gray-400">$56.2K</span>
              </div>

              {/* Donut chart representation */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-8 border-slate-600"></div>
                  <div className="absolute inset-0 rounded-full border-8 border-blue-400 border-t-transparent border-r-transparent transform rotate-45"></div>
                  <div className="absolute inset-2 rounded-full border-4 border-slate-700"></div>
                </div>
              </div>

              {/* Legend items */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-gray-300">Marketing</span>
                  </div>
                  <span className="text-gray-400">$18.2K</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                    <span className="text-gray-300">Operations</span>
                  </div>
                  <span className="text-gray-400">$12.8K</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                    <span className="text-gray-300">Technology</span>
                  </div>
                  <span className="text-gray-400">$25.2K</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Main content */}
          <div className="flex-1 text-center px-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Create reports, forecasts,
              <br />
              <span className="text-gray-300">dashboards & consolidations</span>
            </h1>

            <div className="flex items-center justify-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-xl text-gray-300 font-medium">Now with AI-insights</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="bg-slate-600 hover:bg-slate-500 text-white px-8 py-3 text-lg font-medium rounded-lg"
              >
                Start 14-day free trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <button className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
                <Eye className="w-4 h-4" />
                <span className="text-sm underline">See what we do</span>
              </button>
            </div>
          </div>

          {/* Right side - Chart elements */}
          <div className="flex-1 max-w-md opacity-30">
            <div className="space-y-4">
              {/* Bar chart representation */}
              <div className="flex items-end justify-center gap-2 h-32">
                <div
                  className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                  style={{ height: "60%" }}
                ></div>
                <div
                  className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                  style={{ height: "80%" }}
                ></div>
                <div
                  className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                  style={{ height: "100%" }}
                ></div>
                <div
                  className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                  style={{ height: "40%" }}
                ></div>
                <div
                  className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t"
                  style={{ height: "70%" }}
                ></div>
              </div>

              {/* Line chart representation */}
              <div className="relative h-20 bg-slate-800/30 rounded-lg p-4">
                <svg className="w-full h-full" viewBox="0 0 200 50">
                  <polyline
                    fill="none"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="2"
                    points="0,40 50,30 100,20 150,25 200,15"
                  />
                  <circle cx="200" cy="15" r="3" fill="rgb(59, 130, 246)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
