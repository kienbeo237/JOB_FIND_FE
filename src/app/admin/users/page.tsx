'use client';

import React from 'react';
import { UserPlus, Filter, Download, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

interface User {
  id: number;
  name: string;
  email: string;
  type: string;
  status: string;
  joinDate: string;
}

const UsersManagement: React.FC = () => {
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      type: 'Candidate',
      status: 'Active',
      joinDate: 'May 10, 2023',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@techsolutions.com',
      type: 'Employer',
      status: 'Active',
      joinDate: 'Apr 15, 2023',
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert@example.com',
      type: 'Candidate',
      status: 'Inactive',
      joinDate: 'Mar 22, 2023',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@globalinnovations.com',
      type: 'Employer',
      status: 'Active',
      joinDate: 'Feb 18, 2023',
    },
    {
      id: 5,
      name: 'Michael Brown',
      email: 'michael@example.com',
      type: 'Admin',
      status: 'Active',
      joinDate: 'Jan 05, 2023',
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily@futuresystems.com',
      type: 'Employer',
      status: 'Pending',
      joinDate: 'May 02, 2023',
    },
    {
      id: 7,
      name: 'David Wilson',
      email: 'david@example.com',
      type: 'Candidate',
      status: 'Active',
      joinDate: 'Apr 28, 2023',
    },
    {
      id: 8,
      name: 'Lisa Taylor',
      email: 'lisa@digitalexperts.com',
      type: 'Employer',
      status: 'Active',
      joinDate: 'Mar 15, 2023',
    },
  ];

  const [activeTab, setActiveTab] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [statusFilters, setStatusFilters] = useState<string[]>([]);

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    type: '',
    status: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const toggleStatusFilter = (status: string) => {
    if (statusFilters.includes(status)) {
      setStatusFilters(statusFilters.filter(s => s !== status));
    } else {
      setStatusFilters([...statusFilters, status]);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Type', 'Status', 'Join Date'];

    const userRows = filteredUsers.map(user => [
      user.name,
      user.email,
      user.type,
      user.status,
      user.joinDate,
    ]);

    const csvContent = [
      headers.join(','),
      ...userRows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `users-export-${new Date().toISOString().split('T')[0]}.csv`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredUsers = users.filter(user => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'candidates' && user.type === 'Candidate') ||
      (activeTab === 'employers' && user.type === 'Employer') ||
      (activeTab === 'admins' && user.type === 'Admin');

    const matchesStatus =
      statusFilters.length === 0 || statusFilters.includes(user.status);

    return matchesTab && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (user: any) => {
    setSelectedUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      type: user.type,
      status: user.status,
    });

    Swal.fire({
      title: 'Edit User',
      html: `
        <div class="space-y-4">
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              id="swal-name" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md" 
              value="${user.name}"
            />
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              id="swal-email" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md" 
              value="${user.email}"
            />
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select 
              id="swal-type" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Candidate" ${
                user.type === 'Candidate' ? 'selected' : ''
              }>Candidate</option>
              <option value="Employer" ${
                user.type === 'Employer' ? 'selected' : ''
              }>Employer</option>
              <option value="Admin" ${
                user.type === 'Admin' ? 'selected' : ''
              }>Admin</option>
            </select>
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              id="swal-status" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Active" ${
                user.status === 'Active' ? 'selected' : ''
              }>Active</option>
              <option value="Inactive" ${
                user.status === 'Inactive' ? 'selected' : ''
              }>Inactive</option>
              <option value="Pending" ${
                user.status === 'Pending' ? 'selected' : ''
              }>Pending</option>
            </select>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save Changes',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById('swal-name') as HTMLInputElement)
          .value;
        const email = (
          document.getElementById('swal-email') as HTMLInputElement
        ).value;
        const type = (document.getElementById('swal-type') as HTMLSelectElement)
          .value;
        const status = (
          document.getElementById('swal-status') as HTMLSelectElement
        ).value;

        if (!name || !email) {
          Swal.showValidationMessage('Please fill all required fields');
          return false;
        }

        return { name, email, type, status };
      },
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success!',
          text: `User ${result.value.name} has been updated.`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }
    });
  };

  const handleDeleteClick = (user: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete user ${user.name}? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: `User ${user.name} has been deleted.`,
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showFilterMenu &&
        !(event.target as Element).closest('.filter-menu-container')
      ) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterMenu]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-500 mt-1">
            Manage all users, candidates, employers, and admins
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          <UserPlus className="h-5 w-5" />
          <span>Add New User</span>
        </button>
      </div>

      {/* User Type Tabs */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-1">
        <div className="flex flex-wrap">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'all'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Users
          </button>
          <button
            onClick={() => setActiveTab('candidates')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'candidates'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Candidates
          </button>
          <button
            onClick={() => setActiveTab('employers')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'employers'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Employers
          </button>
          <button
            onClick={() => setActiveTab('admins')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
              activeTab === 'admins'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Admins
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative filter-menu-container">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b">
                    Filter by Status
                  </div>
                  <div className="px-4 py-2">
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={statusFilters.includes('Active')}
                        onChange={() => toggleStatusFilter('Active')}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Active</span>
                    </label>
                  </div>
                  <div className="px-4 py-2">
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={statusFilters.includes('Inactive')}
                        onChange={() => toggleStatusFilter('Inactive')}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Inactive</span>
                    </label>
                  </div>
                  <div className="px-4 py-2">
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={statusFilters.includes('Pending')}
                        onChange={() => toggleStatusFilter('Pending')}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span>Pending</span>
                    </label>
                  </div>
                  <div className="border-t px-4 py-2 flex justify-end">
                    <button
                      onClick={() => setStatusFilters([])}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Clear Filters
                    </button>
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

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
        <div
          className="overflow-x-auto overflow-y-auto"
          style={{ maxHeight: '500px' }}
        >
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
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
                  Join Date
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
              {currentItems.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.type === 'Candidate'
                          ? 'bg-blue-100 text-blue-800'
                          : user.type === 'Employer'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {user.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : user.status === 'Inactive'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
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
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? 'text-gray-400 bg-gray-100'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? 'text-gray-400 bg-gray-100'
                  : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                <span className="font-medium">
                  {indexOfLastItem > filteredUsers.length
                    ? filteredUsers.length
                    : indexOfLastItem}
                </span>{' '}
                of <span className="font-medium">{filteredUsers.length}</span>{' '}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-50'
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

                {Array.from({ length: Math.min(totalPages, 5) }).map(
                  (_, index) => {
                    let pageNum =
                      currentPage <= 3
                        ? index + 1
                        : currentPage >= totalPages - 2
                        ? totalPages - 4 + index
                        : currentPage - 2 + index;

                    if (pageNum <= 0) pageNum = 1;
                    if (pageNum > totalPages) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        aria-current={
                          currentPage === pageNum ? 'page' : undefined
                        }
                        className={`${
                          currentPage === pageNum
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-500 hover:bg-gray-50'
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
  );
};

export default UsersManagement;
