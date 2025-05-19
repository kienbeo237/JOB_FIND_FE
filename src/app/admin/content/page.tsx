"use client"

import { FileText, Plus, Search, Filter, Calendar, Edit, Trash2, X, Check } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Swal from "sweetalert2"

export default function ContentManagement() {
  // Add state for active content type
  const [activeContentType, setActiveContentType] = useState("All")

  // Add state for filters
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [statusFilters, setStatusFilters] = useState({
    published: false,
    draft: false,
    scheduled: false,
  })
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  })

  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  // Refs for handling outside clicks
  const filterDropdownRef = useRef<HTMLDivElement>(null)
  const datePickerRef = useRef<HTMLDivElement>(null)

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false)
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter content based on active type
  const content = [
    {
      id: 1,
      title: "Top 10 Job Search Tips for 2023",
      type: "Blog Post",
      author: "Admin",
      status: "Published",
      date: "May 12, 2023",
      views: 1245,
    },
    {
      id: 2,
      title: "How to Create an Effective Resume",
      type: "Article",
      author: "John Smith",
      status: "Published",
      date: "May 8, 2023",
      views: 987,
    },
    {
      id: 3,
      title: "Virtual Job Fair - June 2023",
      type: "Event",
      author: "Admin",
      status: "Scheduled",
      date: "Jun 15, 2023",
      views: 543,
    },
    {
      id: 4,
      title: "Interview Preparation Guide",
      type: "Guide",
      author: "Sarah Williams",
      status: "Published",
      date: "Apr 28, 2023",
      views: 1876,
    },
    {
      id: 5,
      title: "New Features Announcement",
      type: "News",
      author: "Admin",
      status: "Published",
      date: "Apr 20, 2023",
      views: 765,
    },
    {
      id: 6,
      title: "Career Development Workshop",
      type: "Event",
      author: "Michael Brown",
      status: "Draft",
      date: "May 30, 2023",
      views: 0,
    },
    {
      id: 7,
      title: "Industry Trends Report 2023",
      type: "Report",
      author: "Admin",
      status: "Draft",
      date: "May 18, 2023",
      views: 0,
    },
    {
      id: 8,
      title: "Success Stories: From Job Seeker to CEO",
      type: "Blog Post",
      author: "Emily Davis",
      status: "Published",
      date: "Apr 15, 2023",
      views: 2341,
    },
  ]

  // Apply all filters
  const filteredContent = content.filter((item) => {
    // Filter by content type
    const typeMatch = activeContentType === "All" || item.type === activeContentType

    // Filter by status
    let statusMatch = true
    const anyStatusFilterActive = Object.values(statusFilters).some((value) => value)
    if (anyStatusFilterActive) {
      statusMatch =
        (statusFilters.published && item.status === "Published") ||
        (statusFilters.draft && item.status === "Draft") ||
        (statusFilters.scheduled && item.status === "Scheduled")
    }

    // Filter by date range
    let dateMatch = true
    if (dateRange.startDate || dateRange.endDate) {
      const itemDate = new Date(item.date)

      if (dateRange.startDate) {
        const startDate = new Date(dateRange.startDate)
        if (itemDate < startDate) dateMatch = false
      }

      if (dateRange.endDate) {
        const endDate = new Date(dateRange.endDate)
        if (itemDate > endDate) dateMatch = false
      }
    }

    return typeMatch && statusMatch && dateMatch
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeContentType, statusFilters, dateRange])

  // Handle page changes
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  // Toggle status filter
  const toggleStatusFilter = (status: keyof typeof statusFilters) => {
    setStatusFilters((prev) => ({
      ...prev,
      [status]: !prev[status],
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setStatusFilters({
      published: false,
      draft: false,
      scheduled: false,
    })
    setDateRange({
      startDate: "",
      endDate: "",
    })
  }

  // Handle edit content
  const handleEditContent = (item: any) => {
    Swal.fire({
      title: "Edit Content",
      html: `
        <div class="space-y-4">
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              id="swal-title" 
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value="${item.title}"
            />
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select 
              id="swal-type" 
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Blog Post" ${item.type === "Blog Post" ? "selected" : ""}>Blog Post</option>
              <option value="Article" ${item.type === "Article" ? "selected" : ""}>Article</option>
              <option value="Event" ${item.type === "Event" ? "selected" : ""}>Event</option>
              <option value="News" ${item.type === "News" ? "selected" : ""}>News</option>
              <option value="Guide" ${item.type === "Guide" ? "selected" : ""}>Guide</option>
              <option value="Report" ${item.type === "Report" ? "selected" : ""}>Report</option>
            </select>
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              id="swal-status" 
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Published" ${item.status === "Published" ? "selected" : ""}>Published</option>
              <option value="Draft" ${item.status === "Draft" ? "selected" : ""}>Draft</option>
              <option value="Scheduled" ${item.status === "Scheduled" ? "selected" : ""}>Scheduled</option>
            </select>
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              id="swal-date" 
              type="date" 
              class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value="${new Date(item.date).toISOString().split("T")[0]}"
            />
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      focusConfirm: false,
      preConfirm: () => {
        const title = (document.getElementById("swal-title") as HTMLInputElement).value
        const type = (document.getElementById("swal-type") as HTMLSelectElement).value
        const status = (document.getElementById("swal-status") as HTMLSelectElement).value
        const date = (document.getElementById("swal-date") as HTMLInputElement).value

        if (!title) {
          Swal.showValidationMessage("Title is required")
          return false
        }

        return { title, type, status, date }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // In a real app, you would update the content in your database here
        console.log("Content updated:", {
          id: item.id,
          ...result.value,
        })

        Swal.fire({
          title: "Success!",
          text: "Content has been updated.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        })
      }
    })
  }

  // Handle delete content
  const handleDeleteContent = (item: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${item.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // In a real app, you would delete the content from your database here
        console.log("Content deleted:", item.id)

        Swal.fire({
          title: "Deleted!",
          text: "The content has been deleted.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        })
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Content Management</h1>
          <p className="text-gray-500 mt-1">Manage all website content, articles, news, events, and blog posts</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          <Plus className="h-5 w-5" />
          <span>Create Content</span>
        </button>
      </div>

      {/* Content Type Tabs */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-1">
        <div className="flex flex-wrap">
          <button
            onClick={() => setActiveContentType("All")}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              activeContentType === "All" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            All Content
          </button>
          <button
            onClick={() => setActiveContentType("Blog Post")}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              activeContentType === "Blog Post" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Blog Posts
          </button>
          <button
            onClick={() => setActiveContentType("Article")}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              activeContentType === "Article" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Articles
          </button>
          <button
            onClick={() => setActiveContentType("Event")}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              activeContentType === "Event" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveContentType("News")}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              activeContentType === "News" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            News
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search content..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {/* Filter Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowFilterDropdown(!showFilterDropdown)
                setShowDatePicker(false)
              }}
              className={`flex items-center gap-2 px-4 py-2 border ${showFilterDropdown ? "border-blue-500 bg-blue-50" : "border-gray-300"} rounded-md hover:bg-gray-50`}
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>

            {showFilterDropdown && (
              <div
                ref={filterDropdownRef}
                className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Filter by Status</h3>
                    <button onClick={clearFilters} className="text-xs text-blue-600 hover:text-blue-800">
                      Clear all
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div
                      onClick={() => toggleStatusFilter("published")}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${statusFilters.published ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
                      >
                        {statusFilters.published && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span>Published</span>
                    </div>

                    <div
                      onClick={() => toggleStatusFilter("draft")}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${statusFilters.draft ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
                      >
                        {statusFilters.draft && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span>Draft</span>
                    </div>

                    <div
                      onClick={() => toggleStatusFilter("scheduled")}
                      className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${statusFilters.scheduled ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
                      >
                        {statusFilters.scheduled && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span>Scheduled</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setShowFilterDropdown(false)}
                      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Date Range Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowDatePicker(!showDatePicker)
                setShowFilterDropdown(false)
              }}
              className={`flex items-center gap-2 px-4 py-2 border ${showDatePicker ? "border-blue-500 bg-blue-50" : "border-gray-300"} rounded-md hover:bg-gray-50`}
            >
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </button>

            {showDatePicker && (
              <div
                ref={datePickerRef}
                className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 border border-gray-200"
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Filter by Date</h3>
                    <button
                      onClick={() => setDateRange({ startDate: "", endDate: "" })}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Clear dates
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={dateRange.startDate}
                        onChange={(e) => setDateRange((prev) => ({ ...prev, startDate: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={dateRange.endDate}
                        onChange={(e) => setDateRange((prev) => ({ ...prev, endDate: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setShowDatePicker(false)}
                      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Apply Date Range
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Show active filters */}
          {(Object.values(statusFilters).some((v) => v) || dateRange.startDate || dateRange.endDate) && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100"
            >
              <X className="h-4 w-4" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="min-w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28"
                >
                  Author
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20"
                >
                  Views
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-20"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                        <FileText className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.type === "Blog Post"
                          ? "bg-blue-100 text-blue-800"
                          : item.type === "Article"
                            ? "bg-green-100 text-green-800"
                            : item.type === "Event"
                              ? "bg-purple-100 text-purple-800"
                              : item.type === "News"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Draft"
                            ? "bg-gray-100 text-gray-800"
                            : item.status === "Scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : ""
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.views.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditContent(item)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      aria-label={`Edit ${item.title}`}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteContent(item)}
                      className="text-red-600 hover:text-red-900"
                      aria-label={`Delete ${item.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50"
              } bg-white`}
            >
              Previous
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === totalPages || totalPages === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
              } bg-white`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredContent.length > 0 ? indexOfFirstItem + 1 : 0}</span> to{" "}
                <span className="font-medium">{Math.min(indexOfLastItem, filteredContent.length)}</span> of{" "}
                <span className="font-medium">{filteredContent.length}</span> results
                {(Object.values(statusFilters).some((v) => v) || dateRange.startDate || dateRange.endDate) &&
                  " (filtered)"}
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
                  }`}
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
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  // Logic to show pages around current page
                  let pageNum = i + 1
                  if (totalPages > 5 && currentPage > 3) {
                    if (i === 0) pageNum = 1
                    else if (i === 1) pageNum = currentPage - 1
                    else if (i === 2) pageNum = currentPage
                    else if (i === 3) pageNum = currentPage + 1
                    else if (i === 4) pageNum = totalPages
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => goToPage(pageNum)}
                      aria-current={currentPage === pageNum ? "page" : undefined}
                      className={`${
                        currentPage === pageNum
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages || totalPages === 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
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
          </div>
        </div>
      </div>
    </div>
  )
}
