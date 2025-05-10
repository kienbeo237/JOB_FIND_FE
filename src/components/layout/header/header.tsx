"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, User, Grid, Globe2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { label: "Việc làm", href: "/viec-lam", submenu: true },
  { label: "Hồ Sơ, CV", href: "/ho-so-cv", submenu: true },
  { label: "Công ty", href: "/cong-ty", submenu: false },
  { label: "Cẩm nang, công cụ", href: "/cam-nang", submenu: true },
  { label: "Hành trình xanh", href: "/hanh-trinh-xanh", submenu: true },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showCandidate, setShowCandidate] = useState(false)
  const [showEmployer, setShowEmployer] = useState(false)
  const pathname = usePathname()
  const [showHeader, setShowHeader] = useState(true)

  // Define the toggleMenu function before any potential returns
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Handle dropdown closing when clicking outside
  useEffect(() => {
    const listener = () => {
      setShowCandidate(false)
      setShowEmployer(false)
    }
    if (showCandidate || showEmployer) {
      document.addEventListener("click", listener)
      return () => document.removeEventListener("click", listener)
    }
  }, [showCandidate, showEmployer])

  // All useEffect hooks must be called unconditionally
  useEffect(() => {
    setShowHeader(!pathname?.includes("/employer"))
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Function to get the total number of items in all carts
  const getTotalCartItems = () => {
    if (typeof window === "undefined") return 0

    try {
      const jobPostingItems = JSON.parse(localStorage.getItem("jobPostingCart") || "[]")
      const cvFilteringItems = JSON.parse(localStorage.getItem("cvFilteringCart") || "[]")
      const bannerItems = JSON.parse(localStorage.getItem("bannerCart") || "[]")

      const totalItems = [...jobPostingItems, ...cvFilteringItems, ...bannerItems].reduce(
        (total, item) => total + item.quantity,
        0,
      )

      return totalItems
    } catch (error) {
      console.error("Error getting cart items:", error)
      return 0
    }
  }

  const [cartCount, setCartCount] = useState(0)

  // Update cart count when component mounts and when localStorage changes
  useEffect(() => {
    setCartCount(getTotalCartItems())

    // Listen for storage events to update cart count
    const handleStorageChange = () => {
      setCartCount(getTotalCartItems())
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event for cart updates
    const handleCartUpdate = () => {
      setCartCount(getTotalCartItems())
    }

    window.addEventListener("cartUpdated", handleCartUpdate)

    // Initial cart count
    setCartCount(getTotalCartItems())

    // Check cart count periodically
    const interval = setInterval(() => {
      setCartCount(getTotalCartItems())
    }, 2000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cartUpdated", handleCartUpdate)
      clearInterval(interval)
    }
  }, [])

  // Instead of returning null early, conditionally render the header
  return showHeader ? (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <nav className="max-w-[1350px] mx-auto flex items-center justify-between px-4 h-[64px] gap-6 select-none">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 py-2">
          <span className="font-extrabold text-[25px] text-[#047857]">
            JobFind<span className="text-green-400">.vn</span>
          </span>
        </Link>

        {/* Center menu - Desktop */}
        <div className="hidden md:flex gap-2 md:gap-4 items-center flex-1 justify-center">
          {menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="text-[15px] font-medium text-gray-700 px-2 py-1 hover:text-green-600 relative flex items-center"
            >
              {item.label}
              {item.submenu && <ChevronDown className="w-4 h-4 ml-1" />}
            </Link>
          ))}
        </div>

        {/* Right area - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="#"
            className="inline-flex items-center justify-center h-9 w-9 rounded bg-transparent hover:bg-green-500/10 text-gray-700 transition"
          >
            <Globe2 className="w-5 h-5" />
          </a>

          <Link href="/employer/cart" className="text-gray-700 relative hover:text-green-600 transition-colors">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Candidate Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              className="px-3 py-1.5 rounded-lg text-gray-900 hover:bg-green-500/5 font-medium flex gap-2 items-center"
              onClick={(e) => {
                e.stopPropagation()
                setShowCandidate((s) => !s)
                setShowEmployer(false)
              }}
              aria-haspopup="true"
              aria-expanded={showCandidate}
            >
              <User className="w-5 h-5" />
              Ứng viên
              <ChevronDown className="w-4 h-4" />
            </Button>
            {showCandidate && (
              <div className="absolute right-0 top-full mt-2 z-50" onClick={(e) => e.stopPropagation()}>
                <div className="bg-white rounded-xl shadow-xl p-2 min-w-[210px] flex flex-col gap-1">
                  <Link
                    href="/candidate/login"
                    className="block px-4 py-2 rounded text-gray-800 hover:bg-green-500/10 font-[500]"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/candidate/register"
                    className="block px-4 py-2 rounded text-gray-800 hover:bg-green-500/10 font-[500]"
                  >
                    Đăng ký
                  </Link>
                  <Link
                    href="/candidate/dashboard"
                    className="block px-4 py-2 rounded text-gray-800 hover:bg-green-500/10 font-[500]"
                  >
                    Dashboard ứng viên
                  </Link>
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-gray-700 text-sm">Đang tìm việc</span>
                    <input type="checkbox" className="toggle toggle-success" />
                  </div>
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-gray-700 text-sm">Tìm kiếm CV</span>
                    <input type="checkbox" className="toggle toggle-success" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Employer Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              className="px-4 py-2 !bg-green-500/25 border-0 text-green-700 font-medium flex gap-2 items-center rounded-lg shadow-none hover:bg-green-500/40 transition-all"
              onClick={(e) => {
                e.stopPropagation()
                setShowEmployer((s) => !s)
                setShowCandidate(false)
              }}
              aria-haspopup="true"
              aria-expanded={showEmployer}
            >
              <Grid className="w-5 h-5" />
              Nhà tuyển dụng
              <ChevronDown className="w-4 h-4" />
            </Button>
            {showEmployer && (
              <div className="absolute right-0 top-full mt-2 z-50" onClick={(e) => e.stopPropagation()}>
                <div className="bg-white rounded-xl shadow-xl p-2 min-w-[215px] flex flex-col gap-1">
                  <Link
                    href="/employer/login"
                    className="block px-4 py-2 rounded text-gray-800 hover:bg-green-500/10 font-[500]"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/employer/register"
                    className="block px-4 py-2 rounded text-gray-800 hover:bg-green-500/10 font-[500]"
                  >
                    Đăng ký
                  </Link>
                  <Link
                    href="/employer/dashboard"
                    className="block px-4 py-2 rounded text-gray-800 hover:bg-green-500/10 font-[500]"
                  >
                    Dashboard nhà tuyển dụng
                  </Link>
                  <Link
                    href="/employer/post-job"
                    className="block px-4 py-2 rounded text-gray-800 hover:bg-green-500/10 font-[500]"
                  >
                    Đăng tuyển dụng
                  </Link>
                  <Link
                    href="/employer/find-candidates"
                    className="block px-4 py-2 rounded text-gray-800 hover:bg-green-500/10 font-[500]"
                  >
                    Tìm ứng viên
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className="text-gray-700 hover:text-green-600 flex items-center justify-between"
              >
                <span>{item.label}</span>
                {item.submenu && <ChevronDown className="w-4 h-4" />}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <Link href="/candidate/login" className="block py-2 text-green-500 hover:text-green-600">
                Đăng nhập ứng viên
              </Link>
              <Link href="/candidate/register" className="block py-2 text-green-500 hover:text-green-600">
                Đăng ký ứng viên
              </Link>
              <Link href="/employer/login" className="block py-2 text-emerald-600 hover:text-emerald-700">
                Đăng nhập nhà tuyển dụng
              </Link>
              <Link href="/employer/register" className="block py-2 text-emerald-600 hover:text-emerald-700">
                Đăng ký nhà tuyển dụng
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  ) : null
}
