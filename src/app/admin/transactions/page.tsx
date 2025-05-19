"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Filter, Calendar, Download } from "lucide-react"
import Swal from "sweetalert2"

export default function TransactionsManagement() {
  const transactions = [
    {
      id: "TX123456",
      company: "Tech Solutions Inc.",
      package: "Premium Job Posting",
      amount: "$299.00",
      date: "2023-05-15",
      paymentMethod: "Credit Card",
      status: "Completed",
    },
    {
      id: "TX123455",
      company: "Global Innovations",
      package: "Featured Employer",
      amount: "$199.00",
      date: "2023-05-14",
      paymentMethod: "PayPal",
      status: "Completed",
    },
    {
      id: "TX123454",
      company: "Future Systems",
      package: "CV Database Access",
      amount: "$499.00",
      date: "2023-05-13",
      paymentMethod: "Bank Transfer",
      status: "Pending",
    },
    {
      id: "TX123453",
      company: "Digital Experts",
      package: "Job Posting Bundle",
      amount: "$349.00",
      date: "2023-05-12",
      paymentMethod: "Credit Card",
      status: "Completed",
    },
    {
      id: "TX123452",
      company: "Smart Technologies",
      package: "Banner Advertising",
      amount: "$199.00",
      date: "2023-05-11",
      paymentMethod: "Credit Card",
      status: "Failed",
    },
    {
      id: "TX123451",
      company: "Innovative Solutions",
      package: "Premium Job Posting",
      amount: "$299.00",
      date: "2023-05-10",
      paymentMethod: "PayPal",
      status: "Completed",
    },
    {
      id: "TX123450",
      company: "Global Tech",
      package: "Featured Employer",
      amount: "$199.00",
      date: "2023-05-09",
      paymentMethod: "Credit Card",
      status: "Completed",
    },
    {
      id: "TX123449",
      company: "Future Innovations",
      package: "CV Database Access",
      amount: "$499.00",
      date: "2023-05-08",
      paymentMethod: "Bank Transfer",
      status: "Refunded",
    },
  ]

  // State for filters
  const [statusFilters, setStatusFilters] = useState<string[]>([])
  const [paymentMethodFilters, setPaymentMethodFilters] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: "", end: "" })
  const [showStatusFilter, setShowStatusFilter] = useState(false)
  const [showDateFilter, setShowDateFilter] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  // Refs for closing dropdowns when clicking outside
  const statusFilterRef = useRef<HTMLDivElement>(null)
  const dateFilterRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (statusFilterRef.current && !statusFilterRef.current.contains(event.target as Node)) {
        setShowStatusFilter(false)
      }
      if (dateFilterRef.current && !dateFilterRef.current.contains(event.target as Node)) {
        setShowDateFilter(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Status filter toggle handler
  const toggleStatusFilter = (status: string) => {
    setStatusFilters((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  // Payment method filter toggle handler
  const togglePaymentMethodFilter = (method: string) => {
    setPaymentMethodFilters((prev) => (prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]))
  }

  // Clear all filters
  const clearFilters = () => {
    setStatusFilters([])
    setPaymentMethodFilters([])
    setDateRange({ start: "", end: "" })
    setSearchQuery("")
  }

  // Filter transactions based on all criteria
  const filteredTransactions = transactions.filter((transaction) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      transaction.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.package.toLowerCase().includes(searchQuery.toLowerCase())

    // Status filter
    const matchesStatus = statusFilters.length === 0 || statusFilters.includes(transaction.status)

    // Payment method filter
    const matchesPaymentMethod =
      paymentMethodFilters.length === 0 || paymentMethodFilters.includes(transaction.paymentMethod)

    // Date range filter
    const transactionDate = new Date(transaction.date)
    const startDate = dateRange.start ? new Date(dateRange.start) : null
    const endDate = dateRange.end ? new Date(dateRange.end) : null

    const matchesDateRange = (!startDate || transactionDate >= startDate) && (!endDate || transactionDate <= endDate)

    return matchesSearch && matchesStatus && matchesPaymentMethod && matchesDateRange
  })

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [statusFilters, paymentMethodFilters, dateRange, searchQuery])

  // Page change handlers
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than our max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always include first page
      pageNumbers.push(1)

      // Calculate start and end of page number range
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust to show 3 pages in the middle
      if (currentPage <= 2) {
        endPage = 3
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2
      }

      // Add ellipsis if needed
      if (startPage > 2) {
        pageNumbers.push("...")
      }

      // Add middle page numbers
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...")
      }

      // Always include last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  // Export to CSV function
  const exportToCSV = () => {
    // Define CSV headers
    const headers = ["ID", "Company", "Package", "Amount", "Date", "Payment Method", "Status"]

    // Convert filtered transactions to CSV rows
    const rows = filteredTransactions.map((transaction) => [
      transaction.id,
      transaction.company,
      transaction.package,
      transaction.amount,
      transaction.date,
      transaction.paymentMethod,
      transaction.status,
    ])

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

    // Create Blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    // Set up and trigger download
    link.setAttribute("href", url)
    link.setAttribute("download", `transactions_export_${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Summary data
  const summary = [
    {
      title: "Total Revenue",
      value: "$12,345.00",
      icon: (
        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-green-600 font-bold">$</span>
        </div>
      ),
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Pending",
      value: "$499.00",
      icon: (
        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
          <span className="text-yellow-600 font-bold">!</span>
        </div>
      ),
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Refunded",
      value: "$499.00",
      icon: (
        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-red-600 font-bold">↩</span>
        </div>
      ),
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Transactions",
      value: transactions.length.toString(),
      icon: (
        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-bold">#</span>
        </div>
      ),
      color: "bg-blue-50 text-blue-600",
    },
  ]

  // Check if any filter is applied
  const isFiltered =
    statusFilters.length > 0 ||
    paymentMethodFilters.length > 0 ||
    dateRange.start ||
    dateRange.end ||
    searchQuery !== ""

  // Function to handle viewing transaction details
  const handleViewTransaction = (transaction: any) => {
    Swal.fire({
      title: "Transaction Details",
      html: `
        <div class="text-left">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-sm text-gray-500">Transaction ID</p>
              <p class="font-medium">${transaction.id}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Date</p>
              <p class="font-medium">${formatDate(transaction.date)}</p>
            </div>
          </div>
          
          <div class="mb-4">
            <p class="text-sm text-gray-500">Company</p>
            <p class="font-medium">${transaction.company}</p>
          </div>
          
          <div class="mb-4">
            <p class="text-sm text-gray-500">Package</p>
            <p class="font-medium">${transaction.package}</p>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-sm text-gray-500">Amount</p>
              <p class="font-medium">${transaction.amount}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Payment Method</p>
              <p class="font-medium">${transaction.paymentMethod}</p>
            </div>
          </div>
          
          <div class="mb-4">
            <p class="text-sm text-gray-500">Status</p>
            <p class="font-medium">
              <span class="px-2 py-1 text-xs rounded-full ${
                transaction.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : transaction.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : transaction.status === "Failed"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
              }">
                ${transaction.status}
              </span>
            </p>
          </div>
          
          <div class="mb-4">
            <p class="text-sm text-gray-500">Notes</p>
            <p class="text-sm">${
              transaction.status === "Failed"
                ? "Payment processing error. Customer was notified."
                : transaction.status === "Pending"
                  ? "Awaiting bank confirmation."
                  : transaction.status === "Refunded"
                    ? "Refunded due to customer request on " + formatDate(transaction.date)
                    : "Transaction completed successfully."
            }</p>
          </div>
        </div>
      `,
      width: "600px",
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        container: "swal-wide",
        popup: "rounded-lg",
        header: "border-b pb-3",
        content: "pt-4",
      },
    })
  }

  // Function to handle viewing and downloading receipt
  const handleViewReceipt = (transaction: any) => {
    // Create a receipt number based on transaction ID
    const receiptNumber = `R-${transaction.id.substring(2)}`

    Swal.fire({
      title: "Receipt",
      html: `
        <div class="text-left">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="font-bold text-lg">JobFind</h3>
              <p class="text-sm text-gray-500">123 Recruitment Street</p>
              <p class="text-sm text-gray-500">Business City, BC 10001</p>
            </div>
            <div class="text-right">
              <p class="font-bold">RECEIPT</p>
              <p class="text-sm text-gray-500">#${receiptNumber}</p>
              <p class="text-sm text-gray-500">Date: ${formatDate(transaction.date)}</p>
            </div>
          </div>
          
          <div class="mb-6">
            <p class="font-medium">Bill To:</p>
            <p>${transaction.company}</p>
            <p class="text-sm text-gray-500">Customer ID: CUS-${Math.floor(Math.random() * 10000)
              .toString()
              .padStart(4, "0")}</p>
          </div>
          
          <table class="w-full mb-6">
            <thead class="border-b border-gray-200">
              <tr>
                <th class="text-left py-2">Description</th>
                <th class="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-100">
                <td class="py-3">${transaction.package}</td>
                <td class="text-right py-3">${transaction.amount}</td>
              </tr>
              <tr class="border-b border-gray-100">
                <td class="py-3">Processing Fee</td>
                <td class="text-right py-3">$0.00</td>
              </tr>
              <tr>
                <td class="py-3 font-bold">Total</td>
                <td class="text-right py-3 font-bold">${transaction.amount}</td>
              </tr>
            </tbody>
          </table>
          
          <div class="mb-4">
            <p class="font-medium">Payment Information:</p>
            <p class="text-sm">Method: ${transaction.paymentMethod}</p>
            <p class="text-sm">Status: ${transaction.status}</p>
            <p class="text-sm">Transaction ID: ${transaction.id}</p>
          </div>
          
          <div class="text-center text-sm text-gray-500 mt-6">
            <p>Thank you for your business!</p>
            <p>For questions about this receipt, please contact support@jobfind.com</p>
          </div>
        </div>
      `,
      width: "650px",
      showCloseButton: true,
      confirmButtonText: "Download PDF",
      showCancelButton: true,
      cancelButtonText: "Close",
      customClass: {
        container: "swal-wide",
        popup: "rounded-lg",
        header: "border-b pb-3",
        content: "pt-4",
        confirmButton: "bg-blue-600 hover:bg-blue-700",
        cancelButton: "bg-gray-200 hover:bg-gray-300 text-gray-800",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // In a real application, this would generate and download a PDF
        // For this example, we'll just show a success message
        Swal.fire({
          title: "Receipt Downloaded",
          text: `Receipt #${receiptNumber} has been downloaded.`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        })

        console.log("Downloading receipt for transaction:", transaction.id)
      }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transactions & Payments</h1>
        <p className="text-gray-500 mt-1">Manage all financial transactions and payment records</p>
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
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative" ref={statusFilterRef}>
            <button
              onClick={() => {
                setShowStatusFilter(!showStatusFilter)
                setShowDateFilter(false)
              }}
              className={`flex items-center gap-2 px-4 py-2 border rounded-md 
                ${isFiltered ? "bg-blue-50 border-blue-300 text-blue-700" : "border-gray-300 hover:bg-gray-50"}`}
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>

            {showStatusFilter && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Filter Transactions</h3>
                    <button onClick={clearFilters} className="text-xs text-blue-600 hover:text-blue-800">
                      Clear all filters
                    </button>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Status</h4>
                    <div className="space-y-2">
                      {["Completed", "Pending", "Failed", "Refunded"].map((status) => (
                        <label key={status} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={statusFilters.includes(status)}
                            onChange={() => toggleStatusFilter(status)}
                            className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4 mr-2"
                          />
                          <span className="text-sm">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Payment Method</h4>
                    <div className="space-y-2">
                      {["Credit Card", "PayPal", "Bank Transfer"].map((method) => (
                        <label key={method} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={paymentMethodFilters.includes(method)}
                            onChange={() => togglePaymentMethodFilter(method)}
                            className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4 mr-2"
                          />
                          <span className="text-sm">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={dateFilterRef}>
            <button
              onClick={() => {
                setShowDateFilter(!showDateFilter)
                setShowStatusFilter(false)
              }}
              className={`flex items-center gap-2 px-4 py-2 border rounded-md 
                ${dateRange.start || dateRange.end ? "bg-blue-50 border-blue-300 text-blue-700" : "border-gray-300 hover:bg-gray-50"}`}
            >
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </button>

            {showDateFilter && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Date Range</h3>
                    <button
                      onClick={() => setDateRange({ start: "", end: "" })}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Clear dates
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Start Date</label>
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">End Date</label>
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        min={dateRange.start}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Show active filters */}
      {isFiltered && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>

          {statusFilters.map((filter) => (
            <span
              key={filter}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
            >
              Status: {filter}
              <button onClick={() => toggleStatusFilter(filter)} className="hover:text-blue-600">
                ×
              </button>
            </span>
          ))}

          {paymentMethodFilters.map((filter) => (
            <span
              key={filter}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
            >
              Payment: {filter}
              <button onClick={() => togglePaymentMethodFilter(filter)} className="hover:text-blue-600">
                ×
              </button>
            </span>
          ))}

          {dateRange.start && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              From: {dateRange.start}
              <button onClick={() => setDateRange({ ...dateRange, start: "" })} className="hover:text-blue-600">
                ×
              </button>
            </span>
          )}

          {dateRange.end && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              To: {dateRange.end}
              <button onClick={() => setDateRange({ ...dateRange, end: "" })} className="hover:text-blue-600">
                ×
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              Search: {searchQuery}
              <button onClick={() => setSearchQuery("")} className="hover:text-blue-600">
                ×
              </button>
            </span>
          )}

          <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-800 ml-2">
            Clear all
          </button>
        </div>
      )}

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Transaction ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Package
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment Method
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
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
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.package}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.paymentMethod}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : transaction.status === "Failed"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewTransaction(transaction)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        aria-label={`View details for transaction ${transaction.id}`}
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleViewReceipt(transaction)}
                        className="text-blue-600 hover:text-blue-900"
                        aria-label={`View receipt for transaction ${transaction.id}`}
                      >
                        Receipt
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-sm text-gray-500">
                    No transactions found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                  : "text-gray-700 bg-white hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <span className="text-sm text-gray-500 self-center">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                currentPage === totalPages || totalPages === 0
                  ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">{Math.min(indexOfLastItem, filteredTransactions.length)}</span> of{" "}
                <span className="font-medium">{filteredTransactions.length}</span> results
                {isFiltered && <span className="italic"> (filtered)</span>}
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

                {getPageNumbers().map((pageNumber, index) =>
                  pageNumber === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={`page-${pageNumber}`}
                      onClick={() => goToPage(Number(pageNumber))}
                      aria-current={currentPage === pageNumber ? "page" : undefined}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNumber
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ),
                )}

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
