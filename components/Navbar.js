"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const user = session?.user;
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            AI
          </div>
          <span className="text-xl font-bold text-gray-900">Learning</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="nav-link">Home</Link>

          {user?.role !== "teacher" && (
            <>
              <Link href="/features" className="nav-link">Features</Link>
              <Link href="/courses" className="nav-link">Courses</Link>
            </>
          )}

          {/* 🟦 USER LOGGED IN → Show Name + Dropdown */}
          {session ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
              >
                <span className="font-medium text-gray-700">{user.name}</span>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor">
                  <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Dropdown */}
              {dropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg py-2">

                  {/* TEACHER — special extra panel */}
                  {user?.role === "teacher" && (
                    <>
                      <Link
                        href="/teacher"
                        onClick={() => setDropdown(false)}
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        Teacher Panel
                      </Link>

                      <Link
                        href="/profile"
                        onClick={() => setDropdown(false)}
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        Profile
                      </Link>

                      <button
                        onClick={() => {
                          setDropdown(false);
                          signOut({ callbackUrl: "/login" });
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        Logout
                      </button>
                    </>
                  )}

                  {/* STUDENT — only profile + logout */}
                  {user?.role === "student" && (
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setDropdown(false)}
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        Profile
                      </Link>

                      <button
                        onClick={() => {
                          setDropdown(false);
                          signOut({ callbackUrl: "/login" });
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}

            </div>
          ) : (
            <>
              {/* 🟥 USER NOT LOGGED IN → Show login + signup */}
              <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-linear-to-r from-blue-600 to-blue-500 text-white px-5 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="px-6 pb-6 pt-2 space-y-3 bg-white border-t border-gray-100">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block py-2.5 px-4 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all"
          >
            Home
          </Link>

          {user?.role !== "teacher" && (
            <>
              <Link
                href="/features"
                onClick={() => setOpen(false)}
                className="block py-2.5 px-4 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all"
              >
                Features
              </Link>
              <Link
                href="/courses"
                onClick={() => setOpen(false)}
                className="block py-2.5 px-4 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all"
              >
                Courses
              </Link>
            </>
          )}

          {/* MOBILE USER MENU */}
          {session ? (
            <>
              {/* TEACHER MENU */}
              {user?.role === "teacher" && (
                <>
                  <Link
                    href="/teacher"
                    onClick={() => setOpen(false)}
                    className="block py-2.5 px-4 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all"
                  >
                    Teacher Panel
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="block py-2.5 px-4 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/login" });
                    }}
                    className="block w-full text-left py-3 px-4 bg-linear-to-r from-red-600 to-red-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    Logout
                  </button>
                </>
              )}

              {/* STUDENT MENU */}
              {user?.role === "student" && (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="block py-2.5 px-4 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut({ callbackUrl: "/login" });
                    }}
                    className="block w-full text-left py-3 px-4 bg-linear-to-r from-red-600 to-red-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    Logout
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block py-2.5 px-4 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="block py-3 px-4 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl text-center font-medium hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Custom Tailwind classes */}
      <style>{`
        .nav-link {
          text-gray-600 hover:text-blue-600 font-medium transition-colors relative 
          after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 
          hover:after:w-full after:transition-all;
        }
        .mobile-link {
          block py-2.5 px-4 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all;
        }
        .mobile-signup {
          block py-3 px-4 bg-blue-600 text-white rounded-xl text-center font-medium;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
