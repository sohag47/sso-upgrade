/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 1. Shared Color Palette to match the image
const colors = {
  softBlue: "#a5b4fc", // Linux / Jan
  teal: "#5eead4", // Mac / Feb
  black: "#171717", // iOS / Mar
  blue: "#60a5fa", // Windows / Apr
  purple: "#c4b5fd", // Android / May
  green: "#86efac", // Other / Jun
};

// 2. Mock Data
const deviceData = [
  { name: "Linux", value: 18000, color: colors.softBlue },
  { name: "Mac", value: 31000, color: colors.teal },
  { name: "iOS", value: 22000, color: colors.black },
  { name: "Windows", value: 35000, color: colors.blue },
  { name: "Android", value: 14000, color: colors.purple },
  { name: "Other", value: 26000, color: colors.green },
];

const locationData = [
  { name: "United States", value: 52.1, color: "#3f3f46" }, // Dark Grey
  { name: "Canada", value: 22.8, color: colors.blue },
  { name: "Mexico", value: 13.9, color: colors.green },
  { name: "Other", value: 11.2, color: colors.softBlue },
];

const seoData = [
  { name: "Jan", value: 18000, color: colors.softBlue },
  { name: "Feb", value: 31000, color: colors.teal },
  { name: "Mar", value: 22000, color: colors.black },
  { name: "Apr", value: 32000, color: colors.blue },
  { name: "May", value: 14000, color: colors.purple },
  { name: "Jun", value: 27000, color: colors.green },
  { name: "Jul", value: 18000, color: colors.softBlue },
  { name: "Aug", value: 31000, color: colors.teal },
  { name: "Sep", value: 22000, color: colors.black },
  { name: "Oct", value: 35000, color: colors.blue },
  { name: "Nov", value: 14000, color: colors.purple },
  { name: "Dec", value: 27000, color: colors.green },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-2 text-sm">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: payload[0].payload.color }}
          />
          <span className="font-medium text-slate-500 dark:text-slate-400">
            {label || payload[0].name}:
          </span>
          <span className="font-bold text-slate-900 dark:text-white">
            {payload[0].value.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-0 bg-slate-50 shadow-none rounded-3xl dark:bg-slate-900/50">
        <CardHeader className="px-4">
          <CardTitle className="text-base font-semibold">
            Traffic by Device
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-3">
          <div className="h-62.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={deviceData}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <XAxis
                  dataKey="name"
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
                <Bar dataKey="value" barSize={24} radius={[10, 10, 10, 10]}>
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* TOP RIGHT: Traffic by Location (Donut Chart) */}
      <Card className="border-0 bg-slate-50 shadow-none rounded-3xl dark:bg-slate-900/50">
        <CardHeader className="px-4">
          <CardTitle className="text-base font-semibold">
            Traffic by Location
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 flex items-center h-62.5">
          <div className="flex w-full items-center justify-between">
            {/* Pie Chart Container */}
            <div className="h-45 w-45">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomTooltip />} />
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="flex flex-col gap-4 flex-1 pl-8">
              {locationData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-foreground/90 font-medium">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BOTTOM WIDE: Marketing & SEO (Bar Chart) */}
      <Card className="col-span-1 md:col-span-2 border-0 bg-slate-50 shadow-none rounded-3xl dark:bg-slate-900/50">
        <CardHeader className="px-4">
          <CardTitle className="text-base font-semibold">
            Marketing & SEO
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div className="h-70 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={seoData}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                />
                <XAxis
                  dataKey="name"
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
                <Bar dataKey="value" barSize={24} radius={[10, 10, 10, 10]}>
                  {seoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
