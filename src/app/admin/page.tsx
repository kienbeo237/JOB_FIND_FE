import Link from "next/link"
import { Users, FileText, CreditCard, Briefcase, MessageSquare, TrendingUp, Clock } from "lucide-react"

export default function AdminDashboard() {
  // Mock data for dashboard
  const stats = [
    { title: "Total Users", value: "12,345", icon: <Users className="h-6 w-6" />, color: "bg-blue-100 text-blue-600" },
    {
      title: "Active Jobs",
      value: "1,234",
      icon: <Briefcase className="h-6 w-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "New Applications",
      value: "567",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Revenue (MTD)",
      value: "$45,678",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-amber-100 text-amber-600",
    },
  ]

  const recentTransactions = [
    { id: "TX123456", company: "Tech Solutions Inc.", amount: "$299.00", date: "May 15, 2023", status: "Completed" },
    { id: "TX123455", company: "Global Innovations", amount: "$199.00", date: "May 14, 2023", status: "Completed" },
    { id: "TX123454", company: "Future Systems", amount: "$499.00", date: "May 13, 2023", status: "Pending" },
    { id: "TX123453", company: "Digital Experts", amount: "$349.00", date: "May 12, 2023", status: "Completed" },
    { id: "TX123452", company: "Smart Technologies", amount: "$199.00", date: "May 11, 2023", status: "Failed" },
  ]

  const supportTickets = [
    { id: "#4582", title: "Cannot access job posting feature", priority: "High", status: "Open", time: "2 hours ago" },
    {
      id: "#4581",
      title: "Payment failed but amount deducted",
      priority: "High",
      status: "In Progress",
      time: "5 hours ago",
    },
    { id: "#4580", title: "How to edit company profile?", priority: "Medium", status: "Open", time: "1 day ago" },
    { id: "#4579", title: "Need to change subscription plan", priority: "Low", status: "Closed", time: "2 days ago" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back to the JobFind admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
        <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link
            href="/admin/users"
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Users className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium">Users</span>
          </Link>
          <Link
            href="/admin/content"
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FileText className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium">Content</span>
          </Link>
          <Link
            href="/admin/transactions"
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <CreditCard className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium">Transactions</span>
          </Link>
          <Link
            href="/admin/categories"
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Briefcase className="h-8 w-8 text-amber-600 mb-2" />
            <span className="text-sm font-medium">Categories</span>
          </Link>
          <Link
            href="/admin/support"
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MessageSquare className="h-8 w-8 text-red-600 mb-2" />
            <span className="text-sm font-medium">Support</span>
          </Link>
          <Link
            href="/admin/analytics"
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <TrendingUp className="h-8 w-8 text-indigo-600 mb-2" />
            <span className="text-sm font-medium">Analytics</span>
          </Link>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <Link href="/admin/transactions" className="text-sm text-blue-600 hover:text-blue-800">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentTransactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.id}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.company}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.amount}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Support Tickets */}
        <div className="bg-white rounded-lg shadow border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Support Tickets</h2>
            <Link href="/admin/support" className="text-sm text-blue-600 hover:text-blue-800">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {supportTickets.map((ticket, index) => (
              <div key={index} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{ticket.title}</span>
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
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <span className="mr-2">{ticket.id}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded ${
                        ticket.priority === "High"
                          ? "bg-red-50 text-red-700"
                          : ticket.priority === "Medium"
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-green-50 text-green-700"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {ticket.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
