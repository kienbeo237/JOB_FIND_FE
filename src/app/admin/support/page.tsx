"use client"

import { useState, useRef, useEffect } from "react"
import {
  MessageSquare,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  MessageCircle,
  X,
  Send,
  User,
  CalendarIcon,
  ClockIcon,
  Tag,
  AlertCircle,
} from "lucide-react"

export default function SupportManagement() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const itemsPerPage = 4 // Number of tickets per page

  // Filter and date range state
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false)
  const [filters, setFilters] = useState({
    priority: [],
    userType: [],
  })
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  })

  // Modal state
  const [viewTicket, setViewTicket] = useState<any>(null)
  const [respondTicket, setRespondTicket] = useState<any>(null)
  const [responseMessage, setResponseMessage] = useState("")

  // Refs for click outside detection
  const filterRef = useRef<HTMLDivElement>(null)
  const dateRangeRef = useRef<HTMLDivElement>(null)
  const viewModalRef = useRef<HTMLDivElement>(null)
  const respondModalRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdowns and modals
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
      if (dateRangeRef.current && !dateRangeRef.current.contains(event.target as Node)) {
        setIsDateRangeOpen(false)
      }
      if (
        viewModalRef.current &&
        !viewModalRef.current.contains(event.target as Node) &&
        (event.target as HTMLElement).className.indexOf("modal-backdrop") !== -1
      ) {
        setViewTicket(null)
      }
      if (
        respondModalRef.current &&
        !respondModalRef.current.contains(event.target as Node) &&
        (event.target as HTMLElement).className.indexOf("modal-backdrop") !== -1
      ) {
        setRespondTicket(null)
        setResponseMessage("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle view ticket
  const handleViewTicket = (ticket: any) => {
    setViewTicket(ticket)
  }

  // Handle respond to ticket
  const handleRespondTicket = (ticket: any) => {
    setRespondTicket(ticket)
    setResponseMessage("")
  }

  // Handle send response
  const handleSendResponse = () => {
    if (!responseMessage.trim()) return

    console.log(`Sending response to ticket ${respondTicket.id}:`, responseMessage)

    // In a real app, you would send this to your API
    // For demo purposes, we'll just show an alert
    alert(`Response sent to ${respondTicket.user}: "${responseMessage}"`)

    // Close the modal and reset the form
    setRespondTicket(null)
    setResponseMessage("")
  }

  // Toggle filter dropdown
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
    if (isDateRangeOpen) setIsDateRangeOpen(false)
  }

  // Toggle date range dropdown
  const toggleDateRange = () => {
    setIsDateRangeOpen(!isDateRangeOpen)
    if (isFilterOpen) setIsFilterOpen(false)
  }

  // Handle filter changes
  const handleFilterChange = (category: string, value: string) => {
    setFilters((prev) => {
      const currentFilters = [...(prev[category as keyof typeof prev] || [])]

      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [category]: currentFilters.filter((item) => item !== value),
        }
      } else {
        return {
          ...prev,
          [category]: [...currentFilters, value],
        }
      }
    })
    setCurrentPage(1) // Reset to first page when filters change
  }

  // Handle date range changes
  const handleDateChange = (field: string, value: string) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value,
    }))
    setCurrentPage(1) // Reset to first page when date range changes
  }

  // Apply date range filter
  const applyDateRange = () => {
    console.log("Applying date range:", dateRange)
    setIsDateRangeOpen(false)
    // In a real app, you would filter the data based on the date range here
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      priority: [],
      userType: [],
    })
    setCurrentPage(1)
  }

  // Mock data for support tickets
  const tickets = [
    {
      id: "#4582",
      title: "Cannot access job posting feature",
      user: "Tech Solutions Inc.",
      userType: "Employer",
      priority: "High",
      status: "Open",
      created: "May 15, 2023",
      lastUpdated: "2 hours ago",
      description:
        "We're trying to post a new job but keep getting an error message saying 'Feature unavailable'. We've been charged for the premium plan which should include unlimited job postings. Please help resolve this issue as we need to post several positions urgently.",
      history: [
        { date: "May 15, 2023 09:15 AM", action: "Ticket created", user: "Tech Solutions Inc." },
        { date: "May 15, 2023 10:30 AM", action: "Assigned to support team", user: "System" },
      ],
    },
    {
      id: "#4581",
      title: "Payment failed but amount deducted",
      user: "Global Innovations",
      userType: "Employer",
      priority: "High",
      status: "In Progress",
      created: "May 14, 2023",
      lastUpdated: "5 hours ago",
      description:
        "We attempted to upgrade to the premium plan but received a payment failure message. However, our bank shows that the amount was deducted. We need this resolved immediately as we need access to the premium features.",
      history: [
        { date: "May 14, 2023 02:45 PM", action: "Ticket created", user: "Global Innovations" },
        { date: "May 14, 2023 03:20 PM", action: "Assigned to billing team", user: "System" },
        { date: "May 14, 2023 04:10 PM", action: "Payment verification initiated", user: "Admin" },
      ],
    },
    {
      id: "#4580",
      title: "How to edit company profile?",
      user: "Future Systems",
      userType: "Employer",
      priority: "Medium",
      status: "Open",
      created: "May 13, 2023",
      lastUpdated: "1 day ago",
      description:
        "We need to update our company profile with new information and logo. We can't find where to edit this information. Please provide instructions on how to update our company profile.",
      history: [{ date: "May 13, 2023 11:30 AM", action: "Ticket created", user: "Future Systems" }],
    },
    {
      id: "#4579",
      title: "Need to change subscription plan",
      user: "Digital Experts",
      userType: "Employer",
      priority: "Low",
      status: "Closed",
      created: "May 12, 2023",
      lastUpdated: "2 days ago",
      description:
        "We would like to downgrade from the premium plan to the standard plan as we don't need all the premium features at this time. Please advise on how to make this change and what the refund policy is.",
      history: [
        { date: "May 12, 2023 09:45 AM", action: "Ticket created", user: "Digital Experts" },
        { date: "May 12, 2023 10:15 AM", action: "Assigned to account management", user: "System" },
        { date: "May 12, 2023 11:30 AM", action: "Subscription changed to standard plan", user: "Admin" },
        { date: "May 12, 2023 11:35 AM", action: "Refund processed for remaining premium period", user: "Admin" },
        { date: "May 12, 2023 11:40 AM", action: "Ticket closed", user: "Admin" },
      ],
    },
    {
      id: "#4578",
      title: "Cannot upload resume",
      user: "John Doe",
      userType: "Candidate",
      priority: "Medium",
      status: "Open",
      created: "May 11, 2023",
      lastUpdated: "3 days ago",
      description:
        "I'm trying to upload my resume in PDF format but keep getting an error message saying 'File type not supported'. The guidelines say PDF is supported, so I'm not sure what's wrong. I've tried multiple times with different PDF files.",
      history: [
        { date: "May 11, 2023 03:20 PM", action: "Ticket created", user: "John Doe" },
        { date: "May 11, 2023 04:00 PM", action: "Assigned to technical support", user: "System" },
      ],
    },
    {
      id: "#4577",
      title: "Job application not showing in dashboard",
      user: "Jane Smith",
      userType: "Candidate",
      priority: "Medium",
      status: "In Progress",
      created: "May 10, 2023",
      lastUpdated: "4 days ago",
      description:
        "I applied for several jobs yesterday but they're not showing up in my 'Applied Jobs' dashboard. I received confirmation emails for the applications, but they're not visible in my account. Please help me track my applications.",
      history: [
        { date: "May 10, 2023 10:10 AM", action: "Ticket created", user: "Jane Smith" },
        { date: "May 10, 2023 11:25 AM", action: "Assigned to technical support", user: "System" },
        { date: "May 10, 2023 02:30 PM", action: "Investigation started", user: "Admin" },
      ],
    },
    {
      id: "#4576",
      title: "Need to delete my account",
      user: "Robert Johnson",
      userType: "Candidate",
      priority: "Low",
      status: "Closed",
      created: "May 09, 2023",
      lastUpdated: "5 days ago",
      description:
        "I would like to delete my account and remove all my personal information from your system. Please guide me through the process or do it for me.",
      history: [
        { date: "May 09, 2023 09:30 AM", action: "Ticket created", user: "Robert Johnson" },
        { date: "May 09, 2023 10:15 AM", action: "Assigned to account management", user: "System" },
        { date: "May 09, 2023 11:45 AM", action: "Account deletion process initiated", user: "Admin" },
        { date: "May 09, 2023 12:00 PM", action: "Account deleted", user: "Admin" },
        { date: "May 09, 2023 12:05 PM", action: "Ticket closed", user: "Admin" },
      ],
    },
    {
      id: "#4575",
      title: "Cannot reset password",
      user: "Sarah Williams",
      userType: "Candidate",
      priority: "High",
      status: "Closed",
      created: "May 08, 2023",
      lastUpdated: "6 days ago",
      description:
        "I'm trying to reset my password but I'm not receiving the reset email. I've checked my spam folder and tried multiple times. I need urgent access to my account for a job application deadline today.",
      history: [
        { date: "May 08, 2023 08:15 AM", action: "Ticket created", user: "Sarah Williams" },
        { date: "May 08, 2023 08:30 AM", action: "Assigned to technical support", user: "System" },
        { date: "May 08, 2023 09:00 AM", action: "Manual password reset initiated", user: "Admin" },
        { date: "May 08, 2023 09:15 AM", action: "Temporary password sent via SMS", user: "Admin" },
        { date: "May 08, 2023 10:00 AM", action: "User confirmed access restored", user: "Sarah Williams" },
        { date: "May 08, 2023 10:05 AM", action: "Ticket closed", user: "Admin" },
      ],
    },
  ]

  // Filter tickets based on active tab and filters
  const filteredTickets = tickets.filter((ticket) => {
    // Filter by tab
    if (activeTab !== "all") {
      if (activeTab === "open" && ticket.status !== "Open") return false
      if (activeTab === "in-progress" && ticket.status !== "In Progress") return false
      if (activeTab === "closed" && ticket.status !== "Closed") return false
    }

    // Filter by priority
    if (filters.priority.length > 0 && !filters.priority.includes(ticket.priority)) {
      return false
    }

    // Filter by user type
    if (filters.userType.length > 0 && !filters.userType.includes(ticket.userType)) {
      return false
    }

    // Filter by date range (simplified for demo)
    if (dateRange.startDate && dateRange.endDate) {
      // In a real app, you would convert the dates and compare them properly
      // This is just a simplified example
      const ticketDate = new Date(ticket.created).getTime()
      const startDate = new Date(dateRange.startDate).getTime()
      const endDate = new Date(dateRange.endDate).getTime()

      if (ticketDate < startDate || ticketDate > endDate) {
        return false
      }
    }

    return true
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem)

  // Handle page changes
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Handle tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCurrentPage(1) // Reset to first page when changing tabs
  }

  // Summary data
  const summary = [
    {
      title: "Open Tickets",
      value: "24",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "bg-red-100 text-red-600",
    },
    { title: "In Progress", value: "12", icon: <Clock className="h-6 w-6" />, color: "bg-blue-100 text-blue-600" },
    {
      title: "Closed Today",
      value: "8",
      icon: <CheckCircle className="h-6 w-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Avg. Response Time",
      value: "2h 15m",
      icon: <MessageCircle className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-600",
    },
  ]

  // Check if any filters are active
  const hasActiveFilters =
    filters.priority.length > 0 || filters.userType.length > 0 || (dateRange.startDate && dateRange.endDate)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Customer Support</h1>
        <p className="text-gray-500 mt-1">Manage support tickets and customer inquiries</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <p className="text-2xl font-bold mt-1">{item.value}</p>
              </div>
              <div className={`p-3 rounded-full ${item.color}`}>{item.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 relative">
          <div ref={filterRef} className="relative">
            <button
              onClick={toggleFilter}
              className={`flex items-center gap-2 px-4 py-2 border rounded-md ${
                isFilterOpen || filters.priority.length > 0 || filters.userType.length > 0
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              {(filters.priority.length > 0 || filters.userType.length > 0) && (
                <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-xs rounded-full">
                  {filters.priority.length + filters.userType.length}
                </span>
              )}
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Filter Tickets</h3>
                    <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-800">
                      Clear all
                    </button>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Priority</h4>
                    <div className="space-y-2">
                      {["High", "Medium", "Low"].map((priority) => (
                        <label key={priority} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                            checked={filters.priority.includes(priority)}
                            onChange={() => handleFilterChange("priority", priority)}
                          />
                          <span className="ml-2 text-sm text-gray-700">{priority}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">User Type</h4>
                    <div className="space-y-2">
                      {["Employer", "Candidate"].map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                            checked={filters.userType.includes(type)}
                            onChange={() => handleFilterChange("userType", type)}
                          />
                          <span className="ml-2 text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div ref={dateRangeRef} className="relative">
            <button
              onClick={toggleDateRange}
              className={`flex items-center gap-2 px-4 py-2 border rounded-md ${
                isDateRangeOpen || (dateRange.startDate && dateRange.endDate)
                  ? "bg-blue-50 border-blue-300 text-blue-700"
                  : "border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </button>

            {isDateRangeOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Select Date Range</h3>
                    <button
                      onClick={() => {
                        setDateRange({ startDate: "", endDate: "" })
                        setIsDateRangeOpen(false)
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="start-date"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={dateRange.startDate}
                        onChange={(e) => handleDateChange("startDate", e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        id="end-date"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={dateRange.endDate}
                        onChange={(e) => handleDateChange("endDate", e.target.value)}
                        min={dateRange.startDate}
                      />
                    </div>

                    <button
                      onClick={applyDateRange}
                      disabled={!dateRange.startDate || !dateRange.endDate}
                      className={`w-full py-2 px-4 rounded-md ${
                        !dateRange.startDate || !dateRange.endDate
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>

          {filters.priority.map((priority) => (
            <div
              key={`priority-${priority}`}
              className="flex items-center bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
            >
              Priority: {priority}
              <button
                onClick={() => handleFilterChange("priority", priority)}
                className="ml-1 text-blue-700 hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}

          {filters.userType.map((type) => (
            <div
              key={`type-${type}`}
              className="flex items-center bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
            >
              User: {type}
              <button
                onClick={() => handleFilterChange("userType", type)}
                className="ml-1 text-blue-700 hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}

          {dateRange.startDate && dateRange.endDate && (
            <div className="flex items-center bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full">
              Date: {new Date(dateRange.startDate).toLocaleDateString()} -{" "}
              {new Date(dateRange.endDate).toLocaleDateString()}
              <button
                onClick={() => setDateRange({ startDate: "", endDate: "" })}
                className="ml-1 text-blue-700 hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-800 ml-2">
            Clear all
          </button>
        </div>
      )}

      {/* Status Tabs */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-1">
        <div className="flex flex-wrap">
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${activeTab === "all" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
            onClick={() => handleTabChange("all")}
          >
            All Tickets
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${activeTab === "open" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
            onClick={() => handleTabChange("open")}
          >
            Open
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${activeTab === "in-progress" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
            onClick={() => handleTabChange("in-progress")}
          >
            In Progress
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${activeTab === "closed" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}
            onClick={() => handleTabChange("closed")}
          >
            Closed
          </button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ticket
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Priority
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Updated
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTickets.length > 0 ? (
                currentTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                          <div className="text-sm text-gray-500">{ticket.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ticket.user}</div>
                      <div className="text-xs text-gray-500">
                        <span
                          className={`px-2 py-0.5 rounded-full ${
                            ticket.userType === "Employer"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {ticket.userType}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          ticket.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : ticket.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          ticket.status === "Open"
                            ? "bg-red-100 text-red-800"
                            : ticket.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.created}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.lastUpdated}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        onClick={() => handleViewTicket(ticket)}
                        aria-label={`View ticket ${ticket.id}`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900"
                        onClick={() => handleRespondTicket(ticket)}
                        aria-label={`Respond to ticket ${ticket.id}`}
                        disabled={ticket.status === "Closed"}
                        style={{ opacity: ticket.status === "Closed" ? 0.5 : 1 }}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No tickets found matching your filters. Try adjusting your filters or search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "text-gray-700 bg-white hover:bg-gray-50"}`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages || totalPages === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "text-gray-700 bg-white hover:bg-gray-50"}`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                {filteredTickets.length > 0 ? (
                  <>
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                    <span className="font-medium">{Math.min(indexOfLastItem, filteredTickets.length)}</span> of{" "}
                    <span className="font-medium">{filteredTickets.length}</span> results
                  </>
                ) : (
                  "No results found"
                )}
              </p>
            </div>
            {filteredTickets.length > 0 && (
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Generate page buttons */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      aria-current={currentPage === pageNumber ? "page" : undefined}
                      className={`${
                        currentPage === pageNumber
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"}`}
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Ticket Modal */}
      {viewTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-backdrop">
          <div
            ref={viewModalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Ticket Details {viewTicket.id}</h3>
                <button onClick={() => setViewTicket(null)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-2">{viewTicket.title}</h4>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      viewTicket.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : viewTicket.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {viewTicket.priority} Priority
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      viewTicket.status === "Open"
                        ? "bg-red-100 text-red-800"
                        : viewTicket.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {viewTicket.status}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      viewTicket.userType === "Employer" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {viewTicket.userType}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500">Submitted by</p>
                    <p className="font-medium">{viewTicket.user}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CalendarIcon className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500">Created on</p>
                    <p className="font-medium">{viewTicket.created}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <ClockIcon className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500">Last updated</p>
                    <p className="font-medium">{viewTicket.lastUpdated}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Tag className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500">Ticket ID</p>
                    <p className="font-medium">{viewTicket.id}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-700 whitespace-pre-line">{viewTicket.description}</p>
              </div>

              {viewTicket.status === "Open" && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">This ticket is still open and awaiting response.</p>
                    </div>
                  </div>
                </div>
              )}

              {viewTicket.status === "In Progress" && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        This ticket is currently being worked on by the support team.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium mb-2">Ticket History</h4>
                <div className="space-y-3">
                  {viewTicket.history.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-1 h-1 rounded-full bg-gray-400 mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-700">{event.action}</p>
                        <p className="text-xs text-gray-500">
                          {event.date} • {event.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setViewTicket(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              {viewTicket.status !== "Closed" && (
                <button
                  onClick={() => {
                    setViewTicket(null)
                    handleRespondTicket(viewTicket)
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Respond
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Respond to Ticket Modal */}
      {respondTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-backdrop">
          <div ref={respondModalRef} className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Respond to Ticket {respondTicket.id}</h3>
                <button
                  onClick={() => {
                    setRespondTicket(null)
                    setResponseMessage("")
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium">{respondTicket.title}</h4>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      respondTicket.status === "Open"
                        ? "bg-red-100 text-red-800"
                        : respondTicket.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {respondTicket.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  From: {respondTicket.user} ({respondTicket.userType})
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="text-sm text-gray-700 whitespace-pre-line">{respondTicket.description}</p>
              </div>

              <div className="mb-4">
                <label htmlFor="response" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Response
                </label>
                <textarea
                  id="response"
                  rows={6}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type your response here..."
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                ></textarea>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <input
                  type="checkbox"
                  id="mark-in-progress"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  defaultChecked={respondTicket.status === "Open"}
                />
                <label htmlFor="mark-in-progress">
                  {respondTicket.status === "Open" ? "Mark as In Progress" : "Keep as In Progress"}
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setRespondTicket(null)
                  setResponseMessage("")
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendResponse}
                disabled={!responseMessage.trim()}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                  !responseMessage.trim()
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <Send className="h-4 w-4" />
                Send Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
