"use client"

import { Briefcase, MapPin, Plus, Search, Edit, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import Swal from "sweetalert2"

export default function CategoriesManagement() {
  
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("categories")
  const itemsPerPage = 6

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryStatus, setNewCategoryStatus] = useState("Active")

  
  const jobCategories = [
    { id: 1, name: "Information Technology", count: 245, status: "Active" },
    { id: 2, name: "Finance & Accounting", count: 187, status: "Active" },
    { id: 3, name: "Marketing & Sales", count: 156, status: "Active" },
    { id: 4, name: "Healthcare", count: 132, status: "Active" },
    { id: 5, name: "Engineering", count: 124, status: "Active" },
    { id: 6, name: "Education", count: 98, status: "Active" },
    { id: 7, name: "Human Resources", count: 87, status: "Active" },
    { id: 8, name: "Customer Service", count: 76, status: "Active" },
    { id: 9, name: "Administrative", count: 65, status: "Active" },
    { id: 10, name: "Legal", count: 43, status: "Active" },
    { id: 11, name: "Retail", count: 38, status: "Inactive" },
    { id: 12, name: "Manufacturing", count: 32, status: "Active" },
  ]

  
  const locations = [
    { id: 1, name: "New York", count: 345, status: "Active" },
    { id: 2, name: "San Francisco", count: 287, status: "Active" },
    { id: 3, name: "Los Angeles", count: 256, status: "Active" },
    { id: 4, name: "Chicago", count: 232, status: "Active" },
    { id: 5, name: "Boston", count: 198, status: "Active" },
    { id: 6, name: "Seattle", count: 176, status: "Active" },
    { id: 7, name: "Austin", count: 154, status: "Active" },
    { id: 8, name: "Denver", count: 132, status: "Active" },
    { id: 9, name: "Miami", count: 121, status: "Active" },
    { id: 10, name: "Atlanta", count: 109, status: "Active" },
    { id: 11, name: "Dallas", count: 98, status: "Inactive" },
    { id: 12, name: "Phoenix", count: 87, status: "Active" },
  ]

  
  const currentData = activeTab === "categories" ? jobCategories : locations

  
  const totalItems = currentData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = currentData.slice(indexOfFirstItem, indexOfLastItem)

  
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  
  const handleAddCategory = (e) => {
    e.preventDefault()

    if (!newCategoryName.trim()) return

    
    const newCategory = {
      id: currentData.length + 1,
      name: newCategoryName,
      count: 0,
      status: newCategoryStatus,
    }

    
    console.log("Adding new category:", newCategory)

    
    setNewCategoryName("")
    setNewCategoryStatus("Active")
    setIsModalOpen(false)

    
    alert(`New ${activeTab === "categories" ? "category" : "location"} added: ${newCategoryName}`)
  }

  
  const handleEditItem = (item) => {
    Swal.fire({
      title: `Edit ${activeTab === "categories" ? "Category" : "Location"}`,
      html: `
      <div class="space-y-4">
        <div>
          <label for="swal-name" class="block text-sm font-medium text-gray-700 text-left mb-1">
            ${activeTab === "categories" ? "Category" : "Location"} Name
          </label>
          <input 
            id="swal-name" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            value="${item.name}"
          />
        </div>
        <div>
          <label for="swal-status" class="block text-sm font-medium text-gray-700 text-left mb-1">
            Status
          </label>
          <select 
            id="swal-status" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active" ${item.status === "Active" ? "selected" : ""}>Active</option>
            <option value="Inactive" ${item.status === "Inactive" ? "selected" : ""}>Inactive</option>
          </select>
        </div>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Save Changes",
      confirmButtonColor: "#2563eb",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById("swal-name").value
        const status = document.getElementById("swal-status").value

        if (!name.trim()) {
          Swal.showValidationMessage(`Please enter a ${activeTab === "categories" ? "category" : "location"} name`)
          return false
        }

        return { name, status }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        
        console.log(`Updating ${activeTab === "categories" ? "category" : "location"}:`, {
          id: item.id,
          name: result.value.name,
          status: result.value.status,
        })

        
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `The ${activeTab === "categories" ? "category" : "location"} has been updated.`,
          confirmButtonColor: "#2563eb",
        })
      }
    })
  }

  
  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the ${activeTab === "categories" ? "category" : "location"} "${item.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ef4444",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        
        console.log(`Deleting ${activeTab === "categories" ? "category" : "location"}:`, item)

        
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `The ${activeTab === "categories" ? "category" : "location"} has been deleted.`,
          confirmButtonColor: "#2563eb",
        })
      }
    })
  }

  
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <p className="text-gray-500 mt-1">Manage job categories and locations</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-1">
        <div className="flex">
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "categories" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("categories")}
          >
            Job Categories
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === "locations" ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("locations")}
          >
            Locations
          </button>
        </div>
      </div>

      {/* Job Categories Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add {activeTab === "categories" ? "Category" : "Location"}</span>
          </button>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-lg shadow border border-gray-100 ">
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto overflow-hidden">
            <table className="min-w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {activeTab === "categories" ? "Category Name" : "Location Name"}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Jobs Count
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
                {currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-10 w-10 ${
                            activeTab === "categories" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                          } rounded-md flex items-center justify-center`}
                        >
                          {activeTab === "categories" ? (
                            <Briefcase className="h-5 w-5" />
                          ) : (
                            <MapPin className="h-5 w-5" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.count} jobs</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          item.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        aria-label={`Edit ${item.name}`}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="text-red-600 hover:text-red-900"
                        aria-label={`Delete ${item.name}`}
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
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-gray-700 bg-white hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-gray-700 bg-white hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(indexOfLastItem, totalItems)}</span> of{" "}
                  <span className="font-medium">{totalItems}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={prevPage}
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

                  {Array.from({ length: Math.min(totalPages, 3) }).map((_, idx) => {
                    
                    let pageNumber
                    if (totalPages <= 3) {
                      pageNumber = idx + 1
                    } else if (currentPage <= 2) {
                      pageNumber = idx + 1
                    } else if (currentPage >= totalPages - 1) {
                      pageNumber = totalPages - 2 + idx
                    } else {
                      pageNumber = currentPage - 1 + idx
                    }

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        aria-current={currentPage === pageNumber ? "page" : undefined}
                        className={`${
                          currentPage === pageNumber
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"
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
      {/* Add Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add New {activeTab === "categories" ? "Category" : "Location"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http:
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddCategory}>
              <div className="mb-4">
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                  {activeTab === "categories" ? "Category" : "Location"} Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Enter ${activeTab === "categories" ? "category" : "location"} name`}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="categoryStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="categoryStatus"
                  value={newCategoryStatus}
                  onChange={(e) => setNewCategoryStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Add {activeTab === "categories" ? "Category" : "Location"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
