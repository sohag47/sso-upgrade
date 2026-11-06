"use client";

import React from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for the Area Chart
const performanceData = [
  { month: "Jan", thisYear: 12000, lastYear: 5000 },
  { month: "Feb", thisYear: 7000, lastYear: 12000 },
  { month: "Mar", thisYear: 13000, lastYear: 20000 },
  { month: "Apr", thisYear: 25000, lastYear: 6000 },
  { month: "May", thisYear: 24000, lastYear: 5000 },
  { month: "Jun", thisYear: 18000, lastYear: 25000 },
  { month: "Jul", thisYear: 23000, lastYear: 31000 },
];

// Mock data for the segmented traffic list
const trafficData = [
  { source: "Google", score: 1 },
  { source: "YouTube", score: 2 },
  { source: "Instagram", score: 1 },
  { source: "Pinterest", score: 3 },
  { source: "Facebook", score: 1 },
  { source: "Twitter", score: 1 },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="col-span-1 lg:col-span-2 border-0 bg-slate-50 shadow-none rounded-3xl dark:bg-slate-900/50">
        <CardHeader className="pb-4 pt-3 px-4 flex flex-row items-center justify-between">
          <div className="flex gap-6 text-sm">
            <button className="font-bold text-foreground">Total Users</button>
            <button className="font-medium text-muted-foreground hover:text-foreground transition-colors">
              Total Projects
            </button>
            <button className="font-medium text-muted-foreground hover:text-foreground transition-colors">
              Operating Status
            </button>
          </div>
          {/* Legend */}
          <div className="flex gap-4 text-sm font-medium">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-black dark:bg-white" />
              This year
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-300" />
              Last year
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="h-62.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorThisYear"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="currentColor"
                      stopOpacity={0.15}
                    />
                    <stop
                      offset="95%"
                      stopColor="currentColor"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 13 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 13 }}
                  tickFormatter={(value) =>
                    value === 0 ? "0" : `${value / 1000}K`
                  }
                  domain={[0, 30000]}
                  ticks={[0, 10000, 20000, 30000]}
                />
                {/* Dashed Line for Last Year */}
                <Area
                  type="monotone"
                  dataKey="lastYear"
                  stroke="#93c5fd"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fill="transparent"
                />
                {/* Solid Line with Gradient Fill for This Year */}
                <Area
                  type="monotone"
                  dataKey="thisYear"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  fill="url(#colorThisYear)"
                  className="text-black dark:text-white"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* RIGHT CHART: Segmented List */}
      <Card className="col-span-1 border-0 bg-slate-50 shadow-none rounded-3xl dark:bg-slate-900/50">
        <CardHeader className="pt-3 px-4 pb-4">
          <CardTitle className="text-base font-semibold">
            Traffic by Website
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 flex flex-col gap-6">
          {trafficData.map((item) => (
            <div
              key={item.source}
              className="flex items-center justify-between"
            >
              <span className="text-sm font-medium text-foreground/80">
                {item.source}
              </span>
              {/* Custom Segmented Bar Indicator */}
              <div className="flex gap-1">
                {[1, 2, 3].map((segment) => (
                  <div
                    key={segment}
                    className={`h-1 w-4 rounded-full ${
                      segment <= item.score
                        ? "bg-foreground"
                        : "bg-black/10 dark:bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
