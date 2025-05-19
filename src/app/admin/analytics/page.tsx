"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Calendar, ChevronDown, Download, Filter, Users, Briefcase, CreditCard, TrendingUp } from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("last30Days")
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false)

  // Mock data for charts
  const userRegistrationData = [
    { name: "Jan", candidates: 65, employers: 28 },
    { name: "Feb", candidates: 59, employers: 32 },
    { name: "Mar", candidates: 80, employers: 47 },
    { name: "Apr", candidates: 81, employers: 42 },
    { name: "May", candidates: 56, employers: 35 },
    { name: "Jun", candidates: 55, employers: 30 },
    { name: "Jul", candidates: 40, employers: 29 },
    { name: "Aug", candidates: 70, employers: 38 },
    { name: "Sep", candidates: 90, employers: 45 },
    { name: "Oct", candidates: 110, employers: 55 },
    { name: "Nov", candidates: 120, employers: 60 },
    { name: "Dec", candidates: 130, employers: 65 },
  ]

  const revenueData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 2000 },
    { name: "Apr", revenue: 2780 },
    { name: "May", revenue: 1890 },
    { name: "Jun", revenue: 2390 },
    { name: "Jul", revenue: 3490 },
    { name: "Aug", revenue: 4000 },
    { name: "Sep", revenue: 5000 },
    { name: "Oct", revenue: 6000 },
    { name: "Nov", revenue: 7000 },
    { name: "Dec", revenue: 8000 },
  ]

  const jobCategoryData = [
    { name: "Technology", value: 400 },
    { name: "Marketing", value: 300 },
    { name: "Finance", value: 300 },
    { name: "Healthcare", value: 200 },
    { name: "Education", value: 150 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  const jobPostingData = [
    { date: "Week 1", postings: 40 },
    { date: "Week 2", postings: 30 },
    { date: "Week 3", postings: 20 },
    { date: "Week 4", postings: 27 },
    { date: "Week 5", postings: 18 },
    { date: "Week 6", postings: 23 },
    { date: "Week 7", postings: 34 },
    { date: "Week 8", postings: 51 },
  ]

  const conversionRateData = [
    { name: "Jan", rate: 65 },
    { name: "Feb", rate: 59 },
    { name: "Mar", rate: 80 },
    { name: "Apr", rate: 81 },
    { name: "May", rate: 56 },
    { name: "Jun", rate: 55 },
    { name: "Jul", rate: 40 },
  ]

  // Stats cards data
  const stats = [
    {
      title: "Total Users",
      value: "12,345",
      change: "+12%",
      trend: "up",
      icon: <Users className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Jobs",
      value: "1,234",
      change: "+7%",
      trend: "up",
      icon: <Briefcase className="h-6 w-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Revenue (MTD)",
      value: "$45,678",
      change: "+22%",
      trend: "up",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-0.5%",
      trend: "down",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-amber-100 text-amber-600",
    },
  ]

  const handleTimeRangeChange = (range) => {
    setTimeRange(range)
    setShowTimeRangeDropdown(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-500 mt-1">Monitor key metrics and performance indicators</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowTimeRangeDropdown(!showTimeRangeDropdown)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Calendar className="h-4 w-4" />
              <span>
                {timeRange === "last7Days"
                  ? "Last 7 Days"
                  : timeRange === "last30Days"
                    ? "Last 30 Days"
                    : timeRange === "last90Days"
                      ? "Last 90 Days"
                      : "This Year"}
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {showTimeRangeDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button
                    onClick={() => handleTimeRangeChange("last7Days")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Last 7 Days
                  </button>
                  <button
                    onClick={() => handleTimeRangeChange("last30Days")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Last 30 Days
                  </button>
                  <button
                    onClick={() => handleTimeRangeChange("last90Days")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Last 90 Days
                  </button>
                  <button
                    onClick={() => handleTimeRangeChange("thisYear")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    This Year
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"} flex items-center`}
                  >
                    {stat.change}{" "}
                    {stat.trend === "up" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">vs. previous period</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Registration Chart */}
        <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">User Registrations</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userRegistrationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="candidates" name="Candidates" fill="#3b82f6" />
                <Bar dataKey="employers" name="Employers" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Revenue</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Job Categories Chart */}
        <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Job Categories Distribution</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={jobCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {jobCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Job Postings Chart */}
        <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Job Postings</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={jobPostingData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="postings" name="Job Postings" stroke="#ff7300" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversion Rate */}
        <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Conversion Rate</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionRateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, "Conversion Rate"]} />
                <Line type="monotone" dataKey="rate" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Locations */}
        <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Top Performing Locations</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">New York</span>
              <span className="text-sm text-gray-500">24%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "24%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">San Francisco</span>
              <span className="text-sm text-gray-500">21%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "21%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Los Angeles</span>
              <span className="text-sm text-gray-500">18%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "18%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Chicago</span>
              <span className="text-sm text-gray-500">15%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "15%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Seattle</span>
              <span className="text-sm text-gray-500">12%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "12%" }}></div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">15 new users registered</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                <Briefcase className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">23 new job postings</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-purple-100 rounded-full p-2">
                <CreditCard className="h-4 w-4 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">$1,234 in new transactions</p>
                <p className="text-xs text-gray-500">12 hours ago</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-amber-100 rounded-full p-2">
                <TrendingUp className="h-4 w-4 text-amber-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Conversion rate increased by 2.3%</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
                <Filter className="h-4 w-4 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">New category "Remote Jobs" added</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
